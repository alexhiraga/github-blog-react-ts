import { ReactNode, createContext, useState } from "react"
import { api } from "../lib/axios"

export interface UserData {
    id: number
    login: string
    name: string
    company: string | null
    bio: string | null
    public_repos: number
    followers: number
    html_url: string
    followers_url: string
    avatar_url: string
    repos_url: string
}

interface UserContextTypeProps {
    children: ReactNode
}

interface UserContextType {
    users: UserData[] | undefined
    selectedUser: UserData
    getNewUser: (url: string) => Promise<void | UserData>
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextTypeProps) {
    const [users, setUsers] = useState<UserData[]>([])
    const [selectedUser, setSelectedUser] = useState<UserData>({
        id: 0,
        login: "",
        name: "",
        company: "",
        bio: "",
        public_repos: 0,
        followers: 0,
        html_url: "",
        followers_url: "",
        avatar_url: "",
        repos_url: "",
    })

    async function getNewUser(url: string) {
        const response = await api.get(`users/${url}`)
        if(response.status < 200 || response.status >= 400) return 

        const newUser = {
            id: response.data.id,
            login: response.data.login,
            name: response.data.name,
            company: response.data.company,
            bio: response.data.bio,
            public_repos: response.data.public_repos,
            followers: response.data.followers,
            html_url: response.data.html_url,
            followers_url: response.data.followers_url,
            avatar_url: response.data.avatar_url,
            repos_url: response.data.repos_url
        }
        refreshSelectedUser(newUser)

        // Check if there is the same user id registered
        const userAlreadyRegistered = users.findIndex(user => user.id === newUser.id)
        if(userAlreadyRegistered > -1) {
            // Refresh user if it is already registered
            const updatedUsersList = users.map(user => {
                if(user.id === newUser.id) {
                    user = newUser
                }
                return user
            })
            setUsers(updatedUsersList)
            return newUser
        } else {
            const updatedUsersList = [...users, newUser]
            setUsers(updatedUsersList)
            return newUser
        }
    }

    function refreshSelectedUser(user: UserData) {
        if(!user) return

        setSelectedUser(user)
        const stateJSON = JSON.stringify(user)
        localStorage.setItem('@github-blog:selected-user-1.0.0', stateJSON)
    }

    return (
        <UserContext.Provider
            value={{
                users,
                getNewUser,
                selectedUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}