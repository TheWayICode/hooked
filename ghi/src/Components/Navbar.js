import React from "react";

import { LoggedNav } from "./NavLog/LoggedNav";
import { LogoutNav } from "./NavLog/LoggedOutNav";
import useToken from "@galvanize-inc/jwtdown-for-react";

function Navbar() {
  const { token } = useToken();

  return <>{token ? <LoggedNav /> : <LogoutNav />}</>;
}

export default Navbar;
