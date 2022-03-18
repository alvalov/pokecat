import styled from 'styled-components'

interface Props {
  height: number;
}

const CatImage = styled.img<Props>`
  height: ${props => props.height}px;
  width: 100%;
  object-fit: contain;
`;

export default CatImage