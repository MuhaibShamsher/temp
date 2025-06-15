import "bootstrap/dist/css/bootstrap.min.css";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { BeforeLoginRoute, ProtectedRoute } from "./Helper/Routing.js";
import { scanDataApi } from "./Helper/helper.js";
import NotFound from "./components/NotFound";
import { authActions } from "./store/auth/authSlice.js";

const Dashboard = lazy(() => import("./pages/Home/index.js"));
const RootLayout = lazy(() => import("./pages/Root/index.js"));
const LoginPage = lazy(() => import("./pages/Login/index.js"));
const AssetsPage = lazy(() => import("./pages/Assets/index.js"));
const ErrorPage = lazy(() => import("./pages/Error/index.js"));
const UsersPage = lazy(() => import("./pages/Users/index.js"));
const AlertsPage = lazy(() => import("./pages/Alerts/index.js"));
const SettingsPage = lazy(() => import("./pages/Settings/index.js"));
const RisksPage = lazy(() => import("./pages/Risks/index.js"));
const TopologyPage = lazy(() => import("./pages/Topology/index.js"));
const AssetDetailsPage = lazy(() => import("./pages/AssetDetails/index.js"));
const RiskDetailsPage = lazy(() => import("./pages/RiskDetails/index.js"));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100); // Delay slightly to ensure content is fully rendered

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  const dispatch = useDispatch();
  const { scanRange, isLogin, isAlertSocketConnected, isScanSocketConnected } =
    useSelector((state) => state.authReducer);
  useEffect(() => {
    if (isLogin) {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/scan_results/");
      // const ws = new WebSocket(
      //   "wss://187tjgl0-8000.inc1.devtunnels.ms/ws/scan_results/"
      // );
      // const ws = new WebSocket(
      //   "wss://7ac8-202-47-41-36.ngrok-free.app/ws/scan_results/"
      // );

      ws.onopen = () => {
        console.log("Scan results WebSocket connected");
        dispatch(authActions.setIsScanSocketConnnected(true));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        dispatch(authActions.setIsScanning(false));
        console.log("scan socket message", message);
        setTimeout(() => {
          dispatch(authActions.setScanData(message));
        }, 2000);
      };

      ws.onclose = () => {
        console.log("Scan results WebSocket disconnected");
        dispatch(authActions.setIsScanSocketConnnected(false));
      };

      return () => {
        ws.close();
      };
    }
  }, [isLogin]);

  // for alerts
  useEffect(() => {
    if (isLogin) {
      const ws = new WebSocket("ws://127.0.0.1:8000/ws/alerts/");
      // const ws = new WebSocket(
      //   "wss://187tjgl0-8000.inc1.devtunnels.ms/ws/alerts/"
      // );
      // const ws = new WebSocket(
      //   "wss://7ac8-202-47-41-36.ngrok-free.app/ws/alerts/"
      // );

      ws.onopen = () => {
        console.log("Alerts WebSocket connected");
        dispatch(authActions.setIsAlertSocketConnected(true));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("alerts socket message", message);
        setTimeout(() => {
          dispatch(authActions.setAlertsData(message));
          dispatch(authActions.setAlertsPromptData(message));
        }, 2000);
      };

      ws.onclose = () => {
        console.log("Alerts WebSocket disconnected");
        dispatch(authActions.setIsAlertSocketConnected(false));
      };

      return () => {
        ws.close();
      };
    }
  }, [isLogin]);

  useEffect(() => {
    if (
      isLogin &&
      scanRange !== "" &&
      isScanSocketConnected &&
      isAlertSocketConnected
    ) {
      scanDataApi(scanRange, dispatch);
    } else {
      dispatch(authActions.setIsScanning(false));
    }
  }, [scanRange, isLogin, isScanSocketConnected, isAlertSocketConnected]);

  useEffect(() => {
    setTimeout(() => {
      if (
        isLogin &&
        scanRange !== "" &&
        isScanSocketConnected &&
        isAlertSocketConnected
      ) {
        scanDataApi(scanRange);
      }
    }, 180000);
  }, []);

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100vh",
            backgroundColor: "var(--black-color)",
          }}
        ></div>
      }
    >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route
            path="/login"
            element={
              <BeforeLoginRoute>
                <LoginPage />
              </BeforeLoginRoute>
            }
          ></Route>
          <Route path="/" element={<RootLayout />}>
            <Route
              index={true}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <AssetsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/assets/:ip"
              element={
                <ProtectedRoute>
                  <AssetDetailsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/risk/:ip"
              element={
                <ProtectedRoute>
                  <RiskDetailsPage />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/alerts"
              element={
                <ProtectedRoute>
                  <AlertsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/risks"
              element={
                <ProtectedRoute>
                  <RisksPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <UsersPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/topology/:ip"
              element={
                <ProtectedRoute>
                  <TopologyPage />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
