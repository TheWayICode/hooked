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
