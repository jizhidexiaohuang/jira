import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/project-list";
// import { AuthenticatedApp } from "./authenticated-app";
// import { UnauthenticatedApp } from "./unauthenticated-app";
import { useAuth } from "./context/auth-context";
import { FullPageErrorFallback } from "./components/lib";
import { ErrorBoundary } from "./components/error-boundary";

const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
