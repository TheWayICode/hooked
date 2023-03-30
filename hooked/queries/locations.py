from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool

class Error(BaseModel):
    message: str

class LocationIn(BaseModel):
    state: str
    city: str
    type_of_fishing: str
    fish: str
    picture_url: str
    description: str

class LocationOut(BaseModel):
    id:int
    state: str
    city: str
    type_of_fishing: str
    fish: str
    picture_url: str
    description: str

class LocationRepository:
    def get_all_locations(self) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, state, city, type_of_fishing, fish, picture_url, description
                        FROM location
                        ORDER BY state DESC
                        """
                    )
                    return [
                        self.record_to_location_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return None

    def create_location(self, location: LocationIn) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO location (state, city, type_of_fishing, fish, picture_url, description)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [location.state, location.city, location.type_of_fishing, location.fish, location.picture_url, location.description]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_location_in_to_out(id, location)
        except Exception as e:
            print("Create Location did not work", e)
            return None

    def record_to_location_in_to_out(self, id: int, location: LocationIn):
        old_data = location.dict()
        return LocationOut(id=id, **old_data)

    def record_to_location_out(self,record):
        return LocationOut(
            id=record[0],
            state=record[1],
            city=record[2],
            type_of_fishing=record[3],
            fish=record[4],
            picture_url=record[5],
            description=record[6],
            )
