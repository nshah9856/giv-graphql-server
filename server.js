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
        title: 'Doctors Without Borders',
        description: 'See how Doctors Without Borders/Médecins Sans Frontières (MSF) has provided more than one million medical consultations to Rohingya refugees in Bangladesh… Now, after fighting disease outbreaks, providing reproductive health care, treatment for sexual violence, mental health services, and more, MSF has surpassed one million medical consultations in the camps.',
        category: 'World Health & Medicine',
        url: 'https://storage.googleapis.com/sharity-video/doctorswithoutborders.mp4',
        website: 'https://www.doctorswithoutborders.org/'
    },
    {
        id: 2,
        title: 'World Wildlife Fund',
        description: 'We can\'t survive without nature, and nature can\'t survive without us. That\'s why we\'re so grateful to have you by our side as a champion for nature. When we all come together to protect forests, oceans, rivers, and streams, we protect life on our planet for generations to come.',
        category: 'Nature Preservation',
        url: 'https://storage.googleapis.com/sharity-video/wwf.mp4',
        website: 'https://www.worldwildlife.org/'
    },
    {
        id: 3,
        title: 'World Food Program',
        description: 'The World Food Programme\'s long experience in humanitarian and development contexts has positioned the organization well to support resilience building in order to improve food security and nutrition. WFP helps the most vulnerable people strengthen their capacities to absorb, adapt, and transform in the face of shocks and long-term stressors.',
        category: 'World Hunger',
        url: 'https://storage.googleapis.com/sharity-video/worldfoodprogramme.mp4',       
        website: 'https://www1.wfp.org/'
    },
    {
        id: 4,
        title: 'Samaritan’s Purse',
        description: 'For over 40 years, Samaritan’s Purse has done our utmost to follow Christ’s command by going to the aid of the world’s poor, sick, and suffering. We are an effective means of reaching hurting people in countries around the world with food, medicine, and other assistance in the Name of Jesus Christ.',
        category: 'World Health and Medicine',
        url: 'https://storage.googleapis.com/sharity-video/samaritanspurse.mp4',       
        website: 'https://www.samaritanspurse.org/'
    },
    {
        id: 5,
        title: 'Make A Wish',
        description: 'Tens of thousands of volunteers, donors and supporters advance the Make-A-Wish® vision to grant the wish of every child diagnosed with a critical illness. In the United States and its territories, on average, a wish is granted every 34 minutes. We believe a wish experience can be a game-changer. This one belief guides us and inspires us to grant wishes that change the lives of the kids we serve.',
        category: 'Domestic Health',
        url: 'https://storage.googleapis.com/sharity-video/makeawish.mp4',       
        website: 'https://wish.org/'
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