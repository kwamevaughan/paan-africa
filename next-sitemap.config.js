/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://paan.africa",
  generateRobotsTxt: true, // (optional) generate robots.txt
  // Optionally you can exclude some paths:
  exclude: ["/thank-you"],
  // If you have dynamic routes, use the transform function or additionalPaths:
  // additionalPaths: async (config) => [
  //   await fetchDynamicRoutes(config),
  // ],
};
