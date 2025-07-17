import { type NextRequest, NextResponse } from "next/server";

import { config } from "@/config";

interface StatInput {
  /**
   * @default 'month'
   */
  periodicity?: "day" | "month" | "week" | "year";

  /**
   * Nombre de jours/semaine/mois/années.
   *
   * @default Infinity
   */
  since?: number;
}

interface Stat {
  date: Date;
  /**
   * Valeur numérique de la stat demandée.
   * Mesure de la KPI.
   */
  value: number;
}

type StatOutput = {
  description?: string;
  stats: Stat[];
};

// Matomo API response types

type MatomomResponse = Record<string, number[] | number>;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const since: StatInput["since"] = searchParams.get("since") ? parseInt(searchParams.get("since")!) : Infinity;
  const periodicity: StatInput["periodicity"] =
    (searchParams.get("periodicity") as "day" | "month" | "week" | "year") || "month";

  // Calculate date range for Matomo API
  let dateRange: string;

  if (since === Infinity) {
    dateRange = "2024-01-01,today";
  } else {
    const today = new Date();
    const startDate = new Date(today);

    switch (periodicity) {
      case "day":
        startDate.setDate(today.getDate() - since);
        break;
      case "week":
        startDate.setDate(today.getDate() - since * 7);
        break;
      case "month":
        startDate.setMonth(today.getMonth() - since);
        break;
      case "year":
        startDate.setFullYear(today.getFullYear() - since);
        break;
    }

    const formatDate = (date: Date) => {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(
        2,
        "0",
      )}`;
    };

    dateRange = `${formatDate(startDate)},today`;
  }

  const matomoSearchParams = new URLSearchParams();
  matomoSearchParams.set("module", "API");
  matomoSearchParams.set("method", "Actions.get");
  matomoSearchParams.set("idSite", config.matomo.siteId);
  matomoSearchParams.set("format", "JSON");
  matomoSearchParams.set("period", periodicity);
  matomoSearchParams.set("date", dateRange);
  matomoSearchParams.set("segment", encodeURIComponent(`pageUrl=^https://pacoupa.ademe.fr/`));
  matomoSearchParams.set("showColumns", "nb_uniq_pageviews");

  const matomoUrl = `${config.matomo.url}/?${matomoSearchParams.toString()}`;

  try {
    const response = await fetch(matomoUrl, {
      next: {
        revalidate: 60 * 60 * 8, // 24 hours cache
      },
    });

    if (!response.ok) {
      throw new Error(`Matomo API error: ${response.status}`);
    }

    const data = (await response.json()) as MatomomResponse;

    // Transform Matomo response to our format
    const stats: StatOutput["stats"] = [];

    for (const [date, value] of Object.entries(data)) {
      stats.push({
        value: Array.isArray(value) ? value[0] || 0 : value,
        date: new Date(date),
      });
    }

    // Sort stats by date
    stats.sort((a, b) => a.date.getTime() - b.date.getTime());

    const result: StatOutput = {
      description: "Nombre de pages vues (uniques)",
      stats,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Matomo data:", error);

    const fallbackResult: StatOutput = {
      description: "Nombre de pages vues (uniques)",
      stats: [],
    };

    return NextResponse.json(fallbackResult, { status: 500 });
  }
}
