import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { getTopJobSkills } from '../services/skillsService';
import './SkillsTagInput.css';

const COMMON_SKILLS = [
  'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C#', 'Go', 'Rust',
  'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git', 'CI/CD',
  'HTML', 'CSS', 'SASS', 'Redux', 'GraphQL', 'REST API', 'Agile', 'Scrum',
  'Machine Learning', 'Data Analysis', 'Figma', 'UX Design', 'Product Management',
];

export default function SkillsTagInput({ value = [], onChange, placeholder }) {
  const { jobs } = useApp();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const jobSkills = getTopJobSkills(jobs || [], 30);
  const allSuggestions = [...new Set([...COMMON_SKILLS, ...jobSkills])];

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions(allSuggestions.slice(0, 8));
    } else {
      const q = input.toLowerCase();
      const filtered = allSuggestions.filter(
        (s) => s.toLowerCase().includes(q) && !value.includes(s)
      );
      setSuggestions(filtered.slice(0, 8));
    }
    setHighlightIndex(-1);
  }, [input, value, jobs?.length]);

  const addSkill = (skill) => {
    const s = (skill || input.trim());
    if (!s || value.includes(s)) return;
    onChange([...value, s]);
    setInput('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  const removeSkill = (idx) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        addSkill(suggestions[highlightIndex]);
      } else if (input.trim()) {
        addSkill(input.trim());
      }
    } else if (e.key === 'Backspace' && !input && value.length) {
      removeSkill(value.length - 1);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => (i < suggestions.length - 1 ? i + 1 : i));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => (i > 0 ? i - 1 : -1));
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="skills-tag-input">
      <div className="skills-tag-input-inner">
        {value.map((skill, i) => (
          <span key={`${skill}-${i}`} className="skill-tag editable">
            {skill}
            <button type="button" onClick={() => removeSkill(i)} aria-label={`Remove ${skill}`}>×</button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={value.length ? '' : (placeholder ?? t('skills.addSkill'))}
          className="skills-tag-input-field"
        />
      </div>
      {showDropdown && suggestions.length > 0 && (
        <ul ref={dropdownRef} className="skills-tag-input-dropdown">
          {suggestions.map((s, i) => (
            <li
              key={s}
              className={highlightIndex === i ? 'highlight' : ''}
              onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
