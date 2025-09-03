"use client";

import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Chip,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from "@heroui/react";
import {
  CheckCircle,
  X,
  Zap,
  Crown,
  Shield,
  Star,
  CreditCard,
} from "lucide-react";
import { useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import generateReference from "@/utils/generateReference";

const SubscriptionLink = dynamic(
  () => import("@/components/SubscriptionLink"),
  {
    ssr: false,
    loading: () => <Spinner color="success" />,
  }
);

const SubscriptionPlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { user } = useUser();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: 0,
      yearlyPrice: 0,
      subtitle: "Free Forever",
      description: "Perfect for occasional drivers",
      popular: false,
      features: [
        { name: "Find nearby stations", included: true },
        { name: "Basic availability info", included: true },
        { name: "Station directions", included: true },
        { name: "Basic price comparison", included: true },
        { name: "Community updates", included: true },
        { name: "Real-time updates", included: false },
        { name: "QR payments", included: false },
        { name: "Priority support", included: false },
        { name: "Advanced analytics", included: false },
      ],
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPlanCode: "PLN_gpmhdx1vb0vrzny",
      yearlyPlanCode: "PLN_levc0r8we1e6fzc",
      price: 1200,
      yearlyPrice: 12000,
      subtitle: "per month",
      description: "Best for regular drivers & ride-hail",
      popular: true,
      features: [
        { name: "Real-time fuel availability", included: true },
        { name: "Live price updates every 5 minutes", included: true },
        { name: "QR code payments", included: true },
        { name: "Priority customer support", included: true },
        { name: "Fuel alerts & notifications", included: true },
        { name: "Price trend analytics", included: true },
        { name: "Favorite stations", included: true },
        { name: "No ads experience", included: true },
        { name: "Fleet management tools", included: false },
      ],
    },
    {
      id: "business",
      name: "Business",
      monthlyPlanCode: "PLN_hgh6hc9qmvlh7om",
      yearlyPlanCode: "PLN_pb1uz8jbw4qt1it",
      price: 3000,
      yearlyPrice: 30000,
      subtitle: "per month",
      description: "For fleets & logistics companies",
      popular: false,
      features: [
        { name: "Everything in Premium", included: true },
        { name: "Fleet management dashboard", included: true },
        { name: "Bulk fuel purchase discounts", included: true },
        { name: "QR payments", included: true },
        { name: "Advanced reporting & analytics", included: true },
        { name: "Multiple vehicle tracking", included: true },
        { name: "Custom integration API", included: true },
        { name: "Dedicated account manager", included: true },
        { name: "Priority fuel reservations", included: true },
      ],
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDisplayPrice = (plan) => {
    if (plan.price === 0) return formatPrice(0);
    return formatPrice(plan.price);
  };

  const getTotalPrice = (plan) => {
    if (plan.price === 0) return formatPrice(0);
    return formatPrice(plan.yearlyPrice);
  };

  const getSavings = (plan) => {
    if (plan.price === 0) return formatPrice(0);
    return formatPrice(plan.price * 12 - plan.yearlyPrice);
  };

  const PlanCard = ({ plan }) => (
    <Card
      className={`relative h-full overflow-visible ${
        plan.popular
          ? "border-2 border-success shadow-lg scale-105"
          : "border border-gray-200"
      }`}
    >
      {plan.popular && (
        <Chip
          color="success"
          variant="solid"
          className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
          startContent={<Star className="w-4 h-4" />}
        >
          Most Popular
        </Chip>
      )}

      <CardBody className="p-6">
        <div className="text-center mb-6">
          <div className="mb-4">
            {plan.name === "Basic" && (
              <Shield className="w-12 h-12 mx-auto text-gray-600 dark:text-gray-400" />
            )}
            {plan.name === "Premium" && (
              <Zap className="w-12 h-12 mx-auto text-success" />
            )}
            {plan.name === "Business" && (
              <Crown className="w-12 h-12 mx-auto text-warning" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {plan.name}
          </h3>

          <div className="mb-4">
            <div className="flex items-baseline justify-center">
              <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {isYearly ? getTotalPrice(plan) : getDisplayPrice(plan)}
              </span>
              {plan.price > 0 && (
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  /{isYearly ? "year" : "month"}
                </span>
              )}
            </div>

            {plan.price === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {plan.subtitle}
              </p>
            ) : (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {plan.subtitle}
                </p>
                {isYearly && (
                  <div className="mt-2">
                    <Chip color="success" variant="flat" size="sm">
                      Save {getSavings(plan)} yearly
                    </Chip>
                  </div>
                )}
              </div>
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {plan.description}
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              {feature.included ? (
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={`text-sm ${
                  feature.included
                    ? "text-gray-700 dark:text-gray-100"
                    : "text-gray-400 dark:text-gray-500 line-through"
                }`}
              >
                {feature.name}
              </span>
            </div>
          ))}
        </div>

        <SubscriptionLink
          key={plan.id}
          plan={plan}
          isYearly={isYearly}
          text={plan.price === 0 ? "Get Started Free" : "Subscribe"}
          startContent={
            plan.price === 0 ? null : <CreditCard className="w-5 h-5" />
          }
        />

        {plan.price > 0 && (
          <p className="text-xs text-gray-500 text-center mt-3">
            Cancel anytime. No hidden fees.
          </p>
        )}
      </CardBody>
    </Card>
  );

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Get access to real-time fuel prices, availability, and premium
            features to make your fuel purchases smarter and more efficient.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span
              className={`text-sm font-medium ${
                !isYearly ? "text-gray-900 dark:text-gray-100" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <Switch
              isSelected={isYearly}
              onValueChange={setIsYearly}
              color="success"
              size="lg"
              label="Billing"
            />
            <span
              className={`text-sm font-medium ${
                isYearly ? "text-gray-900 dark:text-gray-100" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
            <Chip color="success" variant="flat" size="sm">
              Save up to 17%
            </Chip>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 p-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Testing purposes */}
        <button
          onClick={() => {
            console.log("Test subscription");
            window.open(
              `https://paystack.shop/pay/fo-iuxbkz0`,
              "_blank",
              "noopener,noreferrer"
            );
          }}
          className={`bg-[#035408] text-center outline-none border-[#96a197] px-8 py-2 rounded-full text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-4`}
        >
          Test subscription
        </button>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card>
              <CardBody className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Can I change my plan anytime?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time.
                  Changes take effect immediately, and we'll prorate any billing
                  differences.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  We accept all major payment methods through Paystack including
                  bank cards, bank transfers, and mobile money.
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardBody className="p-6">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our Basic plan is free forever! For Premium and Business
                  plans, you can start with our 7-day free trial to test all
                  features.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* Success Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-success" />
                    <span>Subscription Successful!</span>
                  </div>
                </ModalHeader>
                <ModalBody>
                  <p>
                    Welcome to {selectedPlan?.name}! Your subscription has been
                    activated and you now have access to all premium features.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Go to Dashboard
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
