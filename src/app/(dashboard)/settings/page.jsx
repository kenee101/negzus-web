"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Input,
  Switch,
  Select,
  SelectItem,
  Avatar,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import {
  UserIcon,
  BellIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  MapPinIcon,
  PhoneIcon,
  MailIcon,
  CameraIcon,
} from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    address: "Victoria Island, Lagos",
    state: "Lagos",
    country: "Nigeria",
  });

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    priceAlerts: false,
    promotions: true,
    weeklyReports: true,
    smsNotifications: false,
  });

  const [preferences, setPreferences] = useState({
    currency: "NGN",
    language: "English",
    autoTopUp: false,
    autoTopUpAmount: "10000",
    defaultFuelType: "petrol",
  });

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const handleProfileUpdate = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationUpdate = (field, value) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceUpdate = (field, value) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center space-x-4 mb-6">
            <UserIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Profile Information
            </h2>
          </div>

          <div className="flex items-center space-x-6 mb-6">
            <div className="relative">
              <Avatar
                src=""
                size="lg"
                name={`${profile.firstName.at(0)}${profile.lastName.at(0)}`}
                className="w-20 h-20 bg-green-900"
              />
              <Button
                isIconOnly
                size="sm"
                className="absolute -bottom-1 -right-1 min-w-6 h-6 bg-green-900"
                color="primary"
              >
                <CameraIcon className="w-3 h-3" />
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-gray-500">{profile.email}</p>
              <Button
                size="sm"
                variant="light"
                color="success"
                className="mt-1 outline-none"
              >
                Change Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={profile.firstName}
              onChange={(e) => handleProfileUpdate("firstName", e.target.value)}
            />
            <Input
              label="Last Name"
              value={profile.lastName}
              onChange={(e) => handleProfileUpdate("lastName", e.target.value)}
            />
            <Input
              label="Email Address"
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileUpdate("email", e.target.value)}
              startContent={<MailIcon className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => handleProfileUpdate("phone", e.target.value)}
              startContent={<PhoneIcon className="w-4 h-4 text-gray-400" />}
            />
            <Input
              label="Address"
              value={profile.address}
              onChange={(e) => handleProfileUpdate("address", e.target.value)}
              startContent={<MapPinIcon className="w-4 h-4 text-gray-400" />}
            />
            <Select
              label="State"
              selectedKeys={[profile.state]}
              onSelectionChange={(keys) =>
                handleProfileUpdate("state", Array.from(keys)[0])
              }
            >
              <SelectItem key="Lagos">Lagos</SelectItem>
              <SelectItem key="Abuja">Abuja</SelectItem>
              <SelectItem key="Rivers">Rivers</SelectItem>
              <SelectItem key="Kano">Kano</SelectItem>
            </Select>
          </div>

          <div className="flex justify-end mt-6">
            <Button color="success" style={{ outline: "none" }}>
              Save Changes
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center space-x-4 mb-6">
            <BellIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Order Updates
                </p>
                <p className="text-sm text-gray-500">
                  Get notified about order status changes
                </p>
              </div>
              <Switch
                color="success"
                style={{ outline: "none" }}
                isSelected={notifications.orderUpdates}
                onValueChange={(value) =>
                  handleNotificationUpdate("orderUpdates", value)
                }
              />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Price Alerts
                </p>
                <p className="text-sm text-gray-500">
                  Alert when fuel prices change significantly
                </p>
              </div>
              <Switch
                color="success"
                style={{ outline: "none" }}
                isSelected={notifications.priceAlerts}
                onValueChange={(value) =>
                  handleNotificationUpdate("priceAlerts", value)
                }
              />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Promotions & Offers
                </p>
                <p className="text-sm text-gray-500">
                  Receive promotional offers and discounts
                </p>
              </div>
              <Switch
                color="success"
                style={{ outline: "none" }}
                isSelected={notifications.promotions}
                onValueChange={(value) =>
                  handleNotificationUpdate("promotions", value)
                }
              />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  Weekly Reports
                </p>
                <p className="text-sm text-gray-500">
                  Summary of your fuel consumption and spending
                </p>
              </div>
              <Switch
                color="success"
                style={{ outline: "none" }}
                isSelected={notifications.weeklyReports}
                onValueChange={(value) =>
                  handleNotificationUpdate("weeklyReports", value)
                }
              />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  SMS Notifications
                </p>
                <p className="text-sm text-gray-500">
                  Receive notifications via SMS
                </p>
              </div>
              <Switch
                color="success"
                style={{ outline: "none" }}
                isSelected={notifications.smsNotifications}
                onValueChange={(value) =>
                  handleNotificationUpdate("smsNotifications", value)
                }
              />
            </div>
          </div>
        </CardBody>
      </Card>

      {/* App Preferences */}
      <Card>
        <CardBody>
          <div className="flex items-center space-x-4 mb-6">
            <CreditCardIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              App Preferences
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Select
              label="Currency"
              selectedKeys={[preferences.currency]}
              onSelectionChange={(keys) =>
                handlePreferenceUpdate("currency", Array.from(keys)[0])
              }
            >
              <SelectItem key="NGN">Nigerian Naira (₦)</SelectItem>
              <SelectItem key="USD">US Dollar ($)</SelectItem>
            </Select>

            <Select
              label="Language"
              selectedKeys={[preferences.language]}
              onSelectionChange={(keys) =>
                handlePreferenceUpdate("language", Array.from(keys)[0])
              }
            >
              <SelectItem key="English">English</SelectItem>
              <SelectItem key="Yoruba">Yoruba</SelectItem>
              <SelectItem key="Hausa">Hausa</SelectItem>
              <SelectItem key="Igbo">Igbo</SelectItem>
            </Select>

            <Select
              label="Default Fuel Type"
              selectedKeys={[preferences.defaultFuelType]}
              onSelectionChange={(keys) =>
                handlePreferenceUpdate("defaultFuelType", Array.from(keys)[0])
              }
            >
              <SelectItem key="petrol">Petrol (PMS)</SelectItem>
              <SelectItem key="diesel">Diesel (AGO)</SelectItem>
              <SelectItem key="gas">Cooking Gas (LPG)</SelectItem>
            </Select>

            <Input
              label="Auto Top-up Amount"
              type="number"
              value={preferences.autoTopUpAmount}
              onChange={(e) =>
                handlePreferenceUpdate("autoTopUpAmount", e.target.value)
              }
              startContent="₦"
              isDisabled={!preferences.autoTopUp}
            />
          </div>

          <Divider className="my-6" />

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Auto Top-up
              </p>
              <p className="text-sm text-gray-500">
                Automatically add funds when balance is low
              </p>
            </div>
            <Switch
              isSelected={preferences.autoTopUp}
              style={{ outline: "none" }}
              color="success"
              onValueChange={(value) =>
                handlePreferenceUpdate("autoTopUp", value)
              }
            />
          </div>
        </CardBody>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardBody>
          <div className="flex items-center space-x-4 mb-6">
            <ShieldCheckIcon className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Security
            </h2>
          </div>

          <div className="space-y-4">
            <Button
              variant="flat"
              className="w-full justify-start outline-none"
            >
              Change Password
            </Button>
            <Button
              variant="flat"
              className="w-full justify-start outline-none"
            >
              Two-Factor Authentication
            </Button>
            <Button
              variant="flat"
              className="w-full justify-start outline-none"
            >
              Login Sessions
            </Button>
            <Button
              variant="flat"
              className="w-full justify-start outline-none"
            >
              Download Data
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Danger Zone */}
      <Card>
        <CardBody>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Danger Zone
            </h2>
            <p className="text-sm text-gray-500">
              Irreversible and destructive actions
            </p>
          </div>

          <Button
            color="danger"
            style={{ outline: "none" }}
            variant="flat"
            onPress={onDeleteOpen}
          >
            Delete Account
          </Button>
        </CardBody>
      </Card>

      {/* Delete Account Modal */}
      <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-gray-900 dark:text-gray-100">
                Delete Account
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <p className="text-gray-500">
                    Are you sure you want to delete your account? This action
                    cannot be undone and will:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-500">
                    <li>Permanently delete your profile and data</li>
                    <li>Cancel all active orders</li>
                    <li>Forfeit any remaining wallet balance</li>
                    <li>Remove access to your order history</li>
                  </ul>
                  <Input
                    label='Type "DELETE" to confirm'
                    placeholder="DELETE"
                    variant="flat"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="danger" onPress={onClose}>
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
