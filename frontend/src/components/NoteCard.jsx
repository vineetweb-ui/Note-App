import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const NoteCard = ({ note, onEdit, onDelete }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
            transition={{ duration: 0.2 }}
            className="glass-card"
            style={{ padding: '1.5rem', position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}
        >
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text-main)' }}>
                {note.title}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', flex: 1, marginBottom: '1.5rem', whiteSpace: 'pre-wrap' }}>
                {note.body}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                <button 
                    onClick={() => onEdit(note)}
                    style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}
                >
                    <FiEdit2 /> Edit
                </button>
                <div style={{ flex: 1 }}></div>
                <button 
                    onClick={() => onDelete(note._id)}
                    style={{ color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: '500' }}
                >
                    <FiTrash2 /> Delete
                </button>
            </div>
        </motion.div>
    );
};

export default NoteCard;
