import os


def build_path(relative_path: str) -> str:
    return os.path.join(os.path.dirname(__file__), relative_path)


EMISSIONS_DATA_FILE = build_path("../../data/co-emissions-per-capita.json")
SQLITE_TEST_FILE = build_path("../../data/test_database.sqlite")
SQLITE_FILE = build_path("../../data/database.sqlite")
