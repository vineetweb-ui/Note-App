import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import Spinner from '../components/Spinner';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const fetchNotes = async () => {
        try {
            const res = await axios.get('/notes');
            setNotes(res.data.data);
            setLoading(false);
        } catch (error) {
            toast.error('Failed to fetch notes');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleAddNote = () => {
        setEditingNote(null);
        setIsModalOpen(true);
    };

    const handleEditNote = (note) => {
        setEditingNote(note);
        setIsModalOpen(true);
    };

    const handleDeleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await axios.delete(`/notes/${id}`);
                setNotes(notes.filter(note => note._id !== id));
                toast.success('Note deleted successfully');
            } catch (error) {
                toast.error('Failed to delete note');
            }
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (noteData._id) {
                // Update
                const res = await axios.put(`/notes/${noteData._id}`, noteData);
                setNotes(notes.map(note => note._id === noteData._id ? res.data.data : note));
                toast.success('Note updated successfully');
            } else {
                // Create
                const res = await axios.post('/notes', noteData);
                setNotes([res.data.data, ...notes]);
                toast.success('Note created successfully');
            }
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to save note');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            
            <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>My Notes</h2>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAddNote}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <FiPlus /> New Note
                    </motion.button>
                </div>

                {loading ? (
                    <Spinner />
                ) : notes.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--color-text-muted)' }}
                    >
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--color-text-main)' }}>No notes yet</h3>
                        <p>Create your first note to get started!</p>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                        style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                            gap: '1.5rem' 
                        }}
                    >
                        {notes.map(note => (
                            <NoteCard 
                                key={note._id} 
                                note={note} 
                                onEdit={handleEditNote} 
                                onDelete={handleDeleteNote} 
                            />
                        ))}
                    </motion.div>
                )}
            </main>

            <NoteModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onSave={handleSaveNote}
                editingNote={editingNote}
            />
        </div>
    );
};

export default Dashboard;
