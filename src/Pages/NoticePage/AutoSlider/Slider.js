import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { ChevronLeft, ChevronRight } from 'react-feather';
import SlideCard from './SlideCard';
import './slider.css';
function AutoSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample event and gallery data
  const galleryData = [
    {
      image: "/slider_img/1.jpg",
      title: "Tech Innovation Summit 2024",
      description: "Join us for the most exciting tech summit featuring breakthrough innovations in AI, IoT, and VLSI design.",
      date: "2024-03-15",
      time: "10:00 AM - 6:00 PM",
      location: "Silicon Valley Convention Center",
      category: "Technology",
      attendees: 250,
      isEvent: true,
      tags: ["AI", "IoT", "VLSI", "Innovation"]
    },
    {
      image: "/slider_img/2.jpg",
      title: "Electronics Workshop Series",
      description: "Hands-on workshop covering PCB design, embedded systems, and circuit analysis with industry experts.",
      date: "2024-03-20",
      time: "2:00 PM - 5:00 PM",
      location: "Engineering Lab A",
      category: "Workshop",
      attendees: 85,
      isEvent: true,
      tags: ["PCB", "Embedded", "Circuit", "Hands-on"]
    },
    {
      image: "/slider_img/3.jpg",
      title: "Silicon Research Showcase",
      description: "Annual showcase of cutting-edge research projects and innovations by our community members.",
      date: "2024-03-25",
      time: "11:00 AM - 4:00 PM",
      location: "Research Center",
      category: "Research",
      attendees: 180,
      isEvent: true,
      tags: ["Research", "Innovation", "Projects", "Community"]
    },
    {
      image: "/slider_img/4.webp",
      title: "Industry Collaboration Meet",
      description: "Networking event connecting students with leading tech companies and industry professionals.",
      date: "2024-04-01",
      time: "6:00 PM - 9:00 PM",
      location: "Main Auditorium",
      category: "Networking",
      attendees: 320,
      isEvent: true,
      tags: ["Networking", "Industry", "Careers", "Collaboration"]
    },
    {
      image: "/slider_img/6.webp",
      title: "Student Project Gallery",
      description: "Showcase of outstanding student projects in electronics, communication, and embedded systems.",
      date: "2024-04-05",
      time: "1:00 PM - 7:00 PM",
      location: "Exhibition Hall",
      category: "Exhibition",
      attendees: 150,
      isEvent: true,
      tags: ["Student", "Projects", "Electronics", "Exhibition"]
    },
    {
      image: "/slider_img/7.webp",
      title: "Future Tech Symposium",
      description: "Exploring emerging technologies and their impact on society, featuring keynote speakers from top tech firms.",
      date: "2024-04-10",
      time: "9:00 AM - 3:00 PM",
      location: "Grand Conference Hall",
      category: "Symposium",
      attendees: 400,
      isEvent: true,
      tags: ["Future", "Technology", "Keynote", "Society"]
    }
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Group slides for better display (1 slides per carousel item on larger screens)
  const groupedSlides = [];
  for (let i = 0; i < galleryData.length; i += 1) {
    groupedSlides.push(galleryData.slice(i, i + 1));
  }

  return (
    <div className="event-gallery-slider">
      <div className="gallery-header">
        <h5 className="gallery-title">
          <span className="gallery-icon">🎨</span>
          Event Gallery
        </h5>
        <div className="gallery-controls">
          <button 
            className={`auto-play-btn ${isAutoPlaying ? 'active' : ''}`}
            onClick={toggleAutoPlay}
            title={isAutoPlaying ? 'Pause' : 'Play'}
          >
            {isAutoPlaying ? '⏸️' : '▶️'}
          </button>
          <div className="slide-counter">
            {activeIndex + 1} / {groupedSlides.length}
          </div>
        </div>
      </div>

      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={isAutoPlaying ? 4000 : null}
        controls={true}
        indicators={true}
        fade={false}
        className="gallery-carousel"
        prevIcon={<ChevronLeft size={24} />}
        nextIcon={<ChevronRight size={24} />}
      >
        {groupedSlides.map((slideGroup, index) => (
          <Carousel.Item key={index} className="gallery-carousel-item">
            <div className="gallery-slide-group">
              {slideGroup.map((slide, slideIndex) => (
                <div key={slideIndex} className="gallery-slide-wrapper">
                  <SlideCard
                    image={slide.image}
                    title={slide.title}
                    description={slide.description}
                    date={slide.date}
                    time={slide.time}
                    location={slide.location}
                    category={slide.category}
                    attendees={slide.attendees}
                    isEvent={slide.isEvent}
                    tags={slide.tags}
                  />
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Gallery Navigation Dots */}
      {/* <div className="gallery-navigation">
        {groupedSlides.map((_, index) => (
          <button
            key={index}
            className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div> */}
    </div>
  );
}

export default AutoSlider;
