from fastapi import APIRouter, Depends, Response, Request
from typing import List, Optional, Union
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from queries.posts import Error, PostIn, PostOut, PostRepository
from queries.users import UserOut


class AccountToken(Token):
    account: UserOut


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print(account_data)
    return True


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    user: UserOut = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": user,
        }


@router.post("/api/posts", response_model=Union[PostOut, Error])
def create_post(
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response = repo.create_post(post)
    if not response:
        response.status_code = 400
    else:
        return response


@router.delete("/api/posts/{post_id}", response_model=bool)
def delete_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    response = repo.delete(post_id)
    if not response:
        response.status_code = 400
    return response


@router.put("/api/posts/{post_id}", response_model=Union[PostOut, Error])
def update_post(
    post_id: int,
    post: PostIn,
    response: Response,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> Union[PostOut, Error]:
    response = repo.update_post(post_id, post)
    if not response:
        response.status_code = 400
    return response


@router.get("/api/posts", response_model=Union[List[PostOut], Error])
def get_all_posts(
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_posts()


@router.get("/api/posts/{post_id}", response_model=Optional[PostOut])
def get_one_post(
    post_id: int,
    response: Response,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> PostOut:
    post = repo.get_one_post(post_id)
    if not post:
        response.status_code = 400
    return post
