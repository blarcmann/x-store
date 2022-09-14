export const siteSettings = {
  name: "bd-s",
  description: "Full stack ecommerce website",
  author: {
    name: "yemiOdetola",
    websiteUrl: "https://github.com/yemiOdetola",
  },
  logo: {
    url: "/assets/images/logo.svg",
    alt: "bds",
    href: "/",
    width: 95,
    height: 30,
  },
  defaultLanguage: "en",
  site_header: {
    menu: [
      {
        id: 2,
        path: "/search?q=clothings",
        label: "Clothings",
      },
      {
        id: 3,
        path: "/search?q=sneakers",
        label: "Sneakers",
      },
      {
        id: 4,
        path: "/search?q=accessories",
        label: "Other Accessories",
      },
      {
        id: 5,
        path: "/search",
        label: "Search",
      },
    ],
    mobileMenu: [
      {
        id: 2,
        path: "/search?q=clothings",
        label: "Clothings",
      },
      {
        id: 3,
        path: "/search?q=sneakers",
        label: "Sneakers",
      },
      {
        id: 4,
        path: "/search?q=accessories",
        label: "Other Accessories",
      },
      {
        id: 5,
        path: "/search",
        label: "Search",
      },
    ],
  },
};
