import { AnyAction } from "redux";
import { AuthState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const authState: AuthState = {
	authButtons: {},
	authRouter: [],
	userInfo:{},
};

// auth reducer
const auth = (state: AuthState = authState, action: AnyAction) =>
{ 
return produce(state, draftState => {
		switch (action.type) {
			case types.SET_AUTH_BUTTONS:
				draftState.authButtons = action.authButtons;
				break;
			case types.SET_AUTH_ROUTER:
				draftState.authRouter = action.authRouter;
				break;
			case types.SET_USER_INFO:
				draftState.userInfo = action.userInfo;
				break;
			default:
				return draftState;
		}
	});
}

export default auth;
