import React, { useState, useRef, useEffect } from 'react';
//import './coursevideoplayer.css';
import styles from './coursevideoplayer.module.css';

const CourseVideoPlayer = ({ courseTitle = "PCIe Gen 6.0 Protocol : Basics to Advanced (VLSI)" }) => {
    const [showContent, setShowContent] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [showSpeedOptions, setShowSpeedOptions] = useState(false);
    const [showCaptions, setShowCaptions] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');
    const [expandedSections, setExpandedSections] = useState([0, 3]); // Initially expand Module 1 and 4
    const videoRef = useRef(null);
    const volumeSliderRef = useRef(null);
    const speedOptionsRef = useRef(null);

    // Course content structure with modules and lessons
    const courseModules = [
        {
            id: 0,
            title: "Module 1: Introduction to PCIe",
            lessons: [
                { id: 1, title: "Introduction to the course", duration: "5min", completed: true },
                { id: 2, title: "PCIe Architecture Overview", duration: "12min", completed: true },
                { id: 3, title: "PCIe Evolution Roadmap", duration: "8min", completed: true }
            ]
        },
        {
            id: 1,
            title: "Module 2: PCIe Fundamentals",
            lessons: [
                { id: 4, title: "PCIe Protocol Layers", duration: "15min", completed: true },
                { id: 5, title: "Transaction Layer Packet", duration: "10min", completed: true },
                { id: 6, title: "Data Link Layer Basics", duration: "9min", completed: true }
            ]
        },
        {
            id: 2,
            title: "Module 3: Physical Layer",
            lessons: [
                { id: 7, title: "Physical Layer Basics", duration: "11min", completed: true },
                { id: 8, title: "Gen 1/2/3/4/5 Physical Layer", duration: "14min", completed: true },
                { id: 9, title: "Electrical Specifications", duration: "8min", completed: true }
            ]
        },
        {
            id: 3,
            title: "Module 4: Link Training",
            lessons: [
                { id: 31, title: "Analog Front End details and equalization", duration: "18min", completed: true },
                { id: 32, title: "Clocking Architecture/Signal Integrity", duration: "2min", completed: true },
                { id: 33, title: "Ordered Set types", duration: "7min", completed: true },
                { id: 34, title: "Link Initialization and Training (LTSSM)", duration: "19min", completed: true, active: true },
                { id: 35, title: "Link Initialization and Training (LTSSM)", duration: "16min", completed: true },
                { id: 36, title: "Full LTSSM Overview", duration: "6min", completed: true }
            ]
        },
        {
            id: 4,
            title: "Module 5: Advanced Topics",
            lessons: [
                { id: 37, title: "Gen 6.0 Link Training", duration: "5min", completed: true },
                { id: 38, title: "LTSSM Debug methods", duration: "4min", completed: true },
                { id: 39, title: "Gen 7.0 Developments", duration: "2min", completed: true },
                { id: 40, title: "Resource Materials and Supplemental Documents", duration: "1min", completed: true }
            ]
        }
    ];

    const tabs = ['Overview', 'Q&A', 'Notes', 'Announcements', 'Reviews', 'Learning tools'];

    // Get course completion stats
    const totalLessons = courseModules.reduce((total, module) => total + module.lessons.length, 0);
    const completedLessons = courseModules.reduce((total, module) =>
        total + module.lessons.filter(lesson => lesson.completed).length, 0);
    const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

    // Toggle module expansion
    const toggleModuleExpansion = (moduleId) => {
        if (expandedSections.includes(moduleId)) {
            setExpandedSections(expandedSections.filter(id => id !== moduleId));
        } else {
            setExpandedSections([...expandedSections, moduleId]);
        }
    };

    // Video controls
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = (e.pageX - progressBar.getBoundingClientRect().left) / progressBar.offsetWidth;
        const seekTime = clickPosition * duration;

        if (videoRef.current) {
            videoRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            if (volume > 0) {
                videoRef.current.volume = 0;
                setVolume(0);
            } else {
                videoRef.current.volume = 1;
                setVolume(1);
            }
        }
    };

    const changePlaybackSpeed = (speed) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = speed;
            setPlaybackSpeed(speed);
            setShowSpeedOptions(false);
        }
    };

    const toggleCaptions = () => {
        setShowCaptions(!showCaptions);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    // Toggle fullscreen
    const toggleFullScreen = () => {
        const videoContainer = document.querySelector('.video-container');

        if (!document.fullscreenElement) {
            if (videoContainer.requestFullscreen) {
                videoContainer.requestFullscreen();
            } else if (videoContainer.webkitRequestFullscreen) {
                videoContainer.webkitRequestFullscreen();
            } else if (videoContainer.msRequestFullscreen) {
                videoContainer.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };

    // Jump 10 seconds backward/forward
    const jumpBackward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        }
    };

    const jumpForward = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 10);
        }
    };

    // Handle click outside of volume slider and speed options
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (event && event.target) {
                if (volumeSliderRef.current && !volumeSliderRef.current.contains(event.target) &&
                    !event.target.classList.contains('volume-btn')) {
                    setShowVolumeSlider(false);
                }

                if (speedOptionsRef.current && !speedOptionsRef.current.contains(event.target) &&
                    !event.target.classList.contains('speed-btn')) {
                    setShowSpeedOptions(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            try {
                document.removeEventListener('mousedown', handleClickOutside);
            } catch (error) {
                // Ignore cleanup errors
            }
        };
    }, []);

    // Set up video metadata
    useEffect(() => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration || 0);
            const handleLoadedMetadata = () => {
                if (videoRef.current) {
                    setDuration(videoRef.current.duration);
                }
            };
            videoRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            
            return () => {
                try {
                    if (videoRef.current) {
                        videoRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                    }
                } catch (error) {
                    // Ignore cleanup errors
                }
            };
        }
    }, []);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e && e.code) {
                if (e.code === 'Space') {
                    e.preventDefault();
                    togglePlay();
                } else if (e.code === 'ArrowLeft') {
                    jumpBackward();
                } else if (e.code === 'ArrowRight') {
                    jumpForward();
                } else if (e.code === 'KeyM') {
                    toggleMute();
                } else if (e.code === 'KeyF') {
                    toggleFullScreen();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            try {
                document.removeEventListener('keydown', handleKeyDown);
            } catch (error) {
                // Ignore cleanup errors
            }
        };
    }, [isPlaying, duration]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            try {
                // Clean up video element event listeners
                if (videoRef.current) {
                    videoRef.current.removeEventListener('loadedmetadata', () => {});
                    videoRef.current.removeEventListener('timeupdate', () => {});
                    videoRef.current.removeEventListener('ended', () => {});
                    videoRef.current.removeEventListener('error', () => {});
                }
            } catch (error) {
                // Ignore cleanup errors
            }
        };
    }, []);

    return (
        <div className={`${styles['course-player-container']} ${!showContent ? styles['sidebar-closed'] : ''}`}>
            <div className={styles['course-player-header']}>
                <div className={styles['logo']}>
                    {/* <svg viewBox="0 0 91 34" fill="#A435F0" width="91" height="34">
                        <path d="M13.4 7.9V0L0 3.3v23.5l13.4 3.3v-8.2L5.9 20v-3.9l7.5-1.9V9.9L5.9 7.8v-4L13.4 7.9zM22 21.9L22 23.5 30.9 25.8 30.9 0 22 2.1 22 3.7 27.9 5.1 27.9 21.1 22 21.9z"></path>
                        <path d="M77.2,25.4 L90.8,31.5 L91,18.8 L87.6,18.8 L87.4,25.4 L82.5,23.1 L82.5,9.9 L91,13.3 L91,4.7 L77.2,0 L77.2,25.4 Z M41.4,14.1 L44.8,14.1 L44.8,25.3 L53.8,27.9 L53.8,1 L44.8,3.6 L44.8,12.5 L41.4,12.5 L41.4,0 L32.9,2.7 L32.9,29.6 L41.4,32.4 L41.4,14.1 Z M67.6,29.6 L58.2,26.7 L58.2,2.7 L67.6,6 L67.6,29.6 Z"></path>
                    </svg> */}
                </div>
                <div className={styles['course-title']}>{courseTitle}</div>
                <div className={styles['header-actions']}>
                    <button className={styles['rating-btn']}>
                        <span className={styles['star-icon']}></span> Leave a rating
                    </button>
                    <button className={styles['certificate-btn']}>
                        Get certificate <span className={styles['dropdown-icon']}></span>
                    </button>
                    <button className={styles['share-btn']}>
                        Share <span className={styles['share-icon']}></span>
                    </button>
                    <button className={styles['more-btn']}>
                        <span className={styles['more-icon']}></span>
                    </button>
                </div>
            </div>

            <div className={styles['course-player-content']}>
                <div className={styles['video-container']}>
                    <video
                        ref={videoRef}
                        onTimeUpdate={handleTimeUpdate}
                        onClick={togglePlay}
                        poster="https://via.placeholder.com/1280x720/1c1d1f/ffcc00?text=Link+Training"
                    >
                        <source src="your-video-source.mp4" type="video/mp4" />
                        {showCaptions && (
                            <track
                                kind="subtitles"
                                src="captions-en.vtt"
                                srcLang="en"
                                label="English"
                                default
                            />
                        )}
                        Your browser does not support the video tag.
                    </video>
                    {/* <iframe 
                        src="https://www.youtube.com/embed/L9qXjmJdQXY?si=NC9mnBiBOi3YJToN"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        className={styles['youtube-video']}>
                    </iframe> */}
                    {/* Video overlay for play/pause button - only show when not playing */}
                    {!isPlaying && (
                        <div className={styles['video-overlay']} onClick={togglePlay}>
                            <div className={styles['big-play-btn']}>
                                <i className={styles['big-play-icon']}></i>
                            </div>
                        </div>
                    )}

                    {/* Enhanced video controls */}
                    <div className={styles['video-controls']}>
                        {/* Progress bar with preview */}
                        <div className={styles['progress-container']}>
                            <div className={styles['progress-bar']} onClick={handleSeek}>
                                <div
                                    className={styles['progress']}
                                    style={{ width: `${(currentTime / duration) * 100}%` }}
                                ></div>
                                <div
                                    className={styles['progress-handle']}
                                    style={{ left: `${(currentTime / duration) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className={styles['controls-buttons']}>
                            <div className={styles['left-controls']}>
                                <button onClick={togglePlay} className={`${styles['control-btn']} ${styles['play-btn']}`}>
                                    {isPlaying ?
                                        <i className={styles['pause-icon']}></i> :
                                        <i className={styles['vplay-icon']}></i>
                                    }
                                </button>

                                <button className={`${styles['control-btn']} ${styles['prev-btn']}`}>
                                    <i className={styles['prev-icon']}></i>
                                </button>

                                <button onClick={jumpBackward} className={`${styles['control-btn']} ${styles['jump-btn']}`}>
                                    <i className={styles['jump-backward-icon']}></i>
                                </button>

                                <button onClick={jumpForward} className={`${styles['control-btn']} ${styles['jump-btn']}`}>
                                    <i className={styles['jump-forward-icon']}></i>
                                </button>

                                <button className={`${styles['control-btn']} ${styles['next-btn']}`}>
                                    <i className={styles['next-icon']}></i>
                                </button>

                                <div className={styles['volume-control']}>
                                    <button
                                        onClick={() => {
                                            toggleMute();
                                            setShowVolumeSlider(!showVolumeSlider);
                                        }}
                                        className={`${styles['control-btn']} ${styles['volume-btn']}`}
                                    >
                                        {volume === 0 ?
                                            <i className={styles['volume-mute-icon']}></i> :
                                            volume < 0.5 ?
                                                <i className={styles['volume-low-icon']}></i> :
                                                <i className={styles['volume-high-icon']}></i>
                                        }
                                    </button>

                                    {showVolumeSlider && (
                                        <div className={styles['volume-slider-container']} ref={volumeSliderRef}>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={volume}
                                                onChange={handleVolumeChange}
                                                className={styles['volume-slider']}
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className={styles['time-display']}>
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                            </div>

                            <div className={styles['right-controls']}>
                                <div className={styles['playback-speed']}>
                                    <button
                                        onClick={() => setShowSpeedOptions(!showSpeedOptions)}
                                        className={`${styles['control-btn']} ${styles['speed-btn']}`}
                                    >
                                        {playbackSpeed}x
                                    </button>

                                    {showSpeedOptions && (
                                        <div className={styles['speed-options']} ref={speedOptionsRef}>
                                            {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(speed => (
                                                <button
                                                    key={speed}
                                                    onClick={() => changePlaybackSpeed(speed)}
                                                    className={`${styles['speed-option']} ${playbackSpeed === speed ? styles['active'] : ''}`}
                                                >
                                                    {speed}x
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={toggleCaptions}
                                    className={`${styles['control-btn']} ${styles['caption-btn']} ${showCaptions ? styles['active'] : ''}`}
                                >
                                    <i className={styles['caption-icon']}></i>
                                </button>

                                <button onClick={toggleFullScreen} className={`${styles['control-btn']} ${styles['fullscreen-btn']}`}>
                                    <i className={styles['fullscreen-icon']}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {showContent && (
                    <div className={styles['course-sidebar']}>
                        <div className={styles['sidebar-header']}>
                            <h3>Course content</h3>
                            <div className={styles['sidebar-actions']}>
                                <button className={styles['ai-assistant-btn']}>
                                    <span className={styles['ai-icon']}></span> AI Assistant
                                </button>
                                <button className={styles['close-sidebar-btn']} onClick={() => setShowContent(false)}>
                                    <span className={styles['close-icon']}></span>
                                </button>
                            </div>
                        </div>

                        <div className={styles['course-progress']}>
                            <div className={styles['progress-text']}>
                                <span>{completionPercentage}% complete</span>
                                <span>{completedLessons}/{totalLessons} lessons</span>
                            </div>
                            <div className={styles['progress-bar-container']}>
                                <div className={styles['progress-bar-fill']} style={{ width: `${completionPercentage}%` }}></div>
                            </div>
                        </div>

                        <div className={styles['lessons-list']}>
                            {courseModules.map((module) => (
                                <div key={module.id} className={styles['module-section']}>
                                    <div
                                        className={styles['module-header']}
                                        onClick={() => toggleModuleExpansion(module.id)}
                                    >
                                        <div className={styles['module-title']}>
                                            <span className={styles['expansion-icon']}>
                                                {expandedSections.includes(module.id) ? "expand_more" : "chevron_right"}
                                            </span>
                                            <span>{module.title}</span>
                                        </div>
                                        <div className={styles['module-info']}>
                                            {module.lessons.length} lessons
                                        </div>
                                    </div>

                                    {expandedSections.includes(module.id) && (
                                        <div className={styles['module-lessons']}>
                                            {module.lessons.map((lesson) => (
                                                <div key={lesson.id} className={`${styles['lesson-item']} ${lesson.active ? styles['active'] : ''}`}>
                                                    <div className={styles['lesson-checkbox']}>
                                                        <input type="checkbox" checked={lesson.completed} readOnly />
                                                    </div>
                                                    <div className={styles['lesson-content']}>
                                                        <div className={styles['lesson-title']}>
                                                            <span>{lesson.id}. {lesson.title}</span>
                                                        </div>
                                                        <div className={styles['lesson-info']}>
                                                            <span className={styles['lesson-duration']}>
                                                                <span className={styles['clock-icon']}></span> {lesson.duration}
                                                            </span>
                                                            {lesson.preview && (
                                                                <span className={styles['preview-tag']}>Preview</span>
                                                            )}
                                                            {lesson.downloadable && (
                                                                <span className={styles['downloadable-tag']}>
                                                                    <span className={styles['download-icon']}></span> Downloadable
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* <div className="sidebar-footer">
                            <div className="resources-section">
                                <button className="resources-btn">
                                    <span className="resources-icon"></span> Resources
                                    <span className="dropdown-icon"></span>
                                </button>
                            </div>

                            <div className="sidebar-actions">
                                <button className="notes-btn">
                                    <span className="notes-icon"></span> Add note
                                </button>
                                <button className="bookmark-btn">
                                    <span className="bookmark-icon"></span> Bookmark
                                </button>
                            </div>
                        </div> */}
                    </div>
                )}

                <button className={styles['toggle-sidebar-btn']} onClick={() => setShowContent(!showContent)}
                    data-icon={showContent ? "chevron_right" : "chevron_left"}>
                </button>
            </div>

            <div className={styles['course-tabs']}>
                <div className={styles['search-icon']}></div>

                <div className={styles['tabs-container']}>
                    {tabs.map((tab) => (
                        <div
                            key={tab}
                            className={`${styles['tab']} ${activeTab === tab ? styles['active'] : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </div>
                    ))}
                </div>
                <div className={styles['resources-section']}>
                    <button className={styles['resources-btn']}>
                        <span className={styles['resources-icon']}></span> Resources
                        <span className={styles['dropdown-icon']}></span>
                    </button>
                </div>
            </div>

            <div className={styles['course-details']}>
                <h1>Mastering PCIe Gen 6: Gives you unique insights into each layer</h1>

                <div className={styles['course-stats']}>
                    <div className={styles['rating']}>
                        <span className={styles['rating-value']}>4.2</span>
                        <span className={styles['star-icon']}></span>
                        <span className={styles['ratings-count']}>63 ratings</span>
                    </div>

                    <div className={styles['students-count']}>
                        <span className={styles['students-value']}>626</span>
                        <span>Students</span>
                    </div>

                    <div className={styles['course-length']}>
                        <span className={styles['length-value']}>6.5 hours</span>
                        <span>Total</span>
                    </div>
                </div>

                <div className={styles['course-update-info']}>
                    <span className={styles['update-icon']}></span>
                    <span>Last updated December 2024</span>
                </div>

                <div className={styles['course-language']}>
                    <span className={styles['language-icon']}></span>
                    <span>English</span>
                    <span className={styles['auto-translate']}>English [Auto]</span>
                </div>
            </div>
        </div>
    );
};

export default CourseVideoPlayer;
