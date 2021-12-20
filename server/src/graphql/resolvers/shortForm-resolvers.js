const { pubsub } = require("../subs");
const { dataSources } = require("../../datasources");
const { withFilter } = require("graphql-subscriptions");

const SHORTFORM_ADDED = "SHORTFORM_ADDED";

const schema = {
  Query: {
    ShortFormsByProjectId(root, args) {
      return dataSources.boardService.getShortFormsByProjectId(args.projectId);
    },
  },

  Subscription: {
    shortFormAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(SHORTFORM_ADDED),
        (payload, args) =>
          args.projectId === payload.projectId
      ),
    },
  },

  Mutation: {
    async addShortForm(root, {prettyId, projectId }) {
      const addedShortForm = await dataSources.boardService.addShortForm(
        prettyId,
        projectId
      );
      await pubsub.publish(SHORTFORM_ADDED, {
        projectId,
        shortFormAdded: {
          mutationType: "CREATED",
          shortForm: addedShortForm.dataValues,
        },
      });
      return addedShortForm;
    },
  },

/*  ShortForm: {
    columns(root) {
      return dataSources.boardService.getPrettyIdByProjectId(root.id);
    },
  },
  */
};

module.exports = schema;