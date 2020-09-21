import React from "react";

import AuthService from "./services/auth.service";
import Routing from "./routes";

import { FlexContainerCenter } from "./components/containers";

function App() {
  return (
    <AuthService>
      <FlexContainerCenter>
        <Routing />
      </FlexContainerCenter>
    </AuthService>
  );
}

export default App;
