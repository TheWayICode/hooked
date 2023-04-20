from fastapi.testclient import TestClient
from main import app
from queries.locations import LocationRepository

client = TestClient(app)

class MockUserRepo:
    def get_all_locations(self):
        return [
            {
                "id": 1,
                "name": "Santa Monica Pier",
                "state": "California",
                "city": "Santa Monica",
                "picture_url": "pic.png",
                "description": "description"
            }
        ]

def test_get_all_locations():
    app.dependency_overrides[LocationRepository] = MockUserRepo
    response = client.get("/api/locations")
    app.dependency_overrides = {}
    if response.status_code == 200:
        assert response.json() == [{
            "id": 1,
            "name": "Santa Monica Pier",
            "state": "California",
            "city": "Santa Monica",
            "picture_url": "pic.png",
            "description": "description"
        }]
    else:
        assert response.status_code == 404
        assert response.json() == "No locations found"
