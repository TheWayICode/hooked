from fastapi.testclient import TestClient
from main import app
from queries.fish import FishRepository
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class UserOut(BaseModel):
    id: str
    name: str
    email: str


class MockUserRepo:
    def get_all_fish(self):
        return [
            {
                "id": 1,
                "name": "Mackerel",
                "size": "Medium",
                "fishing_technique": "Hard",
                "type": "Seawater",
            }
        ]


def mock_get_user():
    return UserOut(id=1, name="admin", email="admin@email.com")


def test_get_all_fish():
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = mock_get_user
    app.dependency_overrides[FishRepository] = MockUserRepo
    response = client.get("/api/fish")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [
            {
                "id": 1,
                "name": "Mackerel",
                "size": "Medium",
                "fishing_technique": "Hard",
                "type": "Seawater",
            }
        ]
    else:
        assert response.status_code == 404
        assert response.json() == "No fish found"
