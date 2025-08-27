"use server";

import { auth, clerkClient, User } from "@clerk/nextjs/server";
import { createClerkSupabaseClient } from "@/utils/supabase";
import bcrypt from "bcryptjs";
import {
  onboardingSchema,
  type OnboardingFormData,
} from "@/lib/validations/onboarding";
import { z } from "zod";

export const completeOnboarding = async (formData: FormData) => {
  const { userId, getToken } = await auth();

  if (!userId) {
    return { error: "User not found." };
  }

  const client = await clerkClient();

  try {
    // Extract form data
    const data = {
      phoneNumber: formData.get("phoneNumber") as string,
      dateOfBirth: formData.get("dateOfBirth") as string,
      gender: formData.get("gender") as string,
      occupation: formData.get("occupation") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      pin: formData.get("pin") as string,
      confirmPin: formData.get("confirmPin") as string,
    };
    // console.log(data);

    // Server-side validation with Zod
    const validationResult = onboardingSchema.safeParse(data);
    // console.log(validationResult);

    if (!validationResult.success) {
      // Extract the first error message for general display
      const firstError = validationResult.error.issues[0];
      return { error: `Validation failed: ${firstError.message}` };
    }

    const validatedData = validationResult.data;

    // Additional server-side security checks
    if (validatedData.pin !== validatedData.confirmPin) {
      return { error: "PINs do not match." };
    }

    // Check for duplicate phone numbers (if needed)
    const supabaseForCheck = createClerkSupabaseClient(getToken);
    const { data: existingUser } = await supabaseForCheck
      .from("clerk_users")
      .select("phone_number")
      .eq("phone_number", validatedData.phoneNumber)
      .neq("id", userId)
      .single();

    if (existingUser) {
      return { error: "Phone number is already registered." };
    }

    // Hash the PIN
    const hashedPin = await bcrypt.hash(validatedData.pin, 12); // Increased salt rounds for better security

    // Get the full user object
    const user: User = await client.users.getUser(userId);

    // Create Supabase client and upsert user data
    const supabase = createClerkSupabaseClient(getToken);
    const { error: supabaseError } = await supabase.from("clerk_users").upsert(
      {
        username: user.username,
        first_name: user.firstName,
        last_name: user.lastName,
        image_url: user.imageUrl,
        email_address: user.emailAddresses.find(
          (email) => email.id === user.primaryEmailAddressId
        )?.emailAddress,
        onboarding_complete: true,
        phone_number: validatedData.phoneNumber,
        date_of_birth: validatedData.dateOfBirth,
        gender: validatedData.gender,
        occupation: validatedData.occupation,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
        pin: hashedPin,
        two_factor_enabled: user.twoFactorEnabled,
        email_verified:
          user.emailAddresses.find(
            (email) => email.id === user.primaryEmailAddressId
          )?.verification?.status === "verified",
        last_sign_in_at: user.lastSignInAt
          ? new Date(user.lastSignInAt).toISOString()
          : null,
        banned: user.banned,
        locked: user.locked,
        created_at: new Date(user.createdAt).toISOString(),
        updated_at: new Date(user.updatedAt).toISOString(),
        last_active_at: user.lastActiveAt
          ? new Date(user.lastActiveAt).toISOString()
          : null,
      },
      { onConflict: "id" }
    );

    if (supabaseError) {
      console.error("Supabase error:", supabaseError);
      return { error: "Failed to save data. Please try again." };
    }

    // Update Clerk user metadata
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        phoneNumber: validatedData.phoneNumber,
        dateOfBirth: validatedData.dateOfBirth,
        gender: validatedData.gender,
        occupation: validatedData.occupation,
        address: validatedData.address,
        city: validatedData.city,
        state: validatedData.state,
      },
    });

    // Log successful onboarding (for monitoring)
    console.log(`User ${userId} completed onboarding successfully`);

    return { message: "Profile completed successfully!" };
  } catch (err) {
    console.error("Error completing onboarding:", err);

    // Don't expose internal errors to the client
    if (err instanceof z.ZodError) {
      return { error: "Invalid form data. Please check your inputs." };
    }

    return { error: "An unexpected error occurred. Please try again." };
  }
};
