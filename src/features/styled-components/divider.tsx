import styled from 'styled-components'


const Divider = styled.div`
  width: 100%;
  border-bottom: 2px dotted;
  position: relative;
  margin: 30px 0px;
  font-size:40px;
  &::before {
    content: "VS";
    position: absolute;
    left: 47%;
    top: -35px;
    background-color: #e9c2d9;
    padding: 5px 10px;
    border-radius:50%;
  }
`;

export default Divider