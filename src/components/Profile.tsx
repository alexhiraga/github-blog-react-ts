import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface Props {
    selectedUser: UserData
}

export function Profile({ selectedUser }: Props) {
    const navigate = useNavigate()

    const redirectToUserRepos = () => {
        navigate(`/github-blog-react-ts/user/${selectedUser.login}`)
    }

    const redirectToFollowers = () => {
        navigate(`/github-blog-react-ts/user/${selectedUser.login}/followers`)
    }

    return (
        <div className="profile -mt-[88px] relative z-10 flex gap-8">
            <img src={selectedUser.avatar_url} className="w-[148px] h-[148px] object-contain rounded-lg cursor-pointer" onClick={redirectToUserRepos} />
            <div className="flex flex-col justify-between w-full">
                <div>
                    <div className="flex justify-between my-2 w-full">
                        <h1 className="hover:underline cursor-pointer" onClick={redirectToUserRepos}>{selectedUser.name}</h1>
                        <a className="flex gap-2 align-middle" href={selectedUser.html_url} target="_blank">
                            GITHUB
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </a>
                    </div>
                    <p className="text-M">{selectedUser.bio}</p>
                </div>

                <div className="flex justify-start gap-6">
                    <a className="flex gap-2 text-M text-base-subtitle align-middle" href={selectedUser.html_url} target="_blank">
                        <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                        {selectedUser.login}
                    </a>
                    {selectedUser.company && (
                        <div className="flex gap-2 text-M text-base-subtitle align-middle">
                            <FontAwesomeIcon icon={faBuilding} className="text-base-label my-auto text-lg" />
                            {selectedUser.company}
                        </div>
                    )}
                    <div className="flex gap-2 text-M text-base-subtitle align-middle hover:underline cursor-pointer" onClick={redirectToFollowers}>
                        <FontAwesomeIcon icon={faUserGroup} className="text-base-label my-auto text-lg" />
                        {selectedUser.followers} seguidores
                    </div>
                </div>
            </div>
        </div>
    )
}