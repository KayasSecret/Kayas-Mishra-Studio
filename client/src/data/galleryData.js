/**
 * DRONZNIDO Scene Gallery Data
 * 
 * Imports images directly from src/assets/storyImg/ so Vite can optimize
 * and bundle them properly during build time.
 */

import scene1 from '../assets/storyImg/Scene_1.png';
import scene2 from '../assets/storyImg/Scene_2.png';
import scene3 from '../assets/storyImg/Scene_3.png';
import scene4 from '../assets/storyImg/Scene_4.jpg';
import scene5 from '../assets/storyImg/Scene_5.jpg';
import scene6 from '../assets/storyImg/Scene_6.jpg';
import scene7 from '../assets/storyImg/Scene_7.jpg';
import scene8 from '../assets/storyImg/Scene_8.jpg';

export const galleryImages = [
  {
    id: 'scene-1',
    src: scene1,
    title: 'Chronicles of Dronznido',
    subtitle: 'Official Cover Art',
    description: 'The literary portal to the story, illustrating the mystical boundaries and the ancient prophecy of the three warriors.',
    aspect: 'portrait',
  },
  {
    id: 'scene-2',
    src: scene2,
    title: 'Dronznido: The Hidden Kingdom',
    subtitle: 'Official Poster Art',
    description: 'The official key visual representing the magical planet Dronznido and the divine struggle against the dark forces of Blackdork.',
    aspect: 'portrait',
  },
  {
    id: 'scene-3',
    src: scene3,
    title: 'Dronznido (Hindi Edition)',
    subtitle: 'Collector\'s Poster Art',
    description: 'Special edition visual artwork celebrating the expansion of the legend to a wider audience of fantasy readers.',
    aspect: 'portrait',
  },
  {
    id: 'scene-4',
    src: scene4,
    title: 'Cursed Kalamundi Village',
    subtitle: 'Story Location Art',
    description: 'A conceptual study of Kalamundi Village, showing the dark, cursed atmosphere left behind by Drathwedork\'s invasion.',
    aspect: 'landscape',
  },
  {
    id: 'scene-5',
    src: scene5,
    title: 'The Planet Dronznido',
    subtitle: 'World Landscape',
    description: 'A breathtaking visualization of Dronznido, a planet located billions of light years away from Earth, driven entirely by magic rather than science.',
    aspect: 'landscape',
  },
  {
    id: 'scene-6',
    src: scene6,
    title: 'Master Kasagi\'s Teachings',
    subtitle: 'Concept Illustration',
    description: 'An evocative scene representing Master Sefwang Kasagi training the three divine children in magic, combat, and discipline.',
    aspect: 'landscape',
  },
  {
    id: 'scene-7',
    src: scene7,
    title: 'The Magical Turtle\'s Pond',
    subtitle: 'Story Location Art',
    description: 'The sacred, ancient pond where the Magical Turtle resides, offering guidance and ancient wisdom to the three young warriors.',
    aspect: 'landscape',
  },
  {
    id: 'scene-8',
    src: scene8,
    title: 'March of the Nexara Army',
    subtitle: 'Epic Battle Concept',
    description: 'King Sahoonj Krosa\'s massive forces gathering to march alongside Sentroz in the final war to liberate Dronznido.',
    aspect: 'landscape',
  }
];
