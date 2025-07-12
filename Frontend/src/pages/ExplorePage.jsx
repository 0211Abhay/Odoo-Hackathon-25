
import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import PersonCard from '../components/PersonCard';
import './ExplorePage.css';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Skills');

  const filters = ['All Skills', 'Design', 'Programming', 'Writing'];

  const people = [
    {
      id: 1,
      name: 'Sophia Carter',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Graphic Design', 'UI/UX Design'],
      seeking: ['Web Development', 'Data Analysis'],
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Ethan Bennett',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Web Development', 'Mobile App Development'],
      seeking: ['Photography', 'Video Editing'],
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'Olivia Hayes',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Content Writing', 'Copywriting'],
      seeking: ['Digital Marketing', 'SEO'],
      availability: 'Weekdays'
    },
    {
      id: 4,
      name: 'Liam Foster',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Photography', 'Video Editing'],
      seeking: ['Graphic Design', 'UI/UX Design'],
      availability: 'Flexible'
    },
    {
      id: 5,
      name: 'Ava Mitchell',
      image: '/lovable-uploads/fe21ecbd-8fcf-4177-9f3f-b5fb88afb004.png',
      skills: ['Digital Marketing', 'SEO'],
      seeking: ['Content Writing', 'Copywriting'],
      availability: 'Weekends'
    }
  ];

  return (
    <div className="explore-page">
      <Header showNavigation />
      <div className="explore-container">
        <div className="explore-header fade-in">
          <SearchBar
            placeholder="Search by skill"
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <FilterTabs
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="explore-content">
          <h2 className="section-title slide-in">Available Skill Swappers</h2>
          <div className="people-grid">
            {people.map((person, index) => (
              <PersonCard
                key={person.id}
                person={person}
                className="slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;