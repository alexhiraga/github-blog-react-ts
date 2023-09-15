import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { ReposContext } from "../context/ReposContext";
import { ptBR } from 'date-fns/locale'
import { formatDistanceToNow } from 'date-fns'
import { Profile } from "../components/Profile";

export function Home() {
    const params = useParams()
    const { getNewUser, selectedUser } = useContext(UserContext)
    const { getUserRepos, repos } = useContext(ReposContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(params.userName) {
            getUser(params.userName)
            getRepos(params.userName)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get the user data from params, if invalid redirects to home/search page
    async function getUser(user: string) {
        try {
            await getNewUser(user)
        } catch (error) {
            console.error(error)   
            navigate("/")   
        }
    }

    async function getRepos(user: string) {
        try {
            await getUserRepos(user)
        } catch (error) {
            console.error(error)   
            navigate("/")
        }
    }

    return (
        <div className="content">
            {/* Profile */}
            <Profile selectedUser={selectedUser} />

            <div>
                <div className="flex justify-between mt-10 mb-3">
                    <h2>Repositórios</h2>
                    <span>
                        {repos && repos.length + ' repositórios'}
                    </span>
                </div>
            </div>

            {/* Content list */}
            <div className="grid grid-cols-2 gap-8">
                {repos && repos.map(post => {
                    const openRepo = () => {
                        navigate(`/user/${post.owner.login}/${post.name}`)
                    }
                    return (
                        <div className="card hover:cursor-pointer" key={post.id} onClick={openRepo}>
                            <div className="flex justify-between mb-5">
                                <h2>
                                    {post.name}
                                </h2>
                                <span>
                                    {formatDistanceToNow(new Date(post.created_at), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}
                                </span>
                            </div>
                            <p>
                                {post.description?.length > 180 ? post.description.substring(0, 181) + '...' : post.description}
                            </p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
