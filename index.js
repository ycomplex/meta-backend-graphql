const { ApolloServer, gql } = require('apollo-server');
const _ = require('lodash');
const axios = require('axios');

const schema = require('./schema');

const data = require('./data/data.json');
const {spaces, initiatives} = data;

const typeDefs = gql`${schema}`;

const resolvers = {
  Query: {
    spaces: (obj, args, context, info) => { 
      return spaces 
    },
    space: (obj, args, context, info) => {
      const matches = _.filter(spaces, { 'id': args.id });
      if (matches.length > 0) {
        return matches[0];
      }
      return null;
    }
  },
  Space: {
    initiatives: (space) => {
      const matches = _.filter(initiatives, { 'space_id': space.id });
      return matches;
    }
  },
  Initiative: {
    space: (initiative) => {
      const matches = _.filter(spaces, { 'id': initiative.space_id });
      if (matches.length > 0) {
        return matches[0];
      }
      return null;
    }
  }
};

if (require.main === module) {
  console.log('Running as standalone server');

  const server = new ApolloServer({ typeDefs, resolvers });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
} else {
  console.log('Required as a module');
  module.exports = { typeDefs, resolvers };
}

