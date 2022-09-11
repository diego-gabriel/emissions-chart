from backend.database import connection


class TestConnection:
    def test_connection_is_created_and_configured(self) -> None:
        assert connection is not None

        result = connection.execute_read_query("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [table for (table, *_) in result]

        assert "Comments" in tables

