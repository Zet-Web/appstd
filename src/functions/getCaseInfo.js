import axios from "axios";

export default function getCaseInfo(name) {
  return new Promise((resolve) => {
    axios.get(`https://api.appsstudio.ru/v1/category/${name}`).then((res) => {
      const { seo, headers, services_extra, services_main, elements } =
        res.data;

      const services = [
        {
          key: "main",
          items: services_main.map((item, key) => ({
            ...item,
            idColor: `main-${key}`,
          })),
        },
        {
          key: "extra",
          items: services_extra.map((item, key) => ({
            ...item,
            idColor: `extra-${key}`,
          })),
        },
      ];

      resolve({ seo, services, headers, elements });
    });
  });
}
