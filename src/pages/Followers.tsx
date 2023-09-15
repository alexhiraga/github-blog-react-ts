import { useContext, useEffect } from "react";
import { Profile } from "../components/Profile";
import { UserContext } from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Followers() {
    const params = useParams()
    const navigate = useNavigate()
    const { getNewUser, selectedUser, followers, getFollowers, saveNewUser } = useContext(UserContext)

    useEffect(() => {
        if(params.userName) {
            getUser(params.userName)
            getUserFollowers(params.userName)
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

    async function getUserFollowers(user: string) {
        try {
            await getFollowers(user)
        } catch (error) {
            console.error(error)
            navigate("/")
        }
    }

    
    return (
        <div className="content">
            <Profile selectedUser={selectedUser} />

            <div>
                <div className="flex justify-between mt-10 mb-3">
                    <h2>Seguidores</h2>
                    <span>
                        {followers && followers.length + ' seguidores'}
                    </span>
                </div>
            </div>

            <div>
                {followers?.length === 0 && (
                    <p className="mx-auto text-center w-full">Não há nenhum usuário registrado.</p>
                )}
                <div className="grid grid-cols-3 gap-8">
                    {followers && followers.map(user => {
                        async function openUser() {
                            //save in localStorage to display in users list
                            try {
                                await saveNewUser(user)
                                navigate(`/user/${user.login}`)
                            } catch (error) {
                                console.error(error)
                                navigate("/")
                            }
                        }

                        return (
                            <div className="card flex flex-col gap-2" key={user.id} onClick={openUser}>
                                <img src={user.avatar_url} className="rounded-lg hover:cursor-pointer" />
                                <h2 onClick={openUser} className="hover:underline cursor-pointer">
                                    {user.login}
                                </h2>
                                <a className="flex justify-start gap-2 text-M text-base-subtitle align-middle" href={user.html_url} target="_blank">
                                    <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                                    {user.login}
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}