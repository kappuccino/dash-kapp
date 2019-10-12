import openSocket from 'socket.io-client'
const socket = openSocket(process.env.REACT_APP_API)
//console.log('Opening socket on ', process.env.REACT_APP_API)


// Pub/Sub
export function onVideoPosterGenerated(cb) {
	socket.on('videoPosterGenerated', _id => cb(_id))
	return () => socket.removeListener("videoPosterGenerated", cb)
}

export function onMediaUpdated(cb) {
	socket.on('mediaUpdated', media => cb(media))
	return () => socket.removeListener("mediaUpdated", cb)
}

export function onChangeTask(cb) {
	socket.on('changeTask', task => cb(task))
	return () => socket.removeListener("changeTask", cb)
}

export function onChangeTasks(cb) {
	socket.on('changeTasks', () => cb())
	return () => socket.removeListener("changeTasks", cb)
}

export function onUsersUpdated(cb){
	socket.on('usersUpdated', users => cb(users))
	return () => socket.removeListener('usersUpdated', cb)
}


// Send
export function selfRegister(user) {
	socket.emit('selfRegister', user)
}

export function lock(url) {
	socket.emit('lock', url)
}

export function unlock(url) {
	socket.emit('unlock', url)
}
