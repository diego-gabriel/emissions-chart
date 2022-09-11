from backend.database import create_connection, execute_read_query

class TestConnection:
    def test_creates_and_configures_connection(self) -> None:
        connection = create_connection()
        assert connection is not None

        result = execute_read_query(connection, "SELECT name FROM sqlite_master WHERE type='table'")
        tables = [table for (table, *_) in result]

        assert "Comments" in tables
