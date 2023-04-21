from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import posts, users, locations, fish, fishRequest
from authenticator import authenticator

import os

app = FastAPI()
app.include_router(users.router)
app.include_router(posts.router)
app.include_router(locations.router)
app.include_router(fish.router)
app.include_router(fishRequest.router)
app.include_router(authenticator.router)

origins = [
    "http://localhost:3000",
    "https://hooked2.gitlab.io",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
