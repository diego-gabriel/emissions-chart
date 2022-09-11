import os

import pytest

from backend.statics.paths import SQLITE_TEST_FILE


def delete_database_file():
    if os.path.exists(SQLITE_TEST_FILE):
        os.remove(SQLITE_TEST_FILE)


@pytest.fixture(autouse=True)
def ensure_clean_database():
    delete_database_file()

    yield

    delete_database_file()