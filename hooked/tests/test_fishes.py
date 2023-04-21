from fastapi.testclient import TestClient
from main import app
from queries.fish import FishRepository

client = TestClient(app)

class MockUserRepo:
    def get_all_fish(self):
        return [
            {
                "id": 1,
                "name": "Mackerel",
                "size": "Medium",
                "fishing_technique": "Hard",
                "type": "Seawater"
            }
        ]

def test_get_all_fish():
    app.dependency_overrides[FishRepository] = MockUserRepo
    response = client.get("/api/fish")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [{
            "id": 1,
            "name": "Mackerel",
            "size": "Medium",
            "fishing_technique": "Hard",
            "type": "Seawater"
        }]
    else:
        assert response.status_code == 404
        assert response.json() == "No fish found"
