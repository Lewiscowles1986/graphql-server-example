"""Mutations for working with API."""

import strawberry
from schema import Book, NewBookResponse
from data.books import add_book


@strawberry.type
class Mutation:
    @strawberry.mutation
    def add_book(self, title: str, author: str) -> NewBookResponse:
        print(f"Adding {title} by {author}")
        book = Book(title=title, author=author)
        add_book(book)
        return NewBookResponse(
            book=book,
            code="200",
            success=True,
            message=f"Successfully added ${title} by ${author}",
        )
