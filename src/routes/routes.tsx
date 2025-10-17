import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Layout from "@/layouts/Layout";
import SuspenseWrapper from "@/common/suspense/SuspenseWrapper";


const LoginPage = SuspenseWrapper(lazy(() => import("@/pages/auth/LoginPage")));
const DashboardPage = SuspenseWrapper(
  lazy(() => import("@/pages/dashboard/DasboardPage"))
);
const RequestPage = SuspenseWrapper(
  lazy(() => import("@/pages/request/RequestPage"))
);
const MyRequestPage = SuspenseWrapper(
  lazy(() => import("@/pages/myrequests/MyRequestPage"))
);
const EscalationPage = SuspenseWrapper(
  lazy(() => import("@/pages/escalation/EscalationPage"))
);
const RequestStatusPage = SuspenseWrapper(
  lazy(() => import("@/pages/requeststatus/RequestStatusPage"))
);

const ReportsPage = SuspenseWrapper(
  lazy(() => import("@/pages/reports/ReportsPage"))
);
const NotificationsPage = SuspenseWrapper(
  lazy(() => import("@/pages/notifications/NotificationPage"))
);
const SettingsPage = SuspenseWrapper(
  lazy(() => import("@/pages/settings/SettingsPage"))
);

const UnAuthorizedPage=SuspenseWrapper(lazy(()=>import("@/pages/unauthorized/UnAuthorizedPage")))

const routes = [
  {
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          { path: "dashboard", element: <DashboardPage /> },
          { path: "request", element: <RequestPage /> },
          { path: "myrequests", element: <MyRequestPage /> },
          { path: "escalation", element: <EscalationPage /> },
          { path: "requeststatus", element: <RequestStatusPage /> },
          { path: "reports", element: <ReportsPage /> },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "*", element: <UnAuthorizedPage /> },
          
        ],
      },
    ],
  },

  // Public routes
  {
    element: <PublicRoute />,
    children: [{ path: "auth/login", element: <LoginPage /> }],
  },

  // Catch-all
  { path: "*", element: <Navigate to="/auth/login" replace /> },
];

export default routes;
