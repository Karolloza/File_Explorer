import styled from 'styled-components'
import { Item } from '../types'

const S = {}

interface ImportDataButtonProps {
  text: string
  setJsonData: (data: Item[]) => void
}

const ImportDataButton = ({ text, setJsonData }: ImportDataButtonProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) {
      return
    }
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const text = e.target?.result
      if (typeof text === 'string') {
        try {
          const data = JSON.parse(text)
          setJsonData(data)
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
    }
    reader.readAsText(files[0])
  }

  const triggerFileInput = () => {
    const fileInput = document.getElementById('import')
    if (fileInput) {
      fileInput.click()
    }
  }

  return (
    <>
      <label htmlFor='import'>
        <button type='button' onClick={triggerFileInput}>
          Import File
        </button>
        <input
          id='import'
          type='file'
          name='import'
          hidden
          onChange={(e) => handleFileChange(e)}
        ></input>
      </label>
    </>
  )
}
export default ImportDataButton
