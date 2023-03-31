from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.fish import (
    Error,
    FishIn,
    FishOut,
    FishRepository
)

router = APIRouter()




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
