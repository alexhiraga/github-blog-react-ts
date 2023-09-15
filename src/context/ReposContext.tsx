import { ReactNode, createContext, useState } from "react"
import { api } from "../lib/axios"
import { UserData } from "./UserContext"

export interface RepoData {
    id: number
    name: string
    description: string
    owner: UserData
    html_url: string
    open_issues: number
    created_at: string
    updated_at: string
}

interface IssuesData {
    total_count: number
    items: IssuesItems[]
}


interface IssuesItems {
    id: number
    url: string
    html_url: string
    user: UserData
    created_at: string
    title: string
    body: string
    comments: number
    number: number
}

interface ReposContextTypeProps {
    children: ReactNode
}

interface ReposContextType {
    repos: RepoData[] | undefined
    repoIssues: IssuesData | undefined
    selectedIssue: IssuesItems | undefined
    // selectedRepo: RepoData | undefined
    getUserRepos: (user: string) => void
    getReposIssues: (user: string, repo: string) => void
    getIssue: (user: string, repo: string, number: string) => void
    searchIssues: (user: string, repo: string, q: string) => void
    isFiltered: boolean
}

export const ReposContext = createContext({} as ReposContextType)

export function ReposContextProvider({ children }: ReposContextTypeProps) {
    const [repos, setRepos] = useState<RepoData[]>([])
    const [repoIssues, setRepoIssues] = useState<IssuesData>()
    const [selectedIssue, setSelectedIssue] = useState<IssuesItems>()
    const [isFiltered, setIsFiltered] = useState<boolean>(false)

    async function getUserRepos(user: string) {
        const response = await api.get(`users/${user}/repos`)
        setRepos(response.data)
    }

    async function getReposIssues(user: string, repo: string) {
        const response = await api.get(`search/issues?q=%20repo:${user}/${repo}`)
        setRepoIssues(response.data)
        setIsFiltered(false)
    }

    async function searchIssues(user: string, repo: string, q: string) {
        const response = await api.get(`search/issues?q=${q}%20repo:${user}/${repo}`)
        setRepoIssues(response.data)

        // a state to show if the issues is filtered or not
        if(!q) setIsFiltered(false)
        else setIsFiltered(true)
    }

    async function getIssue(user: string, repo: string, number: string) {
        const response = await api.get(`repos/${user}/${repo}/issues/${number}`)
        setSelectedIssue(response.data)
    }


    return (
        <ReposContext.Provider
            value={{
                repos,
                repoIssues,
                selectedIssue,
                getUserRepos,
                getReposIssues,
                getIssue,
                searchIssues,
                isFiltered
            }}
        >
            {children}
        </ReposContext.Provider>
    )
}