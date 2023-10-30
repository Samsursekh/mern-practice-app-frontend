import { BrowserRouter } from 'react-router-dom'
import './App.css'
import AllRoutes from './Routes/AllRoutes'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
     <Navbar />
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </>
  )
}

export default App
