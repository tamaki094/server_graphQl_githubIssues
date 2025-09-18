const { createYoga, createSchema } = require('graphql-yoga');
const axios = require('axios');
const express = require('express');

const app = express();

const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
        type Label {
            id: ID!
            name: String!
            color: String
            description: String
            url: String
        }

      
        type User {
            login: String!
            html_url: String!
            avatar_url: String!
        }
        
        type Issue {
            id: ID!
            number: Int!
            title: String!
            html_url: String!
            user: User!
            labels: [Label!]!
            state: String!
            created_at: String!
            updated_at: String!
        }



        type Query {
            issues: [Issue!]!       
            searchLabels(term: String!): [Label!]!
        }
    `,
    
    
resolvers: {
      Query: {
        issues: async () => {
          const response = await axios.get('https://api.github.com/repos/angular/angular/issues');
          return response.data.map(issue => ({
            id: issue.id,
            number: issue.number,
            title: issue.title,
            html_url: issue.html_url,
            user: {
              login: issue.user.login,
              html_url: issue.user.html_url,
              avatar_url: issue.user.avatar_url
            },
            labels: issue.labels.map(label => ({
              id: label.id,
              name: label.name,
              color: label.color,
              description: label.description,
              url: label.url
            })),
            state: issue.state,
            created_at: issue.created_at,
            updated_at: issue.updated_at
          }));
        },
        searchLabels: async (_, { term }) => {
          const response = await axios.get('https://api.github.com/repos/angular/angular/issues');
          const allLabels = response.data.flatMap(issue => issue.labels);
          const uniqueLabels = Array.from(new Map(allLabels.map(label => [label.id, label])).values());
          return uniqueLabels.filter(label =>
            label.description && label.description.toLowerCase().includes(term.toLowerCase())
          );
        }
      }
    }
  })
});


app.use('/graphql', yoga);

app.listen(4000, () => {
  console.log('Servidor GraphQL corriendo en http://localhost:4000/graphql');
});



