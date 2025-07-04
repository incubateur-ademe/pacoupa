import createMDX from "@next/mdx";
import { withSentryConfig } from "@sentry/nextjs";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import packageJson from "./package.json" with { type: "json" };

const { version } = packageJson;

const isDeployment = !!process.env.SOURCE_VERSION;

const env = {
  NEXT_PUBLIC_APP_VERSION: version,
  NEXT_PUBLIC_APP_VERSION_COMMIT: isDeployment ? process.env.SOURCE_VERSION : "dev",
};

const csp = {
  "default-src": ["https://tally.so"],
  "connect-src": [
    "'self'",
    "https://*.gouv.fr",
    "https://api-adresse.data.gouv.fr",
    "https://data.ademe.fr",
    "https://sentry.incubateur.net",
    process.env.NODE_ENV === "development" && "http://localhost",
  ],
  "font-src": ["'self'"],
  "media-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    process.env.NEXT_PUBLIC_MATOMO_URL,
    "https://tally.so",
    process.env.NODE_ENV !== "prod" && "'unsafe-eval'",
    process.env.NODE_ENV === "development" && "http://localhost",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "object-src": ["'self'", "data:"],
  // "frame-ancestors": ["'self'", "https://tally.so"],
  "frame-ancestors": [
    "'self'",
    "https://tally.so",
    "https://coachcopro.preprod.centralweb.fr/",
    "https://www.coachcopro.com",
  ],
  "base-uri": ["'self'", "https://*.gouv.fr"],
  "form-action": ["'self'", "https://*.gouv.fr"],
  "block-all-mixed-content": [],
  "upgrade-insecure-requests": [],
  "frame-src": ["https://tally.so"],
};

// CSP for coachcopro route to allow iframe embedding
const cspCoachCopro = {
  ...csp,
  "frame-ancestors": [
    "'self'",
    "https://tally.so",
    "https://coachcopro.preprod.centralweb.fr/",
    "https://www.coachcopro.com",
  ],
};

const ContentSecurityPolicy = Object.entries(csp)
  .map(([key, value]) => `${key} ${value.filter(Boolean).join(" ")};`)
  .join(" ");

const ContentSecurityPolicyCoachCopro = Object.entries(cspCoachCopro)
  .map(([key, value]) => `${key} ${value.filter(Boolean).join(" ")};`)
  .join(" ");

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  output: "standalone",
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest|ttf)$/,
      type: "asset/resource",
    });

    return config;
  },
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env,
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      // Specific headers for coachcopro route to allow iframe embedding
      {
        source: "/__coachcopro",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicyCoachCopro,
          },
          // Remove X-Frame-Options for this route to allow iframe embedding
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer, strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "fullscreen=(), display-capture=(), camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
      // Default headers for all other routes
      {
        source: "/((?!__coachcopro).*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "no-referrer, strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "fullscreen=(), display-capture=(), camera=(), microphone=(), geolocation=()",
          },
          // Note: Cross-Origin-Embedder-Policy cause issue with Tally, event with credentialless policy.
          //   {
          //     key: "Cross-Origin-Embedder-Policy",
          //     value: "credentialless",
          //   },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, PUT, DELETE, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
        ],
      },
    ];
  },
};

const sentryConfig = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  dryRun: isDeployment && process.env.NODE_ENV !== "production",
  sentryUrl: process.env.SENTRY_URL,
  // for sourcemaps
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  //   tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm, [remarkMdxFrontmatter, { name: "frontmatter" }]],
  },
});

export default withSentryConfig(withMDX(config), sentryConfig);

console.log("dans Next.config ------------------------");
console.log("TURSO_DATABASE_URL", process.env.TURSO_DATABASE_URL);
