import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  ExternalLink,
} from "lucide-react";

const recentOrders = [
  {
    stock: "Tata Motors",
    symbol: "TATAMOTORS",
    type: "BUY",
    quantity: 12,
    price: "₹985.40",
    status: "Completed",
    date: "Today, 10:42 AM",
  },
  {
    stock: "HDFC Bank",
    symbol: "HDFCBANK",
    type: "BUY",
    quantity: 8,
    price: "₹1,742.25",
    status: "Completed",
    date: "Yesterday, 02:18 PM",
  },
  {
    stock: "Infosys",
    symbol: "INFY",
    type: "SELL",
    quantity: 5,
    price: "₹1,586.80",
    status: "Pending",
    date: "Yesterday, 11:05 AM",
  },
];

export default function RecentOrders() {
  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
              <Clock3 size={18} />
            </div>

            <h2 className="text-lg font-bold text-[#17231d]">Recent Orders</h2>
          </div>

          <p className="mt-1 text-sm text-[#718078]">
            Review your latest buying and selling activity.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-fit items-center gap-1 text-sm font-semibold text-[#00a878] transition hover:text-[#00865f]"
        >
          View all
          <ExternalLink size={14} />
        </button>
      </div>

      <div className="scrollbar-hidden mt-5 overflow-x-auto">
        <table className="w-full min-w-155 border-collapse text-left">
          <thead>
            <tr className="border-b border-[#edf1ee] text-xs uppercase tracking-wide text-[#8a9890]">
              <th className="pb-3 pr-4 font-semibold">Stock</th>
              <th className="pb-3 pr-4 font-semibold">Type</th>
              <th className="pb-3 pr-4 font-semibold">Quantity</th>
              <th className="pb-3 pr-4 font-semibold">Price</th>
              <th className="pb-3 pr-4 font-semibold">Status</th>
              <th className="pb-3 font-semibold">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#edf1ee]">
            {recentOrders.map((order) => (
              <tr key={`${order.symbol}-${order.date}`}>
                <td className="py-4 pr-4">
                  <div>
                    <p className="text-sm font-semibold text-[#17231d]">
                      {order.stock}
                    </p>

                    <p className="mt-0.5 text-xs text-[#8a9890]">
                      {order.symbol}
                    </p>
                  </div>
                </td>

                <td className="py-4 pr-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.type === "BUY"
                        ? "bg-[#e9f8f2] text-[#00a878]"
                        : "bg-[#fff0f0] text-[#d94c4c]"
                    }`}
                  >
                    {order.type === "BUY" ? (
                      <ArrowUpRight size={13} />
                    ) : (
                      <ArrowDownRight size={13} />
                    )}

                    {order.type}
                  </span>
                </td>

                <td className="py-4 pr-4 text-sm text-[#53645a]">
                  {order.quantity}
                </td>

                <td className="py-4 pr-4 text-sm font-semibold text-[#17231d]">
                  {order.price}
                </td>

                <td className="py-4 pr-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-[#e9f8f2] text-[#00a878]"
                        : "bg-[#fff7e6] text-[#b7791f]"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="py-4 text-xs text-[#8a9890]">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
