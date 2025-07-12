import React, { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import SkillTag from './SkillTag';
import './SkillSelectionModal.css';

const SkillSelectionModal = ({ isOpen, onClose, onSave, existingSkills = [], title = "Select Skills" }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [availableSkills, setAvailableSkills] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [allSkills, setAllSkills] = useState([]);

    // Categories for skills
    const categories = [
        'Languages',
        'Hosting/SaaS',
        'Frameworks, Plugins & Libraries',
        'Servers',
        'Databases/ORM',
        'Design',
        'ML/DL',
        'CI/CD',
        'Other'
    ];

    // Category mapping for database lookup
    const categoryMapping = {
        'Languages': 'languages',
        'Hosting/SaaS': 'hosting-saas',
        'Frameworks, Plugins & Libraries': 'frameworks',
        'Servers': 'servers',
        'Databases/ORM': 'databases',
        'Design': 'design',
        'ML/DL': 'ml-dl',
        'CI/CD': 'ci-cd',
        'Other': 'other'
    };

    // Mock database skills - in real app, this would come from API
    const skillsDatabase = {
        'languages': [
            'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
            'Swift', 'Kotlin', 'TypeScript', 'Dart', 'Scala', 'R', 'MATLAB', 'Perl', 'Lua'
        ],
        'hosting-saas': [
            'AWS', 'Google Cloud', 'Azure', 'Heroku', 'DigitalOcean', 'Vercel',
            'Netlify', 'Firebase', 'MongoDB Atlas', 'Supabase', 'Railway', 'Render'
        ],
        'frameworks': [
            'React', 'Vue.js', 'Angular', 'Node.js', 'Express', 'Django', 'Flask',
            'Spring Boot', 'Laravel', 'Ruby on Rails', 'ASP.NET', 'FastAPI', 'Gin',
            'Bootstrap', 'Tailwind CSS', 'Material-UI', 'Ant Design', 'Chakra UI'
        ],
        'servers': [
            'Nginx', 'Apache', 'IIS', 'Caddy', 'Traefik', 'HAProxy', 'Lighttpd'
        ],
        'databases': [
            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'SQLite', 'Oracle', 'SQL Server',
            'DynamoDB', 'Cassandra', 'Elasticsearch', 'Neo4j', 'InfluxDB'
        ],
        'design': [
            'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Framer', 'Adobe Photoshop',
            'Adobe Illustrator', 'Adobe InDesign', 'Canva', 'Affinity Designer'
        ],
        'ml-dl': [
            'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'Pandas',
            'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter', 'Hugging Face', 'FastAI'
        ],
        'ci-cd': [
            'Jenkins', 'GitHub Actions', 'GitLab CI', 'CircleCI', 'Travis CI',
            'Azure DevOps', 'TeamCity', 'Bamboo', 'Drone CI', 'ArgoCD'
        ],
        'other': [
            'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Git', 'Linux',
            'REST APIs', 'GraphQL', 'WebSockets', 'Microservices', 'Blockchain'
        ]
    };

    useEffect(() => {
        if (isOpen) {
            setSelectedSkills([...existingSkills]);
            // Load all skills when modal opens
            const allSkillsList = Object.values(skillsDatabase).flat();
            setAllSkills(allSkillsList);
            setAvailableSkills(allSkillsList);
        }
    }, [isOpen, existingSkills]);

    useEffect(() => {
        if (selectedCategory) {
            setIsLoading(true);
            // Simulate API call delay
            setTimeout(() => {
                const categoryKey = categoryMapping[selectedCategory];
                const skills = skillsDatabase[categoryKey] || [];
                setAvailableSkills(skills);
                setIsLoading(false);
            }, 300);
        } else {
            // Show all skills when no category is selected
            setAvailableSkills(allSkills);
        }
    }, [selectedCategory, allSkills]);

    const filteredSkills = availableSkills.filter(skill =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedSkills.includes(skill)
    );

    const handleSkillToggle = (skill) => {
        if (selectedSkills.includes(skill)) {
            setSelectedSkills(selectedSkills.filter(s => s !== skill));
        } else {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
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
        setIsLoading(false);
        onClose();
    };

    if (!isOpen) return null;

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
                            {isLoading ? (
                                <div className="loading">Loading skills...</div>
                            ) : (
                                <div className="skills-grid">
                                    {filteredSkills.map((skill, index) => (
                                        <div
                                            key={index}
                                            className={`skill-item ${selectedSkills.includes(skill) ? 'selected' : ''}`}
                                            onClick={() => handleSkillToggle(skill)}
                                        >
                                            <SkillTag skill={skill} />
                                        </div>
                                    ))}
                                    {filteredSkills.length === 0 && searchQuery && (
                                        <div className="no-results">No skills found matching "{searchQuery}"</div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="selected-skills">
                            <h3>Selected Skills ({selectedSkills.length})</h3>
                            <div className="selected-skills-grid">
                                {selectedSkills.map((skill, index) => (
                                    <div key={index} className="selected-skill-item">
                                        <SkillTag skill={skill} />
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