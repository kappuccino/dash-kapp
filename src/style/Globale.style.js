import {createGlobalStyle} from 'styled-components'
import {palette} from 'styled-theme'

export default createGlobalStyle`
	
	body{
		background: ${props => props.theme.main};
		color: #FFF;
	}
	
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  a,
  p,
  li,
  input,
  textarea,
  span,
  div,
  img,
  svg {
    &::selection {
      /*background: ${palette('primary', 0)};
      color: #fff;*/
    }
  }

  .ant-row {
	  & > div {
	    padding: 0;
	  }
  }

  .isoLeftRightComponent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .isoCenterComponent {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }	
   
`