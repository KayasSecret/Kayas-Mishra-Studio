/**
 * DRONZNIDO Video Gallery Data
 * 
 * Imports videos directly from src/assets/storyVid/ and thumbnails from 
 * src/assets/storyImg/ so Vite can optimize and bundle them properly.
 */

import vid1 from '../assets/storyVid/vid_1.mkv';
import vid2 from '../assets/storyVid/vid_2.mkv';
import vid3 from '../assets/storyVid/vid_3.mkv';

import thumb1 from '../assets/storyImg/Scene_1.png';
import thumb2 from '../assets/storyImg/Scene_2.png';
import thumb3 from '../assets/storyImg/Scene_3.png';

export const videoGalleryData = [
  {
    id: 'video-1',
    title: 'DRONZNIDO: Official Cinematic Trailer',
    subtitle: 'The Epic Saga Begins',
    video: vid1,
    thumbnail: thumb1,
    duration: '2:15',
    description: 'Witness the dark god Drathwedork unleash chaos upon the peaceful planet Dronznido, and the rise of the three chosen warriors destined to challenge his shadow.',
    aspect: 'landscape',
  },
  {
    id: 'video-2',
    title: 'Gimestrini\'s Gift: Rebirth of Power',
    subtitle: 'Official Promotional Teaser',
    video: vid2,
    thumbnail: thumb2,
    duration: '1:45',
    description: 'Explore the divine sacrifice of Goddess Gimestrini as she divides her own essence into three children to safeguard the future of magic.',
    aspect: 'landscape',
  },
  {
    id: 'video-3',
    title: 'Training of the Three: Vajra, Varuna & Agni',
    subtitle: 'Character Focus Promo',
    video: vid3,
    thumbnail: thumb3,
    duration: '1:58',
    description: 'A cinematic look at Sentroz, Scrollt, and Voyan under the strict mentorship of Master Sefwang Kasagi, mastering legendary weapons and sacred fire.',
    aspect: 'landscape',
  }
];
