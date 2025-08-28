import { z } from "zod";

export const onboardingSchema = z
  .object({
    phoneNumber: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number")
      .refine((phone) => {
        // Remove all non-digits for validation
        const cleanPhone = phone.replace(/\D/g, "");
        return cleanPhone.length >= 10 && cleanPhone.length <= 15;
      }, "Phone number must be between 10-15 digits")
      .refine((phone) => {
        // Nigerian phone number specific validation
        if (phone.startsWith("+234")) {
          const cleanPhone = phone.replace(/\D/g, "");
          return cleanPhone.length === 13;
        }
        return true;
      }, "Nigerian phone number should be 13 digits including country code"),

    dateOfBirth: z.coerce
      .date()
      .refine((date) => !isNaN(date.getTime()), {
        message: "Please enter a valid date of birth.",
      })
      .refine((date) => date <= new Date(), {
        message: "Date of birth cannot be in the future.",
      })
      .refine(
        (date) => {
          const eighteenYearsAgo = new Date();
          eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
          return date <= eighteenYearsAgo;
        },
        { message: "You must be at least 18 years old." }
      )
      .refine(
        (date) => {
          const oneHundredTwentyYearsAgo = new Date();
          oneHundredTwentyYearsAgo.setFullYear(
            oneHundredTwentyYearsAgo.getFullYear() - 120
          );
          return date >= oneHundredTwentyYearsAgo;
        },
        { message: "Please enter a valid date of birth." }
      ),

    gender: z.enum(["male", "female", "prefer-not-to-say"], {
      message: "Please select a gender.",
    }),

    occupation: z
      .string()
      .min(1, "Occupation is required")
      .min(2, "Occupation must be at least 2 characters")
      .max(100, "Occupation must be less than 100 characters")
      .regex(
        /^[a-zA-Z\s\-\.]+$/,
        "Occupation can only contain letters, spaces, hyphens, and periods"
      ),

    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address must be at least 5 characters")
      .max(200, "Address must be less than 200 characters"),

    city: z
      .string()
      .min(1, "City is required")
      .min(2, "City must be at least 2 characters")
      .max(50, "City must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s\-\.]+$/,
        "City can only contain letters, spaces, hyphens, and periods"
      ),

    state: z
      .string()
      .min(1, "State is required")
      .min(2, "State must be at least 2 characters")
      .max(50, "State must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s\-\.]+$/,
        "State can only contain letters, spaces, hyphens, and periods"
      ),

    pin: z
      .string()
      .min(1, "PIN is required")
      .length(6, "PIN must be exactly 6 digits")
      .regex(/^\d{6}$/, "PIN must contain only numbers")
      .refine((pin) => {
        // Check if PIN is not all the same digit
        return !/^(.)\1{5}$/.test(pin);
      }, "PIN cannot be all the same digit")
      .refine((pin) => {
        // Check for common weak PINs
        const weakPins = [
          "123456",
          "000000",
          "111111",
          "222222",
          "333333",
          "444444",
          "555555",
          "666666",
          "777777",
          "888888",
          "999999",
          "012345",
          "654321",
        ];
        return !weakPins.includes(pin);
      }, "Please choose a more secure PIN"),

    confirmPin: z
      .string()
      .min(1, "Please confirm your PIN")
      .length(6, "PIN confirmation must be exactly 6 digits")
      .regex(/^\d{6}$/, "PIN confirmation must contain only numbers"),
  })
  .refine((data) => data.pin === data.confirmPin, {
    message: "PINs do not match",
    path: ["confirmPin"],
  });

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
