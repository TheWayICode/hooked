from fastapi import APIRouter, Depends, Response
from typing import List, Optional, Union
from queries.locations import (
    Error,
    LocationIn,
    LocationOut,
    LocationRepository
)


router = APIRouter()


@router.get('/api/locations', response_model=Union[List[LocationOut], Error])
def get_all_locations(
    repo: LocationRepository = Depends()
):
    return repo.get_all_locations()

@router.post('/api/locations', response_model=Union[LocationOut, Error])
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
