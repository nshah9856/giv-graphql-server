var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        organization(id: Int!): Organization
        organizations(id: Int): [Organization]
    },
    type Organization {
        id: Int
        title: String
        author: String
        description: String
        category: String
        url: String
    }
`);
var organizationData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        category: 'Node.js',
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        category: 'Node.js',
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        category: 'JavaScript',
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
    }
]
var getOrganization = function(args) { 
    var id = args.id;
    return organizationData.filter(course => {
        return course.id == id;
    })[0];
}
var getOrganizations = function(args) {
    return organizationData;
}
var root = {
    organization: getOrganization,
    organizations: getOrganizations
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));