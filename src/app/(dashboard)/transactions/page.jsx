"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
} from "@heroui/react";
import {
  SearchIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  // ArrowLeftRightIcon,
  DownloadCloudIcon,
} from "lucide-react";

const transactions = [
  {
    transaction_id: "TXN-2024-001",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - Total Energies VI",
    amount: 16250,
    date_and_time: "2024-08-20T14:30:00Z",
    status: "completed",
    reference: "ORD-096",
  },
  {
    transaction_id: "TXN-2024-005",
    type: "credit",
    category: "refund",
    description: "Order Refund - Cancelled Order",
    amount: 11250,
    date_and_time: "2024-08-12T10:30Z",
    status: "completed",
    reference: "REF-095",
  },
  {
    transaction_id: "TXN-2024-006",
    type: "credit",
    category: "withdrawal",
    description: "Funds withdrawal",
    amount: 13000,
    date_and_time: "2024-08-10T08:45Z",
    status: "failed",
    reference: "WTD-094",
  },
  {
    transaction_id: "TXN-2024-002",
    type: "credit",
    category: "top_up",
    description: "Wallet Top-up - Bank Transfer",
    amount: 50000,
    date_and_time: "2024-08-19T09:15Z",
    status: "completed",
    reference: "TOP-567",
  },
  {
    transaction_id: "TXN-2024-003",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - Shell Lekki",
    amount: 28000,
    date_and_time: "2024-08-18T11:45Z",
    status: "pending",
    reference: "ORD-097",
  },
  {
    transaction_id: "TXN-2024-004",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 18900,
    date_and_time: "2024-08-15T16:20Z",
    status: "completed",
    reference: "ORD-074",
  },
  {
    transaction_id: "TXN-2024-034",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 20000,
    date_and_time: "2024-07-15T16:20Z",
    status: "completed",
    reference: "ORD-025",
  },
  {
    transaction_id: "TXN-2024-056",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 25000,
    date_and_time: "2024-07-28T16:20Z",
    status: "completed",
    reference: "ORD-045",
  },
  {
    transaction_id: "TXN-2024-052",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 40900,
    date_and_time: "2024-07-24T16:20Z",
    status: "completed",
    reference: "ORD-067",
  },
  {
    transaction_id: "TXN-2024-076",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 50900,
    date_and_time: "2024-08-15T16:20Z",
    status: "completed",
    reference: "ORD-034",
  },
  {
    transaction_id: "TXN-2024-067",
    type: "debit",
    category: "fuel_order",
    description: "Fuel Order - NNPC Ikoyi",
    amount: 67900,
    date_and_time: "2024-07-20T16:20Z",
    status: "completed",
    reference: "ORD-057",
  },
];

const columns = [
  {
    key: "transaction_id",
    label: "TRANSACTION ID",
  },
  {
    key: "date_and_time",
    label: "DATE & TIME",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "category",
    label: "CATEGORY",
  },
  {
    key: "amount",
    label: "AMOUNT",
  },
  {
    key: "status",
    label: "STATUS",
  },
  {
    key: "reference",
    label: "REFERENCE",
  },
];

const rows = [{}];

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "success";
    case "pending":
      return "warning";
    case "failed":
      return "danger";
    default:
      return "default";
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "fuel_order":
      return "primary";
    case "top_up":
      return "success";
    case "refund":
      return "secondary";
    case "withdrawal":
      return "warning";
    default:
      return "default";
  }
};

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  // Calculate totals
  const totalCredits = transactions
    .filter((txn) => txn.type === "credit" && txn.status === "completed")
    .reduce((sum, txn) => sum + txn.amount, 0);

  const totalDebits = transactions
    .filter((txn) => txn.type === "debit" && txn.status === "completed")
    .reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Transaction History
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track all your wallet activities and payments
          </p>
        </div>
        <Button
          startContent={<DownloadCloudIcon className="w-4 h-4" />}
          variant="flat"
        >
          Export Statement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-green-50 p-3 rounded-lg mr-4">
              <ArrowDownIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Total Credits
              </p>
              <p className="text-2xl font-bold text-green-600">
                ₦{totalCredits.toLocaleString()}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-red-50 p-3 rounded-lg mr-4">
              <ArrowUpIcon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Total Debits
              </p>
              <p className="text-2xl font-bold text-red-600">
                ₦{totalDebits.toLocaleString()}
              </p>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody className="flex flex-row items-center p-6">
            <div className="bg-blue-50 p-3 rounded-lg mr-4">
              <div className="h-6 w-6 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-xs font-medium text-white">₦</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-100">
                Net Balance
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₦{(totalCredits - totalDebits).toLocaleString()}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              startContent={<SearchIcon className="w-4 h-4 text-gray-400" />}
              className="sm:max-w-xs"
            />
            <Select
              placeholder="Filter by type"
              selectedKeys={typeFilter !== "all" ? [typeFilter] : []}
              onSelectionChange={(keys) =>
                setTypeFilter(Array.from(keys)[0] || "all")
              }
              className="sm:max-w-xs"
            >
              <SelectItem key="all">All Types</SelectItem>
              <SelectItem key="credit">Credits</SelectItem>
              <SelectItem key="debit">Debits</SelectItem>
            </Select>
            <Select
              placeholder="Filter by status"
              selectedKeys={statusFilter !== "all" ? [statusFilter] : []}
              onSelectionChange={(keys) =>
                setStatusFilter(Array.from(keys)[0] || "all")
              }
              className="sm:max-w-xs"
            >
              <SelectItem key="all">All Status</SelectItem>
              <SelectItem key="completed">Completed</SelectItem>
              <SelectItem key="pending">Pending</SelectItem>
              <SelectItem key="failed">Failed</SelectItem>
            </Select>
          </div>
        </CardBody>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Transactions table">
            <TableHeader>
              <TableColumn>TRANSACTION ID</TableColumn>
              <TableColumn>DATE & TIME</TableColumn>
              <TableColumn>DESCRIPTION</TableColumn>
              <TableColumn>CATEGORY</TableColumn>
              <TableColumn>AMOUNT</TableColumn>
              <TableColumn>STATUS</TableColumn>
              <TableColumn>REFERENCE</TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedTransactions.map((txn) => (
                <TableRow key={txn.transaction_id}>
                  <TableCell>
                    <p className="font-medium text-gray-900 dark:text-gray-300">
                      {txn.transaction_id}
                    </p>
                  </TableCell>
                  <TableCell>
                    {/* <div> */}
                    <p className="text-gray-900 dark:text-gray-300">
                      {new Date(txn.date_and_time).toLocaleDateString()}
                    </p>
                    {/* <p className="text-sm text-gray-500">{txn.time}</p> */}
                    {/* </div> */}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`p-1 rounded-full ${
                          txn.type === "credit" ? "bg-green-50" : "bg-red-50"
                        }`}
                      >
                        {txn.type === "credit" ? (
                          <ArrowDownIcon className="h-3 w-3 text-green-800" />
                        ) : (
                          <ArrowUpIcon className="h-3 w-3 text-red-800" />
                        )}
                      </div>
                      <p className="text-gray-900 dark:text-gray-300">
                        {txn.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={getCategoryColor(txn.category)}
                      variant="flat"
                      size="sm"
                      className="capitalize"
                    >
                      {txn.category.replace("_", " ")}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <p
                      className={`font-semibold ${
                        txn.type === "credit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}₦
                      {txn.amount.toLocaleString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(txn.status)}
                      variant="flat"
                      size="sm"
                      className="capitalize"
                    >
                      {txn.status}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                      {txn.reference}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages > 1 && (
            <div className="flex justify-center py-4">
              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
