import { GraphQLServer } from 'graphql-yoga';

// TYPES: String, Boolean, Int, Float, ID

// type definitions
const typeDefs = `
    type Query {
        greeting(name: String, position: String): String!
        add(numbers: [Float!]!): Float!
        grades: [Int!]!
        me: User!
        latestPost: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        isPublished: Boolean!
    }
`;

// Resolvers
const resolvers = {
    Query: {
        greeting(parent, args, ctx, info) {
            if (args.name, args.position) {
                return `Hello ${args.name}! You are my favorite ${args.position}.`;
            } else {
                return 'Hello!';
            }
        },
        add(parent, args) {
            if (args.numbers.length === 0) {
                return 0;
            } else {
                return args.numbers.reduce((accumulator, currentVal) => {
                    return accumulator + currentVal;
                });
            }
        },
        grades(parent, args, ctx, info) {
            return [1, 2, 0];
        },
        me() {
            return {
                id() {
                    return 'z1234';
                },
                name() {
                    return 'Andy';
                },
                email() {
                    return 'andy@andyjepkes.com';
                },
                age() {
                    return 36;
                }
            }
        },

        latestPost() {
            return {
                id() {
                    return 'pz1234';
                },
                title() {
                    return 'How I learned GraphQL';
                },
                body() {
                    return 'I learned GraphQL by trying it out!';
                },
                isPublished() {
                    return false;
                }
            }
        }
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('server running');
});