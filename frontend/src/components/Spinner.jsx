import { motion } from 'framer-motion';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{
                    width: '50px',
                    height: '50px',
                    border: '5px solid var(--color-border)',
                    borderTop: '5px solid var(--color-primary)',
                    borderRadius: '50%'
                }}
            />
        </div>
    );
};

export default Spinner;
