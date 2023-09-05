import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";
import { Users } from "./pages/Users";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={ <Users /> } />
            <Route path="/user/:userName" element={ <Home /> } />
            <Route 
                path="/post/:postId"
                element={ <Post /> }
            />
        </Routes>
    );
}