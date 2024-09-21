export default {
  async create(context) {
    const { username, memberType, note, password } = context.request.body;

    if (!username) return context.badRequest("'username' is required!");
    if (!memberType) return context.badRequest("'memberType' is required!");

    try {
      return await strapi.service("api::bybit.sub-account").create({ note, username, password, memberType });
    } catch (error) {
      return context.badRequest(error.message || "An error occurred while creating the sub-account.");
    }
  },
};
