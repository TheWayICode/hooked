from fastapi.testclient import TestClient
from main import app
from queries.users import UserRepository

client = TestClient(app)


class MockUserRepo:
    def get_all_users(self):
        return [{"id": 1, "name": "admin", "email": "admin@hooked.com"}]


def test_get_all_users():
    app.dependency_overrides[UserRepository] = MockUserRepo
    response = client.get("/api/users")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [
            {"id": 1, "name": "admin", "email": "admin@hooked.com"}
        ]
    else:
        assert response.status_code == 404
        assert response.json() == "No users found"
