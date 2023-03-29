from pydantic import BaseModel
from typing import List, Optional, Union
from datetime import date
from queries.pool import pool



class Error(BaseModel):
    message: str

class PostIn(BaseModel):
    user_id: int
    location: str
    fish: str
    description: str
    picture_url: str

class PostOut(BaseModel):
    id: int
    user_id: int
    location: str
    fish: str
    description: str
    picture_url: str

class PostRepository:
    def create_post(self, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.getconn() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO posts (user_id, location, fish, description, picture_url)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [post.user_id, post.location, post.fish, post.description, post.picture_url]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_post_in_to_out(id, post)

        except Exception as e:
            print("Create did not work", e)
            return None

    def record_to_post_in_to_out(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)


    def record_to_post_out(self, record):
        return PostOut(
            id=record[0],
            name=record[1],
            email=record[2],
        )
