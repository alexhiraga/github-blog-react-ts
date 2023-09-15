import { BrowserRouter } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { Router } from "./Router"
import { UserContextProvider } from "./context/UserContext"
import { ReposContextProvider } from "./context/ReposContext"

function App() {

    return (
        <div>
            <UserContextProvider>
                <ReposContextProvider>
                    <BrowserRouter>
                        <Navbar />
                        <Router />
                    </BrowserRouter>
                </ReposContextProvider>
            </UserContextProvider>
        </div>
    )
}

export default App
