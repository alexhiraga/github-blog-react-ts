import { useContext, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ReposContext } from "../context/ReposContext"
import { UserContext } from "../context/UserContext"
import { formatDistanceToNow } from "date-fns"
import ptBR from 'date-fns/locale/pt-BR'
import { Profile } from "../components/Profile"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";

const searchFormSchema = z.object({
    query: z.string()
})
type SearchFormInput = z.infer<typeof searchFormSchema>

export function RepoIssues() {
    const params = useParams()
    const { getNewUser, selectedUser } = useContext(UserContext)
    const { getReposIssues, repoIssues, searchIssues, isFiltered } = useContext(ReposContext)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        reset
    } = useForm<SearchFormInput>({
        resolver: zodResolver(searchFormSchema),
    })

    useEffect(() => {
        if(params.userName && params.repoName) {
            getUser(params.userName)
            getIssues(params.userName, params.repoName)
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

    async function getIssues(user: string, repo: string) {
        try {
            await getReposIssues(user, repo)
        } catch (error) {
            console.error(error)
            navigate("/")
        }
    }

    async function handleSearchIssue(q: SearchFormInput) {
        if(params.userName && params.repoName)
        searchIssues(params.userName, params.repoName, q.query)
    }

    const clearInput = () => {
        if(params.userName && params.repoName)
        getReposIssues(params.userName, params.repoName)
        reset()
    }

    return (
        <div className="content">
            {/* Profile */}
            <Profile selectedUser={selectedUser} />

            {/* Search */}
            <div className="mb-12">
                <div className="flex justify-between mt-10 mb-3">
                    <h3>Publicações: {params.repoName}</h3>
                    <span>
                        {repoIssues && repoIssues.total_count + ' issues'}
                    </span>
                </div>

                <form onSubmit={handleSubmit(handleSearchIssue)}>
                    <input 
                        type="text" 
                        placeholder="Buscar conteúdo" 
                        className="w-full"
                        {...register('query')}
                    />
                </form>
                {isFiltered && (
                    <div>
                        <button onClick={clearInput}>
                            Limpar filtro
                        </button>
                    </div>
                )}
            </div>
            
            {/* Repo Issues */}
            <div className="grid grid-cols-2 gap-8 mb-10">
                {repoIssues && repoIssues.items.map(post => {
                    const redirectToIssue = () => {
                        navigate(`/repos/${selectedUser.login}/${params.repoName}/issues/${post.number}`)
                    }
                    return (
                        <div className="card hover:cursor-pointer" key={post.id} onClick={redirectToIssue}>
                            <div className="flex justify-between mb-5">
                                <h2>
                                    {post.title}
                                </h2>
                                <span>
                                    {formatDistanceToNow(new Date(post.created_at), {
                                        addSuffix: true,
                                        locale: ptBR
                                    })}
                                </span>
                            </div>
                            <p>
                                {post.body?.length > 180 ? post.body.substring(0, 181) + '...' : post.body}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}