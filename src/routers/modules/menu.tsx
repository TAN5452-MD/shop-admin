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
				path: "/menu/menu1",
				element: lazyLoad(React.lazy(() => import("@/views/menu/menu1/index"))),
				meta: {
					requiresAuth: true,
					title: "政策管理",
					key: "menu1"
				}
			},
		]
	}
];

export default menuRouter;
