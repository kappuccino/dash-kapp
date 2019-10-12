import {Form} from 'antd'

export const mapPropsToFields = (props, fields) => {
	const out = {}

	fields.forEach(field => {
		out[field] = Form.createFormField({
			...props.fields[field],
			value: props.fields[field].value,
		})
	})

	return out
}

export const createFormObject = (src, fields) => {
	const out = {}

	fields.forEach(field => {
		out[field] = {
			value: src[field]
		}
	})

	return out
}

export const createManagedForm = (TheForm, myFields) => {

	return Form.create({
		/*onFieldsChange(props, changedFields) {
			props.onChange(changedFields)
		},*/

		mapPropsToFields(props) {
			return mapPropsToFields(props, myFields)
		},

		onValuesChange(props, changedValues, allValues) {
			//console.log('onValuesChange', {props, changedValues, allValues})
			if(props.onChange) props.onChange(changedValues)
		},
	})(TheForm)
}

export const filterOption = (input, option) =>
	option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

export const formItemLayout = {
	colon: false
}

export const passwordValidator = (r, v, cb, required) => {
	if(!required && !v) return cb()

	const valid = /^.{6,}$/.test(v || '')
	return valid ? cb() : cb(false)
}