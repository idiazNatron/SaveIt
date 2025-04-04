from fastapi import FastAPI, Query
from typing import List, Optional
from app.services import walmart, target, cvs
from app.models.product import Product

app = FastAPI()

@app.get("/search", response_model=List[Product])
def search_products(query: str, zipcode: Optional[str] = None):
    return walmart.search(query) + target.search(query) + cvs.search(query)