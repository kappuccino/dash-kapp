import {notification} from 'antd'

export const openNotificationWithIcon = (type, title, content) => {
	notification[type]({
		message: title,
		description: content
	});
};

export const openErrorNotification = (content) => {
	openNotificationWithIcon('error', 'Erreur', content)
}

export const openSuccessNotification = (content) => {
	openNotificationWithIcon('success', 'Confirmation', content)
}