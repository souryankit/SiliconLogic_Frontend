import React from 'react';
import { Edit, Trash2, Calendar, Tag, Eye } from 'react-feather';
import styles from './NoteCard.module.css';

const NoteCard = ({ note, onEdit, onDelete, onView }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 150) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'personal': '#e74c3c',
            'work': '#3498db',
            'study': '#2ecc71',
            'ideas': '#f39c12',
            'reminders': '#9b59b6',
            'projects': '#1abc9c',
            'default': '#95a5a6'
        };
        return colors[category?.toLowerCase()] || colors.default;
    };

    return (
        <div className={styles.noteCard}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title} onClick={() => onView(note)}>
                    {note.title}
                </h3>
                <div className={styles.actions}>
                    <button 
                        className={styles.actionButton}
                        onClick={() => onView(note)}
                        title="View note"
                    >
                        <Eye size={16} />
                    </button>
                    <button 
                        className={styles.actionButton}
                        onClick={() => onEdit(note)}
                        title="Edit note"
                    >
                        <Edit size={16} />
                    </button>
                    <button 
                        className={styles.actionButton}
                        onClick={() => onDelete(note.id)}
                        title="Delete note"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <div className={styles.cardContent}>
                <p className={styles.content}>
                    {truncateText(note.content)}
                </p>

                {note.tags && note.tags.length > 0 && (
                    <div className={styles.tags}>
                        {note.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                <Tag size={12} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.metaInfo}>
                    <div className={styles.dateInfo}>
                        <Calendar size={12} />
                        <span>{formatDate(note.createdAt)}</span>
                    </div>
                    
                    {note.category && (
                        <div 
                            className={styles.category}
                            style={{ backgroundColor: getCategoryColor(note.category) }}
                        >
                            {note.category}
                        </div>
                    )}
                </div>

                {note.updatedAt !== note.createdAt && (
                    <div className={styles.updatedInfo}>
                        <span>Updated: {formatDate(note.updatedAt)}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NoteCard; 