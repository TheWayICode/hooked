from pydantic import BaseModel
from typing import Optional, Union
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
    def get_all_fish(self) -> Optional[FishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, size, fishing_technique, type
                        FROM fish
                        ORDER BY id
                        """
                    )
                    return [
                        self.record_to_fish_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Unable to successfully create a fish"}


    def get_one_fish(self, fish_id:int) -> Optional[FishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print(FishOut)
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , size
                            , fishing_technique
                            , type
                        FROM fish
                        WHERE id = %s
                        """,
                        [fish_id]
                    )
                    record = result.fetchone()
                if record is None:
                    return None
                return self.record_to_fish_out(record)
        except Exception as e:
            print(e)
            return {"message": "Fish not found"}


    def create_fish(self, fish: FishIn, location_fish_id: int) -> Union[FishOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO fish (name, size, fishing_technique, type)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                    [fish.name, fish.size, fish.fishing_technique, fish.type]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    db.execute(
                        """
                        INSERT INTO location_fish (location_id, fish_id)
                        VALUES (%s, %s);
                        """,
                    [location_fish_id, id]  # Replace 1 with the actual location_id
                    )
                    return self.record_to_fish_in_to_out(id, fish)
        except Exception:
            print("Create fish did not work")
            return None


    def delete_fish(self, fish_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from location_fish
                        WHERE fish_id = %s
                        """,
                        [fish_id]
                    )
                    db.execute(
                        """
                        DELETE from fish
                        WHERE id = %s
                        """,
                        [fish_id]
                    )
                    return True
        except Exception:
            return {"message": "User does not exists"}


    def update_fish(self, fish_id: int, fish: FishIn) -> Union[FishOut, Error]:
        print(fish)
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM fish
                        WHERE id = %s
                        """
                        ,
                        [fish_id]
                    )
                    fetching = result.fetchone()
                    if not fetching:
                        return {"message": "Fish does not exist"}
                    db.execute(
                        """
                        UPDATE fish
                        SET name = %s, size = %s, fishing_technique = %s, type = %s
                        WHERE id = %s
                        """
                        ,
                        [fish.name, fish.size, fish.fishing_technique, fish.type, fish_id]
                    )
                    return self.record_to_fish_in_to_out(fish_id, fish)
        except Exception:
            return {"message": "Fish could not be updated"}


    def record_to_fish_in_to_out(self, id: int, fish: FishIn):
        old_data = fish.dict()
        return FishOut(id=id, **old_data)


    def record_to_fish_out(self, record):
        return FishOut(
            id=record[0],
            name=record[1],
            size=record[2],
            fishing_technique=record[3],
            type=record[4]
        )
