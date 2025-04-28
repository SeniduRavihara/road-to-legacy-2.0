/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://roadtolegacy.team", // Your main site URL
  generateRobotsTxt: true, // Automatically generate a robots.txt file
  outDir: "./out", // Output directory for static export (if using next export)

  // Exclude specific static routes
  exclude: [
    "/register-team", // Exclude /register-team page
    "/admin", // Exclude /admin route
    "/confirm",
  ],

  // Optional: Customize robots.txt to prevent crawling of these paths
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://roadtolegacy.team/sitemap.xml", // Adding the main sitemap URL here
    ],
    policies: [
      {
        userAgent: "*",
        disallow: ["/admin", "/register-team", "/confirm"], // Disallow crawling for /admin and /register-team
        allow: ["/", "/register"], // Allow crawling for the homepage
      },
    ],
  },
};
