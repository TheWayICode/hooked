from pydantic import BaseModel
from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class FishRequestIn(BaseModel):
    location: str
    fish: str
    picture_url: str


class FishRequestOut(BaseModel):
    id: int
    location: str
    fish: str
    picture_url: str


class FishRequestsRepository:
    def get_all_fish_requests(self) -> Optional[FishRequestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, location, fish, picture_url
                        FROM fish_requests
                        ORDER BY id
                        """
                    )
                    return [
                        self.record_to_fish_request_out(record)
                        for record in result
                    ]
        except Exception:
            return {"message": "Unable to get fish requests"}


    def get_one_fish_request(self, fish_request_id:int) -> Optional[FishRequestOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    print("bruh")
                    result = db.execute(
                        """
                        SELECT id
                            , location
                            , fish
                            , picture_url
                        FROM fish_requests
                        WHERE id = %s
                        """,
                        [fish_request_id]
                    )
                    record = result.fetchone()
                if record is None:
                    return None
                return self.record_to_fish_request_out(record)
        except Exception as e:
            print(e)
            return {"message": "Fish request not found"}


    def create_fish_request(self, fish_request: FishRequestIn) -> Union[FishRequestOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO fish_requests (location, fish, picture_url)
                        VALUES (%s, %s, %s)
                        RETURNING id;
                        """,
                    [fish_request.location, fish_request.fish, fish_request.picture_url]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_fish_request_in_to_out(id, fish_request)
        except Exception:
            print("Create fish request did not work")
            return None


    def delete_fish_request(self, fish_request_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from fish_requests
                        WHERE id = %s
                        """,
                        [fish_request_id]
                    )
                    return True
        except Exception:
            return {"message": "Fish request does not exists"}


    def record_to_fish_request_in_to_out(self, id: int, fish_request: FishRequestIn):
        old_data = fish_request.dict()
        return FishRequestOut(id=id, **old_data)


    def record_to_fish_request_out(self, record):
        return FishRequestOut(
            id=record[0],
            location=record[1],
            fish=record[2],
            picture_url=record[3],
        )
