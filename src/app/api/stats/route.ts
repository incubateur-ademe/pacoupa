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

type MatomoTimeSeriesResponse = {
  nb_pageviews?: number;
  nb_uniq_pageviews?: number;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const since: StatInput["since"] = searchParams.get("since") ? parseInt(searchParams.get("since")!) : Infinity;
  const periodicity: StatInput["periodicity"] =
    (searchParams.get("periodicity") as "day" | "month" | "week" | "year") || "month";

  // Calculate date range for Matomo API
  let dateRange: string;

  if (since === Infinity) {
    dateRange = "today";
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

  // Build Matomo API URL for unique page views
  const matomoUrl = `${config.matomo.url}/?module=API&method=Actions.get&idSite=${
    config.matomo.siteId
  }&format=JSON&period=${periodicity}&date=${dateRange}&segment=${encodeURIComponent(
    `pageUrl=^${config.host}`,
  )}&showColumns=nb_uniq_pageviews`;

  try {
    const response = await fetch(matomoUrl, {
      next: {
        revalidate: 60 * 60 * 8, // 24 hours cache
      },
    });

    if (!response.ok) {
      throw new Error(`Matomo API error: ${response.status}`);
    }

    const data = (await response.json()) as MatomoTimeSeriesResponse;

    // Transform Matomo response to our format
    const stats: Stat[] = [];

    stats.push({
      value: data.nb_uniq_pageviews || 0,
      date: new Date(),
    });

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
