import sqlite3
from sqlite3 import Error

from backend.statics.paths import SQLITE_FILE

# print(os.environ)

class DatabaseConnection:
    def initialize(self, database_file: str = SQLITE_FILE):
        try:
            self.connection = sqlite3.connect(database_file)
        except Error as error:
            print(error)

        self._ensure_tables()

    def __del__(self):
        self.connection.close()

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
        cursor = self.connection.cursor()
        try:
            cursor.execute(query, params or [])
            self.connection.commit()
        except Error as error:
            print("Could not execute query", query, error)
            raise

        return cursor

    def execute_insert_query(self, query: str, params: any = None):
        return self.execute_query(query, params).lastrowid

    def execute_read_query(self, query: str, params: any = None):
        cursor = self.connection.cursor()

        try:
            cursor.execute(query, params or [])
            result = cursor.fetchall()
        except Error as error:
            print(error)
            raise

        return result

connection = DatabaseConnection()