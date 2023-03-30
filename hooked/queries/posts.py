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
    created_at: date

class PostOut(BaseModel):
    id: int
    user_id: int
    location: str
    fish: str
    description: str
    picture_url: str
    created_at: date

class PostRepository:
    def get_all_posts(self) -> Union[List[PostOut], Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, location, fish, description, picture_url, created_at
                        FROM posts
                        ORDER BY id DESC
                        """
                    )
                    return [
                        self.record_to_post_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return None

    def create_post(self, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO posts (user_id, location, fish, description, picture_url, created_at)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id;
                        """
                    ,
                    [post.user_id, post.location, post.fish, post.description, post.picture_url, post.created_at]
                    )
                    id = result.fetchone()[0]
                    if id is None:
                        return None
                    return self.record_to_post_in_to_out(id, post)

        except Exception as e:
            print("Create did not work", e)
            return None

    def get_one_post(self, post_id: int) -> Optional[PostOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, location, fish, description, picture_url, created_at
                        FROM posts
                        WHERE id = %s
                        """,
                        [post_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_post_out(record)
        except Exception as e:
            print(e)
            return {"message": "Post not found"}

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

    def update_post(self, post_id: int, post: PostIn) -> Union[PostOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE posts
                        SET user_id = %s, location = %s, fish = %s, description = %s, picture_url = %s
                        WHERE id = %s
                        """
                    ,
                    [post.user_id, post.location, post.fish, post.description, post.picture_url, post_id]
                    )
                    return self.record_to_post_in_to_out(post_id, post)
        except Exception as e:
            return {"message": "Update failed"}

    def record_to_post_in_to_out(self, id: int, post: PostIn):
        old_data = post.dict()
        return PostOut(id=id, **old_data)

    def record_to_post_out(self, record):
        return PostOut(
            id=record[0],
            user_id=record[1],
            location=record[2],
            fish=record[3],
            description=record[4],
            picture_url=record[5],
            created_at=record[6]
        )
