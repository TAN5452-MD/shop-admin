import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/distributor",
				element: lazyLoad(React.lazy(() => import("@/views/distributor/index"))),
				meta: {
					requiresAuth: true,
					title: "经销商管理",
					key: "distributor"
				}
			},
		]
	}
];

export default menuRouter;
