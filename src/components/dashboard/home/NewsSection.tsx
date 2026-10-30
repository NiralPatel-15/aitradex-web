import { ArrowUpRight, ExternalLink, Newspaper } from "lucide-react";

const newsItems = [
  {
    category: "Market",
    title: "Indian markets continue to show positive momentum",
    summary:
      "Investors are closely watching banking, technology, and automobile stocks.",
    time: "15 min ago",
  },
  {
    category: "Technology",
    title: "Technology stocks remain in focus among investors",
    summary:
      "The technology sector continues to attract attention as market activity increases.",
    time: "32 min ago",
  },
  {
    category: "Business",
    title: "Companies prepare for the next earnings season",
    summary:
      "Investors are reviewing company performance and future growth expectations.",
    time: "1 hr ago",
  },
];

export default function NewsSection() {
  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-4 shadow-[0_4px_18px_rgba(20,45,35,0.04)] sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
            <Newspaper size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#17231d]">
              Latest Market News
            </h2>

            <p className="mt-0.5 text-xs text-[#718078]">
              Stay updated with important market developments.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#00a878] transition hover:text-[#00865f]"
        >
          View all
          <ExternalLink size={13} />
        </button>
      </div>

      {/* News Cards */}
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {newsItems.map((news) => (
          <article
            key={news.title}
            className="flex min-h-45 flex-col rounded-xl border border-[#edf1ee] bg-[#fcfdfc] p-3.5 transition-colors hover:border-[#cce8dc] hover:bg-[#f8fcf9]"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-[#e9f8f2] px-2.5 py-1 text-[10px] font-semibold text-[#00a878]">
                {news.category}
              </span>

              <span className="text-[10px] text-[#8a9890]">{news.time}</span>
            </div>

            <h3 className="mt-3 line-clamp-2 text-[13px] font-semibold leading-5 text-[#17231d]">
              {news.title}
            </h3>

            <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#718078]">
              {news.summary}
            </p>

            <div className="mt-auto pt-3">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#00a878] transition hover:text-[#00865f]"
              >
                Read more
                <ArrowUpRight size={13} />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Demo Notice */}
      <p className="mt-3 border-t border-[#edf1ee] pt-3 text-[10px] leading-4 text-[#929d96]">
        Illustrative news content. Live market news will be integrated through
        the backend.
      </p>
    </section>
  );
}
