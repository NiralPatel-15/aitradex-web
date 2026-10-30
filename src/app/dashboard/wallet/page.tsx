"use client";

import { useState } from "react";
import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpRight,
  ArrowUpLeft,
  Wallet as WalletIcon,
  Plus,
  Search,
  Download,
  CreditCard,
  IndianRupee,
  TrendingUp,
  Clock3,
  X,
  CheckCircle2,
  ArrowLeftRight,
} from "lucide-react";

type TransactionType = "Deposit" | "Withdrawal" | "Buy" | "Sell";

type Transaction = {
  id: string;
  title: string;
  description: string;
  type: TransactionType;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
};

const transactions: Transaction[] = [
  {
    id: "TXN-1001",
    title: "Money Added",
    description: "Bank transfer",
    type: "Deposit",
    amount: 10000,
    date: "04 Oct 2026, 10:30 AM",
    status: "Completed",
  },
  {
    id: "TXN-1002",
    title: "Reliance Industries",
    description: "Buy order",
    type: "Buy",
    amount: -29456,
    date: "03 Oct 2026, 02:15 PM",
    status: "Completed",
  },
  {
    id: "TXN-1003",
    title: "Money Withdrawn",
    description: "Bank withdrawal",
    type: "Withdrawal",
    amount: -5000,
    date: "02 Oct 2026, 11:45 AM",
    status: "Pending",
  },
  {
    id: "TXN-1004",
    title: "Tata Motors",
    description: "Sell order",
    type: "Sell",
    amount: 19708,
    date: "01 Oct 2026, 01:20 PM",
    status: "Completed",
  },
  {
    id: "TXN-1005",
    title: "Money Added",
    description: "UPI payment",
    type: "Deposit",
    amount: 15000,
    date: "29 Sep 2026, 09:10 AM",
    status: "Completed",
  },
  {
    id: "TXN-1006",
    title: "HDFC Bank",
    description: "Buy order",
    type: "Buy",
    amount: -8711.25,
    date: "27 Sep 2026, 12:40 PM",
    status: "Failed",
  },
  {
    id: "TXN-1007",
    title: "Infosys",
    description: "Sell order",
    type: "Sell",
    amount: 12500,
    date: "25 Sep 2026, 03:05 PM",
    status: "Completed",
  },
];

const filters = ["All", "Deposit", "Withdrawal", "Buy", "Sell"] as const;

type FilterType = (typeof filters)[number];

export default function WalletPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [modal, setModal] = useState<"deposit" | "withdraw" | null>(null);
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");

  const filteredTransactions = transactions.filter((transaction) => {
    const term = search.trim().toLowerCase();

    const matchesSearch =
      transaction.title.toLowerCase().includes(term) ||
      transaction.description.toLowerCase().includes(term) ||
      transaction.id.toLowerCase().includes(term);

    const matchesFilter = filter === "All" || transaction.type === filter;

    return matchesSearch && matchesFilter;
  });

  const formatCurrency = (value: number) =>
    `₹${Math.abs(value).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  const handleDemoAction = () => {
    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      setNotice("Please enter a valid amount.");
      return;
    }

    setNotice("This is a frontend demo. No real money has been transferred.");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-1 text-sm font-medium text-[#00a77d]">
            Account Management
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-[#172033] sm:text-3xl">
            My Wallet
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your funds and track your transactions.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setModal("deposit");
              setAmount("");
              setNotice("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#00c896] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#00b387]"
          >
            <Plus size={17} />
            Add Money
          </button>

          <button
            onClick={() => {
              setModal("withdraw");
              setAmount("");
              setNotice("");
            }}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowUpRight size={17} />
            Withdraw
          </button>
        </div>
      </div>

      {/* Wallet Balance */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-br  from-[#00c896] to-[#009f78] p-6 text-white shadow-sm sm:p-8">
          <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full border-35 border-white/10" />
          <div className="absolute -bottom-20 right-28 h-48 w-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm font-medium text-white/85">
              <WalletIcon size={18} />
              Total Wallet Balance
            </div>

            <div className="mt-5 flex items-center gap-2">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                ₹25,000.00
              </h2>
            </div>

            <p className="mt-2 text-sm text-white/75">
              Available funds in your AITradeX wallet
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-white/75">Wallet ID</p>
                <p className="mt-1 text-sm font-semibold">ATX-••••-2580</p>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-white/75">Account Status</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <CheckCircle2 size={14} />
                  Active
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <IndianRupee size={21} />
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                Available
              </span>
            </div>
            <p className="mt-5 text-sm text-slate-500">Available Balance</p>
            <h3 className="mt-1 text-2xl font-bold text-[#172033]">
              ₹25,000.00
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Ready to use in this demo
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <TrendingUp size={21} />
            </div>
            <p className="mt-5 text-sm text-slate-500">Invested Amount</p>
            <h3 className="mt-1 text-2xl font-bold text-[#172033]">
              ₹1,45,850.00
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Across your sample holdings
            </p>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Deposits</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ArrowDownLeft size={18} />
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-[#172033]">₹25,000</h3>
          <p className="mt-1 text-xs text-emerald-600">Money added</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Total Withdrawals</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-[#172033]">₹5,000</h3>
          <p className="mt-1 text-xs text-slate-400">Including pending</p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Pending Transactions</p>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock3 size={18} />
            </span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-[#172033]">1</h3>
          <p className="mt-1 text-xs text-amber-600">Awaiting confirmation</p>
        </div>
      </section>

      {/* Transactions */}
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-[#172033]">
              Transaction History
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review your recent wallet activity.
            </p>
          </div>

          <button
            onClick={() =>
              window.alert(
                "Transaction export will be available after backend integration.",
              )
            }
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Download size={16} />
            Export
          </button>
        </div>

        <div className="flex flex-col gap-3 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  filter === item
                    ? "bg-[#00c896] text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Transaction</th>
                <th className="px-5 py-4">Transaction ID</th>
                <th className="px-5 py-4">Date & Time</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          transaction.amount >= 0
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600"
                        }`}
                      >
                        {transaction.type === "Deposit" ? (
                          <ArrowDownLeft size={18} />
                        ) : transaction.type === "Withdrawal" ? (
                          <ArrowUpLeft size={18} />
                        ) : transaction.type === "Buy" ? (
                          <ArrowDownRight size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#172033]">
                          {transaction.title}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {transaction.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-600">
                    {transaction.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {transaction.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        transaction.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700"
                          : transaction.status === "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-rose-50 text-rose-700"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td
                    className={`px-5 py-4 text-right text-sm font-bold ${
                      transaction.amount >= 0
                        ? "text-emerald-600"
                        : "text-[#172033]"
                    }`}
                  >
                    {transaction.amount >= 0 ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <ArrowLeftRight
                      size={28}
                      className="mx-auto mb-2 text-slate-300"
                    />
                    <p className="text-sm font-semibold text-slate-600">
                      No transactions found
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Try changing your search or filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4 text-xs text-slate-400">
          Showing {filteredTransactions.length} of {transactions.length}{" "}
          transactions
        </div>
      </section>

      {/* Demo Disclaimer */}
      <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <CreditCard size={19} className="mt-0.5 shrink-0 text-blue-600" />
        <div>
          <p className="text-sm font-semibold text-blue-900">
            Wallet Demo Mode
          </p>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            All balances and transaction records on this page are illustrative
            frontend data. Deposit, withdrawal, and export actions are not
            connected to a payment gateway or backend. No real money is moved.
          </p>
        </div>
      </div>

      {/* Demo Deposit / Withdrawal Modal */}
      {modal && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onClick={() => setModal(null)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#172033]">
                  {modal === "deposit" ? "Add Money" : "Withdraw Money"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Demo interaction only
                </p>
              </div>

              <button
                onClick={() => setModal(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Enter Amount (₹)
              </label>
              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setNotice("");
                }}
                placeholder="e.g. 5000"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-semibold text-[#172033] outline-none focus:border-[#00c896] focus:ring-2 focus:ring-[#00c896]/10"
              />
            </div>

            {notice && (
              <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
                {notice}
              </p>
            )}

            <button
              onClick={handleDemoAction}
              className="mt-6 w-full rounded-xl bg-[#00c896] py-3 text-sm font-semibold text-white transition hover:bg-[#00b387]"
            >
              Continue Demo
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
              This action will not initiate an actual payment or withdrawal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
