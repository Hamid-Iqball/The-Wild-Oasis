import styled, { css } from "styled-components";
const H1 = styled.h1`
  ${(porps) =>
    porps.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      b
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}
    line-height:1.4rem;
`;
export default H1;
