/*import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {selfRegister} from '../../helpers/socket' // onUsersUpdated
import appActions from '../../redux/app/actions'*/

export default function Socket() {

	//const myProfile = useSelector(state => state.MyProfile)

	//const dispatch = useDispatch()
	//const updateUsers = users => dispatch(appActions.updateUsers(users))

	/*const register = profile => {
		selfRegister({
			_id: profile._id,
			firstName: profile.firstName || '',
			lastName: profile.lastName || '',
			login: profile.login
		})
	}*/

	/*useEffect(() => {
		if (myProfile && myProfile._id) register(myProfile)

		const offUsersUpdated = onUsersUpdated(updateUsers)

		return () => {
			offUsersUpdated()
		}

	}, [myProfile, register, onUsersUpdated, updateUsers])*/

	return null
}
