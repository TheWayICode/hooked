from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.fishRequest import (
    Error,
    FishRequestIn,
    FishRequestOut,
    FishRequestsRepository,
)


router = APIRouter()


@router.get(
    "/api/fish_requests", response_model=Union[List[FishRequestOut], Error]
)
def get_all_fish_requests(repo: FishRequestsRepository = Depends()):
    return repo.get_all_fish_requests()


@router.get(
    "/api/fish_requests/{fish_request_id}",
    response_model=Optional[FishRequestOut],
)
def get_one_fish_request(
    fish_request_id: int,
    response: Response,
    repo: FishRequestsRepository = Depends(),
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
) -> bool:
    response = repo.delete_fish_request(fish_request_id)
    if not response:
        response.status_code = 400
    else:
        return response
