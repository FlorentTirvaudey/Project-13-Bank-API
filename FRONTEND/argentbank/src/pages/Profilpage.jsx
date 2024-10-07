import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Logo from '../assets/img/argentBankLogo.png'
import { updateUser } from "../redux/slices/authentification";
import User from "../service/User";

function Profilpage() {

    const { isLoggedIn, userData, token } = useSelector((state) => state.auth);

    const [firstname, setFirstname] = useState(userData?.firstname || '');
    const [lastname, setLastname] = useState(userData?.lastname || '');

    // Edit temp firstname and lastname states
    const [tempFirstname, setTempFirstname] = useState(userData?.firstname || '');
    const [tempLastname, setTempLastname] = useState(userData?.lastname || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
          navigate('/login');
        }
      }, [isLoggedIn, navigate]);

    const handleChangeName = async () => {
        document.getElementById('firstname').value = "";
        document.getElementById('lastname').value = "";

        try {
            const response = await axios.put(
                'http://localhost:3001/api/v1/user/profile',
                {
                    firstName: tempFirstname,
                    lastName: tempLastname
                },
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );

            setFirstname(response.data.body.firstName);
            setLastname(response.data.body.lastName);

            const { createdAt, email, firstName, id, lastName, updatedAt } = response.data.body;

            const userData = new User(createdAt, email, firstName, id, lastName, updatedAt);

            dispatch(updateUser({ userData }));

        } catch (error) {
            console.error(error);
        }
    }

    const displayEditBlock = () => {
        document.getElementById('edit-block').style.display = "initial";
        document.getElementById('id_edit_button').style.display = "none";
    }

    const hideEditBlock = () => {
        document.getElementById('edit-block').style.display = "none";
        document.getElementById('id_edit_button').style.display = "initial";
    }

    return (
        <>
            <Navbar logo={Logo} />
                <main className="main bg-dark">
                    <div className="header">
                        <h1>Welcome back<br />{firstname} {lastname}!</h1>
                        <button id="id_edit_button" className="edit-button" onClick={displayEditBlock}>Edit Name</button>
                        <div id="edit-block" style={{
                            display: "none"
                        }}>
                            <div className="change_username">
                                <div style={{
                                    margin: "15px auto"
                                }}>
                                    <input className="inputs_changename" type="text" id="firstname" placeholder={firstname || "Firstname"} onChange={() => setTempFirstname(event.target.value)} />
                                    <input className="inputs_changename" type="text" id="lastname" placeholder={lastname || "Lastname"} onChange={() => setTempLastname(event.target.value)} />
                                </div>
                            </div>
                            <div className="change_username">
                                <div style={{
                                    margin: "15px auto"
                                }}>
                                    <button className="edit-button" onClick={() => {handleChangeName(); hideEditBlock()}}>Save</button>
                                    <button className="edit-button" onClick={hideEditBlock}>Cancel</button>
                                </div>
                            </div>
                        </div>
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