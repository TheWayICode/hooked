from fastapi import APIRouter, Depends, Response, Request
from typing import List, Optional, Union
from authenticator import authenticator
from jwtdown_fastapi.authentication import Token
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationRepository,
    LocationOutWithFish,
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


@router.get("/api/locations", response_model=Union[List[LocationOut], Error])
def get_all_locations(
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    return repo.get_all_locations()


@router.post("/api/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    response: Response,
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    response = repo.create_location(location)
    if not location:
        response.status_code = 400
    else:
        return response


@router.put(
    "/api/locations/{location_id}", response_model=Union[LocationOut, Error]
)
def update_location(
    location_id: int,
    location: LocationIn,
    response: Response,
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> LocationOut:
    response = repo.update_location(location_id, location)
    if response is None:
        response.status_code = 400
    return response


@router.get(
    "/api/locations/{location_id}",
    response_model=Optional[LocationOutWithFish],
)
def get_one_location(
    location_id: int,
    response: Response,
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> LocationOutWithFish:
    location = repo.get_one_location(location_id)
    if location is None:
        response.status_code = 400
    return location


@router.delete("/api/locations/{location_id}", response_model=bool)
def delete_location(
    location_id: int,
    response: Response,
    repo: LocationRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
) -> bool:
    response = repo.delete_location(location_id)
    if response is None:
        response.status_code = 400
    return response
