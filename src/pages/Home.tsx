import { faArrowUpRightFromSquare, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const mock = [
    {
        id: 1,
        title: "Content title",
        postDate: "há 1 dia",
        content: "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn. Dynamic typing",
    },
    {
        id: 2,
        title: "Content title",
        postDate: "há 1 dia",
        content: "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn. Dynamic typing",
    },
    {
        id: 3,
        title: "Content title",
        postDate: "há 1 dia",
        content: "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn. Dynamic typing",
    },
    {
        id: 4,
        title: "Content title",
        postDate: "há 1 dia",
        content: "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn. Dynamic typing",
    },
    {
        id: 5,
        title: "Content title",
        postDate: "há 1 dia",
        content: "Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn. Dynamic typing",
    },
]
export function Home() {
    const params = useParams()
    const { getNewUser, selectedUser } = useContext(UserContext)

    useEffect(() => {
        if(params.userName) {
            getNewUser(params.userName)
        }
    }, [getNewUser, params.userName])

    return (
        <div className="content">
            {/* Profile */}
            <div className="profile -mt-[88px] relative z-10 flex gap-8">
                <img src={selectedUser.avatar_url} className="w-[148px] h-[148px] object-contain rounded-lg" />
                <div className="flex flex-col justify-between w-full">
                    <div>
                        <div className="flex justify-between my-2 w-full">
                            <h1>{selectedUser.name}</h1>
                            <a className="flex gap-2 align-middle" href={selectedUser.html_url} target="_blank">
                                GITHUB
                                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                            </a>
                        </div>
                        <p className="text-M">{selectedUser.bio}</p>
                    </div>

                    <div className="flex justify-start gap-6">
                        <div className="flex gap-2 text-M text-base-subtitle align-middle">
                            <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                            {selectedUser.login}
                        </div>
                        {selectedUser.company && (
                            <div className="flex gap-2 text-M text-base-subtitle align-middle">
                                <FontAwesomeIcon icon={faBuilding} className="text-base-label my-auto text-lg" />
                                {selectedUser.company}
                            </div>
                        )}
                        <div className="flex gap-2 text-M text-base-subtitle align-middle">
                            <FontAwesomeIcon icon={faUserGroup} className="text-base-label my-auto text-lg" />
                            {selectedUser.followers} seguidores
                        </div>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div>
                <div className="flex justify-between mt-[72px] mb-3">
                    <h3>Publicações</h3>
                    <span>
                        6 publicações
                    </span>
                </div>

                <form>
                    <input type="text" placeholder="Buscar conteúdo" className="w-full mb-12" />
                </form>
            </div>

            {/* Content list */}
            <div className="grid grid-cols-2 gap-8">
                {mock.map(post => {
                    return (
                        <div className="card">
                            <div className="flex justify-between mb-5">
                                <h2>
                                    {post.title}
                                </h2>
                                <span>
                                    {post.postDate}
                                </span>
                            </div>
                            <p>
                                {post.content.length > 180 ? post.content.substring(0, 181) + '...' : post.content}
                            </p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
