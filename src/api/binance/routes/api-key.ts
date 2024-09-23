export default {
  routes: [
    {
      method: "GET",
      path: "/binance/api-key",
      handler: "api-key.get",
    },
    {
      method: "POST",
      path: "/binance/api-key",
      handler: "api-key.create",
    },
    {
      method: "PUT",
      path: "/binance/api-key",
      handler: "api-key.update",
    },
    {
      method: "DELETE",
      path: "/binance/api-key",
      handler: "api-key.delete",
    },
  ],
};
