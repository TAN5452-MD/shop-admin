import Cookies from 'js-cookie'

const TokenKey = 'auth-token'

export const getToken2 = () => {
	return Cookies.get(TokenKey)
}

export const setToken2 = (token: string) => {
	return Cookies.set(TokenKey, token)
}

export const resetToken2 = () => {
	return Cookies.remove(TokenKey)
}
