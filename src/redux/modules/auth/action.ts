import * as types from "@/redux/mutation-types";

// * setAuthButtons
export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
});

// * setAuthRouter
export const setAuthRouter = (authRouter: string[]) => {
	return ({
		type: types.SET_AUTH_ROUTER,
		authRouter
	});
}
export const setUserInfo = (userInfo: {}) => {
	return {
		type: types.SET_USER_INFO,
		userInfo
	}
}
