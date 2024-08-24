import './App.css'
import SideNav from './component/sidenav/SideNav'
import { Routes, Route } from 'react-router-dom'
import { Home, History, CreateBill, ItemList } from './pages/Index'
import SingleBill from './pages/singleBill'

function App() {

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[15%] bg-slate-600'>
        <SideNav />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/itemlist" element={<ItemList />} />
        <Route path="/createbill" element={<CreateBill />} />
        <Route path="/history" element={<History />} />
        <Route path="/bill" element={<SingleBill />} />
      </Routes>
    </div>
  )
}

export default App
