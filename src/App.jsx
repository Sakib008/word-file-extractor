import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import DocumentList from './pages/DocumentList'

function App() {

  return (
   <div className="">
   <Header/>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/document/:id" element={<DocumentList />} />
    <Route path='*' element={<Navigate to="/" />} />
   </Routes>
   </div>
  )
}

export default App
