export default {
  async get(context) {
    const { subAccountId, subAccountApiKey, page, size } = context.request.query;

    if (!subAccountId) return context.badRequest("'subAccountId' is required!");

    try {
      return await strapi.service("api::binance.api-key").get({
        page,
        size,
        subAccountId,
        subAccountApiKey,
        timestamp: Date.now().toString(),
        recvWindow: 5000,
      });
    } catch (error) {
      return context.badRequest(error.message);
    }
  },

  async create(context) {
    const { subAccountId, canTrade, marginTrade, futuresTrade } = context.request.body;

    if (!subAccountId) return context.badRequest("'subAccountId' is required!");
    if (!canTrade) return context.badRequest("'canTrade' is required!");

    try {
      return await strapi.service("api::binance.api-key").create({
        subAccountId,
        canTrade,
        marginTrade,
        futuresTrade,
        timestamp: Date.now().toString(),
        recvWindow: 5000,
      });
    } catch (error) {
      return context.badRequest(error.message);
    }
  },

  async update(context) {
    const { subAccountId, subAccountApiKey, canTrade, marginTrade, futuresTrade } = context.request.body;

    if (!subAccountId) return context.badRequest("'subAccountId' is required!");
    if (!subAccountApiKey) return context.badRequest("'subAccountApiKey' is required!");

    try {
      return await strapi.service("api::binance.api-key").update({
        subAccountId,
        subAccountApiKey,
        canTrade,
        marginTrade,
        futuresTrade,
        timestamp: Date.now().toString(),
        recvWindow: 5000,
      });
    } catch (error) {
      return context.badRequest(error.message);
    }
  },

  async delete(context) {
    const { subAccountId, subAccountApiKey } = context.request.query;

    if (!subAccountId) return context.badRequest("'subAccountId' is required!");
    if (!subAccountApiKey) return context.badRequest("'subAccountApiKey' is required!");

    try {
      await strapi.service("api::binance.api-key").delete({
        subAccountId,
        subAccountApiKey,
        timestamp: Date.now().toString(),
        recvWindow: 5000,
      });

      return { message: "Api Key has been successfully deleted!" };
    } catch (error) {
      return context.badRequest(error.message);
    }
  },
};
