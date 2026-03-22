import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        const success = await register(name, email, password);
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
                    <FiUserPlus size={40} color="var(--color-primary)" style={{ marginBottom: '1rem' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Create Account</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Start organizing your life</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <div style={{ position: 'relative' }}>
                            <FiUser style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input 
                                type="text" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>
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
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input 
                                type="password" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                                minLength="6"
                            />
                        </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label className="form-label">Confirm Password</label>
                        <div style={{ position: 'relative' }}>
                            <FiLock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                            <input 
                                type="password" 
                                className="form-input" 
                                style={{ paddingLeft: '2.5rem' }}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                                minLength="6"
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
                        Register
                    </motion.button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
                    <p>
                        Already have an account? <Link to="/login" style={{ fontWeight: '600' }}>Login here</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
