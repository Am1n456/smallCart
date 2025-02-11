import {Box, useColorModeValue} from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import HomePage from './pages/HomePage'
import CreateProduct from "./pages/CreateProduct"
import {Routes, Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  )
}

export default App
