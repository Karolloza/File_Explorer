import React from "react";
import styled from "styled-components";
import Logo from "./icons/Logo";
const S = {
  Layout: styled.div`
    background-color: gray;
  `,
  Header: styled.div``,
  Section: styled.div`
    display: flex;
  `,
  Sidebar: styled.div`
    flex: 1;
  `,
  Content: styled.div`
    flex: 6;
  `,
};

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
  <S.Layout>
    <S.Header>
      <Logo />
    </S.Header>
    <S.Section>
      <S.Content>{children}</S.Content>
    </S.Section>
  </S.Layout>
);

export default Layout;
