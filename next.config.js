module.exports = {
  trailingSlash: true,
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/marketplace": { page: "/marketplace" },
      "/onlineShop": { page: "/onlineshop" },
      "/intelligence": { page: "/intelligence" },
      "/stages": { page: "/stages" },
      "/about": { page: "/about" },
      "/contacts": { page: "/contacts" },
      "/404": { page: "/404" },
    };
  },
};
