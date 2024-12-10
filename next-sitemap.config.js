const isDeployment = !!process.env.VERCEL_URL;

const priorities = {
  "/": 1.0,
  "/simulation": 1.0,
  "/stats": 0.5,
};

/** @type {import('next-sitemap').IConfig} */
const config = {
  generateRobotsTxt: true,
  siteUrl: isDeployment ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
  changefreq: "weekly",
  exclude: ["/debug", "/debug/*", "/healthz", "/blog/playground"],
  transform: async (config, path) => {
    return {
      loc: path,
      priority: priorities[path] ?? config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
      changefreq: config.changefreq,
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/debug", "/debug/*", "/healthz", "/blog/playground"],
      },
    ],
  },
};

module.exports = config;
