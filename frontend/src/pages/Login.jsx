import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <FiLogIn size={40} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Welcome Back</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Login to access your notes</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <FiMail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input 
                                type="email" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input 
                                type="password" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="btn btn-primary" 
                        style={{ width: '100%' }}
                    >
                        Login
                    </motion.button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    <p>
                        Don't have an account? <Link to="/register" style={{ fontWeight: '600' }}>Register here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
