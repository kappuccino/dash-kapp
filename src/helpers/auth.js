export function clearToken() {
	localStorage.removeItem('kappdash_token')
}

export function getToken() {
	try {
		return localStorage.getItem('kappdash_token') || ''
	} catch (err) {
		clearToken()
	}

	return false
}

export function setToken(token) {
	try {
		return localStorage.setItem('kappdash_token', token)
	} catch (err) {
		clearToken()
	}

	return false
}

export function saveProfile(profile){
	localStorage.setItem('kappdash_profile', profile)
}

export function clearProfile() {
	localStorage.removeItem('kappdash_profile')
}