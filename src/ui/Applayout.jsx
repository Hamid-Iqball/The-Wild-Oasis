import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import styled from "styled-components";

const StyledDivLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  height: 100vh;
  grid-template-rows: auto 1fr;
`;
const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.6rem 6.4rem;
`;

function Applayout() {
  return (
    <StyledDivLayout>
      <Header />
      <SideBar />
      <Main>
        <Outlet />
      </Main>
    </StyledDivLayout>
  );
}

export default Applayout;
