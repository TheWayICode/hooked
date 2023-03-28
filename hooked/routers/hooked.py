from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.hooked import (
    Error,
    UserIn,
    UserOut,
    UserRepository,
)


router = APIRouter()


@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserRepository = Depends()
):
    return repo.get_all_users()


@router.post('/api/users', response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
):

    response = repo.create_user(user)
    if response is None:
        response.status_code = 400
    else:
        return response
