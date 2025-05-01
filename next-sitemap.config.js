/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://roadtolegacy.team",
  generateRobotsTxt: true,
  outDir: "./out",

  // Exclude specific static routes
  exclude: ["/register-team", "/admin", "/confirm", "/game"],

  // Configure robots.txt to prevent crawling of sensitive paths
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/register-team", "/confirm", "/game"],
        allow: ["/", "/register"],
      },
    ],
  },
};
