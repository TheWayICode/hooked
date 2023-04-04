from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from authenticator import authenticator
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
    account_data: dict = Depends(authenticator.get_current_account_data)
):
    response = repo.create_post(post)
    if not response:
        response.status_code = 400
    else:
        return response

@router.delete("/api/posts/{post_id}", response_model= bool)
def delete_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
)-> bool:
    response = repo.delete(post_id)
    if not response:
        response.status_code = 400
    return response

@router.put("/api/posts/{post_id}", response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends()
) -> Union[PostOut, Error]:
    response = repo.update_post(post_id, post)
    if not response:
        response.status_code = 400
    return response

@router.get('/api/posts', response_model=Union[List[PostOut], Error])
def get_all_posts(
    repo: PostRepository = Depends()
):
    return repo.get_all_posts()

@router.get('/api/posts/{user_id}', response_model=Union[List[PostOut], Error])
def get_all_user_posts(
    user_id: int,
    repo: PostRepository = Depends()
):
    return repo.get_all_user_posts(user_id)

@router.get('/api/posts/{post_id}', response_model=Optional[PostOut])
def get_one_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
) -> PostOut:
    post = repo.get_one_post(post_id)
    if not post:
        response.status_code = 400
    return post
