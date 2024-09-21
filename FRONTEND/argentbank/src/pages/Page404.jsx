import Navbar from '../components/Navbar';
import '../styles/Page404.css'

import { Link } from "react-router-dom"

function Page404 () {
    return (
        <div>
            <Navbar />
            <div className='block_404'>
                <h1>404</h1>
                <p>Oups! La page que vous demandez n'est pas disponible</p>
                <Link className='back_home' to="/">Retourner sur la page d'accueil</Link>
            </div>
        </div>
    )
}

export default Page404;