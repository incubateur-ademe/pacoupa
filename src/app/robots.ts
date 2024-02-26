import { type MetadataRoute } from "next";

import { config } from "@/config";

const robots = (): MetadataRoute.Robots => {
  return config.env === "prod"
    ? {
        rules: {
          userAgent: "*",
          allow: "/",
          disallow: "/private/",
        },
        sitemap: "/sitemap.xml",
      }
    : {
        rules: {
          userAgent: "*",
          disallow: "/",
        },
      };
};

export default robots;
