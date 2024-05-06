import styled from "styled-components";

const Button = styled.button`
    height: ${props => props.size==="large"? "40px":"30px"};
    font-size: ${props => props.size==="large"? "1.1em":".8em"};
    appearance: none;
    border: none;
    border-radius: 100px;
    opacity: .7;
    cursor: pointer;
    transition: opacity .4s;
    &:hover{
        opacity: 1;
    }
`;

export default Button;