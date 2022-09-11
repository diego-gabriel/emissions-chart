from dataclasses import dataclass

from backend.database import database_connection as connection

@dataclass
class Comment:
    text: str
    username: str
    data_id: int  # This represents the index of the datapoint in the chart
    parent_id: int | None
    id: int | None = None


class Comments:
    @staticmethod
    def _deserialize(data) -> Comment:
        return Comment(*data)

    @classmethod
    def create(cls, text: str, username: str, data_id: int, parent_id: int | None) -> Comment:
        insert_query = f'INSERT INTO Comments (text, username, data_id, parent_id) VALUES (?, ?, ?, ?)'
        inserted_id = connection.execute_insert_query(insert_query, (text, username, data_id, parent_id))
        return cls.find(inserted_id)

    @classmethod
    def find(cls, id: int) -> Comment:
        results = connection.execute_read_query(f"SELECT * FROM Comments where id={id}")
        return cls._deserialize(results[0])

    @classmethod
    def all(cls) -> list[Comment]:
        results = connection.execute_read_query("SELECT * FROM Comments")
        return [cls._deserialize(result) for result in results]
