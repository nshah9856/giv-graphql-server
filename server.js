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
        updateUserOrgs(email: String!, tempOrg: String): User
    },
    type Organization {
        id: Int
        title: String
        description: String
        category: String
        website : String
        url: String
    }
    type User{
        id: Int
        name: String
        email: String
        password: String
        tempOrg: String
        likedOrgs: [String]
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
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4',
        website: 'https://donate.worldvision.org/give/hand-drilled-well*'
    },
    {
        id: 2,
        title: 'World Vision',
        description: 'Your gift is a sacred trust. We promise to honor your generosity and use your donation in the most effective way possible. The gift options shown reflect World Vision projects and the suggested donation amounts are based on periodic surveys of the countries we serve. ',
        category: 'health',
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4',
        website: 'https://donate.worldvision.org/give/hand-drilled-well*'
    },
    {
        id: 3,
        title: 'World Vision',
        description: 'Your gift is a sacred trust. We promise to honor your generosity and use your donation in the most effective way possible. The gift options shown reflect World Vision projects and the suggested donation amounts are based on periodic surveys of the countries we serve. ',
        category: 'health',
        url: 'https://storage.googleapis.com/sharity-video/worldvision.mp4',       
        website: 'https://donate.worldvision.org/give/hand-drilled-well*'
    }
]

var userData = [
    {
        id: 1,
        name: "Lucas Erb",
        email: "lerb@erb.com",
        password: "test",
        tempOrg: "World Vision",
        likedOrgs: ["blah"],
    }
]

var createUserAccount = function({email, password}){
    userData.push( 
        {
        email: email,
        password: password,
        likedOrgs: [],
    })
    return userData[userData.length-1]
}

var updateUserAccount = function({email, tempOrg}){
    var index = userData.findIndex(({email: e}) => e === email);

    userData[index].tempOrg = tempOrg

    userData[index].likedOrgs.push(tempOrg)
    
    return userData[index];
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
    createUser: createUserAccount,
    updateUserOrgs: updateUserAccount
};
// Create an express server and a GraphQL endpoint
var app = express();
app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));
app.listen(8080, () => console.log('Express GraphQL Server Now Running On localhost:8080/graphql'));