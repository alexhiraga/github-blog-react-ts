import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Issue } from "./pages/Issue";
import { Users } from "./pages/Users";
import { RepoIssues } from "./pages/RepoIssues";
import { Followers } from "./pages/Followers";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={ <Users /> } />
            <Route path="/user/:userName" element={ <Home /> } />
            <Route path="/user/:userName/:repoName" element={ <RepoIssues /> } />
            <Route 
                path="/repos/:userName/:repoName/issues/:issueNumber"
                element={ <Issue /> }
            />
            <Route path="/user/:userName/followers" element={ <Followers /> } />
        </Routes>
    );
}