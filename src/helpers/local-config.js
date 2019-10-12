export function getConfig(key, def){
	const config = getLocalStorage()

	if(config[key] !== undefined) return config[key]
	return def
}

export function setConfig(key, value){
	let config = getLocalStorage()

	config[key] = value

	localStorage.setItem('kappdash_config', JSON.stringify(config))
}


function getLocalStorage(){
	let saved = localStorage.getItem('kappdash_config');

	try{
		saved = JSON.parse(saved)
	} catch(e){
		return {}
	}

	return saved || {}
}
