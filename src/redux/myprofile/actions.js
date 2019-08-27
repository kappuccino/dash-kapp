const actions = {
	MYPROFILE_LOADED: 'MYPROFILE_LOADED',
	MYPROFILE_UNLOAD: 'MYPROFILE_UNLOAD',

	CHANGE_MYPROFILE: 'CHANGE_MYPROFILE',

	SAVE_MYPROFILE: 'SAVE_MYPROFILE',
	SAVE_MYPROFILE_SUCCESS: 'SAVE_MYPROFILE_SUCCESS',
	SAVE_MYPROFILE_ERROR: 'SAVE_MYPROFILE_ERROR',

	//--

	changeMyProfile : data => ({
		type: actions.CHANGE_MYPROFILE,
		payload: data
	}),

	saveMyProfile: () => ({
		type: actions.SAVE_MYPROFILE
	})

}

export default actions