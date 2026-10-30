import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const watchlist = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: "$227.16",
    change: "+1.24%",
    positive: true,
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    price: "$431.52",
    change: "+0.86%",
    positive: true,
  },
  {
    name: "NVIDIA",
    symbol: "NVDA",
    price: "$139.91",
    change: "-0.42%",
    positive: false,
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    price: "$248.98",
    change: "+2.18%",
    positive: true,
  },
];

export default function Watchlist() {
  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
              <Eye size={18} />
            </div>

            <h2 className="text-lg font-bold text-[#17231d]">My Watchlist</h2>
          </div>

          <p className="mt-1 text-sm text-[#718078]">
            Keep an eye on your preferred stocks.
          </p>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-[#718078] transition hover:bg-[#f1f5f2] hover:text-[#17231d]"
          aria-label="More watchlist options"
        >
          <MoreHorizontal size={19} />
        </button>
      </div>

      <div className="mt-5 divide-y divide-[#edf1ee]">
        {watchlist.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f1f5f2] text-xs font-bold text-[#53645a]">
                {stock.symbol.slice(0, 2)}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-[#17231d]">
                  {stock.name}
                </p>

                <p className="mt-0.5 text-xs text-[#8a9890]">{stock.symbol}</p>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-sm font-semibold text-[#17231d]">
                {stock.price}
              </p>

              <p
                className={`mt-0.5 inline-flex items-center gap-1 text-xs font-semibold ${
                  stock.positive ? "text-[#00a878]" : "text-[#d94c4c]"
                }`}
              >
                {stock.positive ? (
                  <ArrowUpRight size={13} />
                ) : (
                  <ArrowDownRight size={13} />
                )}

                {stock.change}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
