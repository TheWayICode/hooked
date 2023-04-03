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

class DuplicateUserError(ValueError):
    pass

class UserOutWithPassword(UserOut):
    hashed_password: str


class UserRepository:

    def get_one(self, email: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , name
                            , email
                            , hashed_password
                        FROM users
                        WHERE email = %s
                        """,
                        [email]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_hashed_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "User not found"}


    def get_all_users(self) -> Union[UserOutWithPassword, Error]:
        try:
            with pool.connection() as conn:
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


    def create_user(self, user: UserIn, hashed_password: str) -> UserOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users (name, email, hashed_password)
                        VALUES (%s, %s, %s)
                        RETURNING id;
                        """,
                    [user.name, user.email, hashed_password]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_user_in_to_out(id, user, hashed_password)
        except Exception as e:
            print("Create did not work", e)
            return None


    def update(self, user_id: int, user: UserIn) -> Union[UserOut, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        UPDATE users
                        SET name = %s, email = %s
                        WHERE id = %s
                        """,
                        [user.name, user.email, user_id]
                    )
                    return self.record_to_user_in_to_out(user_id, user)
        except Exception as e:
            return {"message": "User could not be updated"}


    def delete_user(self, user_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            return {"message": "User does not exists"}


    def record_to_user_in_to_out(self, id: int, user: UserIn, hashed_password: str):
        old_data = user.dict()
        return UserOutWithPassword(id=id, hashed_password=hashed_password,**old_data)


    def record_to_user_out(self, record):
            return UserOut(
                id=record [0],
                name=record[1],
                email=record[2]
            )


    def record_to_hashed_user_out(self, record):
        return UserOutWithPassword(
            id=record [0],
            name=record[1],
            email=record[2],
            hashed_password=record[3],
        )

    def record_to_user_with_pw_out(self, record):
        return UserOut(
            id=record [0],
            hashed_password=record[1],
        )
