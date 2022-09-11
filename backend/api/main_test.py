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