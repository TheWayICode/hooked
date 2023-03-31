from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class FishIn(BaseModel):
    name: str
    size: str
    fishing_technique: str
    type: str

class FishOut(BaseModel):
    id:int
    name: str
    size: str
    fishing_technique: str
    type: str


class FishRepository:



    def delete_fish(self, fish_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from fish
                        WHERE id = %s
                        """,
                        [fish_id]
                    )
                    return True
        except Exception as e:
            return {"message": "User does not exists"}
