const { search } = require("./client");
const {
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} = require("graphql");

const StationType = new GraphQLObjectType({
  name: "Station",
  description: "Station object",
  fields: () => ({
    url: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    language: {
      type: GraphQLString,
      resolve: ({ language }) => language || null
    },
    country: {
      type: GraphQLString,
      resolve: ({ country }) => country || null
    },
    votes: {
      type: GraphQLInt,
      resolve: ({ votes = 0 }) => Number(votes)
    },
    codec: {
      type: GraphQLString,
      resolve: ({ codec }) => codec || null
    },
    tags: {
      type: new GraphQLList(GraphQLString),
      resolve: ({ tags = "" }) =>
        tags
          .split(",")
          .filter(Boolean)
          .map(x => x.trim())
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Station",
    fields: () => ({
      stations: {
        type: new GraphQLList(StationType),
        args: {
          query: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (root, { query }) => {
          return search(query);
        }
      }
    })
  })
});

module.exports = schema;
