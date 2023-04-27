from fastapi import (
    APIRouter,
    Depends,
    Response,
    Request,
    HTTPException,
    status,
)
from typing import List, Optional, Union
from queries.users import (
    Error,
    UserIn,
    UserOut,
    UserRepository,
    DuplicateUserError,
)
from queries.posts import (
    PostRepository,
    PostOut,
)

from jwtdown_fastapi.authentication import Token
from authenticator import authenticator
from pydantic import BaseModel


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: UserOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/api/protected", response_model=bool)
async def get_protected(
    account_data: dict = Depends(authenticator.get_current_account_data),
):
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


@router.get("/api/users", response_model=Union[List[UserOut], Error])
def get_all_users(
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_users()


@router.get("/api/users/{email}", response_model=Optional[UserOut])
def get_one_user(
    email: str,
    response: Response,
    repo: UserRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> UserOut:
    user = repo.get_one(email)
    if not user:
        response.status_code = 400
    else:
        return user


@router.get(
    "/api/user/posts/{user_id}", response_model=Union[List[PostOut], Error]
)
def get_all_user_posts(
    user_id: int,
    repo: PostRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_user_posts(user_id)


@router.post("/api/users", response_model=AccountToken | HttpError)
async def create_user(
    info: UserIn,
    request: Request,
    response: Response,
    repo: UserRepository = Depends(),
):
    hashed_password = authenticator.hash_password(info.password)
    try:
        account = repo.create_user(info, hashed_password)
    except DuplicateUserError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )
    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.put("/api/users/{user_id}", response_model=Union[UserOut, Error])
def update_user(
    user_id: int,
    user: UserIn,
    response: Response,
    repo: UserRepository = Depends(),
) -> UserOut:
    response = repo.update(user_id, user)
    if not response:
        response.status_code = 400
    else:
        return response


@router.delete("/api/user/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    response: Response,
    repo: UserRepository = Depends(),
) -> bool:
    response = repo.delete_user(user_id)
    if not response:
        response.status_code = 400
    else:
        return response
