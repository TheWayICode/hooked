from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationRepository,
    LocationOutWithFish,
)


router = APIRouter()


@router.get("/api/locations", response_model=Union[List[LocationOut], Error])
def get_all_locations(repo: LocationRepository = Depends()):
    return repo.get_all_locations()


@router.post("/api/locations", response_model=Union[LocationOut, Error])
def create_location(
    location: LocationIn,
    response: Response,
    repo: LocationRepository = Depends(),
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
) -> bool:
    response = repo.delete_location(location_id)
    if response is None:
        response.status_code = 400
    return response
