import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const NoteModal = ({ isOpen, onClose, onSave, editingNote }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setBody(editingNote.body);
        } else {
            setTitle('');
            setBody('');
        }
    }, [editingNote, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ title, body, _id: editingNote?._id });
        setTitle('');
        setBody('');
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1000, padding: '1rem'
            }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="glass-card"
                    style={{ width: '100%', maxWidth: '500px', padding: '2rem', position: 'relative' }}
                >
                    <button 
                        onClick={onClose}
                        style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-text-muted)' }}
                    >
                        <FiX size={24} />
                    </button>
                    
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                        {editingNote ? 'Edit Note' : 'Create Note'}
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-input"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Note title"
                                required
                                maxLength="100"
                            />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label className="form-label">Content</label>
                            <textarea
                                className="form-input"
                                style={{ minHeight: '150px', resize: 'vertical' }}
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                placeholder="Write your note here..."
                                required
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={onClose} className="btn" style={{ color: 'var(--color-text-muted)' }}>
                                Cancel
                            </button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit" 
                                className="btn btn-primary"
                            >
                                {editingNote ? 'Update Note' : 'Save Note'}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default NoteModal;
