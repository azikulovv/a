export default {
  routes: [
    {
      method: "GET",
      path: "/bybit/api-keys",
      handler: "api-key.get",
    },
    {
      method: "POST",
      path: "/bybit/api-key",
      handler: "api-key.create",
    },
    {
      method: "PUT",
      path: "/bybit/api-key/:id",
      handler: "api-key.update",
    },
    {
      method: "DELETE",
      path: "/bybit/api-key/:id",
      handler: "api-key.delete",
    },
  ],
};
