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
    fish_id: str
    picture_url: str
    description: str

class LocationOut(BaseModel):
    id:int
    state: str
    city: str
    type_of_fishing: str
    fish_id: str
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
                        INSERT INTO location (state, city, type_of_fishing, fish_id, picture_url, description)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [location.state, location.city, location.type_of_fishing, location.fish_id, location.picture_url, location.description]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None

                    return self.record_to_location_in_to_out(id, location)
        except Exception as e:
            print("Create Location did not work", e)
            return None

    def update_location(self, location_id: int, location: LocationIn) -> Union[LocationOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE location
                        SET state = %s, city = %s, type_of_fishing = %s, fish = %s, picture_url = %s, description = %s
                        WHERE id = %s
                        """
                    ,
                    [location.state, location.city, location.type_of_fishing, location.fish, location.picture_url, location.description, location_id]
                    )
                    return self.record_to_location_in_to_out(location_id, location)
        except Exception as e:
            return {"message": "Update location failed"}


    def get_one_location(self,location_id: int) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT l.id, l.state, l.city, l.type_of_fishing, f.name, l.picture_url, l.description
                        FROM location l
                        JOIN fish f ON l.fish_id = f.id
                        WHERE l.id = %s
                        """,
                        [location_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    with conn.cursor() as fish_cursor:
                        fish_cursor.execute(
                            """
                            SELECT name
                            FROM fish
                            WHERE fish_id = %s;
                            """,
                            [location_id]
                        )
                        matching_fish = fish_cursor.fetchall()
                        fish_list = []
                        for fish in matching_fish:
                            fish_list.append({"name": fish[0]})

                    return self.record_to_location_out(record, fish_list)
        except Exception as e:
            print(e)
            return {"message": "Location not found"}

    def delete_location(self, location_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from location
                        WHERE id = %s
                        """,
                        [location_id]
                    )
                    return True
        except Exception:
            return {"message": "Location does not exist"}

    def record_to_location_in_to_out(self, id: int, location: LocationIn):
        old_data = location.dict()
        return LocationOut(id=id, **old_data)

    def record_to_location_out(self, record, matching_fish):
        return LocationOut(
            id=record[0],
            state=record[1],
            city=record[2],
            type_of_fishing=record[3],
            fish_id=record[4],
            picture_url=record[5],
            description=record[6],
            fish=matching_fish
            )
