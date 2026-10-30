"use client";

import { useState } from "react";
import { BarChart3, ChevronDown } from "lucide-react";

const performanceData = {
  "1D": [42, 48, 45, 54, 50, 62, 58, 66, 61, 72, 68, 78],
  "1W": [35, 42, 39, 51, 48, 57, 53, 64, 61, 72, 69, 82],
  "1M": [28, 34, 31, 43, 39, 49, 46, 58, 55, 67, 63, 78],
  "1Y": [20, 28, 25, 37, 34, 45, 42, 55, 51, 65, 61, 80],
};

const periods = ["1D", "1W", "1M", "1Y"] as const;

type Period = (typeof periods)[number];

export default function PortfolioPerformance() {
  const [period, setPeriod] = useState<Period>("1M");

  const values = performanceData[period];

//   const points = values
//     .map((value, index) => {
//       const x = (index / (values.length - 1)) * 100;
//       const y = 100 - value;

//       return `${x},${y}`; 
//     })
//     .join(" ");





  return (
    <section className="rounded-2xl border border-[#e7ece9] bg-white p-5 shadow-[0_4px_18px_rgba(20,45,35,0.04)]">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9f8f2] text-[#00a878]">
              <BarChart3 size={18} />
            </div>

            <h2 className="text-lg font-bold text-[#17231d]">
              Portfolio Performance
            </h2>
          </div>

          <p className="mt-1 text-sm text-[#718078]">
            Track how your portfolio is performing over time.
          </p>
        </div>

        <div className="relative w-fit">
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value as Period)}
            className="appearance-none rounded-lg border border-[#dfe8e2] bg-[#fbfcfb] py-2 pl-3 pr-9 text-sm font-semibold text-[#53645a] outline-none transition focus:border-[#00a878] focus:ring-2 focus:ring-[#00a878]/10"
            aria-label="Select performance period"
          >
            {periods.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#718078]"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-xl bg-[#f7fbf9] p-4">
          <p className="text-sm font-medium text-[#718078]">Portfolio value</p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-[#17231d]">
            ₹1,24,580
          </p>

          <p className="mt-2 text-sm font-semibold text-[#00a878]">
            +₹2,450 · +1.98%
          </p>

          <p className="mt-4 text-xs leading-5 text-[#8a9890]">
            Your portfolio has shown positive movement during this selected
            period.
          </p>
        </div>

        <div className="min-w-0">
          <div className="flex h-48 items-end gap-2 rounded-xl border border-[#edf1ee] bg-[#fcfdfc] px-3 pb-3 pt-5">
            {values.map((value, index) => (
              <div
                key={`${period}-${index}`}
                className="flex h-full flex-1 items-end"
              >
                <div
                  className="w-full rounded-t-md bg-[#00a878]/80 transition-all duration-300 hover:bg-[#00a878]"
                  style={{ height: `${value}%` }}
                  title={`Performance point ${index + 1}: ${value}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex justify-between text-xs text-[#8a9890]">
            <span>Start</span>
            <span>{period} period</span>
            <span>Current</span>
          </div>
        </div>
      </div>
    </section>
  );
}


  
