import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faArrowUpRightFromSquare, faCalendarDay, faChevronLeft, faComment } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ReposContext } from "../context/ReposContext"
import { UserContext } from "../context/UserContext"
import { formatDistanceToNow } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'

export function Issue() {
    const params = useParams()
    const navigate = useNavigate()
    const { getNewUser, selectedUser } = useContext(UserContext)
    const { getIssue, selectedIssue } = useContext(ReposContext)

    const navigateBack = () => {
        navigate(-1)
    }

    const navigateToGithub = () => {
        navigate("/github-blog-react-ts")
    }

    useEffect(() => {
        if (params.userName && params.repoName && params.issueNumber) {
            getUser(params.userName)
            getSelectedIssue(params.userName, params.repoName, params.issueNumber)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // get the user data from params, if invalid redirects to home/search page
    async function getUser(user: string) {
        try {
            await getNewUser(user)
        } catch (error) {
            console.error(error)
            navigate("/github-blog-react-ts")
        }
    }

    async function getSelectedIssue(user: string, repo: string, number: string) {
        try {
            await getIssue(user, repo, number)
        } catch (error) {
            console.error(error)
            navigate("/github-blog-react-ts")
        }
    }

    const codeBlockRegex = /```([\s\S]*?)```/g;
    const codeFormatted = selectedIssue?.body.split(codeBlockRegex)

    return (
        <div className="content">
            {/* Post title and infos */}
            <div className="profile -mt-[88px] relative z-10 flex flex-col">
                <div className="flex justify-between mb-5">
                    <button className="flex gap-2 align-middle" onClick={navigateBack}>
                        <FontAwesomeIcon icon={faChevronLeft} className="my-auto" />
                        VOLTAR
                    </button>
                    <a className="flex gap-2 align-middle" onClick={navigateToGithub} href={selectedIssue?.html_url} target="_blank">
                        VER NO GITHUB
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="my-auto" />
                    </a>
                </div>

                <h1 className="mb-2">
                    {selectedIssue?.title}
                </h1>

                <div className="flex justify-start gap-6">
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faGithub} className="text-base-label my-auto text-lg" />
                        {selectedUser.login}
                    </div>
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faCalendarDay} className="text-base-label my-auto text-lg" />
                        {selectedIssue && formatDistanceToNow(new Date(selectedIssue.created_at), {
                            addSuffix: true,
                            locale: ptBR
                        })}
                    </div>
                    <div className="flex gap-2 text-M text-base-subtitle align-middle">
                        <FontAwesomeIcon icon={faComment} className="text-base-label my-auto text-lg" />
                        {selectedIssue?.comments} comentários
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="py-10 px-8">
                {codeFormatted?.map((segment, index) => {
                    if (index % 2 === 0) {
                        return <pre key={index}>{segment}</pre>
                    } else {
                        return (
                            <pre key={index} className="quoteCode">
                                {segment}
                            </pre>
                        )
                    }
                })}
            </div>
        </div>
    )
}
