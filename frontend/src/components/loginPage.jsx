import React, { useState } from 'react';
const styles = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
    },
    signinContainer: {
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px",
        transform: "translateY(20px)",
        opacity: 0,
        animation: "slideUp 0.6s ease-out forwards",
    },
    '@keyframes slideUp': {
        to: {
            transform: "translateY(0)",
            opacity: 1,
        }
    }
};

// Inline style helper for animation (React doesn't support @keyframes directly)
const addSlideUpAnimation = () => {
    const styleSheet = document.styleSheets[0];
    const keyframes =
        `@keyframes slideUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }`;
    if (styleSheet && styleSheet.insertRule) {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    }
};

React.useEffect(() => {
    addSlideUpAnimation();
}, []);

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setIsSigningIn(true);

        setTimeout(() => {
            alert('Sign in functionality would be implemented here!');
            setIsSigningIn(false);
        }, 1500);
    };

    return (
        <div className="signin-container">
            <div className="logo">
                <h1>Welcome</h1>
                <p>Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="signin-btn" disabled={isSigningIn}>
                    {isSigningIn ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="forgot-password">
                <a href="#">Forgot your password?</a>
            </div>

            <div className="signup-link">
                Don't have an account? <a href="#">Sign up</a>
            </div>
        </div>
    );
};

export default SignIn;