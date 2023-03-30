from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserIn,
    UserOut,
    UserRepository
)


router = APIRouter()


@router.get('/api/users', response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserRepository = Depends()
):
    return repo.get_all_users()

@router.get('/api/users/{user_id}', response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    user = repo.get_one(user_id)
    if not user:
        response.status_code = 400
    else:
        return user

@router.post('/api/users', response_model=Union[UserOut, Error])
def create_user(
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
):
    response = repo.create_user(user)
    if not response:
        response.status_code = 400
    else:
        return response

@router.put("/api/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends()
) -> UserOut:
    response = repo.update(user_id, user)
    if not response:
        response.status_code = 400
    else:
        return response

@router.delete("/api/user/{user_id}", response_model =bool)
def delete_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
)->  bool:
    response = repo.delete_user(user_id)
    if not response:
        response.status_code=400
    else:
        return response
