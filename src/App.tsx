import React from 'react';
import './App.css';
import { AuthenticatedApp } from 'authenticated-app';
import { UnautenticatedApp } from 'unauthenticated-app';
import {useAuth} from "./context/auth-context"

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnautenticatedApp />}
    </div>
  );
}

export default App;
