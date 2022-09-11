import json

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.statics.paths import EMISSIONS_DATA_FILE

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
