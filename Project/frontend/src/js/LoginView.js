import '../css/loginView.css';
import { useState, Component } from "react";
import { header } from './App';
import person from "../img/svg/person.svg";
import lock from "../img/svg/lock.svg";
const axios = require("axios");


const LoginView = (props) => {
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [registerMode, setRegisterMode] = useState(false);

    function validateForm() {
        return userName.length > 0 && password.length > 0;
    }

    function formPreventDefault(e){ 
        e.preventDefault();
        console.log("trying to login user");
        axios.post("http://localhost:8080/authenticate/login", {
            headers: {
                'content-type': 'application/json',
              },    
            "userId": userName,
            "password": password
        })
        .then(res => {
            props.setActiveUser(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <form onSubmit={formPreventDefault}>
            <div className="login">
                <div className="title">{registerMode === true ? "Register" : "Login"}</div>
                <div className="handler">
                    <img src={person} alt="" />
                    <input placeholder="Username"  type="text" name="name" value={userName} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div className="handler">
                    <img src={lock} alt="" />
                    <input placeholder="Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className={`register-handler ${registerMode !== true ? "hidden" : ""}`}>
                    <div className="handler">
                        <input placeholder="Confirm Password" type="password" name="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="handler">
                        <input placeholder="Email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="handler">
                        <input placeholder="Confirm Email" type="email" name="emailConfirm" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                    </div>       
                </div>
                <nav className="buttons">
                    <button className="submit" type="submit" value="Login" disabled={!validateForm()}>{registerMode === true ? "REGISTER" : "LOGIN"}</button>
                    <button className="showRegister" type="button" onClick={() => setRegisterMode(!registerMode)}>{registerMode === true ? "BACK" : "REGISTER"}</button>
                </nav>
            </div>
        </form>
    )
}

export default LoginView;

/* export default function LoginView() {
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return userName.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controllId="userName">
                <div id="prompttext">
                    <Form.Label>User:</Form.Label>
                    </div>
                        <Form.Control autoFocus type="email" value={userName} onChange={(e) => setUser(e.target.value)}
                        />

                </Form.Group>
                <Form.Group size="lg" controllId="password">
                <div id="prompttext">
                    <Form.Label>Password:</Form.Label>
                    </div>
                        <Form.Control autoFocus type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        />

                </Form.Group>
                <div className="LoginButton">
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
                </div>
            </Form>
        </div>
    );
} */