import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import SkillTag from './SkillTag';
import './SkillSelectionModal.css';

// Base API URL – set VITE_API_BASE_URL in .env or default to same-origin
const API_BASE = 'http://localhost:3000';

const SkillSelectionModal = ({ isOpen, onClose, onSave, existingSkills = [], title = "Select Skills" }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [allSkills, setAllSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Compute categories from allSkills
    const categories = Array.from(new Set(allSkills.map(skill => skill.tag)));

    // Group skills by category
    const skillsByCategory = allSkills.reduce((acc, skill) => {
        acc[skill.tag] = acc[skill.tag] || [];
        acc[skill.tag].push(skill);
        return acc;
    }, {});

    console.log('categories', categories);
    console.log('skillsByCategory', skillsByCategory);

    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            // Fetch all skills from API when the modal opens
            fetch(`${API_BASE}/api/user/skills`)
                .then(async (res) => {
                    if (!res.ok) {
                        const text = await res.text();
                        console.error('Skills fetch failed:', res.status, text);
                        throw new Error('Failed to fetch skills');
                    }
                    try {
                        return res.json();
                    } catch (err) {
                        const text = await res.text();
                        console.error('Invalid JSON response:', text);
                        throw err;
                    }
                })
                .then(data => {
                    setAllSkills(data || []);
                    setAvailableSkills(data || []);
                })
                .catch(err => console.error('Failed to fetch skills', err))
                .finally(() => setIsLoading(false));

            setSelectedSkills([...existingSkills]);
        }
    }, [isOpen, existingSkills]);

    useEffect(() => {
        if (selectedCategory) {
            setAvailableSkills(skillsByCategory[selectedCategory] || []);
        } else {
            setAvailableSkills(allSkills);
        }
    }, [selectedCategory, allSkills]);

    const filteredSkills = availableSkills.filter(skill =>
        skill.skill_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedSkills.some(s => (s.skill_id ? s.skill_id : s) === skill.skill_id)
    );

    const handleSkillToggle = (skill) => {
        if (selectedSkills.some(s => (s.skill_id ? s.skill_id : s) === skill.skill_id)) {
            setSelectedSkills(selectedSkills.filter(s => (s.skill_id ? s.skill_id : s) !== skill.skill_id));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSelectedSkills(selectedSkills.filter(skill => (skill.skill_id ? skill.skill_id : skill) !== (skillToRemove.skill_id ? skillToRemove.skill_id : skillToRemove)));
    };

    const handleSave = () => {
        onSave(selectedSkills);
        onClose();
    };

    const handleClose = () => {
        setSelectedCategory('');
        setSearchQuery('');
        setSelectedSkills([]);
        setAvailableSkills([]);
        onClose();
    };

    if (!isOpen) return null;

    if (isLoading) {
        return (
            <div className="skill-modal-overlay" onClick={onClose}>
                <div className="loader-container" onClick={(e) => e.stopPropagation()}>
                    <div className="loader">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="skill-modal-overlay" onClick={handleClose}>
            <div className="skill-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="skill-modal-header">
                    <h2>{title}</h2>
                    <button className="close-button" onClick={handleClose}>
                        ×
                    </button>
                </div>

                <div className="skill-modal-body">
                    <div className="category-section">
                        <label>Select Category (Optional)</label>
                        <Select
                            value={selectedCategory}
                            onChange={setSelectedCategory}
                            options={categories}
                            placeholder="Choose a category or search all skills"
                        />
                    </div>

                    <div className="search-section">
                        <label>Search Skills</label>
                        <Input
                            type="text"
                            placeholder={selectedCategory ? `Search skills in ${selectedCategory}...` : "Search all skills..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="skills-content">
                        <div className="available-skills">
                            <h3>Available Skills</h3>
                            <div className="skills-grid">
                                {filteredSkills.map((skill) => (
                                    <div
                                        key={skill.skill_id}
                                        className={`skill-item ${selectedSkills.some(s => (s.skill_id ? s.skill_id : s) === skill.skill_id) ? 'selected' : ''}`}
                                        onClick={() => handleSkillToggle(skill)}
                                    >
                                        <SkillTag skill={skill.skill_name} />
                                    </div>
                                ))}
                                {filteredSkills.length === 0 && searchQuery && (
                                    <div className="no-results">No skills found matching "{searchQuery}"</div>
                                )}
                            </div>
                        </div>

                        <div className="selected-skills">
                            <h3>Selected Skills ({selectedSkills.length})</h3>
                            <div className="selected-skills-grid">
                                {selectedSkills.map((skill) => (
                                    <div key={skill.skill_id || skill} className="selected-skill-item">
                                        <SkillTag skill={skill.skill_name || skill} />
                                        <button
                                            className="remove-skill"
                                            onClick={() => handleRemoveSkill(skill)}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                {selectedSkills.length === 0 && (
                                    <div className="no-selected">No skills selected</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="skill-modal-footer">
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={selectedSkills.length === 0}>
                        Save Skills ({selectedSkills.length})
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SkillSelectionModal;