from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool



class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    name: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str

class UserRepository:
    def get_all_users(self) -> Optional[UserOut]:
        try:
            with pool.getconn() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name, email
                        FROM users
                        ORDER BY id
                        """
                    )
                    return [
                        self.record_to_user_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return None

    def create_user(self, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.getconn() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (name, email, password)
                        VALUES (%s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [user.name, user.email, user.password]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_user_in(id, user)

        except Exception as e:
            print("Create did not work", e)
            return None



    def record_to_user_in(self, id: int, user: UserIn):
        old_data = user.dict()
        return UserOut(id=id, **old_data)


    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            name=record[1],
            email=record[2],
        )
