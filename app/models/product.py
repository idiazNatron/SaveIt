from pydantic import BaseModel
from typing import Optional

class Product(BaseModel):
    name: str
    price: float
    link: str
    source: str
    coupon: Optional[str] = None
    coupon_link: Optional[str] = None
