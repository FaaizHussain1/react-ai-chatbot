import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AgentDetailsPage } from "./agent-details";
import { AgentsPage } from "./agents";
import { AnalyticsPage } from "./analytics";
import { DashboardPage } from "./dashboard";
import { UsersPage } from "./users";

export default function Main() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="agents/:id" element={<AgentDetailsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
