from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import posts, users, locations

import os

app = FastAPI()
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(locations.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
