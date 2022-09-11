import sqlite3
from sqlite3 import Error, Connection

from backend.statics.paths import SQLITE_FILE


def create_connection():
    connection = None

    try:
        connection = sqlite3.connect(SQLITE_FILE)
    except Error as error:
        print(error)

    _ensure_tables(connection)

    return connection


def execute_query(connection: Connection, query: str):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
    except Error as error:
        print(error)

def _ensure_tables(connection: Connection):
    create_comments_table_query = """
    CREATE TABLE IF NOT EXISTS Comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT NOT NULL,
        username TEXT NOT NULL,
        parent_id INTEGER NOT NULL,
        FOREIGN KEY (parent_id) REFERENCES Comments(id) 
    )
    """

    execute_query(connection, create_comments_table_query)