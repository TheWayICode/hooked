from fastapi import APIRouter, Depends, Response, Request
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from typing import List, Optional, Union
from queries.fish import Error, FishIn, FishOut, FishRepository
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

@router.get("/api/fish", response_model=Union[List[FishOut], Error])
def get_all_fish(
    repo: FishRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_fish()


@router.get("/api/fish/{fish_id}", response_model=Optional[FishOut])
def get_one_fish(
    fish_id: int,
    response: Response,
    repo: FishRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> FishOut:
    fish = repo.get_one_fish(fish_id)
    if not fish:
        response.status_code = 400
    else:
        return fish


@router.post("/api/fish", response_model=Union[FishOut, Error])
def create_fish(
    fish: FishIn,
    location_fish_id: int,
    response: Response,
    repo: FishRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response = repo.create_fish(fish, location_fish_id)
    if not fish:
        response.status_code = 400
    else:
        return response


@router.delete("/api/fish/{fish_id}", response_model=bool)
def delete_fish(
    fish_id: int,
    response: Response,
    repo: FishRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    response = repo.delete_fish(fish_id)
    if not response:
        response.status_code = 400
    else:
        return response


@router.put("/api/fish/{fish_id}", response_model=Union[FishOut, Error])
def update_fish(
    fish_id: int,
    fish: FishIn,
    response: Response,
    repo: FishRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> FishOut:
    response = repo.update_fish(fish_id, fish)
    if not response:
        response.status_code = 400
    else:
        return response
