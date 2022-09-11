from backend.database import create_connection
from backend.model import Comments
from backend.statics.paths import SQLITE_TEST_FILE


class TestComments:
    def setup(self) -> None:
        self.connection = create_connection(SQLITE_TEST_FILE)

    def test_create_comments(self) -> None:
        comment = Comments.create(self.connection, "foo", "bob", None)

        assert comment.text == "foo"
        assert comment.username == "bob"
        assert comment.parent_id is None
        assert comment.id is not None

    def test_finds_all_comments(self) -> None:
        c1 = Comments.create(self.connection, "comment 1", "alice", None)
        c2 = Comments.create(self.connection, "comment 2", "bob", None)
        c3 = Comments.create(self.connection, "comment 3", "alice", c2.id)

        all_comments = Comments.all(self.connection)

        assert len(all_comments) == 3
        assert { comment.text for comment in all_comments} == { c1.text, c2.text, c3.text }

    def test_finds_a_comment(self) -> None:
        Comments.create(self.connection, "comment 1", "alice", None)
        c2 = Comments.create(self.connection, "comment 2", "bob", None)
        Comments.create(self.connection, "comment 3", "alice", None)

        found_comment = Comments.find(self.connection, c2.id)
        assert found_comment.text == c2.text
        assert found_comment.username == c2.username
        assert found_comment.parent_id == c2.parent_id
        assert found_comment.id == c2.id



