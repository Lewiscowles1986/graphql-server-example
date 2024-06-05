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

## Get specific book

```graphql
query GetSpecificBook($bookId: Int!) {
  book(id: $bookId) {
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
