import csv
import json
import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

    filename = os.path.join(os.path.dirname(__file__), "../../data/co-emissions-per-capita.json")

    with open(filename) as data_file:
        data = json.load(data_file)
    return data
