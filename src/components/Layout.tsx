import React from 'react'
import styled from 'styled-components'

const S = {
  Layout: styled.div`
    max-width: 80%;
    margin: 0 auto;
  `,
  Section: styled.div``,
  Sidebar: styled.div`
    flex: 1;
  `,
}

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => (
  <S.Layout>
    <S.Section>
      <div>{children}</div>
    </S.Section>
  </S.Layout>
)

export default Layout
