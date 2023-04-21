from pydantic import BaseModel
from typing import List, Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class LocationIn(BaseModel):
    name: str
    state: str
    city: str
    picture_url: str
    description: str


class LocationOut(BaseModel):
    id:int
    name: str
    state: str
    city: str
    picture_url: str
    description: str


class LocationOutWithFish(LocationOut):
    fish: List[dict] = []


class LocationRepository:
    def get_all_locations(self) -> Optional[LocationOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, state, city, picture_url, description
                        FROM location
                        ORDER BY name DESC
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
                        INSERT INTO location (name, state, city, picture_url, description)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [location.name, location.state, location.city, location.picture_url, location.description]
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
                    result = db.execute(
                        """
                        SELECT *
                        FROM location
                        WHERE id = %s
                        """,
                        [location_id]
                    )
                    fetching = result.fetchone()
                    if not fetching:
                        return {"message": "location does not exist"}
                    db.execute(
                        """
                        UPDATE location
                        SET name = %s, state = %s, city = %s, picture_url = %s, description = %s
                        WHERE id = %s
                        """
                    ,
                    [location.name, location.state, location.city, location.picture_url, location.description, location_id]
                    )
                    return self.record_to_location_in_to_out(location_id, location)
        except Exception:
            return {"message": "Update location failed"}


    def get_one_location(self, location_id: int) -> Optional[LocationOutWithFish]:
            try:
                with pool.connection() as conn:
                    with conn.cursor() as db:
                        result = db.execute(
                            """
                            SELECT id, name, state, city, picture_url, description
                            FROM location
                            WHERE id = %s
                            """,
                        [location_id]
                        )
                        record = result.fetchone()
                        if record is None:
                            return None
                        fish_result = db.execute(
                            """
                            SELECT fish.name, fish.size, fish.fishing_technique, fish.type
                            FROM fish
                            JOIN location_fish ON fish.id = location_fish.fish_id
                            JOIN location ON location.id = location_fish.location_id
                            WHERE location.id = %s;
                            """,
                            [location_id]
                        )
                        fish_records = fish_result.fetchall()
                        fish_list = []
                        for fish_record in fish_records:
                            fish_list.append({
                                "name": fish_record[0],
                                "size": fish_record[1],
                                "fishing_technique": fish_record[2],
                                "type": fish_record[3]
                            })
                        return self.record_to_location_out_with_fish(record, fish_list)
            except Exception as e:
                print(e)
                return {"message": "Location not found"}


    def delete_location(self, location_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from location_fish
                        WHERE location_id = %s
                        """,
                        [location_id]
                    )
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


    def record_to_location_out(self, record):
        return LocationOut(
            id=record[0],
            name=record[1],
            state=record[2],
            city=record[3],
            picture_url=record[4],
            description=record[5],
        )


    def record_to_location_out_with_fish(self, record, fish_list):
        return LocationOutWithFish(
            id=record[0],
            name=record[1],
            state=record[2],
            city=record[3],
            picture_url=record[4],
            description=record[5],
            fish=fish_list
        )
