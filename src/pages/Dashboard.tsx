import { useState } from 'react'
import styled from 'styled-components'
import { Item } from '../types'
import ImportDataButton from '../components/ImportDataButton'
import DashboardContent from '../components/DashboardContent'

const S = {
  Dashboard: styled.div``,
  DashboardActionSection: styled.div`
    display: flex;
    gap: 20px;
  `,
}

const Dashboard = () => {
  const [jsonData, setJsonData] = useState<any>(null)
  const [currentTreeJsonData, setCurrentTreeJsonData] = useState<any>(null)
  return (
    <S.Dashboard>
      <S.DashboardActionSection>
        <ImportDataButton text='Import file' setJsonData={setJsonData} />
        <input type='text'></input>
      </S.DashboardActionSection>
      <DashboardContent
        data={jsonData}
        setJsonData={setJsonData}
        currentTreeJsonData={currentTreeJsonData}
        setCurrentTreeJsonData={setCurrentTreeJsonData}
      />
    </S.Dashboard>
  )
}

export default Dashboard
