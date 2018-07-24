const schema = `
type Space {
  id: String!
  name: String!
  description: String
  initiatives: [Initiative]
}

type Initiative {
  id: String!
  name: String!
  description: String
  space: Space
}

type Query {
  spaces: [Space]
  space(id: String!): Space
}
`;

module.exports = schema;