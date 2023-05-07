import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// echarts 模块
const formRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/echarts/waterChart",
				element: lazyLoad(React.lazy(() => import("@/views/echarts/waterChart/index"))),
				meta: {
					requiresAuth: true,
					title: "水型图",
					key: "waterChart"
				}
			}
		]
	}
];

export default formRouter;
