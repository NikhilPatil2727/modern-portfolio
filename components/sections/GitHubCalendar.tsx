"use client";

import { useEffect, useState } from "react";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

type ContributionDay = {
  date: string;
  count: number;
  level: number;
  monthName?: string;
};

type ApiResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export default function GitHubCalendar() {
  const [weeks, setWeeks] = useState<(ContributionDay & { monthName: string })[][] | null>(null);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/NikhilPatil2727")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch contribution data");
        }
        return res.json();
      })
      .then((data: ApiResponse) => {
        // Compute total contributions
        let sum = 0;
        if (data.total) {
          for (const key in data.total) {
            if (Object.prototype.hasOwnProperty.call(data.total, key)) {
              sum += Number(data.total[key]) || 0;
            }
          }
        }
        setTotalContributions(sum);

        let rawContributions = data.contributions || [];

        // Filter out future dates (since the API returns placeholders for the entire current year)
        const today = new Date();
        const yToday = today.getFullYear();
        const mToday = String(today.getMonth() + 1).padStart(2, "0");
        const dToday = String(today.getDate()).padStart(2, "0");
        const todayStr = `${yToday}-${mToday}-${dToday}`;

        rawContributions = rawContributions.filter((c: any) => c.date <= todayStr);

        // Sort contributions ascending so the latest date is at the end
        rawContributions.sort((a: any, b: any) => a.date.localeCompare(b.date));
        
        const lastIndex = rawContributions.length - 1;
        if (lastIndex < 0) {
          setLoading(false);
          return;
        }

        // Align graph to 53 weeks (Sunday to Saturday) ending at the last day's week
        const lastDateStr = rawContributions[lastIndex].date;
        const parts = lastDateStr.split("-");
        const lastDate = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        const lastDayOfWeek = lastDate.getDay(); // 0: Sunday, 6: Saturday

        const totalDaysNeeded = 53 * 7;

        // Find Saturday of the last week
        const endDate = new Date(lastDate);
        endDate.setDate(lastDate.getDate() + (6 - lastDayOfWeek));

        // Find Sunday of the first week
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - totalDaysNeeded + 1);

        // Map data by date string
        const contribMap: Record<string, ContributionDay> = {};
        rawContributions.forEach((c: any) => {
          contribMap[c.date] = c;
        });

        // Populate 53 weeks
        const weeksData: (ContributionDay & { monthName: string })[][] = [];
        let currentDate = new Date(startDate);

        for (let w = 0; w < 53; w++) {
          const week: (ContributionDay & { monthName: string })[] = [];
          for (let d = 0; d < 7; d++) {
            const y = currentDate.getFullYear();
            const m = String(currentDate.getMonth() + 1).padStart(2, "0");
            const dayNum = String(currentDate.getDate()).padStart(2, "0");
            const dateStr = `${y}-${m}-${dayNum}`;
            const dayData = contribMap[dateStr] || { date: dateStr, count: 0, level: 0 };

            week.push({
              ...dayData,
              monthName: currentDate.toLocaleDateString("en-US", { month: "short" }),
            });
            currentDate.setDate(currentDate.getDate() + 1);
          }
          weeksData.push(week);
        }

        setWeeks(weeksData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load contributions history.");
        setLoading(false);
      });
  }, []);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0:
        return "bg-gray-100 dark:bg-zinc-800/80 border border-black/[0.03] dark:border-white/[0.02]";
      case 1:
        return "bg-[#c6f6d5] dark:bg-[#0e4429]";
      case 2:
        return "bg-[#9ae6b4] dark:bg-[#006d32]";
      case 3:
        return "bg-[#48bb78] dark:bg-[#26a641]";
      case 4:
        return "bg-[#2f855a] dark:bg-[#39d353]";
      default:
        return "bg-gray-100 dark:bg-zinc-800/80";
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10">
          <div className="space-y-3 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              GitHub Contributions
            </h2>
          </div>
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 dark:border-white/15 dark:bg-white/[0.02] animate-pulse">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 bg-gray-200 dark:bg-zinc-800 rounded-full" />
              <div className="h-5 w-48 bg-gray-200 dark:bg-zinc-800 rounded" />
            </div>
            <div className="h-32 bg-gray-100 dark:bg-zinc-900/30 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !weeks) {
    return null; // Fallback silently if it fails to load, or show a simple placeholder
  }

  // Pre-calculate month labels
  let lastMonthName = "";
  const weeksWithLabels = weeks.map((week, index) => {
    const monthName = week[0]?.monthName || "";
    let label = "";
    if (monthName !== lastMonthName) {
      label = monthName;
      lastMonthName = monthName;
    }
    return { week, label };
  });

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-10">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            GitHub Contributions
          </h2>
        </div>

        <TooltipProvider>
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 dark:border-white/15 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
              <Github className="h-5 w-5" />
              <span className="font-semibold text-base sm:text-lg">
                Total Contributions: {totalContributions.toLocaleString()}
              </span>
            </div>

            <div className="overflow-x-auto pb-2 -mx-2 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-start min-w-[670px] py-2">
                {/* Day labels column */}
                <div className="grid grid-rows-7 gap-[3px] pr-2 pt-[20px] text-[10px] text-gray-400 dark:text-gray-500 w-8 select-none font-medium">
                  <div className="h-[10px] flex items-center leading-none" />
                  <div className="h-[10px] flex items-center leading-none">Mon</div>
                  <div className="h-[10px] flex items-center leading-none" />
                  <div className="h-[10px] flex items-center leading-none">Wed</div>
                  <div className="h-[10px] flex items-center leading-none" />
                  <div className="h-[10px] flex items-center leading-none">Fri</div>
                  <div className="h-[10px] flex items-center leading-none" />
                </div>

                {/* Weeks grid */}
                <div className="flex gap-[3px]">
                  {weeksWithLabels.map(({ week, label }, weekIndex) => (
                    <div key={weekIndex} className="relative flex flex-col gap-[3px] pt-[20px]">
                      {label && (
                        <div className="absolute top-0 left-0 text-[10px] text-gray-400 dark:text-gray-500 font-medium select-none whitespace-nowrap">
                          {label}
                        </div>
                      )}
                      {week.map((day) => {
                        const formattedDate = new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        });
                        const tooltipContent = `${day.count} contributions on ${formattedDate}`;

                        return (
                          <Tooltip key={day.date}>
                            <TooltipTrigger asChild>
                              <div
                                className={cn(
                                  "w-[10px] h-[10px] rounded-[2px] transition-colors duration-150 cursor-pointer",
                                  getLevelColor(day.level)
                                )}
                              />
                            </TooltipTrigger>
                            <TooltipContent className="text-[11px] py-1 px-2 font-medium">
                              {tooltipContent}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-start gap-1.5 mt-4 text-[10px] text-gray-400 dark:text-gray-500 select-none">
              <span>Less</span>
              <div className={cn("w-[10px] h-[10px] rounded-[2px]", getLevelColor(0))} />
              <div className={cn("w-[10px] h-[10px] rounded-[2px]", getLevelColor(1))} />
              <div className={cn("w-[10px] h-[10px] rounded-[2px]", getLevelColor(2))} />
              <div className={cn("w-[10px] h-[10px] rounded-[2px]", getLevelColor(3))} />
              <div className={cn("w-[10px] h-[10px] rounded-[2px]", getLevelColor(4))} />
              <span>More</span>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
}
