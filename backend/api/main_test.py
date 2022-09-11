from fastapi.testclient import TestClient

from .main import app
from backend.model import Comments

client = TestClient(app)


class TestComments:
    def test_post_controller(self) -> None:
        data = {
            "text": "Awesome comment",
            "username": "Alice",
            "data_id": 3,
        }
        response = client.post("/comments", json=data)
        json_response = response.json()

        assert response.status_code == 201
        assert json_response["text"] == data["text"]
        assert json_response["username"] == data["username"]
        assert json_response["data_id"] == data["data_id"]
        assert json_response["parent_id"] is None
        assert json_response["id"] is not None

        assert Comments.find(json_response["id"]).text == data["text"]

    def test_get_controller_empty(self) -> None:
        response = client.get("/comments")
        json_response = response.json()

        assert response.status_code == 200
        assert len(json_response) == 0

    def test_get_controller_with_comments(self) -> None:
        for i in range(5):
            Comments.create("Some comment", "Bob", i, None)

        response = client.get("/comments")
        json_response = response.json()

        assert response.status_code == 200
        assert len(json_response) == 5
        assert { comment["data_id"] for comment in json_response } == { 0, 1, 2, 3, 4}

        for i in range(5):
            assert json_response[i]["text"] == "Some comment"
            assert json_response[i]["username"] == "Bob"
            assert json_response[i]["text"] == "Some comment"
            assert json_response[i]["parent_id"] is None
