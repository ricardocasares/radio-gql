const { get, search } = require("./client");
const {
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInputObjectType
} = require("graphql");

var OrderType = new GraphQLEnumType({
  name: "Order",
  values: {
    NAME: { value: "name" },
    URL: { value: "url" },
    TAGS: { value: "tags" },
    COUNTRY: { value: "country" },
    STATE: { value: "state" },
    LANGUAGE: { value: "language" },
    VOTES: { value: "votes" },
    CODEC: { value: "codec" },
    BITRATE: { value: "bitrate" },
    LAST_CHECK_OK: { value: "lastcheckok" },
    LAST_CHECK_TIME: { value: "lastchecktime" },
    CLICK_TIMESTAMP: { value: "clicktimestamp" },
    CLICK_COUNT: { value: "clickcount" }
  }
});

const StationType = new GraphQLObjectType({
  name: "Station",
  description: "Station object",
  fields: () => ({
    id: {
      type: GraphQLString
    },
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
    state: {
      type: GraphQLString,
      resolve: ({ state }) => state || null
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

const QueryParams = new GraphQLInputObjectType({
  name: "QueryParams",
  description: "Query parameters",
  fields: {
    tag: { type: GraphQLString },
    name: { type: GraphQLString },
    country: { type: GraphQLString },
    state: { type: GraphQLString },
    language: { type: GraphQLString }
  }
});

const PaginationParams = new GraphQLInputObjectType({
  name: "PaginationParams",
  description: "Pagination parameters",
  fields: {
    order: { type: OrderType },
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
    reverse: { type: GraphQLBoolean }
  }
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "Station",
    fields: () => ({
      station: {
        type: StationType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: (root, { id }) => get(id)
      },
      stations: {
        type: new GraphQLList(StationType),
        args: {
          query: { type: QueryParams },
          pagination: { type: PaginationParams }
        },
        resolve: (root, query) => search(query)
      }
    })
  })
});

module.exports = schema;
