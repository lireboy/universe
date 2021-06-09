import './css/registerView.css';
import { useState } from "react";

function RegisterView() {
    const [userName, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function validateForm() {
        return userName.length > 0 && email.length > 0 && password.length > 0 && email === confirmEmail && password === confirmPassword;
    }

    const submitHandler = e => {
        e.prevetDefault();
    }

    return (
        <form>
            <div className="login">
                <p id="title">Registrieren</p>
                <div id="handler">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="name" id="name" value={userName} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div id="handler">
                    <label htmlFor="name">E-Mail:</label>
                    <input type="text" name="name" id="name" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div id="handler">
                    <label htmlFor="name">E-Mail bestätigen:</label>
                    <input type="text" name="name" id="name" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
                </div>
                <div id="handler">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="handler">
                    <label htmlFor="password">Password bestätigen:</label>
                    <input type="password" name="password" id="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div id="loginHandler">
                    <input type="submit" value="Register" disabled={!validateForm()} />
                </div>
            </div>
        </form>
    )
}

export default RegisterView;

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