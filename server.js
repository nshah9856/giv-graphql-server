var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        organization(id: Int!): Organization
        organizations(id: Int): [Organization]
        user(id: Int!) : User
        users(id: Int): [User]
    },
    type Organization {
        id: Int
        title: String
        author: String
        description: String
        category: String
        url: String
    }
    type User{
        id: Int
        name: String
        username: String
        password: String
        creditCardNumber: String
        creditCardExp: String
        creditCardCvv: String
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

var userData = [
    {
        id: 1,
        name: "Lucas Erb",
        username: "lerb",
        password: "test",
    }
]
var getOrganization = function(args) { 
    var id = args.id;
    return organizationData.filter(org => {
        return org.id == id;
    })[0];
}
var getUser = function(args) { 
    var id = args.id;
    return userData.filter(user => {
        return user.id == id;
    })[0];
}
var getOrganizations = function(args) {
    return organizationData;
}
var getUsers = function(args) {
    return userData;
}
var root = {
    organization: getOrganization,
    organizations: getOrganizations,
    user: getUser,
    users: getUsers
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));