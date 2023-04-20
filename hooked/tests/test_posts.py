from fastapi.testclient import TestClient
from main import app
from queries.posts import PostRepository
from authenticator import authenticator
from pydantic import BaseModel

client = TestClient(app)


class UserOut(BaseModel):
     id: str
     name: str
     email: str

class MockPostRepo:
    def get_all_posts(self):
        return [
            {
                "id": 1,
                "user_id": 1,
                "location": "admin",
                "fish": "admin",
                "description": "admin",
                "picture_url": "admin",
                "created_at": "2023-04-20"
            }
        ]

def mock_get_user():
        return UserOut(id=1, name="admin", email="admin@email.com")

def test_get_all_posts():
    app.dependency_overrides[authenticator.get_current_account_data] = mock_get_user
    app.dependency_overrides[PostRepository] = MockPostRepo
    response = client.get("/api/posts")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [{
            "id": 1,
            "user_id": 1,
            "location": "admin",
            "fish": "admin",
            "description": "admin",
            "picture_url": "admin",
            "created_at": "2023-04-20"
        }]
    else:
        assert response.status_code == 404
        assert response.json() == "No posts found"
