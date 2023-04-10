import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 超级表格模块
const proTableRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/proTable/useHooks",
        element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks/index"))),
        meta: {
          title: "分类管理",
          key: "useHooks"
        }
      }
    ]
  }
];

export default proTableRouter;
