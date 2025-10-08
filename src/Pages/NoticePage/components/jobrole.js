import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, Users, Filter, Search, ExternalLink, Bookmark, Heart, Star } from 'react-feather';
import styles from './JobRole.module.css';

const JobRole = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  const jobCategories = [
    { id: 'all', name: 'All Jobs', count: 45 },
    { id: 'vlsi', name: 'VLSI Design', count: 12 },
    { id: 'embedded', name: 'Embedded Systems', count: 8 },
    { id: 'iot', name: 'IoT Engineering', count: 6 },
    { id: 'verification', name: 'Verification', count: 7 },
    { id: 'physical', name: 'Physical Design', count: 5 },
    { id: 'software', name: 'Software', count: 7 }
  ];

  const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'entry', name: 'Entry Level (0-2 years)' },
    { id: 'mid', name: 'Mid Level (2-5 years)' },
    { id: 'senior', name: 'Senior Level (5+ years)' }
  ];

  const jobListings = [
    {
      id: 1,
      title: "Senior VLSI Design Engineer",
      company: "Intel Corporation",
      logo: "./company_logos/intel.png",
      location: "Bangalore, India",
      experience: "5-8 years",
      salary: "₹18-25 LPA",
      category: "vlsi",
      experienceLevel: "senior",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "2024-02-15",
      description: "Design complex digital circuits for processors",
      requirements: ["VLSI Design", "Verilog/SystemVerilog", "RTL Design", "Synthesis"],
      benefits: ["Health Insurance", "Stock Options", "Flexible Hours", "Remote Work"],
      rating: 4.8,
      applicants: 45,
      isUrgent: true,
      isRemote: false
    },
    {
      id: 2,
      title: "ASIC Verification Engineer",
      company: "Qualcomm",
      logo: "./company_logos/qualcomm.png",
      location: "Hyderabad, India",
      experience: "3-6 years",
      salary: "₹15-22 LPA",
      category: "verification",
      experienceLevel: "mid",
      type: "Full-time",
      posted: "1 day ago",
      deadline: "2024-02-20",
      description: "Verify mobile chipset designs and functionality",
      requirements: ["SystemVerilog", "UVM", "Verification", "Python/Perl"],
      benefits: ["Health Coverage", "Performance Bonus", "Learning Budget", "Gym Access"],
      rating: 4.6,
      applicants: 32,
      isUrgent: false,
      isRemote: true
    },
    {
      id: 3,
      title: "IoT Systems Engineer",
      company: "Bosch",
      logo: "./company_logos/bosch.png",
      location: "Pune, India",
      experience: "2-4 years",
      salary: "₹12-18 LPA",
      category: "iot",
      experienceLevel: "mid",
      type: "Full-time",
      posted: "3 days ago",
      deadline: "2024-02-25",
      description: "Build IoT solutions for automotive systems",
      requirements: ["Embedded C", "IoT Protocols", "ARM Cortex", "RTOS"],
      benefits: ["Medical Insurance", "Flexible Timing", "Training Programs", "Relocation Support"],
      rating: 4.5,
      applicants: 28,
      isUrgent: false,
      isRemote: false
    },
    {
      id: 4,
      title: "Physical Design Engineer",
      company: "AMD",
      logo: "./company_logos/amd.png",
      location: "Bangalore, India",
      experience: "4-7 years",
      salary: "₹16-24 LPA",
      category: "physical",
      experienceLevel: "mid",
      type: "Full-time",
      posted: "1 week ago",
      deadline: "2024-02-18",
      description: "Implement SoC designs from RTL to GDSII",
      requirements: ["Place & Route", "Synopsys Tools", "Timing Analysis", "Power Analysis"],
      benefits: ["Comprehensive Healthcare", "Stock Purchase Plan", "Sabbatical Leave", "Wellness Programs"],
      rating: 4.7,
      applicants: 38,
      isUrgent: true,
      isRemote: false
    },
    {
      id: 5,
      title: "Embedded Software Engineer",
      company: "Samsung",
      logo: "./company_logos/samsung.png",
      location: "Noida, India",
      experience: "1-3 years",
      salary: "₹8-15 LPA",
      category: "embedded",
      experienceLevel: "entry",
      type: "Full-time",
      posted: "4 days ago",
      deadline: "2024-02-22",
      description: "Develop software for consumer electronics",
      requirements: ["C/C++", "Linux", "ARM Architecture", "Device Drivers"],
      benefits: ["Health Insurance", "Performance Incentives", "Skill Development", "Work-Life Balance"],
      rating: 4.4,
      applicants: 55,
      isUrgent: false,
      isRemote: true
    },
    {
      id: 6,
      title: "FPGA Design Engineer",
      company: "Xilinx (AMD)",
      logo: "./company_logos/amd.png",
      location: "Hyderabad, India",
      experience: "3-5 years",
      salary: "₹14-20 LPA",
      category: "vlsi",
      experienceLevel: "mid",
      type: "Full-time",
      posted: "5 days ago",
      deadline: "2024-02-28",
      description: "Design algorithms on FPGA platforms",
      requirements: ["VHDL/Verilog", "Xilinx Tools", "DSP", "High-Speed Design"],
      benefits: ["Medical Coverage", "Education Reimbursement", "Flexible Hours", "Innovation Time"],
      rating: 4.6,
      applicants: 29,
      isUrgent: false,
      isRemote: false
    },
    {
      id: 7,
      title: "Hardware Design Engineer",
      company: "Apple",
      logo: "./company_logos/apple.png",
      location: "Bangalore, India",
      experience: "4-8 years",
      salary: "₹25-35 LPA",
      category: "vlsi",
      experienceLevel: "senior",
      type: "Full-time",
      posted: "2 days ago",
      deadline: "2024-02-12",
      description: "Design silicon for Apple's innovative products",
      requirements: ["Advanced VLSI", "Low Power Design", "Mixed Signal", "Silicon Validation"],
      benefits: ["Premium Healthcare", "Stock Options", "Sabbatical", "Wellness Programs"],
      rating: 4.9,
      applicants: 67,
      isUrgent: true,
      isRemote: false
    },
    {
      id: 8,
      title: "Verification Engineer",
      company: "NVIDIA",
      logo: "./company_logos/nividia.jpg",
      location: "Pune, India",
      experience: "2-5 years",
      salary: "₹15-25 LPA",
      category: "verification",
      experienceLevel: "mid",
      type: "Full-time",
      posted: "6 days ago",
      deadline: "2024-02-20",
      description: "Verify GPU architectures and AI accelerators",
      requirements: ["SystemVerilog", "UVM/VMM", "GPU Architecture", "AI/ML Knowledge"],
      benefits: ["Health Benefits", "Stock Purchase", "Learning Opportunities", "Flexible Work"],
      rating: 4.8,
      applicants: 41,
      isUrgent: false,
      isRemote: true
    }
  ];

  const getFilteredJobs = () => {
    return jobListings.filter(job => {
      const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
      const matchesExperience = selectedExperience === 'all' || job.experienceLevel === selectedExperience;
      const matchesSearch = searchTerm === '' || 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesExperience && matchesSearch;
    });
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    );
  };

  const getDaysAgo = (postedDate) => {
    const days = parseInt(postedDate.split(' ')[0]);
    if (days === 1) return 'Yesterday';
    if (days <= 7) return `${days} days ago`;
    return '1 week ago';
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className={styles['job-role-container']}>
      {/* Header Section */}
      <div className={styles['job-header']}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className={styles['job-title']}>
              <Users className="me-2" size={28} />
              Career Opportunities
            </h4>
            <p className={styles['job-subtitle']}>
              Discover exciting career opportunities in Electronics & Communication
            </p>
          </div>
          <div className={styles['job-stats']}>
            <div className={styles['stat-item']}>
              <span className={styles['stat-number']}>{filteredJobs.length}</span>
              <span className={styles['stat-label']}>Jobs Available</span>
            </div>
            <div className={styles['stat-item']}>
              <span className={styles['stat-number']}>12</span>
              <span className={styles['stat-label']}>Companies</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className={styles['job-filters']}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className={styles['search-container']}>
                <Search size={20} className={styles['search-icon']} />
                <input
                  type="text"
                  className={`form-control ${styles['search-input']}`}
                  placeholder="Search jobs, companies, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 mb-3">
              <select
                className={`form-select ${styles['filter-select']}`}
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
              >
                {experienceLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <button className="btn btn-outline-primary w-100">
                <Filter size={16} className="me-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={styles['category-tabs']}>
          <div className="nav nav-pills">
            {jobCategories.map(category => (
              <button
                key={category.id}
                className={`nav-link ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
                <span className={styles['category-count']}>{category.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className={styles['job-cards-grid']}>
        {filteredJobs.map(job => (
          <div key={job.id} className={styles['job-card']}>
            {job.isUrgent && <div className={styles['urgent-badge']}>Urgent</div>}
            
            <div className={styles['job-card-header']}>
              <div className={styles['company-info']}>
                <img src={job.logo} alt={job.company} className={styles['company-logo']} />
                <div className={styles['company-details']}>
                  <h6 className={styles['company-name']}>{job.company}</h6>
                  <div className={styles['company-rating']}>
                    <Star size={14} className={styles['star-icon']} />
                    <span>{job.rating}</span>
                  </div>
                </div>
              </div>
              <button 
                className={`${styles['save-button']} ${savedJobs.includes(job.id) ? styles['saved'] : ''}`}
                onClick={() => handleSaveJob(job.id)}
              >
                <Heart size={18} />
              </button>
            </div>

            <div className={styles['job-card-body']}>
              <h5 className={styles['job-title']}>{job.title}</h5>
              <p className={styles['job-description']}>{job.description}</p>
              
              <div className={styles['job-meta']}>
                <div className={styles['meta-item']}>
                  <MapPin size={16} className={styles['meta-icon']} />
                  <span>{job.location}</span>
                  {job.isRemote && <span className={styles['remote-badge']}>Remote</span>}
                </div>
                <div className={styles['meta-item']}>
                  <Clock size={16} className={styles['meta-icon']} />
                  <span>{job.experience}</span>
                </div>
                <div className={styles['meta-item']}>
                  <DollarSign size={16} className={styles['meta-icon']} />
                  <span>{job.salary}</span>
                </div>
              </div>

              <div className={styles['job-requirements']}>
                <h6>Key Skills:</h6>
                <div className={styles['skills-container']}>
                  {job.requirements.slice(0, 3).map((skill, index) => (
                    <span key={index} className={styles['skill-tag']}>{skill}</span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className={`${styles['skill-tag']} ${styles['more']}`}>+{job.requirements.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* <div className={styles['job-benefits']}>
                <h6>Benefits:</h6>
                <div className={styles['benefits-container']}>
                  {job.benefits.slice(0, 2).map((benefit, index) => (
                    <span key={index} className={styles['benefit-tag']}>{benefit}</span>
                  ))}
                </div>
              </div> */}
            </div>

            <div className={styles['job-card-footer']}>
              <div className={styles['job-footer-info']}>
                <span className={styles['posted-date']}>{getDaysAgo(job.posted)}</span>
                <span className={styles['applicants-count']}>{job.applicants} applicants</span>
              </div>
              <div className={styles['job-actions']}>
                {/* <button className="btn btn-outline-primary btn-sm me-2">
                  View Details
                </button> */}
                <button className="btn btn-primary btn-sm">
                  Apply Now
                  <ExternalLink size={14} className="ms-1" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className={styles['no-jobs-found']}>
          <Users size={48} className="text-muted mb-3" />
          <h5>No jobs found</h5>
          <p className="text-muted">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Load More Button */}
      {filteredJobs.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-outline-primary btn-lg">
            Load More Jobs
          </button>
        </div>
      )}
    </div>
  );
};

export default JobRole;