import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from backend.database import database_connection
from backend.model import Comments
from backend.statics.paths import EMISSIONS_DATA_FILE

database_connection.initialize()
app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/data")
def read_data():
    """ Data corresponds to 5-year average of  CO2 and greenhouse gas emissions per-capita
    for the European Union (28) countries after 1900.
    Source https://ourworldindata.org/co2/country/germany?country=~DEU"""

    with open(EMISSIONS_DATA_FILE) as data_file:
        data = json.load(data_file)
    return data


class CommentData(BaseModel):
    username: str
    text: str
    parent_id: int | None


@app.post("/comments", status_code=201)
def post_comment(*, comment_data: CommentData):
    new_comment = Comments.create(comment_data.text, comment_data.username, comment_data.parent_id)

    return {
        "id": new_comment.id,
        "text": new_comment.text,
        "username": new_comment.username,
        "parent_id": new_comment.parent_id,
    }
