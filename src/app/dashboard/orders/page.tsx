
"use client";

import {  useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Search,
  ShoppingCart,
  XCircle,
  Activity,
} from "lucide-react";

type OrderType = "Buy" | "Sell";
type OrderStatus = "Completed" | "Pending" | "Rejected" | "Cancelled";
type OrderFilter = "All" | "Buy" | "Sell";
type StatusFilter =
  | "All"
  | "Completed"
  | "Pending"
  | "Rejected"
  | "Cancelled";

interface Order {
  id: string;
  name: string;
  symbol: string;
  type: OrderType;
  quantity: number;
  price: number;
  status: OrderStatus;
  date: string;
  time: string;
}

const orders: Order[] = [
  {
    id: "ATX-1001",
    name: "Reliance Industries",
    symbol: "RELIANCE",
    type: "Buy",
    quantity: 10,
    price: 2945.6,
    status: "Completed",
    date: "04 Oct 2026",
    time: "10:24 AM",
  },
  {
    id: "ATX-1002",
    name: "Tata Motors",
    symbol: "TATAMOTORS",
    type: "Buy",
    quantity: 20,
    price: 985.4,
    status: "Completed",
    date: "04 Oct 2026",
    time: "10:42 AM",
  },
  {
    id: "ATX-1003",
    name: "HDFC Bank",
    symbol: "HDFCBANK",
    type: "Sell",
    quantity: 5,
    price: 1742.25,
    status: "Pending",
    date: "04 Oct 2026",
    time: "11:15 AM",
  },
  {
    id: "ATX-1004",
    name: "Infosys",
    symbol: "INFY",
    type: "Buy",
    quantity: 12,
    price: 1586.8,
    status: "Rejected",
    date: "03 Oct 2026",
    time: "02:35 PM",
  },
  {
    id: "ATX-1005",
    name: "ICICI Bank",
    symbol: "ICICIBANK",
    type: "Buy",
    quantity: 8,
    price: 1284.35,
    status: "Completed",
    date: "03 Oct 2026",
    time: "12:10 PM",
  },
  {
    id: "ATX-1006",
    name: "Wipro",
    symbol: "WIPRO",
    type: "Sell",
    quantity: 15,
    price: 482.65,
    status: "Cancelled",
    date: "02 Oct 2026",
    time: "03:20 PM",
  },
  {
    id: "ATX-1007",
    name: "TCS",
    symbol: "TCS",
    type: "Buy",
    quantity: 4,
    price: 3120.5,
    status: "Pending",
    date: "02 Oct 2026",
    time: "11:05 AM",
  },
  {
    id: "ATX-1008",
    name: "Bharti Airtel",
    symbol: "BHARTIARTL",
    type: "Sell",
    quantity: 6,
    price: 1925.3,
    status: "Completed",
    date: "01 Oct 2026",
    time: "01:45 PM",
  },
];

const formatCurrency = (value: number) =>
  value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [orderFilter, setOrderFilter] = useState<OrderFilter>("All");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  // Summary calculations
  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed",
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  const rejectedOrders = orders.filter(
    (order) => order.status === "Rejected" || order.status === "Cancelled",
  ).length;

  const completedValue = orders
    .filter((order) => order.status === "Completed")
    .reduce((sum, order) => sum + order.price * order.quantity, 0);

  // Search and filters
  // Search and filters
  const filteredOrders = orders.filter((order) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      order.name.toLowerCase().includes(searchTerm) ||
      order.symbol.toLowerCase().includes(searchTerm) ||
      order.id.toLowerCase().includes(searchTerm);

    const matchesType = orderFilter === "All" || order.type === orderFilter;

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case "Completed":
        return "bg-[#e9f8f2] text-[#00a878]";
      case "Pending":
        return "bg-[#fff7e8] text-[#c58b27]";
      case "Rejected":
        return "bg-[#fff0f0] text-[#d94c4c]";
      case "Cancelled":
        return "bg-[#f2f3f5] text-[#737b84]";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#00a878]">
            <Activity size={15} />
            Trading activity
          </div>

          <h1 className="mt-1 text-2xl font-bold text-[#17231d]">Orders</h1>

          <p className="mt-1 text-sm text-[#718078]">
            Track your buy and sell orders and monitor their status.
          </p>
        </div>

        <span className="w-fit rounded-lg border border-[#dcefe6] bg-[#f0fbf6] px-3 py-2 text-xs font-semibold text-[#00a878]">
          Sample order data
        </span>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Orders */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Total Orders</p>
            <ShoppingCart size={19} className="text-[#00a878]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#17231d]">
            {totalOrders}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">All placed orders</p>
        </div>

        {/* Completed */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Completed</p>
            <CheckCircle2 size={19} className="text-[#00a878]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#00a878]">
            {completedOrders}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">Successfully executed</p>
        </div>

        {/* Pending */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">Pending</p>
            <Clock3 size={19} className="text-[#c58b27]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#c58b27]">
            {pendingOrders}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">Awaiting execution</p>
        </div>

        {/* Rejected / Cancelled */}
        <div className="rounded-xl border border-[#e7ece9] bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-[#718078]">
              Rejected / Cancelled
            </p>
            <XCircle size={19} className="text-[#d94c4c]" />
          </div>

          <p className="mt-4 text-2xl font-bold text-[#d94c4c]">
            {rejectedOrders}
          </p>

          <p className="mt-2 text-xs text-[#929d96]">Unsuccessful orders</p>
        </div>
      </section>

      {/* Completed Order Value */}
      <section className="rounded-xl border border-[#dcefe6] bg-[#f0fbf6] p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-medium text-[#718078]">
              Total Completed Order Value
            </p>

            <p className="mt-2 text-2xl font-bold text-[#17231d]">
              {formatCurrency(completedValue)}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#00a878]">
            <CheckCircle2 size={16} />
            Executed orders only
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
        {/* Table Header */}
        <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Order History
            </h2>

            <p className="mt-1 text-xs text-[#718078]">
              View and manage your trading activity.
            </p>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#929d96]"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stock or order ID..."
              className="h-10 w-full rounded-xl border border-[#e7ece9] bg-[#fcfdfc] pl-9 pr-3 text-sm text-[#17231d] outline-none transition placeholder:text-[#a0aaa4] focus:border-[#00b887] sm:w-64"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mt-5 flex flex-col justify-between gap-3 border-b border-[#edf1ee] pb-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-2">
            {(["All", "Buy", "Sell"] as OrderFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setOrderFilter(item)}
                className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  orderFilter === item
                    ? "bg-[#e9f8f2] text-[#00a878]"
                    : "text-[#718078] hover:bg-[#f5f8f6]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as StatusFilter)
            }
            className="h-10 rounded-lg border border-[#e7ece9] bg-white px-3 text-xs font-medium text-[#53645a] outline-none focus:border-[#00b887]"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead>
              <tr className="border-b border-[#edf1ee] text-[11px] uppercase tracking-wide text-[#929d96]">
                <th className="pb-3 pr-4 font-semibold">Order ID</th>
                <th className="pb-3 pr-4 font-semibold">Stock</th>
                <th className="pb-3 pr-4 font-semibold">Type</th>
                <th className="pb-3 pr-4 font-semibold">Quantity</th>
                <th className="pb-3 pr-4 font-semibold">Order Price</th>
                <th className="pb-3 pr-4 font-semibold">Total Value</th>
                <th className="pb-3 pr-4 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date & Time</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#edf1ee]">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="transition hover:bg-[#fbfdfb]">
                  {/* Order ID */}
                  <td className="py-4 pr-4">
                    <p className="text-xs font-semibold text-[#17231d]">
                      {order.id}
                    </p>
                  </td>

                  {/* Stock */}
                  <td className="py-4 pr-4">
                    <p className="text-sm font-semibold text-[#17231d]">
                      {order.name}
                    </p>

                    <p className="mt-0.5 text-xs text-[#929d96]">
                      {order.symbol}
                    </p>
                  </td>

                  {/* Buy / Sell */}
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
                        order.type === "Buy"
                          ? "bg-[#e9f8f2] text-[#00a878]"
                          : "bg-[#fff0f0] text-[#d94c4c]"
                      }`}
                    >
                      {order.type === "Buy" ? (
                        <ArrowDownRight size={13} />
                      ) : (
                        <ArrowUpRight size={13} />
                      )}

                      {order.type}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="py-4 pr-4 text-sm text-[#53645a]">
                    {order.quantity}
                  </td>

                  {/* Order Price */}
                  <td className="py-4 pr-4 text-sm text-[#53645a]">
                    {formatCurrency(order.price)}
                  </td>

                  {/* Total Value */}
                  <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                    {formatCurrency(order.price * order.quantity)}
                  </td>

                  {/* Status */}
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${getStatusStyle(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Date and Time */}
                  <td className="py-4">
                    <p className="whitespace-nowrap text-xs font-medium text-[#53645a]">
                      {order.date}
                    </p>

                    <p className="mt-1 text-[11px] text-[#929d96]">
                      {order.time}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="py-12 text-center">
              <Search size={22} className="mx-auto text-[#929d96]" />

              <p className="mt-3 text-sm font-semibold text-[#17231d]">
                No orders found
              </p>

              <p className="mt-1 text-xs text-[#929d96]">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        <p className="mt-4 text-[11px] text-[#929d96]">
          All displayed orders and values are illustrative sample data.
        </p>
      </section>

      {/* Disclaimer */}
      <div className="rounded-xl border border-[#f0eadb] bg-[#fffdf7] p-3 text-xs leading-5 text-[#8a7a57]">
        Order history, prices and transaction statuses are sample values for
        frontend development. Actual orders will be loaded from your
        authenticated AITradeX account after backend integration.
      </div>
    </div>
  );
}
