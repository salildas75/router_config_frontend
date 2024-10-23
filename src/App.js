// import './App.css';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import { useEffect, useState } from "react";
import { configureAxios } from "./auth/config";
import { Auth } from "./auth/auth";
import { Path } from "./routes/route-config";
import PortalLayout from "./templates/layout/portal-layout";
import Unauthorized from "./pages/not-found/unauthorized";
import NotFound from "./pages/not-found/not-found";
import Users from "./pages/user-management/users/users";

function Index(props) {
  if (props.isAuthenticated) {
    return <Navigate to={Path.dashboard} />;
  }
  return <Navigate to={Path.login} />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const sessionClear = () => {
    localStorage.setItem(process.env.REACT_APP_USER_SESSION, "signout");
    configureAxios({ authToken: null, authCallback: authCallback });
    userHasAuthenticated(false);
    navigate(Path.login);
  };

  const handleLogout = () => {
    localStorage.setItem(process.env.REACT_APP_USER_SESSION, "signout");
    Auth.signout();
    configureAxios({ authToken: null, authCallback: authCallback });
    userHasAuthenticated(false);
    navigate(Path.login);
  };

  useEffect(() => {
    const result = Auth.currentSession();
    configureAxios({
      authToken: result == null ? null : result.access,
      authCallback: authCallback,
    });
  }, []);

  const authCallback = (response) => {
    localStorage.removeItem(process.env.REACT_APP_SESSION);
    localStorage.setItem(process.env.REACT_APP_USER_SESSION, "signout");
  };

  Auth.setAuthCallback(authCallback);

  useEffect(() => {
    try {
      const result = Auth.currentSession();
      if (result) {
        userHasAuthenticated(true, result);
      }
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }, []);

  const userHasAuthenticated = (authenticated, data = "") => {
    setIsAuthenticated(authenticated);
    setUser(data);
  };

  const guestPaths = [
    Path.login,
    Path.signup,
    Path.forget,
    Path.setPassword,
    Path.otp,
  ];

  const isGuestPath = (path) => {
    // Check if the path matches any of the guest paths
    return guestPaths.some((guestPath) => {
      if (guestPath.includes(":id")) {
        // Create a regex to match dynamic paths
        const regex = new RegExp(guestPath.replace(":id", "[a-zA-Z0-9]+"));
        return regex.test(path);
      }
      return guestPath === path;
    });
  };

  if (isAuthenticated) {
    if (isGuestPath(location.pathname)) {
      const { state } = location;
      if (state?.initialLocation) {
        return (
          <Navigate
            to={
              state.initialLocation.pathname +
              state.initialLocation.search +
              state.initialLocation.hash
            }
            state={state.initialLocation.state}
          />
        );
      } else {
        return (
          // if user logged in
          <Navigate
            to={Path.index}
            state={{ initialLocation: location }}
            replace
          />
        );
      }
    }
  } else {
    if (!isGuestPath(location.pathname)) {
      if (location.pathname === Path.index) {
        return (
          <Navigate
            to={Path.login}
            state={{ initialLocation: location }}
            replace
          />
        );
      }
      return (
        <Navigate
          to={Path.login}
          state={{ initialLocation: location }}
          replace
        />
      );
    }
  }

  const mainProps = {
    location: location,
    navigate: navigate,
    isAuthenticated: isAuthenticated,
    user: user,
    userHasAuthenticated: userHasAuthenticated,
    handleLogout: handleLogout,
    sessionClear: sessionClear,
    featureList: user.featureList,
  };
  return (
    <Routes>
      <Route path={Path.index} element={<Index {...mainProps} />} />
      <Route path={Path.login} element={<Login {...mainProps} />} />
      <Route path={Path.index} element={<PortalLayout {...mainProps} />}>
        <Route index element={<Navigate to={Path.dashboard} />} />
        <Route path={Path.dashboard} element={<Dashboard {...mainProps} />} />
        <Route path={Path.users} element={<Users />} />
      </Route>
      {/* Finally, catch all unmatched routes */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
