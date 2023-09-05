import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const searchFormSchema = z.object({
    userUrl: z.string()
})

type SearchFormInput = z.infer<typeof searchFormSchema>

export function Users() {
    const { getNewUser, users } = useContext(UserContext)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit
    } = useForm<SearchFormInput>({
        resolver: zodResolver(searchFormSchema),
    })

    async function handleNewUser(url: SearchFormInput) {
        const user = url.userUrl
        const newUser = await getNewUser(user)
        if(!newUser) return 

        navigate(`/user/${newUser.login}`)
    }

    return (
        <div className="content">
            {/* Header */}
            <div className="profile -mt-[88px] relative z-10 flex gap-8">
                <FontAwesomeIcon icon={faGithub} className="w-40 h-40" />
                
                <div className="w-full">
                    <div className="flex justify-between my-2">
                        <h1>Search Github users' repos</h1>
                        <a className="flex gap-2 align-middle" href="https://github.com/alexhiraga" target="_blank">
                            Author's Github
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                    </div>

                    <form onSubmit={handleSubmit(handleNewUser)}>
                        <input 
                            type="text" 
                            placeholder="Insira uma URL válida ou login de um usuário" 
                            className="w-full"
                            {...register('userUrl')}
                        />
                    </form>
                </div>
            </div>

            {/* Users list */}
            <div className="mt-8">
                {users?.length === 0 && (
                    <p className="mx-auto text-center w-full">Não há nenhum usuário registrado.</p>
                )}
                <div className="grid grid-cols-3 gap-8">
                    {users?.map(user => {
                        return (
                            <div className="card flex flex-col gap-2" key={user.id}>
                                <img src={user.avatar_url} className="rounded-lg" />

                                <h2>{user.name}</h2>
                                <a className="flex justify-start gap-2 text-M text-base-subtitle align-middle" href={user.html_url} target="_blank">
                                    <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                                    {user.login}
                                </a>
                                {user.company && (
                                    <div className="flex justify-start gap-2 text-M text-base-subtitle align-middle">
                                        <FontAwesomeIcon icon={faBuilding} className="text-base-label my-auto text-lg" />
                                        {user.company}
                                    </div>
                                )}
                                <div className="flex justify-start gap-2 text-M text-base-subtitle align-middle" >
                                    <FontAwesomeIcon icon={faUserGroup} className="text-base-label my-auto text-lg" />
                                    {user.followers} seguidores
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    )
}
