import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authentification";
import User from "../service/User";

function Form() {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/v1/user/login', {
                email: userEmail,
                password: userPassword
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
        );

            const token = response.data.body.token;

            console.log('la response', response)
            console.log('le token', token)

            if(rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }

            const profileResponse = await axios.post(
                'http://localhost:3001/api/v1/user/profile',
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
            
              const { createdAt, email, firstName, id, lastName, updatedAt, username } = profileResponse.data.body;

            const userData = new User(createdAt, email, firstName, id, lastName, updatedAt, username);

            console.log("userdata", userData);
            console.log('les datas dans la response', profileResponse.data.body)

            dispatch(loginSuccess({ token, userData }))

            if(token && profileResponse) {
                navigate('/profil');
            }

        } catch (error) {
            console.error(error);
            if (error.response) {
                // dispatch(loginFail(error.response.data.message || 'Erreur de connexion.'));
              } else if (error.request) {
                // dispatch(loginFail('Aucune réponse du serveur. Veuillez vérifier votre connexion.'));
              } else {
                // dispatch(loginFail('Une erreur est survenue lors de la connexion.'));
              }
        }
    }

    return(    
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={userEmail} onChange={() => setUserEmail(event.target.value)} />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={userPassword} onChange={() => setUserPassword(event.target.value)}/>
            </div>
            <div className="input-remember">
                <input type="checkbox" id="remember-me" checked={rememberMe} onChange={() => setRememberMe(event.target.check)}/><label htmlFor="remember-me"
                >Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            </form>
        </section>
    )
}

export default Form;