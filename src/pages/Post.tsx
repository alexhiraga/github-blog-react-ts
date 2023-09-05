import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowUpRightFromSquare, faBuilding, faChevronLeft, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate, useParams } from "react-router-dom"

export function Post() {
    // const { postId } = useParams()
    const navigate = useNavigate()

    const navigateToHome = () => {
        navigate("/")
    }

    const navigateToGithub = () => {
        navigate("/")
    }
    return (
        <div className="content">
            {/* Post title and infos */}
            <div className="profile -mt-[88px] relative z-10 flex flex-col">
                <div className="flex justify-between mb-5">
                    <button className="flex gap-2 align-middle" onClick={navigateToHome}>
                        <FontAwesomeIcon icon={faChevronLeft} className="my-auto" />
                        VOLTAR
                    </button>
                    <button className="flex gap-2 align-middle" onClick={navigateToGithub}>
                        VER NO GITHUB
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="my-auto" />
                    </button>
                </div>

                <h1 className="mb-2">
                    JavaScript data types and data structures
                </h1>

                <div className="flex justify-start gap-6">
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                        alexhiraga
                    </div>
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faBuilding} className="text-base-label my-auto text-lg" />
                        Rocketseat
                    </div>
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faUserGroup} className="text-base-label my-auto text-lg" />
                        123 seguidores
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-10 px-8">
                <p>
                Programming languages all have built-in data structures, but these often differ from one language to another. This article attempts to list the built-in data structures available in JavaScript and what properties they have. These can be used to build other data structures. Wherever possible, comparisons with other languages are drawn.

Dynamic typing
JavaScript is a loosely typed and dynamic language. Variables in JavaScript are not directly associated with any particular value type, and any variable can be assigned (and re-assigned) values of all types:

                </p>

            </div>
        </div>
    )
}
