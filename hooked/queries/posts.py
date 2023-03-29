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


    def delete(self, post_id: int) -> Union[bool, Error]:
        try:
            with pool.connection() as connection:
                with connection.cursor() as db:
                    db.execute(
                        """
                        DELETE from posts
                        WHERE id = %s
                        """,
                        [post_id]
                    )
                    return True
        except Exception:
            return {"message": "Post does not exist"}

    def record_to_post_in_to_out(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)
