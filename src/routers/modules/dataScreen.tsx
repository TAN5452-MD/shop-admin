import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "../constant";

// 数据大屏模块
const dataScreenRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/dataScreen/index",
				element: lazyLoad(React.lazy(() => import("@/views/dataScreen/index"))),
				meta: {
					requiresAuth: true,
					title: "订单管理",
					key: "dataScreen"
				}
			}
		]
	}
];

export default dataScreenRouter;
