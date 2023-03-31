from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.fish import (
    Error,
    FishIn,
    FishOut,
    FishRepository
)

router = APIRouter()

@router.get('/api/fish', response_model=Union[List[FishOut], Error])
def get_all_fish(
    repo: FishRepository = Depends()
):
    return repo.get_all_fish()

@router.post('/api/fish', response_model=Union[FishOut, Error])
def create_fish(
    fish: FishIn,
    response: Response,
    repo: FishRepository = Depends(),
):
    response = repo.create_fish(fish)
    if not fish:
        response.status_code = 400
    else:
        return response

@router.delete("/api/fish/{fish_id}", response_model =bool)
def delete_fish(
    fish_id: int,
    response: Response,
    repo: FishRepository = Depends(),
)->  bool:
    response = repo.delete_fish(fish_id)
    if not response:
        response.status_code=400
    else:
        return response

@router.put("/api/fish/{fish_id}", response_model=Union[FishOut, Error])
def update_fish(
    fish_id: int,
    fish: FishIn,
    response: Response,
    repo: FishRepository = Depends()
) -> FishOut:
    response = repo.update_fish(fish_id, fish)
    if not response:
        response.status_code=400
    else:
        return response
