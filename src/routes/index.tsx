import { useRoutes, Navigate } from "react-router-dom";
import { ElementType, lazy, Suspense } from "react";

import AdminLayout from "../layouts/AdminLayout";
import { EnhancedTable } from "../components/tables";
import { MAIN_PATH } from "./paths";

const Loadable = (Component: ElementType) => (props: any) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};


const MainRoutes = () => {
  const Login = Loadable(lazy(() => import("../pages/Login")));

  let routes = useRoutes([
    {
      path: MAIN_PATH.login,
      element: <Login />
    },

    {
      path: MAIN_PATH.admin,
      element: <AdminLayout />,
      children: [
        {
          children: [
            { path: "users", element: <EnhancedTable /> }
          ],
        },
      ],
    },
    {
      path: MAIN_PATH.root,
      element: <Navigate to={MAIN_PATH.login} replace />,
    },
  ]);
  return routes;
};

export default MainRoutes;
