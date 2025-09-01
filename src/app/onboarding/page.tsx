"use client";

import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { completeOnboarding } from "@/app/onboarding/_actions";
import { useState, useEffect } from "react";
import {
  onboardingSchema,
  type OnboardingFormData,
} from "@/lib/validations/onboarding";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { DatePicker, Spinner } from "@heroui/react";
import {
  // parseDate,
  getLocalTimeZone,
  today,
  DateValue,
} from "@internationalized/date";
// import Spinner from "@/components/Spinner";
import { ArrowRight } from "lucide-react";

interface FormErrors {
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  occupation?: string;
  address?: string;
  city?: string;
  state?: string;
  pin?: string;
  confirmPin?: string;
  general?: string;
}

export default function OnboardingComponent() {
  const maxDate = today(getLocalTimeZone()).subtract({ years: 18 });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<DateValue | null>(null);
  const [gender, setGender] = useState<"male" | "female" | "prefer-not-to-say">(
    "male"
  );
  const [occupation, setOccupation] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  // Reset submitting state when component unmounts or errors change
  useEffect(() => {
    return () => {
      setIsSubmitting(false);
    };
  }, []);

  // Reset submitting state when errors change
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
    }
  }, [errors]);

  const validateForm = (formData: FormData): FormErrors => {
    try {
      const data: OnboardingFormData = {
        phoneNumber: formData.get("phoneNumber") as string,
        dateOfBirth: formData.get("dateOfBirth") as unknown as Date,
        gender: formData.get("gender") as
          | "male"
          | "female"
          | "prefer-not-to-say",
        occupation: formData.get("occupation") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        pin: formData.get("pin") as string,
        confirmPin: formData.get("confirmPin") as string,
      };

      onboardingSchema.parse(data);
      // console.log(data);
      return {};
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        const formErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as keyof FormErrors;
          formErrors[path] = err.message;
        });
        return formErrors;
      }
      return { general: "Validation failed" };
    }
  };

  // const handleSubmit = async (formData: FormData) => {
  //   setErrors({});
  //   setIsSubmitting(true);

  //   try {
  //     // Client-side validation
  //     const validationErrors = validateForm(formData);

  //     if (Object.keys(validationErrors).length > 0) {
  //       setErrors(validationErrors);
  //       setIsSubmitting(false);
  //       // Scroll to first error
  //       const firstErrorField = Object.keys(validationErrors)[0];
  //       const element = document.getElementById(firstErrorField);
  //       if (element) {
  //         element.scrollIntoView({ behavior: "smooth", block: "center" });
  //         element.focus();
  //       }
  //       return;
  //     }

  //     const res = await completeOnboarding(formData);
  //     // console.log(res);

  //     if (res?.message) {
  //       await user?.reload();
  //       router.push("/dashboard");
  //     }

  //     if (res?.error) {
  //       setErrors({ general: res.error });
  //     }
  //   } catch (err) {
  //     console.error("Onboarding error:", err);
  //     setErrors({ general: "An unexpected error occurred. Please try again." });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Client-side validation
      const validationErrors = validateForm(new FormData(e.currentTarget));

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        // Scroll to first error
        const firstErrorField = Object.keys(validationErrors)[0];
        const element = document.getElementById(firstErrorField);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
        return;
      }

      const res = await completeOnboarding(new FormData(e.currentTarget));
      // console.log(res);

      if (res?.message) {
        await user?.reload();
        router.push("/dashboard");
      }

      if (res?.error) {
        setErrors({ general: res.error });
      }
    } catch (err) {
      console.error("Onboarding error:", err);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: keyof FormErrors) => {
    const baseClass = `w-full px-4 py-3 ${
      fieldName === "dateOfBirth" && "pb-0"
    } border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 group-hover:border-gray-600`;
    const errorClass =
      "border-red-500 focus:ring-red-500/50 focus:border-red-500";
    const normalClass =
      "border-gray-700 focus:ring-emerald-500/50 focus:border-emerald-500";

    return `${baseClass} ${errors[fieldName] ? errorClass : normalClass}`;
  };

  return (
    <div className="min-h-screen flex overflow-y-scroll no-scrollbar overflow-hidden">
      {/* Form Section */}
      <div className="flex-1 bg-black min-h-screen flex flex-col justify-center p-8 lg:p-4 lg:py-16 relative">
        <div className="relative z-10 max-w-md mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
                Complete Your Profile
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Just a few details to get you started on your fuel journey
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6" noValidate>
            {/* General Error */}
            {errors.general && (
              <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-red-400 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-red-400 text-sm font-medium">
                    {errors.general}
                  </p>
                </div>
              </div>
            )}

            {/* Phone Number and Date of Birth */}
            <div className="flex gap-y-4 md:gap-x-4 flex-col sm:flex-row">
              <div className="group flex-1">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPhoneNumber(e.target.value)
                    }
                    required
                    placeholder="+2348065924354"
                    className={getInputClassName("phoneNumber")}
                    aria-describedby={
                      errors.phoneNumber ? "phoneNumber-error" : undefined
                    }
                  />
                  {!errors.phoneNumber && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.phoneNumber && (
                  <p
                    id="phoneNumber-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="group flex flex-1">
                <div className="relative grow">
                  <DatePicker
                    isDisabled={isSubmitting}
                    name="dateOfBirth"
                    // defaultValue={dateOfBirth}
                    size="sm"
                    value={dateOfBirth}
                    onChange={(val) => setDateOfBirth(val)}
                    isRequired={true}
                    variant={"underlined"}
                    maxValue={maxDate}
                    calendarProps={{
                      classNames: {
                        base: "bg-gray-950 border border-gray-700 rounded-2xl shadow-lg no-scrollbar",
                        // header:
                        //   "bg-black p-2 text-white flex justify-between items-center",
                        headerWrapper:
                          "bg-black p-2 text-white flex justify-between items-center",
                        prevButton:
                          "text-white hover:bg-gray-700 rounded-full p-1",
                        nextButton:
                          "text-white hover:bg-gray-700 rounded-full p-1",
                        title: "font-semibold text-white",
                        gridHeader: "font-semibold text-gray-400 bg-black",
                        gridHeaderRow: "font-semibold rounded-full w-fit",
                        gridBody: "text-gray-300",
                        cell: "data-[selected=true]:bg-emerald-500 data-[selected=true]:text-white data-[today=true]:border-2 data-[today=true]:border-emerald-500 hover:bg-gray-700 rounded-full w-10 h-10 flex items-center justify-center",
                        pickerWrapper: "flex",
                        pickerMonthList:
                          "flex flex-col items-center snap-y snap-mandatory max-h-40 overflow-y-auto no-scrollbar",
                        pickerItem:
                          " outline-none cursor-pointer text-sm rounded-lg text-gray-200 hover:bg-gray-700 data-[selected=true]:bg-emerald-500 data-[selected=true]:text-white",
                        pickerYearList:
                          "flex flex-col items-center snap-y snap-mandatory max-h-40 overflow-y-auto no-scrollbar",
                        pickerHighlight: "bg-white/10 text-white rounded-md",
                      },
                    }}
                    classNames={{
                      base: `${getInputClassName("dateOfBirth")} mt-2`,
                      label: "text-emerald-400",
                    }}
                    showMonthAndYearPickers={true}
                    labelPlacement={"outside"}
                    className="max-w-[284px]"
                    label="Birth date"
                    aria-describedby={
                      errors.dateOfBirth ? "dateOfBirth-error" : undefined
                    }
                  />

                  {!errors.dateOfBirth && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.dateOfBirth && (
                  <p
                    id="dateOfBirth-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>
            </div>

            {/* Gender and Occupation */}
            <div className="flex gap-x-4">
              <div className="group flex-1">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="gender"
                >
                  Gender <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    id="gender"
                    // value={gender}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setGender(
                        e.target.value as
                          | "male"
                          | "female"
                          | "prefer-not-to-say"
                      )
                    }
                    required
                    defaultValue=""
                    className={`${getInputClassName(
                      "gender"
                    )} appearance-none cursor-pointer`}
                    aria-describedby={
                      errors.gender ? "gender-error" : undefined
                    }
                  >
                    <option
                      value=""
                      disabled
                      className="bg-black text-gray-500"
                    >
                      Select your gender
                    </option>
                    <option value="male" className="bg-black">
                      Male
                    </option>
                    <option value="female" className="bg-black">
                      Female
                    </option>
                    <option value="prefer-not-to-say" className="bg-black">
                      Prefer not to say
                    </option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {!errors.gender && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.gender && (
                  <p
                    id="gender-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.gender}
                  </p>
                )}
              </div>

              <div className="group flex-1">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="occupation"
                >
                  Occupation <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    value={occupation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOccupation(e.target.value)
                    }
                    required
                    placeholder="e.g., Engineer, Teacher"
                    className={getInputClassName("occupation")}
                    aria-describedby={
                      errors.occupation ? "occupation-error" : undefined
                    }
                  />
                  {!errors.occupation && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.occupation && (
                  <p
                    id="occupation-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.occupation}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <label
                className="block text-sm font-semibold text-emerald-400 mb-2"
                htmlFor="address"
              >
                Address <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAddress(e.target.value)
                  }
                  required
                  placeholder="Street address"
                  className={getInputClassName("address")}
                  aria-describedby={
                    errors.address ? "address-error" : undefined
                  }
                />
                {!errors.address && (
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}
              </div>
              {errors.address && (
                <p
                  id="address-error"
                  className="mt-1 text-sm text-red-400 flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.address}
                </p>
              )}
            </div>

            {/* City and State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="city"
                >
                  City <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                    required
                    placeholder="Lagos"
                    className={getInputClassName("city")}
                    aria-describedby={errors.city ? "city-error" : undefined}
                  />
                  {!errors.city && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.city && (
                  <p
                    id="city-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.city}
                  </p>
                )}
              </div>

              <div className="group">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="state"
                >
                  State <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState(e.target.value)
                    }
                    required
                    placeholder="Lagos"
                    className={getInputClassName("state")}
                    aria-describedby={errors.state ? "state-error" : undefined}
                  />
                  {!errors.state && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.state && (
                  <p
                    id="state-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.state}
                  </p>
                )}
              </div>
            </div>

            {/* PIN */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="pin"
                >
                  Transaction PIN <span className="text-red-400">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Create a secure 6-digit PIN for transactions
                </p>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    id="pin"
                    name="pin"
                    value={pin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setPin(e.target.value)
                    }
                    required
                    placeholder="••••••"
                    minLength={6}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className={`${getInputClassName("pin")} text-lg`}
                    aria-describedby={errors.pin ? "pin-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPin ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {!errors.pin && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.pin && (
                  <p
                    id="pin-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.pin}
                  </p>
                )}
              </div>

              {/* Confirm PIN */}
              <div className="group">
                <label
                  className="block text-sm font-semibold text-emerald-400 mb-2"
                  htmlFor="confirmPin"
                >
                  Confirm PIN <span className="text-red-400">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  Confirm your 6-digit PIN for transactions
                </p>
                <div className="relative">
                  <input
                    type={showConfirmPin ? "text" : "password"}
                    id="confirmPin"
                    name="confirmPin"
                    value={confirmPin}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setConfirmPin(e.target.value)
                    }
                    required
                    placeholder="••••••"
                    minLength={6}
                    maxLength={6}
                    pattern="[0-9]{6}"
                    className={`${getInputClassName("confirmPin")} text-lg`}
                    aria-describedby={
                      errors.confirmPin ? "confirmPin-error" : undefined
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPin(!showConfirmPin)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showConfirmPin ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {!errors.confirmPin && (
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  )}
                </div>
                {errors.confirmPin && (
                  <p
                    id="confirmPin-error"
                    className="mt-1 text-sm text-red-400 flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.confirmPin}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            {!isSubmitting ? (
              <button
                type="submit"
                // disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-emerald-900 to-cyan-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none group"
              >
                <div className="flex items-center justify-center">
                  <p>Submit</p>
                  <ArrowRight className="ml-2" />
                </div>
              </button>
            ) : (
              <div className="w-full p-4 flex items-center justify-center">
                <Spinner color="success" size="md" />
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Info Section */}
      <div className="hidden flex-1 md:p-10 bg-gray-950 min-h-screen md:flex flex-col items-center justify-center relative overflow-hidden px-8 lg:px-16">
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-cyan-100 bg-clip-text text-transparent">
              Never Run Out of
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Fuel Again
            </span>
          </h1>

          <p className="text-lg lg:text-lg text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Find the nearest gas stations, compare prices, check availability,
            and pay seamlessly with QR codes. Your fuel journey just got
            smarter.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 md:p-0 md:pb-2 lg:p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Find Stations
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Locate nearby gas stations with real-time availability
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Compare Prices
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Get the best fuel prices in your area instantly
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/30 transition-all duration-300 group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                QR Payments
              </h3>
              <p className="text-gray-400 text-center text-sm">
                Pay seamlessly with secure QR code transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
