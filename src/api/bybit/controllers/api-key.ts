export default {
  // получение всех api ключей суб-аккаунта
  async get(context) {
    const { subMemberId, limit } = context.request.query;

    if (!subMemberId) {
      return context.badRequest("The 'subMemberId' parameter is required.");
    }

    try {
      return await strapi.service("api::bybit.api-key").get({
        limit,
        subMemberId,
      });
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while fetching API keys.");
    }
  },

  // создание api ключа для суб-аккаунта
  async create(context) {
    const { ips, subuid, readOnly, note } = context.request.body;

    if (!ips) return context.badRequest("'ips' is required.");
    if (!subuid) return context.badRequest("'subuid' is required.");
    if (readOnly === undefined) return context.badRequest("'readOnly' is required.");

    try {
      return await strapi.service("api::bybit.api-key").create({ ips, subuid, readOnly, note });
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while creating API keys.");
    }
  },

  // обновление api ключа для суб-аккаунта
  async update(context) {
    const apiKey = context.request.params.id;
    const { ips, readOnly } = context.request.body;

    if (!ips) return context.badRequest("'ips' is required.");
    if (!apiKey) return context.badRequest("'apiKey' is required.");
    if (readOnly === undefined) return context.badRequest("'readOnly' is required.");

    try {
      return await strapi.service("api::bybit.api-key").update({ ips, apiKey, readOnly });
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while updating the API key.");
    }
  },

  // удаление api ключа для суб-аккаунта
  async delete(context) {
    const apiKey = context.request.params.id;

    if (!apiKey) return context.badRequest("'apiKey' is required.");

    try {
      const { message } = await strapi.service("api::bybit.api-key").delete({ apiKey });

      if (message) {
        return context.badRequest(message);
      }

      return { message: "API key has been successfully deleted!" };
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while deleting the API key.");
    }
  },
};
