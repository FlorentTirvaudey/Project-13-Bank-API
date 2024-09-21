import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Form from "../components/Form";

import Logo from '../assets/img/argentBankLogo.png'

function Loginpage() {

    return(
        <div>
            <Navbar logo={Logo} />
            <main className="main bg-dark">
                <Form />
            </main>
            <Footer />
        </div>
    )
}

export default Loginpage;