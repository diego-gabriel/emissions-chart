from dataclasses import dataclass
from sqlite3 import Connection

from backend.database import execute_read_query, execute_query, execute_insert_query


@dataclass
class Comment:
    text: str
    username: str
    parent_id: int | None
    id: int | None = None


class Comments:
    @staticmethod
    def _deserialize(data) -> Comment:
        return Comment(*data)

    @classmethod
    def create(cls, connection: Connection, text: str, username: str, parent_id: int | None) -> Comment:
        insert_query = f'INSERT INTO Comments (text, username, parent_id) VALUES (?, ?, ?)'
        inserted_id = execute_insert_query(connection, insert_query, (text, username, parent_id))
        return cls.find(connection, inserted_id)

    @classmethod
    def find(cls, connection: Connection, id: int) -> Comment:
        results = execute_read_query(connection, f"SELECT * FROM Comments where id={id}")
        return cls._deserialize(results[0])

    @classmethod
    def all(cls, connection: Connection) -> list[Comment]:
        results = execute_read_query(connection, "SELECT * FROM Comments")
        return [cls._deserialize(result) for result in results]
