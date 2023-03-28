import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dashboard/embedded",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/embedded/index"))),
				meta: {
					requiresAuth: true,
					title: "商品管理",
					key: "embedded"
				}
			}
		]
	}
];

export default dashboardRouter;
