import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProjectListScreen } from "./screens/project-list"
import { AuthenticatedApp } from './authenticated-app';
import { UnauthenticatedApp } from './unauthenticated-app';
import { useAuth } from './context/auth-context';

function App() {
  const {user} = useAuth()
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {user ? <AuthenticatedApp />:<UnauthenticatedApp />}
    </div>
  );
}

export default App;
