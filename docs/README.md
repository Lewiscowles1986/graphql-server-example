# Books GraphQL API

## Read all books

```graphql
query AllBooks {
  books {
    author
    title
  }
}
```

## add a book to the in-memory collection

```graphql
mutation Mutation {
  addBook(title: "More Things to do when you're bored", author: "ME") {
    book {
      author
      title
    }
    code
    message
    success
  }
}
```
