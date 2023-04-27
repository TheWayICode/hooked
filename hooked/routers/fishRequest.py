from fastapi import APIRouter, Depends, Response, Request
from typing import List, Optional, Union
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from queries.fishRequest import (
    Error,
    FishRequestIn,
    FishRequestOut,
    FishRequestsRepository,
)
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


@router.get(
    "/api/fish_requests", response_model=Union[List[FishRequestOut], Error]
)
def get_all_fish_requests(
    repo: FishRequestsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_fish_requests()


@router.get(
    "/api/fish_requests/{fish_request_id}",
    response_model=Optional[FishRequestOut],
)
def get_one_fish_request(
    fish_request_id: int,
    response: Response,
    repo: FishRequestsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> FishRequestOut:
    fish_request = repo.get_one_fish_request(fish_request_id)
    if not fish_request:
        response.status_code = 400
    else:
        return fish_request


@router.post("/api/fish_requests", response_model=Union[FishRequestOut, Error])
def create_fish_request(
    fish_request: FishRequestIn,
    response: Response,
    repo: FishRequestsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response = repo.create_fish_request(fish_request)
    if not fish_request:
        response.status_code = 400
    else:
        return response


@router.delete("/api/fish_requests/{fish_request_id}", response_model=bool)
def delete_fish_request(
    fish_request_id: int,
    response: Response,
    repo: FishRequestsRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    response = repo.delete_fish_request(fish_request_id)
    if not response:
        response.status_code = 400
    else:
        return response
