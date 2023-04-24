import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserRepository, UserOutWithPassword, UserOut


class ExampleAuthenticator(Authenticator):
    async def get_account_data(
        self,
        email: str,
        repo: UserRepository,
    ):
        return repo.get_one(email)

    def get_account_getter(
        self,
        accounts: UserRepository = Depends(),
    ):
        return accounts

    def get_hashed_password(self, account: UserOutWithPassword):
        return account["hashed_password"]

    def get_account_data_for_cookie(self, account: UserOut):
        return account["email"], UserOut(**account)


authenticator = ExampleAuthenticator(os.environ["SIGNING_KEY"])
