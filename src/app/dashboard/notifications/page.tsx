"use client";

import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  Clock3,
  ShieldCheck,
  TrendingUp,
  Newspaper,
  Settings,
  Trash2,
  Search,
  SlidersHorizontal,
  Info,
  AlertTriangle,
  CircleDollarSign,
  X,
} from "lucide-react";

type NotificationType =
  "Trading" | "Portfolio" | "Security" | "Market" | "System";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  date: string;
  unread: boolean;
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Order executed successfully",
    message:
      "Your sample buy order for 10 shares of Reliance Industries has been marked as completed.",
    type: "Trading",
    time: "10:24 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 2,
    title: "Portfolio performance update",
    message:
      "Your sample portfolio value has increased by 2.4% compared with the previous session.",
    type: "Portfolio",
    time: "09:45 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 3,
    title: "Market opening update",
    message:
      "The Indian market session has started. Explore the Markets section for sample index information.",
    type: "Market",
    time: "09:15 AM",
    date: "Today",
    unread: true,
  },
  {
    id: 4,
    title: "Security reminder",
    message:
      "Keep your account secure. Never share your password or OTP with anyone.",
    type: "Security",
    time: "Yesterday",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    title: "Watchlist price alert",
    message: "Tata Motors has been added to your sample watchlist alerts.",
    type: "Portfolio",
    time: "04:30 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    title: "New learning content available",
    message:
      "Explore educational content to understand market trends, investing basics and risk management.",
    type: "System",
    time: "02:15 PM",
    date: "Yesterday",
    unread: false,
  },
  {
    id: 7,
    title: "Withdrawal request update",
    message: "Your sample withdrawal request is currently shown as pending.",
    type: "Trading",
    time: "11:20 AM",
    date: "02 Oct 2026",
    unread: false,
  },
  {
    id: 8,
    title: "Platform announcement",
    message:
      "AITradeX is designed to help users explore market information and learn about investment decisions.",
    type: "System",
    time: "09:00 AM",
    date: "01 Oct 2026",
    unread: false,
  },
];

const filters = [
  "All",
  "Trading",
  "Portfolio",
  "Security",
  "Market",
  "System",
] as const;

type FilterType = (typeof filters)[number];

function getNotificationIcon(type: NotificationType) {
  switch (type) {
    case "Trading":
      return <CircleDollarSign size={19} />;
    case "Portfolio":
      return <TrendingUp size={19} />;
    case "Security":
      return <ShieldCheck size={19} />;
    case "Market":
      return <Newspaper size={19} />;
    default:
      return <Info size={19} />;
  }
}

function getNotificationColor(type: NotificationType) {
  switch (type) {
    case "Trading":
      return "bg-emerald-50 text-emerald-600";
    case "Portfolio":
      return "bg-blue-50 text-blue-600";
    case "Security":
      return "bg-amber-50 text-amber-600";
    case "Market":
      return "bg-purple-50 text-purple-600";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [search, setSearch] = useState("");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notice, setNotice] = useState("");

  const unreadCount = notifications.filter((item) => item.unread).length;

  const todayCount = notifications.filter(
    (item) => item.date === "Today",
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    const searchTerm = search.trim().toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm) ||
      item.message.toLowerCase().includes(searchTerm);

    const matchesCategory =
      activeFilter === "All" || item.type === activeFilter;

    const matchesUnread = !showUnreadOnly || item.unread;

    return matchesSearch && matchesCategory && matchesUnread;
  });

  const groupedNotifications = filteredNotifications.reduce<
    Record<string, NotificationItem[]>
  >((groups, notification) => {
    if (!groups[notification.date]) {
      groups[notification.date] = [];
    }

    groups[notification.date].push(notification);
    return groups;
  }, {});

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((item) =>
        item.id === id ? { ...item, unread: false } : item,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((item) => ({ ...item, unread: false })),
    );
    setNotice("All notifications marked as read.");
  };

  const deleteNotification = (id: number) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
    setNotice("Notification removed.");
  };

  const clearAllNotifications = () => {
    if (notifications.length === 0) return;

    setNotifications([]);
    setNotice("All notifications have been cleared.");
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-emerald-600">Notifications</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Bell size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Notifications
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Stay updated with your account and market activity.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <CheckCheck size={16} />
            Mark all read
          </button>

          <button
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 size={16} />
            Clear all
          </button>
        </div>
      </div>

      {/* Feedback Message */}
      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <div className="flex items-center gap-2">
            <Check size={17} />
            {notice}
          </div>
          <button onClick={() => setNotice("")} aria-label="Dismiss message">
            <X size={17} />
          </button>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Bell size={20} />
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
              Unread
            </span>
          </div>
          <p className="mt-4 text-sm text-slate-500">Unread notifications</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {unreadCount}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Settings size={20} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Total notifications</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {notifications.length}
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Clock3 size={20} />
          </div>
          <p className="mt-4 text-sm text-slate-500">Received today</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900">
            {todayCount}
          </h2>
        </div>
      </div>

      {/* Notification Controls */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-lg font-bold text-slate-900">Your activity</h2>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1 sm:w-64">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search notifications..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
                />
              </div>

              <button
                onClick={() => setShowUnreadOnly(!showUnreadOnly)}
                className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition ${
                  showUnreadOnly
                    ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                <SlidersHorizontal size={16} />
                Unread only
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
        {Object.entries(groupedNotifications).map(([date, items]) => (
          <section key={date}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-700">{date}</h3>
              <span className="text-xs text-slate-400">
                {items.length} notification
                {items.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`group flex gap-3 p-4 transition hover:bg-slate-50 sm:gap-4 sm:p-5 ${
                    index !== items.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  } ${item.unread ? "bg-emerald-50/30" : ""}`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getNotificationColor(
                      item.type,
                    )}`}
                  >
                    {getNotificationIcon(item.type)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h4>

                      {item.unread && (
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      )}

                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-1.5 text-sm leading-6 text-slate-500">
                      {item.message}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock3 size={13} />
                        {item.time}
                      </span>

                      <div className="flex items-center gap-3">
                        {item.unread && (
                          <button
                            onClick={() => markAsRead(item.id)}
                            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                          >
                            Mark as read
                          </button>
                        )}

                        <button
                          onClick={() => deleteNotification(item.id)}
                          aria-label={`Delete ${item.title}`}
                          className="rounded-lg p-1.5 text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="rounded-2xl border border-slate-100 bg-white px-5 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Bell size={25} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-900">
              No notifications found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {showUnreadOnly
                ? "You have no unread notifications matching these filters."
                : "Try changing your search or selecting another category."}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveFilter("All");
                setShowUnreadOnly(false);
              }}
              className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Information Note */}
      <div className="flex gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <div className="mt-0.5 text-blue-600">
          <AlertTriangle size={18} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-900">
            Demo notification centre
          </h4>
          <p className="mt-1 text-xs leading-5 text-blue-700">
            These notifications are sample data for the frontend. Read status
            and deletion changes are stored only in the current page state.
            Real-time notifications and persistent updates will be connected to
            the backend later.
          </p>
        </div>
      </div>
    </div>
  );
}
