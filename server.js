var express = require('express');
var express_graphql = require('express-graphql');
var { buildSchema } = require('graphql');
// GraphQL schema
var schema = buildSchema(`
    type Query {
        organization(id: Int!): Organization
        organizations(id: Int): [Organization]
        user(email: String) : User
        users(id: Int): [User]
    },
    type Mutation {
        createUser(email: String!, password: String!): User
    },
    type Organization {
        id: Int
        title: String
        description: String
        category: String
        url: String
    }
    type User{
        id: Int
        name: String
        email: String
        password: String
        creditCardNumber: String
        creditCardExp: String
        creditCardCvv: String
    }
`);
var organizationData = [
    {
        id: 1,
        title: 'World Vision',
        description: 'Your gift is a sacred trust. We promise to honor your generosity and use your donation in the most effective way possible. The gift options shown reflect World Vision projects and the suggested donation amounts are based on periodic surveys of the countries we serve. ',
        category: 'health',
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4'
    },
    {
        id: 2,
        title: 'World Vision',
        description: 'Your gift is a sacred trust. We promise to honor your generosity and use your donation in the most effective way possible. The gift options shown reflect World Vision projects and the suggested donation amounts are based on periodic surveys of the countries we serve. ',
        category: 'health',
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4'
    },
    {
        id: 3,
        title: 'World Vision',
        description: 'Your gift is a sacred trust. We promise to honor your generosity and use your donation in the most effective way possible. The gift options shown reflect World Vision projects and the suggested donation amounts are based on periodic surveys of the countries we serve. ',
        category: 'health',
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4'
    }
]

var userData = [
    {
        id: 1,
        name: "Lucas Erb",
        email: "lerb@erb.com",
        password: "test",
    }
]

var createUserAccount = function({email, password}){
    userData.push( 
        {
        email: email,
        password: password,
    })
    return userData[userData.length-1]
}
var getOrganization = function(args) { 
    var id = args.id;
    return organizationData.filter(org => {
        return org.id == id;
    })[0];
}
var getUser = function(args) { 
    var email = args.email;
    return userData.filter(user => {
        return user.email == email;
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
    users: getUsers,
    createUser: createUserAccount
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));