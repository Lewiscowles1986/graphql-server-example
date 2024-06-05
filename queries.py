"""Queries for working with API."""

import strawberry
import typing
from schema import Book
from data.books import get_books, get_book


@strawberry.type
class Query:
    books: typing.List[Book] = strawberry.field(resolver=get_books)
    book: Book | None = strawberry.field(resolver=get_book)
