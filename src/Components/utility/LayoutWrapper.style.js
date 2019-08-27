import styled from 'styled-components';

export const LayoutContentWrapper = styled.div`
  padding: 15px;
  display: flex;
  flex-flow: row wrap;
  overflow: hidden;

	min-height: ${props  => props.full ? '100vh' : 'auto'};

  @media only screen and (max-width: 767px) {
    padding: 50px 20px;
  }

  @media (max-width: 580px) {
    padding: 15px;
  }
`
