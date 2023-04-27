from fastapi.testclient import TestClient
from main import app
from queries.locations import LocationRepository
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class UserOut(BaseModel):
    id: str
    name: str
    email: str


class MockUserRepo:
    def get_all_locations(self):
        return [
            {
                "id": 1,
                "name": "Santa Monica Pier",
                "state": "California",
                "city": "Santa Monica",
                "picture_url": "pic.png",
                "description": "description",
            }
        ]


def mock_get_user():
    return UserOut(id=1, name="admin", email="admin@email.com")


def test_get_all_locations():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_user
    app.dependency_overrides[LocationRepository] = MockUserRepo
    response = client.get("/api/locations")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [
            {
                "id": 1,
                "name": "Santa Monica Pier",
                "state": "California",
                "city": "Santa Monica",
                "picture_url": "pic.png",
                "description": "description",
            }
        ]
    else:
        assert response.status_code == 404
        assert response.json() == "No locations found"
