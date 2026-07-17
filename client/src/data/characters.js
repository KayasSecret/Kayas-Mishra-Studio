/**
 * DRONZNIDO Character Encyclopedia
 * Source: Story context provided directly by author Kayas Mishra.
 * All descriptions are derived exclusively from the provided story synopsis.
 */

export const CATEGORIES = [
  { key: 'all',      label: 'All',      color: '#C4B5FD' },
  { key: 'heroes',   label: 'Heroes',   color: '#38BDF8' },
  { key: 'gods',     label: 'Gods',     color: '#F59E0B' },
  { key: 'villains', label: 'Villains', color: '#F87171' },
  { key: 'creatures',label: 'Creatures',color: '#34D399' },
  { key: 'mentors',  label: 'Mentors',  color: '#A78BFA' },
  { key: 'kings',    label: 'Kings',    color: '#FB923C' },
  { key: 'others',   label: 'Others',   color: '#94A3B8' },
];

export const ALIGNMENT_COLORS = {
  Light:   { primary: '#F59E0B', secondary: 'rgba(245,158,11,0.12)',  label: '✦ Light'   },
  Dark:    { primary: '#F87171', secondary: 'rgba(248,113,113,0.12)', label: '✦ Dark'    },
  Neutral: { primary: '#34D399', secondary: 'rgba(52,211,153,0.12)',  label: '✦ Neutral' },
};

export const characters = [
  {
    id: 'skywooder',
    name: 'God Sky Wooder',
    category: 'gods',
    role: 'God of Goodness',
    raceType: 'Supreme Divine Being',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Power of the Heavens',
    magicalAbility: 'Divine Cosmic Magic',
    status: 'At War',
    statusColor: '#F87171',
    iconKey: 'spellbook',
    accentColor: '#F59E0B',
    shortLore:
      'Protector of Dronznido and defender of magical balance for countless years. When the Dark God Drathwedork invades, God Skywooder rises to wage the ultimate divine war to protect his world.',
    fullLore:
      'God Skywooder is the supreme divine protector of the magical planet DRONZNIDO — a world located billions of light years from Earth, driven entirely by magic. For countless ages he maintained peace and sacred balance across the realm, watching over his people as they lived harmoniously with magic. When Drathwedork, the Dark God of the evil planet Blackdork, launched his devastating invasion, God Skywooder prepared for total war. He fights not only to defend his world, but to protect the divine balance of good and magic that defines the very soul of Dronznido. His courage and divine power stand as the last great barrier between light and eternal darkness.',
    abilities: ['Divine Cosmic Power', 'Sacred Protection', 'Defender of Magical Balance', 'Command over Goodness & Light'],
    relationships: [
      'Divine protector of Goddess Gimestrini',
      'Supreme enemy of Drathwedork',
      'Guardian god of the three chosen heroes — Sentroz, Scrollt, and Voyan',
    ],
    importance: 'Supreme — The divine protector of DRONZNIDO. His war against Drathwedork defines the very conflict at the heart of the entire story.',
    importanceShort: 'Supreme Deity & Protector',
  },

  {
    id: 'gimestrini',
    name: 'Goddess Gimestriny',
    category: 'gods',
    role: 'Goddess of Magic',
    raceType: 'Supreme Divine Being',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Sacred Divine Magic',
    magicalAbility: 'Division of Divine Power',
    status: 'Captured by Drathwedork',
    statusColor: '#F87171',
    iconKey: 'magicgate',
    accentColor: '#F0ABFC',
    shortLore:
      'Goddess of Magic and the true source of the three legendary heroes. She secretly divided her own divine powers into three parts — reborn as Sentroz, Scrollt, and Voyan — before being captured by Drathwedork.',
    fullLore:
      'Goddess Gimestrini is the Goddess of Magic on DRONZNIDO — a being of immeasurable divine power and grace. Knowing that Drathwedork\u2019s conquest was inevitable, she acted with extraordinary sacrifice: she secretly divided her own divine magical power into three equal parts and sent them to be reborn as three destined children — Sentroz, Scrollt, and Voyan. These three children are, in truth, living fragments of the Goddess herself. After this act of supreme sacrifice, Gimestrini was captured by Drathwedork, who seeks to force her into marriage. Her rescue becomes a central purpose of the three heroes\u2019 epic journey, and her divine essence — living within them — fuels their power at every step.',
    abilities: ['Goddess of Magic', 'Division of Divine Essence', 'Sacred Prophecy', 'Source of the Three Heroes\u2019 Power'],
    relationships: [
      'Her divine power was reborn as Sentroz, Scrollt, and Voyan',
      'Protected by God Skywooder',
      'Captured by Drathwedork — her rescue is the heroes\u2019 ultimate mission',
    ],
    importance: 'Critical — The source of the three heroes\u2019 divine power. Her capture by Drathwedork is the driving mission of the entire story.',
    importanceShort: 'Source of the Three Heroes',
  },

  {
    id: 'drathwedork',
    name: 'Drathvadork',
    category: 'villains',
    role: 'Dark God / Supreme Villain',
    raceType: 'Dark God',
    origin: 'Planet Blackdork',
    alignment: 'Dark',
    weapon: 'Armies of Monsters & Demons',
    magicalAbility: 'Dark Dominion & Cursed Magic',
    status: 'Conquering — Active Threat',
    statusColor: '#F87171',
    iconKey: 'dragon',
    accentColor: '#F87171',
    shortLore:
      'Dark God of the evil planet Blackdork and the most powerful villain in the story. Commands legions of monsters, demons, and evil creatures. His invasion of Dronznido and capture of Goddess Gimestrini sets the entire story into motion.',
    fullLore:
      'Drathwedork is one of the most powerful beings in existence — the Dark God and supreme ruler of the evil planet Blackdork. For ages he watched the peaceful, magic-driven world of DRONZNIDO with dark envy. His ambition is absolute: to conquer Dronznido, destroy all goodness, and force Goddess Gimestrini to marry him. He commands vast armies of monsters, demons, and evil creatures, and wields terrifying cursed magic that enslaves entire kingdoms. He cursed the people of Kalamundi Village as a demonstration of his power. His greatest act of villainy is capturing Goddess Gimestrini herself — igniting the quest of the three chosen heroes whose destiny is to bring about his downfall.',
    abilities: ['Dark Dominion', 'Command over Monsters & Demons', 'Cursed Magic', 'Conquest & Destruction', 'Enslavement of Kingdoms'],
    relationships: [
      'Supreme enemy of God Skywooder',
      'Captor of Goddess Gimestrini — seeks to force her into marriage',
      'Enemy of Sentroz, Scrollt, and Voyan — the three destined to defeat him',
      'Ruler of the evil planet Blackdork',
    ],
    importance: 'Critical — The primary antagonist. Every event in the story is a consequence of his invasion, his cruelty, and his ambition.',
    importanceShort: 'Primary Villain — Dark God',
  },

  {
    id: 'sefwang',
    name: 'Master Safwang Kasaagi',
    category: 'mentors',
    role: 'Legendary Master & Guardian',
    raceType: 'Human — Ancient Master',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Ancient Wisdom & Mastery',
    magicalAbility: 'Magic, Combat & Ancient Weapon Mastery',
    status: 'Active — Training & Guiding',
    statusColor: '#34D399',
    iconKey: 'openbook',
    accentColor: '#A78BFA',
    shortLore:
      'The legendary master who rescued the three divine children and raised them as his own. For years he trained Sentroz, Scrollt, and Voyan in magic, combat, wisdom, discipline, and destiny — forging them into warriors capable of facing Drathwedork.',
    fullLore:
      'Master Sefwang Kasagi is one of the most revered and legendary figures on the planet DRONZNIDO. When the three children born from Goddess Gimestrini\u2019s divided power entered the world, it was Master Kasagi who rescued and protected them. He raised them as his own and spent many years training them in every discipline necessary for their sacred destiny: Magic, Wisdom, Combat, Discipline, Ancient Weapons, and the philosophy of Destiny itself. Under his mentorship, Sentroz mastered the legendary sword Vajrakhand, Scrollt claimed the divine axe Varunastra, and Voyan awakened the sacred fire power Agniveta. He is also an old friend of the Magical Turtle, whose guidance he trusts completely. Master Kasagi is the backbone of the heroes\u2019 preparation and the living bridge between ancient wisdom and the new generation of warriors.',
    abilities: ['Mastery of Ancient Magic', 'Combat Training', 'Ancient Weapon Instruction', 'Wisdom & Discipline Teaching', 'Connection to Ancient Beings'],
    relationships: [
      'Rescuer and guardian of Sentroz, Scrollt, and Voyan',
      'Old friend of the Magical Turtle',
      'Loyal servant of God Skywooder\u2019s cause',
    ],
    importance: 'Critical — Without his training and guidance, the three heroes could never have been ready to face Drathwedork.',
    importanceShort: 'Guardian & Legendary Master',
  },

  {
    id: 'sentroz',
    name: 'Sentroz',
    category: 'heroes',
    role: 'Eldest Hero — Legendary Swordsman',
    raceType: 'Human — Divine-Born',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Vajrakhand (Legendary Sword)',
    magicalAbility: 'Fragment of Goddess Gimestrini\u2019s Divine Power',
    status: 'Active — On Epic Quest',
    statusColor: '#34D399',
    iconKey: 'swordman',
    accentColor: '#38BDF8',
    shortLore:
      'The eldest of the three divine heroes and the natural leader of the trio. Born from a fragment of Goddess Gimestrini\u2019s power, he wields the legendary sword Vajrakhand and leads his brothers on the quest to defeat Drathwedork.',
    fullLore:
      'Sentroz is the eldest of the three heroes born from the divided divine power of Goddess Gimestrini. As the natural leader of the trio, he carries the weight of destiny on his shoulders with courage and resolve. Under Master Sefwang Kasagi\u2019s rigorous training, he mastered the art of the sword and became worthy to wield Vajrakhand — a legendary blade of immense power. Brave, bold, and battle-hardened, Sentroz leads his brothers Scrollt and Voyan through the dangers of their epic journey: from Kalamundi Village and the cursed Osrona Monster, toward the final confrontation with Drathwedork himself. In him burns the spirit of a true warrior — fearless in the face of darkness, and unwilling to rest until Goddess Gimestrini is freed.',
    abilities: ['Mastery of Vajrakhand — Legendary Sword', 'Combat Leadership', 'Divine Fragment of Goddess Gimestrini\u2019s Power', 'Tactical Warrior Mind'],
    relationships: [
      'Eldest brother among the three heroes',
      'Student of Master Sefwang Kasagi',
      'Allied with Scrollt and Voyan',
      'Born of Goddess Gimestrini\u2019s divine power',
    ],
    importance: 'Critical — The leader of the trio. His courage and sword arm are the spearhead of the fight against Drathwedork.',
    importanceShort: 'Leader of the Three Heroes',
  },

  {
    id: 'scrollt',
    name: 'Scrollt',
    category: 'heroes',
    role: 'Powerful Warrior — Axe Champion',
    raceType: 'Human — Divine-Born',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Varunastra (Divine Battle Axe)',
    magicalAbility: 'Fragment of Goddess Gimestrini\u2019s Divine Power',
    status: 'Active — On Epic Quest',
    statusColor: '#34D399',
    iconKey: 'wizardstaff',
    accentColor: '#38BDF8',
    shortLore:
      'A fearless warrior and loyal companion to Sentroz and Voyan. Born of divine power, he wields Varunastra — the divine battle axe — and fights with unstoppable force on the front lines of every battle.',
    fullLore:
      'Scrollt is the second of the three heroes born from the divided divine power of Goddess Gimestrini. Where Sentroz leads with strategy and Voyan with fire, Scrollt fights with raw, fearless power. Under Master Kasagi\u2019s training, he proved himself worthy of Varunastra — a divine battle axe of legendary might. On the battlefield, Scrollt is an unstoppable force, charging into danger with absolute fearlessness and unwavering loyalty to his brothers. His bond with Sentroz and Voyan is unbreakable, and his role in the trio is to be the shield and the hammer — protecting those he loves and delivering devastating force against every enemy who stands in the way of their sacred mission.',
    abilities: ['Mastery of Varunastra — Divine Battle Axe', 'Fearless Frontline Combat', 'Divine Fragment of Goddess Gimestrini\u2019s Power', 'Unstoppable Warrior Strength'],
    relationships: [
      'Second brother among the three heroes',
      'Student of Master Sefwang Kasagi',
      'Loyal companion to Sentroz and Voyan',
      'Born of Goddess Gimestrini\u2019s divine power',
    ],
    importance: 'Critical — The powerhouse of the trio. His fearless combat ability makes him indispensable to the heroes\u2019 quest.',
    importanceShort: 'Fearless Warrior of the Trio',
  },

  {
    id: 'voyan',
    name: 'Voyan',
    category: 'heroes',
    role: 'Youngest Hero — Master of Fire',
    raceType: 'Human — Divine-Born',
    origin: 'Planet Dronznido',
    alignment: 'Light',
    weapon: 'Agniveta (Sacred Fire Power)',
    magicalAbility: 'Sacred Fire — Agniveta',
    status: 'Active — On Epic Quest',
    statusColor: '#34D399',
    iconKey: 'magicportal',
    accentColor: '#FB923C',
    shortLore:
      'The youngest of the three heroes, calm and highly intelligent. He awakened Agniveta — the sacred power of fire itself — and brings both wisdom and devastating magical force to every battle.',
    fullLore:
      'Voyan is the youngest of the three heroes born from the divided divine power of Goddess Gimestrini. Though the youngest, his calm intelligence and deep understanding of magic make him uniquely powerful. Through Master Kasagi\u2019s training, Voyan awakened Agniveta — not merely a weapon, but the sacred power of fire itself. He commands fire as a living force, bending it to his will in battle with precision and devastating effect. His calm, thoughtful nature often provides the wisdom that guides the trio through impossible situations, making him as valuable to the team\u2019s mind as Sentroz is to its leadership and Scrollt to its muscle. Together, the three are truly complete.',
    abilities: ['Agniveta — Sacred Fire Power', 'Advanced Magical Intelligence', 'Fire Mastery & Elemental Control', 'Divine Fragment of Goddess Gimestrini\u2019s Power'],
    relationships: [
      'Youngest brother among the three heroes',
      'Student of Master Sefwang Kasagi',
      'Strategic mind alongside Sentroz and Scrollt',
      'Born of Goddess Gimestrini\u2019s divine power',
    ],
    importance: 'Critical — The magical genius of the trio. His fire power and intelligence provide the tactical edge the heroes need.',
    importanceShort: 'Fire Master & Wise Hero',
  },

  {
    id: 'prophet-witch',
    name: 'The Evil Prophet Witch',
    category: 'others',
    role: 'Ancient Fortune Teller & Dark Prophet',
    raceType: 'Ancient Witch — Prophetess',
    origin: 'Unknown — Planet Dronznido',
    alignment: 'Dark',
    weapon: 'Prophecy & Dark Foresight',
    magicalAbility: 'Ancient Prophetic Vision',
    status: 'Deceased — Killed After Prophecy',
    statusColor: '#94A3B8',
    iconKey: 'crystalball',
    accentColor: '#C026D3',
    shortLore:
      'An ancient fortune teller who foresaw that three legendary warriors would be born to decide the fate of Dronznido. She revealed this prophecy before the invasion — and was killed for it.',
    fullLore:
      'The Evil Prophet Witch is an ancient being of dark prophetic power. Before Drathwedork\u2019s invasion could begin, she foresaw the future with terrible clarity — that three legendary warriors would be born who would decide the fate of the entire kingdom of DRONZNIDO. This prophecy, once revealed, could not be unspoken. The knowledge that three destined heroes would one day challenge his power enraged Drathwedork. The Prophet Witch was killed after delivering her prophecy. Yet in death, her words proved more powerful than she could have imagined: they set in motion the very events she foresaw — Goddess Gimestrini\u2019s sacrifice, the birth of the three heroes, and the long war against the Dark God.',
    abilities: ['Ancient Prophetic Vision', 'Dark Foresight', 'Foretelling of Destiny'],
    relationships: [
      'Her prophecy directly triggered Goddess Gimestrini\u2019s act of dividing her divine power',
      'Her prophecy is the foundation upon which the entire story rests',
    ],
    importance: 'Foundational — Though she appears only briefly, her prophecy is the event that triggers every other event in the story.',
    importanceShort: 'The Prophetic Catalyst',
  },

  {
    id: 'magic-turtle',
    name: 'Magical Turtle',
    category: 'creatures',
    role: 'Ancient Magical Guide',
    raceType: 'Ancient Magical Creature',
    origin: 'Planet Dronznido',
    alignment: 'Neutral',
    weapon: 'Ancient Elemental Magic',
    magicalAbility: 'Ancient Wisdom & Guidance Magic',
    status: 'Active — Guiding the Heroes',
    statusColor: '#34D399',
    iconKey: 'crystalball',
    accentColor: '#34D399',
    shortLore:
      'An ancient magical creature and old friend of Master Sefwang Kasagi. Found by the three heroes in Kalamundi Village, the Magical Turtle guides them toward the cursed Osrona Monster and their destiny beyond.',
    fullLore:
      'The Magical Turtle is one of the most extraordinary creatures in the world of DRONZNIDO — ancient beyond measure and endowed with deep elemental wisdom. An old and trusted friend of Master Sefwang Kasagi, the Turtle has walked the world long before the current age of conflict. When Sentroz, Scrollt, and Voyan arrive at Kalamundi Village, they encounter this ancient being whose knowledge of the land — and of the cursed Osrona Monster — is invaluable. The Magical Turtle serves as the bridge between the heroes\u2019 journey and the next chapter of their quest, guiding them toward the path that leads to the liberation of King Sahoonj Krosa and ultimately, toward the dark planet Blackdork itself.',
    abilities: ['Ancient Elemental Magic', 'Mystical Navigation & Guidance', 'Deep Worldly Wisdom', 'Connection to Ancient Forces'],
    relationships: [
      'Old friend of Master Sefwang Kasagi',
      'Guide of Sentroz, Scrollt, and Voyan through Kalamundi Village',
      'Connected to the fate of King Sahoonj Krosa',
    ],
    importance: 'Major — A crucial guide who connects the heroes to their next destination and reveals the truth about the Osrona Monster.',
    importanceShort: 'Ancient Guide & Companion',
  },

  {
    id: 'osrona',
    name: 'King Sahoonaj Krosa',
    category: 'kings',
    role: 'Cursed Monster → Restored King',
    raceType: 'Human King — Formerly Cursed',
    origin: 'Kingdom of Nexara',
    alignment: 'Light',
    weapon: 'Royal Power & Great Army of Nexara',
    magicalAbility: 'Restored by the Heroes — Curse Broken',
    status: 'Restored — Ally of the Heroes',
    statusColor: '#34D399',
    iconKey: 'dragon',
    accentColor: '#FB923C',
    shortLore:
      'Once the mighty Osrona Monster — an ancient beast trapped by Drathwedork\u2019s curse. When the three heroes break the curse, he transforms back into King Sahoonj Krosa of Nexara. In gratitude, he reveals the path to Blackdork and pledges his great army to fight beside Sentroz in the final war.',
    fullLore:
      'King Sahoonj Krosa is the rightful ruler of the Kingdom of Nexara — a powerful king reduced to a monstrous form by the dark cursed magic of Drathwedork. Known in his cursed state as the Osrona Monster, he was guided to by the Magical Turtle and encountered by the three heroes in their journey through Kalamundi Village. Sentroz, Scrollt, and Voyan free him from the ancient curse, and in a moment of revelation, the fearsome Osrona Monster transforms back into King Sahoonj Krosa. Overwhelmed with gratitude, he reveals the secret path that leads to the evil planet Blackdork — Drathwedork\u2019s domain. He also makes a solemn pledge: his great army of Nexara will fight beside Sentroz when the final war against Drathwedork begins. His transformation from villain-seeming obstacle to powerful ally is one of the great turning points of Part 1.',
    abilities: ['Command of the Great Army of Nexara', 'Royal Authority', 'Ancient Knowledge of the Path to Blackdork', 'Freed from Drathwedork\u2019s Curse'],
    relationships: [
      'Rescued from the Osrona curse by Sentroz, Scrollt, and Voyan',
      'Allied with the three heroes — army pledged to fight for them',
      'Enemy of Drathwedork who cursed him',
      'Guided to the heroes through the Magical Turtle',
    ],
    importance: 'Major — His rescue is a key milestone of Part 1. His army and knowledge of Blackdork are critical assets for the final war.',
    importanceShort: 'Cursed King Turned Mighty Ally',
  },

  {
    id: 'kalamundi',
    name: 'Kalamundi Villagers',
    category: 'others',
    role: 'Cursed People of Kalamundi',
    raceType: 'Human — Dronznido Civilians',
    origin: 'Kalamundi Village, Dronznido',
    alignment: 'Light',
    weapon: 'None — Victims of Darkness',
    magicalAbility: 'None — Cursed by Drathwedork',
    status: 'Cursed — Suffering Under Darkness',
    statusColor: '#F87171',
    iconKey: 'openbook',
    accentColor: '#94A3B8',
    shortLore:
      'The innocent people of Kalamundi Village, cursed by Drathwedork as a show of his terrible power. Their suffering is the first direct consequence of the Dark God\u2019s evil that the three heroes witness — and it steels their resolve to complete the quest.',
    fullLore:
      'The Kalamundi Villagers are the innocent inhabitants of Kalamundi Village — the first major destination on the journey of Sentroz, Scrollt, and Voyan. These peaceful people have been struck by Drathwedork\u2019s cursed magic as a demonstration of his terrifying power. Their suffering is not merely backdrop; it is the moral heart of the heroes\u2019 mission. When the three warriors arrive and witness firsthand the devastation that Drathwedork\u2019s evil has wrought upon ordinary people, their resolve transforms from duty into something deeper and more personal. It is also in Kalamundi Village that they discover the Magical Turtle. The villagers represent every innocent life across DRONZNIDO that depends on the heroes\u2019 success.',
    abilities: [],
    relationships: [
      'First victims of Drathwedork the heroes directly encounter',
      'Connected to the Magical Turtle who lives near the village',
      'Their suffering motivates the heroes throughout the quest',
    ],
    importance: 'Significant — Their plight grounds the heroes\u2019 epic quest in human suffering, giving the mission moral weight and personal urgency.',
    importanceShort: 'Victims Who Fuel the Heroes\u2019 Resolve',
  },
];
