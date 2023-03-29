from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.posts import (
    Error,
    PostIn,
    PostOut,
    PostRepository
)

router = APIRouter()

@router.post('/api/posts', response_model=Union[PostOut, Error])
def create_post(
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends(),
):
    response = repo.create_post(post)
    if response is None:
        response.status_code = 400
    else:
        return response

@router.put("/api/posts/{post_id}", response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends()
):
    response = repo.update_post(post_id, post)
    if response is None:
        response.status_code = 400
    return response

@router.get('/api/posts', response_model=Union[List[PostOut], Error])
def get_all_posts(
    repo: PostRepository = Depends()
):
    return repo.get_all_posts()
