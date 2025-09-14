import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Chat from "./pages/Chat";
function Layout({ children }) {
  const location = useLocation();
  const hideHeaderOn = ["/chat"]; 
  const showHeader = !hideHeaderOn.includes(location.pathname.toLowerCase());

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/privacypolicy"
        element={
          <Layout>
            <PrivacyPolicy/>
          </Layout>
        }
      />

      {/* Protected chat */}
      <Route
        path="/chat"
        element={
          <Layout>
            <ProtectedRoute>
              <Chat/>
            </ProtectedRoute>
          </Layout>
        }
      />
      
    </Routes>
  );
}

export default App;
