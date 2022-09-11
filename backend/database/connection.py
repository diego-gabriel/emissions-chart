import sqlite3

from backend.statics.paths import SQLITE_FILE


class DatabaseConnection:
    def __init__(self):
        self._database_file = None

    def _create_connection(self):
        if self._database_file is None:
            raise "Database not initialized"

        return sqlite3.connect(self._database_file)

    def initialize(self, database_file: str = SQLITE_FILE):
        self._database_file = database_file
        self._ensure_tables()

    def _ensure_tables(self):
        create_comments_table_query = """
        CREATE TABLE IF NOT EXISTS Comments (
            text TEXT NOT NULL,
            username TEXT NOT NULL,
            parent_id INTEGER,
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            FOREIGN KEY (parent_id) REFERENCES Comments(id) 
        )
        """

        self.execute_query(create_comments_table_query)

    def execute_query(self, query: str, params: any = None):
        with self._create_connection() as connection:
            cursor = connection.cursor()
            cursor.execute(query, params or [])

        return cursor

    def execute_insert_query(self, query: str, params: any = None):
        return self.execute_query(query, params).lastrowid

    def execute_read_query(self, query: str, params: any = None):
        with self._create_connection() as connection:
            cursor = connection.cursor()
            cursor.execute(query, params or [])

        return cursor.fetchall()


database_connection = DatabaseConnection()