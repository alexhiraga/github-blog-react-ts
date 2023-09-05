import { BrowserRouter } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Router } from "./Router"
import { UserContextProvider } from "./context/UserContext"

function App() {

    return (
        <div>
            <UserContextProvider>
                <BrowserRouter>
                    <Navbar />
                    <Router />
                </BrowserRouter>
            </UserContextProvider>
        </div>
  )
}

export default App
