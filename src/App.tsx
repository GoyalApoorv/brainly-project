import './App.css'
import Button from './components/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {

  return (
    <>
    <Button variant={"primary"} startIcon={<PlusIcon size='sm'/>} size={"sm"} title='Add content'>
    </Button>
    <Button variant={"secondary"} startIcon={<ShareIcon size='sm' />} size={'sm'} title={'Share brain'}></Button>
    </>
  )
}

export default App
