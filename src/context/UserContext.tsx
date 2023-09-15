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
    getAllUsers: () => void
    getFollowers: (login: string) => void
    followers: UserData[] | undefined
    saveNewUser: (user: UserData) => void
    removeUser: (login: string) => void
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
    const [followers, setFollowers] = useState<UserData[]>()

    async function getNewUser(url: string) {
        //regex to remove the link and use just the name
        const regex = /^https:\/\/github\.com\//;
        const user = url.replace(regex, "")

        const response = await api.get(`users/${user}`)
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

        //Check if there is already the same user registered
        // If so, refresh it, else push it
        // either in localStorage and state
        saveNewUser(newUser)

        return newUser
    }

    function refreshSelectedUser(user: UserData) {
        if(!user) return

        setSelectedUser(user)
        const stateJSON = JSON.stringify(user)
        localStorage.setItem('@github-blog:selected-user-1.0.0', stateJSON)
    }

    function saveNewUser(user: UserData) {
        // Check if there is the same user id registered
        //in localStorage
        const storedStateAsJSON = localStorage.getItem('@github-blog:users-1.0.0')
        if(storedStateAsJSON) {
            const userList = JSON.parse(storedStateAsJSON)
            const userAlreadyRegisteredInLocalStorage = userList.findIndex((_user: { id: number }) => _user.id === user.id)
            if(userAlreadyRegisteredInLocalStorage > -1) {
                // Refresh user if it is already registered
                const updatedUsersList = users.map(_user => {
                    if(_user.id === user.id) {
                        _user = user
                    }
                    return _user
                })
                const stateJSON = JSON.stringify(updatedUsersList)
                localStorage.setItem('@github-blog:users-1.0.0', stateJSON)
                setUsers(updatedUsersList)
            } else {
                const updatedUsersList = [user, ...users]
                const stateJSON = JSON.stringify(updatedUsersList)
                localStorage.setItem('@github-blog:users-1.0.0', stateJSON)
                setUsers(updatedUsersList)
            }
        } else {
            const stateJSON = JSON.stringify([user])
            localStorage.setItem('@github-blog:users-1.0.0', stateJSON)
        }
    }

    function getAllUsers() {
        const storedStateAsJSON = localStorage.getItem('@github-blog:users-1.0.0')
        if(storedStateAsJSON) {
            setUsers(JSON.parse(storedStateAsJSON))
        }
    }

    async function getFollowers(login: string) {
        const response = await api.get(`users/${login}/followers`)
        setFollowers(response.data)
    }

    function removeUser(login: string) {
        const updatedUsersList = users.filter(_user => {
            return _user.login !== login
        })

        const stateJSON = JSON.stringify(updatedUsersList)
        localStorage.setItem('@github-blog:users-1.0.0', stateJSON)
        setUsers(updatedUsersList)
    }

    return (
        <UserContext.Provider
            value={{
                users,
                getNewUser,
                selectedUser,
                getAllUsers,
                getFollowers,
                followers,
                saveNewUser,
                removeUser
            }}
        >
            {children}
        </UserContext.Provider>
    )
}