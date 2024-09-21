import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Logo from '../assets/img/argentBankLogo.png'

function Profilpage() {

    const { isLoggedIn, userData, token } = useSelector((state) => state.auth);

    console.log("État du store après connexion :", { isLoggedIn, userData, token });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/login');
        }
      }, [isLoggedIn, navigate]);

      if (!isLoggedIn) {
        return null; // Ne rien afficher pendant la redirection
    }

    //   {userData.firstname} {userData.lastname}
      //pas besoind e fetch ici, il suffit simplement de recup avec useSelector les datas (name, isLoggedIn, ...) dans le store pour s'en servir dans le composant

      console.log('les datas pour afficher dans le PROFIL', userData)

    return (
        <>
            <Navbar logo={Logo} />
                <main className="main bg-dark">
                    <div className="header">
                        <h1>Welcome back<br />{userData?.firstname} {userData?.lastname}!</h1>
                        <button className="edit-button">Edit Name</button>
                    </div>
                    <h2 className="sr-only">Accounts</h2>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                    <section className="account">
                        <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                        </div>
                        <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                        </div>
                    </section>
                </main>
            <Footer /> 
        </>
    )
}

export default Profilpage;