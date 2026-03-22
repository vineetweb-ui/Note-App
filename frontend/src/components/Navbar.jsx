import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
                <FiEdit3 size={24} />
                <h1 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-text-main)' }}>NotesApp</h1>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontWeight: '500', color: 'var(--color-text-muted)' }}>
                    Welcome, {user?.name}
                </span>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="btn btn-danger"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}
                >
                    <FiLogOut /> Logout
                </motion.button>
            </div>
        </nav>
    );
};

export default Navbar;
