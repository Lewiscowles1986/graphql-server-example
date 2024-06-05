"""Schema for Graphql API."""

import typing
import strawberry


@strawberry.type
class Book:
    title: str
    author: str


@strawberry.type
class NewBookResponse:
    book: Book
    code: str
    message: str
    success: bool


@strawberry.type
class Query:
    books: typing.List[Book]
