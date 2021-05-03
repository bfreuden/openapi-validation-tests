
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Pet(BaseModel):
    name: str
    age: int

class PetHits(BaseModel):
    hits: List[Pet]


@app.get("/shops/{shop}/pets/{pet}", response_model=Pet)
def get_pet(shop: str, pet: str):
    return { "name": pet, "age": 5 }


@app.post("/shops/{shop}/pets/_search", response_model=PetHits)
def search_pets(shop: str):
    return {"hits": [{ "name": "wolfie", "age": 5 }]}


