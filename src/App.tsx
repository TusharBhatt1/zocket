import {BrowserRouter,Routes,Route} from "react-router-dom"
import Canvas from "./pages/Canvas"
import Navbar from "./components/Navbar"
export default function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route index element={<Canvas/>}/>
    </Routes>
    </BrowserRouter>
  )
}
