export default {
  async create(context) {
    const { tag } = context.request.body;

    if (!tag) return context.badRequest("'tag' is required!");

    try {
      return await strapi
        .service("api::binance.sub-account")
        .create({ tag, timestamp: Date.now().toString(), recvWindow: 5000 });
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while creating the sub-account.");
    }
  },
};
