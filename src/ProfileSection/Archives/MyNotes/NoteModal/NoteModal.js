import React from 'react';
import { X, Edit, Trash2, Calendar, Tag, Bookmark } from 'react-feather';
import styles from './NoteModal.module.css';

const NoteModal = ({ note, onClose, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'personal': '#e74c3c',
            'work': '#3498db',
            'study': '#2ecc71',
            'ideas': '#f39c12',
            'reminders': '#9b59b6',
            'projects': '#1abc9c',
            'research': '#e67e22',
            'meeting notes': '#34495e',
            'todo': '#f1c40f',
            'other': '#95a5a6'
        };
        return colors[category?.toLowerCase()] || colors.other;
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDelete = () => {
        onDelete(note.id);
    };

    const handleEdit = () => {
        onEdit(note);
        onClose();
    };

    return (
        <div className={styles.overlay} onClick={handleBackdropClick}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>{note.title}</h1>
                        {note.category && (
                            <div 
                                className={styles.category}
                                style={{ backgroundColor: getCategoryColor(note.category) }}
                            >
                                <Bookmark size={12} />
                                {note.category}
                            </div>
                        )}
                    </div>
                    <div className={styles.actions}>
                        <button 
                            className={styles.actionButton}
                            onClick={handleEdit}
                            title="Edit note"
                        >
                            <Edit size={18} />
                        </button>
                        <button 
                            className={styles.actionButton}
                            onClick={handleDelete}
                            title="Delete note"
                        >
                            <Trash2 size={18} />
                        </button>
                        <button 
                            className={styles.closeButton}
                            onClick={onClose}
                            title="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.noteContent}>
                        <p className={styles.contentText}>{note.content}</p>
                    </div>

                    {note.tags && note.tags.length > 0 && (
                        <div className={styles.tagsSection}>
                            <h3 className={styles.sectionTitle}>
                                <Tag size={16} />
                                Tags
                            </h3>
                            <div className={styles.tags}>
                                {note.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.metaSection}>
                        <div className={styles.dateInfo}>
                            <div className={styles.dateItem}>
                                <Calendar size={14} />
                                <div>
                                    <strong>Created:</strong>
                                    <span>{formatDate(note.createdAt)}</span>
                                </div>
                            </div>
                            {note.updatedAt !== note.createdAt && (
                                <div className={styles.dateItem}>
                                    <Calendar size={14} />
                                    <div>
                                        <strong>Updated:</strong>
                                        <span>{formatDate(note.updatedAt)}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NoteModal; 