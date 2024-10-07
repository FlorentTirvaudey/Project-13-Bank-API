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

            const profileResponse = await axios.post(
                'http://localhost:3001/api/v1/user/profile',
                {},
                {
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                }
              );
            
              const { createdAt, email, firstName, id, lastName, updatedAt } = profileResponse.data.body;

            const userData = new User(createdAt, email, firstName, id, lastName, updatedAt);

            dispatch(loginSuccess({ token, userData: userData.toJSON(), rememberMe }))

            if(token && profileResponse) {
                navigate('/profil');
            }

        } catch (error) {
            console.error(error);
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
                <input type="checkbox" id="remember-me" checked={rememberMe} onChange={() => setRememberMe(event.target.checked)}/><label htmlFor="remember-me"
                >Remember me</label>
            </div>
            <button className="sign-in-button">Sign In</button>
            </form>
        </section>
    )
}

export default Form;