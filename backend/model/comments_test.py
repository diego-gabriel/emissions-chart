from backend.model import Comments


class TestComments:

    def test_create_comments(self) -> None:
        comment = Comments.create("foo", "bob", 1, None)

        assert comment.text == "foo"
        assert comment.username == "bob"
        assert comment.data_id == 1
        assert comment.parent_id is None
        assert comment.id is not None

    def test_finds_all_comments(self) -> None:
        c1 = Comments.create("comment 1", "alice", 1, None)
        c2 = Comments.create("comment 2", "bob", 2, None)
        c3 = Comments.create("comment 3", "alice", 3, c2.id)

        all_comments = Comments.all()

        assert len(all_comments) == 3
        assert { comment.text for comment in all_comments} == { c1.text, c2.text, c3.text }

    def test_finds_a_comment(self) -> None:
        Comments.create("comment 1", "alice", 1, None)
        c2 = Comments.create("comment 2", "bob", 2, None)
        Comments.create("comment 3", "alice", 3, None)

        found_comment = Comments.find(c2.id)
        assert found_comment.text == c2.text
        assert found_comment.username == c2.username
        assert found_comment.data_id == c2.data_id
        assert found_comment.parent_id == c2.parent_id
        assert found_comment.id == c2.id



