import React, { useState, useEffect } from 'react';
import { X, Save, Tag, Type, AlignLeft, Bookmark } from 'react-feather';
import styles from './NoteForm.module.css';

const NoteForm = ({ note, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        tags: []
    });
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});

    const categories = [
        'Personal',
        'Work',
        'Study',
        'Ideas',
        'Reminders',
        'Projects',
        'Research',
        'Meeting Notes',
        'Todo',
        'Other'
    ];

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || '',
                content: note.content || '',
                category: note.category || '',
                tags: note.tags || []
            });
        }
    }, [note]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    const handleTagInputKeyPress = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        }
    };

    const addTag = () => {
        const trimmedTag = tagInput.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, trimmedTag]
            }));
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            const noteData = {
                ...formData,
                title: formData.title.trim(),
                content: formData.content.trim(),
                category: formData.category || 'Other',
                tags: formData.tags
            };
            
            onSubmit(noteData);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{note ? 'Edit Note' : 'Add New Note'}</h2>
                    <button 
                        className={styles.closeButton}
                        onClick={onClose}
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="title" className={styles.label}>
                            <Type size={16} />
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={`${styles.input} ${errors.title ? styles.error : ''}`}
                            placeholder="Enter note title..."
                            autoFocus
                        />
                        {errors.title && <span className={styles.errorText}>{errors.title}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="category" className={styles.label}>
                            <Bookmark size={16} />
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={styles.select}
                        >
                            <option value="">Select a category</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="content" className={styles.label}>
                            <AlignLeft size={16} />
                            Content
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            className={`${styles.textarea} ${errors.content ? styles.error : ''}`}
                            placeholder="Write your note here..."
                            rows={8}
                        />
                        {errors.content && <span className={styles.errorText}>{errors.content}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tags" className={styles.label}>
                            <Tag size={16} />
                            Tags
                        </label>
                        <div className={styles.tagContainer}>
                            {formData.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className={styles.tagRemove}
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                value={tagInput}
                                onChange={handleTagInputChange}
                                onKeyPress={handleTagInputKeyPress}
                                onBlur={addTag}
                                placeholder="Add tag..."
                                className={styles.tagInput}
                            />
                        </div>
                        <small className={styles.tagHint}>Press Enter or comma to add tags</small>
                    </div>

                    <div className={styles.actions}>
                        <button 
                            type="button" 
                            className={styles.cancelButton}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className={styles.saveButton}
                        >
                            <Save size={16} />
                            {note ? 'Update Note' : 'Save Note'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NoteForm; 