import { ApolloServer } from '@apollo/server';
import { GraphQLError } from 'graphql';
import { startStandaloneServer } from '@apollo/server/standalone';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(id: Int!): Book
  }

  type AddBookMutationResponse {
    code: String!
    success: Boolean!
    message: String!
    book: Book
  }

  type Mutation {
    addBook(title: String, author: String): AddBookMutationResponse
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: (a, b, c) => {
      const { id } = b;
      console.log("get book", {a, b, c, id});
      if (id < 1 || id > books.length) {
        throw new GraphQLError("Not Found", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              status: 404,
            }
          }
        })
      }
      const book = books.at(id - 1);
      if (!book) {
        throw new GraphQLError("Not Found", {
          extensions: {
            code: "NOT_FOUND",
            http: {
              status: 404,
            }
          }
        })
      }
      return book;
    }
  },
  Mutation: {
    addBook: (_, { title, author }) => {
      const book = {
        title,
        author,
      };
      books.push(book)
      return {
        code: 200,
        success: true,
        message: `Successfully added ${title} by ${author}`,
        book
      }
    }
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  includeStacktraceInErrorResponses: false,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
