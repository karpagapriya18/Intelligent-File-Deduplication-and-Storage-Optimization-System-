import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AuditLogs from "./pages/AuditLogs";
import Dashboard from "./pages/Dashboard";
import DeletionHistory from "./pages/DeletionHistory";
import Duplicates from "./pages/Duplicates";
import Files from "./pages/Files";
import Login from "./pages/Login";
import StorageAnalytics from "./pages/StorageAnalytics";

function RequireAuth({ children }: { children: JSX.Element }) {
  return localStorage.getItem("token") ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="files" element={<Files />} />
        <Route path="duplicates" element={<Duplicates />} />
        <Route path="deletion-history" element={<DeletionHistory />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="storage-analytics" element={<StorageAnalytics />} />
      </Route>
    </Routes>
  );
}
