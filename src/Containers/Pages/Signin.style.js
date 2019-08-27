import styled from 'styled-components'
import bg from '../../images/background.jpg'

export const SigninPage = styled.div`
	width: 100%;
	height: 100vh;
	min-height: 100vh;
	display: flex;
  justify-content: flex-end;
  background: #404040 url(${bg});
  background-size: cover;
  
  .ant-btn-link{
    color: #404040;
  }
  
  .inputWrapper{
    margin-bottom: 15px;
  }
  
  .centerComponent{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`

export const ContainerWrapper = styled.div`
	width: 500px;
	height: 100%;
	overflow-y: auto;
	z-index: 10;
	position: relative;
	background: rgba(255, 255, 255, .85);
`

export const Container = styled.div`
	padding: 70px 50px;
`

export const Logo = styled.div`
	text-align: center;
	margin: 0 0 50px 0;
	display: flex;
	justify-content: center;
`

export const FormWrapper = styled.div`

`