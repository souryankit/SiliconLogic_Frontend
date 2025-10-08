import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Calendar, Tag, X } from 'react-feather';
import NoteForm from './NoteForm/NoteForm';
import NoteCard from './NoteCard/NoteCard';
import NoteModal from './NoteModal/NoteModal';
import styles from './MyNotes.module.css';

const MyNotes = () => {
    const [notes, setNotes] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load notes from localStorage on component mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('studentNotes');
        if (savedNotes) {
            const parsedNotes = JSON.parse(savedNotes);
            setNotes(parsedNotes);
            setFilteredNotes(parsedNotes);
        }
    }, []);

    // Save notes to localStorage whenever notes change
    useEffect(() => {
        localStorage.setItem('studentNotes', JSON.stringify(notes));
    }, [notes]);

    // Filter notes based on search term and category
    useEffect(() => {
        let filtered = notes;

        if (searchTerm) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        if (selectedCategory !== 'all') {
            filtered = filtered.filter(note => note.category === selectedCategory);
        }

        setFilteredNotes(filtered);
    }, [notes, searchTerm, selectedCategory]);

    const addNote = (noteData) => {
        const newNote = {
            id: Date.now().toString(),
            ...noteData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        setNotes(prev => [newNote, ...prev]);
        setIsFormOpen(false);
    };

    const updateNote = (noteData) => {
        const updatedNote = {
            ...editingNote,
            ...noteData,
            updatedAt: new Date().toISOString()
        };
        setNotes(prev => prev.map(note => 
            note.id === editingNote.id ? updatedNote : note
        ));
        setEditingNote(null);
        setIsFormOpen(false);
    };

    const deleteNote = (noteId) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            setNotes(prev => prev.filter(note => note.id !== noteId));
            setIsModalOpen(false);
            setSelectedNote(null);
        }
    };

    const openEditForm = (note) => {
        setEditingNote(note);
        setIsFormOpen(true);
    };

    const openNoteModal = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingNote(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    const getCategories = () => {
        const categories = [...new Set(notes.map(note => note.category))];
        return categories.filter(cat => cat);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className={styles.myNotes}>
            <div className={styles.header}>
                <h1>My Notes</h1>
                <button 
                    className={styles.addButton}
                    onClick={() => setIsFormOpen(true)}
                >
                    <Plus size={16} />
                    Add Note
                </button>
            </div>

            <div className={styles.controls}>
                <div className={styles.searchBox}>
                    <Search size={16} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.filterBox}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={styles.categoryFilter}
                    >
                        <option value="all">All Categories</option>
                        {getCategories().map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.notesGrid}>
                {filteredNotes.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No notes found. Create your first note!</p>
                    </div>
                ) : (
                    filteredNotes.map(note => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={openEditForm}
                            onDelete={deleteNote}
                            onView={openNoteModal}
                        />
                    ))
                )}
            </div>

            {isFormOpen && (
                <NoteForm
                    note={editingNote}
                    onSubmit={editingNote ? updateNote : addNote}
                    onClose={closeForm}
                />
            )}

            {isModalOpen && selectedNote && (
                <NoteModal
                    note={selectedNote}
                    onClose={closeModal}
                    onEdit={openEditForm}
                    onDelete={deleteNote}
                />
            )}
        </div>
    );
};

export default MyNotes; 