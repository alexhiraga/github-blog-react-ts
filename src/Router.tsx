import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Issue } from "./pages/Issue";
import { Users } from "./pages/Users";
import { RepoIssues } from "./pages/RepoIssues";
import { Followers } from "./pages/Followers";

export function Router() {
    return (
        <Routes>
            <Route path="/github-blog-react-ts" element={ <Users /> } />
            <Route path="/github-blog-react-ts/user/:userName" element={ <Home /> } />
            <Route path="/github-blog-react-ts/user/:userName/:repoName" element={ <RepoIssues /> } />
            <Route 
                path="/github-blog-react-ts/repos/:userName/:repoName/issues/:issueNumber"
                element={ <Issue /> }
            />
            <Route path="/github-blog-react-ts/user/:userName/followers" element={ <Followers /> } />
        </Routes>
    );
}