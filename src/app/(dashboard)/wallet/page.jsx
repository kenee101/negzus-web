"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  WalletIcon,
  CreditCardIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  PlusIcon,
  BanknoteIcon,
} from "lucide-react";

export default function Wallet() {
  const [amount, setAmount] = useState("");
  const {
    isOpen: isTopUpOpen,
    onOpen: onTopUpOpen,
    onOpenChange: onTopUpOpenChange,
  } = useDisclosure();
  const {
    isOpen: isWithdrawOpen,
    onOpen: onWithdrawOpen,
    onOpenChange: onWithdrawOpenChange,
  } = useDisclosure();

  const quickAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Wallet
        </h1>
        <p className="text-gray-500">
          Manage your account balance and payments
        </p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-r from-green-900 to-green-500">
        <CardBody className="p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 mb-2">Available Balance</p>
              <p className="text-4xl font-bold">₦750,000.00</p>
            </div>
            <WalletIcon className="h-12 w-12 text-green-200" />
          </div>
          <div className="mt-6 flex space-x-4">
            <Button
              color="default"
              variant="solid"
              className="bg-white text-green-900 hover:bg-gray-100"
              startContent={<PlusIcon className="w-4 h-4" />}
              onPress={onTopUpOpen}
            >
              Top Up
            </Button>
            <Button
              variant="flat"
              className="border-white text-white hover:bg-white/10"
              startContent={<ArrowUpIcon className="w-4 h-4" />}
              onPress={onWithdrawOpen}
            >
              Withdraw
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-blue-50 p-3 rounded-lg mr-4">
              <CreditCardIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Auto Top-up
              </h3>
              <p className="text-sm text-gray-500">
                Automatically add funds when low
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-purple-50 p-3 rounded-lg mr-4">
              <BanknoteIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Payment Methods
              </h3>
              <p className="text-sm text-gray-500">
                Manage cards and bank accounts
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-green-50 p-3 rounded-lg mr-4">
              <ArrowDownIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Transaction History
              </h3>
              <p className="text-sm text-gray-500">
                View all wallet activities
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardBody>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              {
                type: "debit",
                description: "Fuel Order - Total Energies VI",
                amount: "₦16,250",
                date: "2024-08-20",
                time: "14:30",
              },
              {
                type: "credit",
                description: "Wallet Top-up - Bank Transfer",
                amount: "₦50,000",
                date: "2024-08-19",
                time: "09:15",
              },
              {
                type: "debit",
                description: "Fuel Order - Shell Lekki",
                amount: "₦28,000",
                date: "2024-08-18",
                time: "11:45",
              },
              {
                type: "debit",
                description: "Fuel Order - NNPC Ikoyi",
                amount: "₦18,900",
                date: "2024-08-15",
                time: "16:20",
              },
            ].map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-white/10"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === "credit"
                        ? "bg-green-50"
                        : "bg-red-50"
                    }`}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transaction.date} at {transaction.time}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-right ${
                    transaction.type === "credit"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <p className="font-semibold">
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Top-up Modal */}
      <Modal isOpen={isTopUpOpen} onOpenChange={onTopUpOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Top Up Wallet</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    startContent="₦"
                  />

                  <div>
                    <p className="text-sm font-medium text-black dark:text-white mb-2">
                      Quick amounts
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {quickAmounts.map((quickAmount) => (
                        <Button
                          key={quickAmount}
                          size="sm"
                          variant="bordered"
                          onPress={() => setAmount(quickAmount.toString())}
                        >
                          ₦{quickAmount.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm dark:text-white">
                      <strong>Payment methods:</strong> Bank transfer, Debit
                      card, USSD
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={onClose}>
                  Continue to Payment
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Withdraw Modal */}
      <Modal
        isOpen={isWithdrawOpen}
        onOpenChange={onWithdrawOpenChange}
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Withdraw Funds</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Available balance: <strong>₦25,500.00</strong>
                    </p>
                  </div>

                  <Input
                    type="number"
                    label="Amount"
                    placeholder="Enter amount to withdraw"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    startContent="₦"
                  />

                  <Input
                    label="Bank Account"
                    placeholder="Select bank account"
                    value="GTBank - 0123456789"
                    readOnly
                  />

                  <div className="bg-white/10 p-3 rounded-lg">
                    <p className="text-sm dark:text-white">
                      • Processing time: 1-2 business days
                      <br />
                      • Minimum withdrawal: ₦1,000
                      <br />• No withdrawal fees
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="success" onPress={onClose}>
                  Withdraw
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
