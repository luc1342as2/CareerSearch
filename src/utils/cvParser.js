/**
 * Extracts text from PDF files for CV/resume parsing
 */
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item) => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return fullText;
}

const SKILL_PATTERNS = [
  'Node.js', 'React', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C#', 'C++',
  'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes',
  'Git', 'GitHub', 'GitLab', 'Figma', 'Excel', 'HTML', 'CSS', 'jQuery', 'Angular',
  'PLC', 'PLC Programming', 'Ladder Logic', 'Agile', 'Scrum', 'REST API', 'GraphQL',
];

export function extractSkillsFromText(text) {
  if (!text || typeof text !== 'string') return [];
  const normalized = text.toLowerCase();
  const found = new Set();

  for (const skill of SKILL_PATTERNS) {
    const pattern = new RegExp(skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    if (pattern.test(normalized)) found.add(skill);
  }

  return Array.from(found);
}
