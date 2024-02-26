import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

import packageJson from "./package.json" assert { type: "json" };

const { version } = packageJson;

const isDeployment = !!process.env.VERCEL_URL;

const csp = {
  "default-src": ["'none'"],
  "connect-src": [
    "'self'",
    "https://*.gouv.fr",
    process.env.PACOUPA_ENV === "preprod" && "https://vercel.live",
    process.env.NODE_ENV === "development" && "http://localhost",
  ],
  "font-src": ["'self'"],
  "media-src": ["'self'"],
  "img-src": ["'self'", "data:"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    "https://stats.beta.gouv.fr",
    process.env.PACOUPA_ENV === "preprod" && "https://vercel.live",
    process.env.NODE_ENV === "development" && "'unsafe-eval' http://localhost",
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "object-src": ["'self'", "data:"],
  "frame-ancestors": ["'self'"],
  "base-uri": ["'self'", "https://*.gouv.fr"],
  "form-action": ["'self'", "https://*.gouv.fr"],
  "block-all-mixed-content": [],
  "upgrade-insecure-requests": [],
  "frame-src": [process.env.PACOUPA_ENV === "preprod" ? "https://vercel.live" : "'none'"],
};

const ContentSecurityPolicy = Object.entries(csp)
  .map(([key, value]) => `${key} ${value.filter(Boolean).join(" ")};`)
  .join(" ");

/** @type {import('next').NextConfig} */
const config = {
  poweredByHeader: false,
  swcMinify: true,
  webpack: config => {
    config.module.rules.push({
      test: /\.(woff2|webmanifest)$/,
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
  env: {
    NEXT_TELEMETRY_DISABLED: "1",
    NEXT_PUBLIC_APP_VERSION: version,
    NEXT_PUBLIC_APP_VERSION_COMMIT: isDeployment ? process.env.VERCEL_GIT_COMMIT_SHA : "dev",
    NEXT_PUBLIC_REPOSITORY_URL: isDeployment
      ? `https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
      : process.env.NEXT_PUBLIC_APP_REPOSITORY_URL ?? "no repository",
    NEXT_PUBLIC_SITE_URL: isDeployment
      ? process.env.NEXT_PUBLIC_SITE_URL ?? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000",
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/(.*)",
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
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm, [remarkMdxFrontmatter, { name: "metadata" }]],
  },
});

export default withMDX(config);
