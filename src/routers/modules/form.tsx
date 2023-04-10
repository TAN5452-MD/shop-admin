import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 用户管理模块
const formRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/form/basicForm",
        element: lazyLoad(React.lazy(() => import("@/views/form/basicForm/index"))),
        meta: {
          requiresAuth: true,
          title: "用户管理",
          key: "basicForm"
        }
      }
    ]
  }
];

export default formRouter;
