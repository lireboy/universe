import './css/loginView.css';
import { useState } from "react";

function LoginView() {
    const [userName, setUser] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return userName.length > 0 && password.length > 0;
    }

    const submitHandler = e => {
        e.prevetDefault();
    }

    return (
        <form>
            <div className="login">
                <p id="title">Login</p>
                <div id="handler">
                    <label htmlFor="name">Username:</label>
                    <input type="text" name="name" id="name" value={userName} onChange={(e) => setUser(e.target.value)} />
                </div>
                <div id="handler">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div id="loginHandler">
                    <input type="submit" value="Login" disabled={!validateForm()} />
                </div>
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