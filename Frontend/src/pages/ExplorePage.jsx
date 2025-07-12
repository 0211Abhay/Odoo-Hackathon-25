
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import PersonCard from '../components/PersonCard';
import RequestModal from '../components/RequestModal';
import ProfileModal from '../components/ProfileModal';
import SkillFilter from '../components/SkillFilter';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Skills');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filters = ['All Skills', 'Design', 'Programming', 'Writing'];

  // Current user's skills (this would come from user context/state)
  const currentUserSkills = [
    'Graphic Design',
    'UI/UX Design',
    'Illustration',
    'Branding',
    'Motion Graphics'
  ];

  const people = [
    {
      id: 1,
      name: 'Sophia Carter',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Graphic Design', 'UI/UX Design'],
      seeking: ['Web Development', 'Data Analysis'],
      availability: 'Weekends',
      bio: 'Passionate designer with 5+ years of experience creating beautiful interfaces.'
    },
    {
      id: 2,
      name: 'Ethan Bennett',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Web Development', 'Mobile App Development'],
      seeking: ['Photography', 'Video Editing'],
      availability: 'Evenings',
      bio: 'Full-stack developer who loves building innovative solutions.'
    },
    {
      id: 3,
      name: 'Olivia Hayes',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Content Writing', 'Copywriting'],
      seeking: ['Digital Marketing', 'SEO'],
      availability: 'Weekdays',
      bio: 'Creative writer specializing in engaging content and storytelling.'
    },
    {
      id: 4,
      name: 'Liam Foster',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Photography', 'Video Editing'],
      seeking: ['Graphic Design', 'UI/UX Design'],
      availability: 'Flexible',
      bio: 'Visual storyteller with expertise in photography and video production.'
    },
    {
      id: 5,
      name: 'Ava Mitchell',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Digital Marketing', 'SEO'],
      seeking: ['Content Writing', 'Copywriting'],
      availability: 'Weekends',
      bio: 'Marketing strategist focused on driving growth through digital channels.'
    }
  ];

  // Get all unique skills for filtering
  const allSkills = [...new Set([
    ...people.flatMap(person => person.skills),
    ...people.flatMap(person => person.seeking)
  ])].sort();

  // Filter people based on search, category, and selected skills
  const filteredPeople = people.filter(person => {
    const matchesSearch = searchQuery === '' || 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      person.seeking.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeFilter === 'All Skills' || 
      person.skills.some(skill => {
        if (activeFilter === 'Design') return skill.includes('Design') || skill.includes('UI/UX');
        if (activeFilter === 'Programming') return skill.includes('Development') || skill.includes('Programming');
        if (activeFilter === 'Writing') return skill.includes('Writing') || skill.includes('Copywriting');
        return false;
      });

    const matchesSkillFilter = selectedSkills.length === 0 ||
      selectedSkills.some(selectedSkill => 
        person.skills.includes(selectedSkill) || person.seeking.includes(selectedSkill)
      );

    return matchesSearch && matchesCategory && matchesSkillFilter;
  });

  const handleRequestSwap = (user) => {
    setSelectedUser(user);
    setRequestModalOpen(true);
  };

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setProfileModalOpen(true);
  };

  return (
    <div className="explore-page">
      <Header showNavigation />
      <div className="explore-container">
        <div className="explore-header fade-in">
          <div className="search-filter-row">
            <SearchBar
              placeholder="Search by skill or name"
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <SkillFilter
              availableSkills={allSkills}
              selectedSkills={selectedSkills}
              onSkillsChange={setSelectedSkills}
            />
          </div>
          
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="explore-content">
          <div className="results-header">
            <h2 className="section-title slide-in">
              Available Skill Swappers ({filteredPeople.length})
            </h2>
            {selectedSkills.length > 0 && (
              <div className="active-filters">
                <span>Filtered by: </span>
                {selectedSkills.map((skill, index) => (
                  <span key={index} className="filter-tag">
                    {skill}
                    <button 
                      onClick={() => setSelectedSkills(selectedSkills.filter(s => s !== skill))}
                      className="remove-filter"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="people-grid">
            {filteredPeople.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                className="slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onRequestSwap={() => handleRequestSwap(person)}
                onViewProfile={() => handleViewProfile(person)}
              />
            ))}
          </div>

          {filteredPeople.length === 0 && (
            <div className="no-results">
              <p>No skill swappers found matching your criteria.</p>
              <p>Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>

      <RequestModal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        targetUser={selectedUser}
        currentUserSkills={currentUserSkills}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        user={selectedUser}
        onRequestSwap={handleRequestSwap}
      />
    </div>
  );
};

export default ExplorePage;
