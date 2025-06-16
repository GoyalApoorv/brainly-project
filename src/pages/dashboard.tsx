import { useState } from 'react'
import '../App.css'
import Button from '../components/Button'
import { Card } from '../components/Card'
import { CreateContentModal } from '../components/CreateContentModal'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const contents = useContent();

  return (
    <div>
      <Sidebar />
      <div className='p-4 ml-72 bg-gray-100 min-h-screen border-2'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }}/>
      <div className='flex justify-end gap-4'>
        <Button onClick={() =>{
          setModalOpen(true);
        }} variant={"primary"} startIcon={<PlusIcon size='sm'/>} size={"md"} title='Add content'>
        </Button>
        <Button variant={"secondary"} onClick={async () => {
          await axios.post(`${BACKEND_URL}/api/v1/brain/share`)
        }} startIcon={<ShareIcon size='sm' />} size={'md'} title={'Share brain'}></Button>
      </div>

      <div className='flex gap-4 flex-wrap pt-2'>
        {contents.map(({type, link, title}) => <Card
        type={type}
        link={link}
        title={title}
      />)}
      <Card title='WTF' link='https://www.youtube.com/watch?v=lRjprPQHuXw' type='youtube' />
      <Card title='naval' link='https://x.com/naval/status/1916839710544073112' type='tweet' />

    </div>
    </div>
    </div>
  )
}

