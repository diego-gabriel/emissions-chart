import sqlite3
from sqlite3 import Error, Connection

from backend.statics.paths import SQLITE_FILE


def create_connection(database_file = SQLITE_FILE):
    connection = None

    try:
        connection = sqlite3.connect(database_file)
    except Error as error:
        print(error)

    _ensure_tables(connection)

    return connection


def execute_query(connection: Connection, query: str, params: any = None):
    cursor = connection.cursor()
    try:
        cursor.execute(query, params or [])
        connection.commit()
    except Error as error:
        print("Could not execute query", query, error)
        raise

    return cursor


def execute_insert_query(connection: Connection, query: str, params: any = None):
    return execute_query(connection, query, params).lastrowid


def execute_read_query(connection: Connection, query: str, params: any = None):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query, params or [])
        result = cursor.fetchall()
    except Error as error:
        print(error)
        raise

    return result

def _ensure_tables(connection: Connection):
    create_comments_table_query = """
    CREATE TABLE IF NOT EXISTS Comments (
        text TEXT NOT NULL,
        username TEXT NOT NULL,
        parent_id INTEGER,
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        FOREIGN KEY (parent_id) REFERENCES Comments(id) 
    )
    """

    execute_query(connection, create_comments_table_query)