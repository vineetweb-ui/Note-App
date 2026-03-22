import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('/auth/login', { email, password });
            if (res.data.success) {
                const userData = res.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                toast.success('Logged in successfully!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Login failed');
            return false;
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('/auth/register', { name, email, password });
            if (res.data.success) {
                const userData = res.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                toast.success('Registration successful!');
                return true;
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Registration failed');
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
