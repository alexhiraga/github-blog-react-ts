import logo from '../assets/Logo.svg'
import blurRight from '../assets/blur-right.png'
import blurLeft from '../assets/blur-left.png'
import blurMiddle from '../assets/blur-middle.png'
import effectLeft from '../assets/effect-left.png'
import effectRight from '../assets/effect-right.png'
import { useNavigate } from 'react-router-dom'

export function Navbar() {
    const navigate = useNavigate()

    const redirectToHome = () => {
        navigate('/')
    }

    return (
        <div className="w-full min-h-[296px] bg-base-profile relative  text-center z-0">
            <img src={logo} className="absolute top-16 mx-auto text-center left-0 right-0 cursor-pointer z-10" onClick={redirectToHome} />
            <img src={blurLeft} className="absolute top-0 left-0" />
            <img src={blurRight} className="absolute top-0 right-0" />
            <img src={blurMiddle} className="absolute bottom-0 left-0 right-0 text-center mx-auto" />
            <img src={effectLeft} className="absolute top-16 left-0 " />
            <img src={effectRight} className="absolute top-7 right-0 " />
        </div>
    )
}
