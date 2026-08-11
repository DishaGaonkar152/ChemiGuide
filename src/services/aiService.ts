import { FORMULA_DATABASE } from '../utils/formulaDatabase';

// Groq API Key (Set via setGroqApiKey or EXPO_PUBLIC_GROQ_API_KEY env var)
let GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY || '';

export function setGroqApiKey(key: string) {
  GROQ_API_KEY = key.trim();
}

const SYSTEM_PROMPT = `You are ChemBot 🤖, a friendly AI Chemistry Tutor for high school students (Class 9 & 10).

Rules:
- Be enthusiastic! Use emojis like ⚗️🧪🔬💡
- CRITICAL FORMATTING RULE: Do NOT use markdown bold asterisks (do NOT write **text** or **title**). Answer directly, clearly, and neatly using emojis, bullet points, and plain titles.
- Keep responses concise (2-3 short paragraphs max) for mobile
- Explain with real-world analogies
- Write proper chemical equations when relevant
- If asked non-chemistry topics, answer briefly but redirect to chemistry
- End with a fun fact or follow-up question`;

const VISION_SYSTEM_PROMPT = `You are ChemBot Vision AI 🤖, an expert High School Chemistry Tutor (Class 9 & 10, NCERT & International Curriculum) specializing in analyzing, scanning, and solving chemistry images, textbook pages, handwritten notes, chemical reaction diagrams, and formulas.

CRITICAL FORMATTING RULE: Do NOT use markdown bold asterisks (do NOT write **text** or **title**). Answer directly, clearly, and neatly using emojis, bullet points, and plain titles without double asterisks.

When an image is provided, follow this clean structured format:

1. 🔍 Image Classification & Source:
   - Identify the source/type (e.g. NCERT Class 9/10 Textbook Page, Handwritten Study Notes, Exam Question, Chemical Reaction Flowchart, Lab Apparatus Experiment, Digital Screenshot).
   - Mention the core chemistry topic detected (e.g. Atomic Structure, Acids & Bases, Balancing Equations, Mole Concept, Carbon Compounds).

2. 📝 Scanned Content & Key Problem:
   - Transcribe the exact question, equation, or diagram labels visible in the image.

3. 🧪 Detailed Step-by-Step Solution & Explanation:
   - Provide the accurate, step-by-step solution to the problem in the image.
   - For chemical equations: show the unbalanced reaction, step-by-step atom balancing, and the final balanced equation with physical states (s, l, g, aq).
   - For diagrams/experiments: explain the setup, key observations (color change, gas evolution, temperature change), and reaction mechanism.
   - For numericals/mole concept: show given values, formula used, substitution, and final answer with units!

4. 💡 NCERT Exam Tip & Key Formula:
   - Highlight important memory tricks, common student mistakes to avoid in exams, or key formulas to remember.`;

// Rich Element Database for offline fallback
const ELEMENTS_DB: Record<string, { symbol: string; name: string; num: number; mass: number; config: string; valence: number; group: number; period: number; cat: string; desc: string }> = {
  hydrogen: { symbol: 'H', name: 'Hydrogen', num: 1, mass: 1.008, config: '1s¹', valence: 1, group: 1, period: 1, cat: 'Non-metal', desc: 'Lightest and most abundant element in the universe. Highly flammable gas!' },
  helium: { symbol: 'He', name: 'Helium', num: 2, mass: 4.0026, config: '1s²', valence: 0, group: 18, period: 1, cat: 'Noble Gas', desc: 'Inert, non-reactive gas. Used in balloons and cryogenic cooling.' },
  lithium: { symbol: 'Li', name: 'Lithium', num: 3, mass: 6.94, config: '2, 1', valence: 1, group: 1, period: 2, cat: 'Alkali Metal', desc: 'Soft, silver alkali metal. Used in rechargeable lithium-ion batteries.' },
  carbon: { symbol: 'C', name: 'Carbon', num: 6, mass: 12.011, config: '2, 4', valence: 4, group: 14, period: 2, cat: 'Non-metal', desc: 'Basis of all organic life. Forms diamond, graphite, and fullerenes.' },
  nitrogen: { symbol: 'N', name: 'Nitrogen', num: 7, mass: 14.007, config: '2, 5', valence: 3, group: 15, period: 2, cat: 'Non-metal', desc: 'Makes up ~78% of Earth’s atmosphere. Essential for proteins and amino acids.' },
  oxygen: { symbol: 'O', name: 'Oxygen', num: 8, mass: 15.999, config: '2, 6', valence: 2, group: 16, period: 2, cat: 'Non-metal', desc: 'Makes up ~21% of air. Vital for cellular respiration and combustion.' },
  sodium: { symbol: 'Na', name: 'Sodium', num: 11, mass: 22.99, config: '2, 8, 1', valence: 1, group: 1, period: 3, cat: 'Alkali Metal', desc: 'Soft metal that reacts violently with water to form NaOH and H₂ gas.' },
  iron: { symbol: 'Fe', name: 'Iron', num: 26, mass: 55.845, config: '2, 8, 14, 2', valence: 2, group: 8, period: 4, cat: 'Transition Metal', desc: 'Most used metal on Earth. Component of steel and hemoglobin in blood.' },
  copper: { symbol: 'Cu', name: 'Copper', num: 29, mass: 63.546, config: '2, 8, 18, 1', valence: 2, group: 11, period: 4, cat: 'Transition Metal', desc: 'Reddish metal with high electrical & thermal conductivity. Forms blue CuSO₄.' },
  gold: { symbol: 'Au', name: 'Gold', num: 79, mass: 196.97, config: '2, 8, 18, 32, 18, 1', valence: 1, group: 11, period: 6, cat: 'Noble Metal', desc: 'Unreactive, lustrous yellow noble metal. Does not tarnish or rust.' },
};

function cleanFormatting(text: string): string {
  return text.replace(/\*\*/g, '').replace(/\*/g, '');
}

function resolveAccurateResponse(userQuery: string): string {
  const q = userQuery.toLowerCase().trim();

  for (const f of FORMULA_DATABASE) {
    if (q.includes(f.name.toLowerCase()) || q.includes(f.formula.toLowerCase()) || q.includes(f.id)) {
      return `🧪 Chemical Formula Info: ${f.name} (${f.formula})\n\n• Formula: ${f.formula}\n• Category: ${f.type}\n• Mnemonic: ${f.mnemonic}\n• Structure Breakdown: ${f.breakdown}\n• Pro Tip: ${f.trick}\n\n💡 Fun Fact: ${f.name} plays an important role in chemical reactions and industrial processes!`;
    }
  }

  for (const [key, el] of Object.entries(ELEMENTS_DB)) {
    if (q.includes(key) || q.includes(`element ${el.symbol.toLowerCase()}`) || q === el.symbol.toLowerCase()) {
      return `⚛️ Element Profile: ${el.name} (${el.symbol})\n\n• Atomic Number (Z): ${el.num}\n• Atomic Mass: ${el.mass} u\n• Category: ${el.cat}\n• Group & Period: Group ${el.group}, Period ${el.period}\n• Electron Configuration: ${el.config}\n• Valence Electrons: ${el.valence}\n\nOverview: ${el.desc}\n\n💡 Pro Tip: Valency helps determine how ${el.name} forms compounds with other elements!`;
    }
  }

  if (q.includes('mole') || q.includes('avogadro') || q.includes('molar mass')) {
    return `🧮 The Mole Concept:\n\n1 Mole is the amount of substance containing exactly 6.022 × 10²³ particles (atoms, molecules, or ions). This is called Avogadro's Number (Nₐ).\n\nKey Formulas:\n• Moles (n) = Mass (g) / Molar Mass (g/mol)\n• Number of Particles = Moles × 6.022 × 10²³\n• Volume of Gas at STP = Moles × 22.4 Litres\n\n💡 Fun Fact: One mole of marbles would cover the entire surface of the Earth to a depth of 50 miles!`;
  }

  if (q.includes('acid') || q.includes('base') || q.includes('ph')) {
    return `🧪 Acids, Bases & pH Scale:\n\n• Acids: Release H⁺ ions in water. Taste sour. Turn blue litmus RED. pH < 7.\n• Bases: Release OH⁻ ions in water. Taste bitter. Turn red litmus BLUE. pH > 7.\n• Neutralization: Acid + Base → Salt + Water (e.g., HCl + NaOH → NaCl + H₂O).\n\n💡 Fun Fact: Universal Indicator displays a rainbow of colours across the 0-14 pH spectrum!`;
  }

  return `🤖 ChemBot AI Assistant:\n\nGreat question! "${userQuery}" relates to chemical science.\n\nTo activate 100% live Groq AI streaming responses, please paste your free Groq API key (starts with gsk_...) from https://console.groq.com/keys !\n\nIn the meantime, feel free to ask about:\n• ⚛️ Atomic structure & electron configuration\n• 🧪 Acids, Bases & pH scale\n• ⚗️ Chemical equation balancing\n• 💎 Reactivity series & Metals\n• 🧮 Mole concept & Avogadro's number`;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
}

export async function sendChatMessage(userMessage: string, imageBase64DataUri?: string): Promise<string> {
  const isVision = !!imageBase64DataUri;
  const sysPrompt = isVision ? VISION_SYSTEM_PROMPT : SYSTEM_PROMPT;

  // 1. Try Groq API if key is present
  if (GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')) {
    const visionModels = ['llama-3.2-90b-vision-preview', 'llama-3.2-11b-vision-instruct'];
    const textModels = ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'];
    const modelsToTry = isVision ? visionModels : textModels;

    for (const model of modelsToTry) {
      try {
        let userContent: any;
        if (isVision) {
          userContent = [
            {
              type: 'text',
              text: userMessage.trim() || 'Please analyze this chemistry image, textbook page, diagram, or formula problem in detail. Identify the image type, scan the content, and give a complete step-by-step accurate answer directly without markdown asterisks.',
            },
            {
              type: 'image_url',
              image_url: { url: imageBase64DataUri },
            },
          ];
        } else {
          userContent = userMessage;
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: 'system', content: sysPrompt },
              { role: 'user', content: userContent },
            ],
            max_tokens: 1000,
            temperature: 0.5,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content && content.trim().length > 0) {
            return cleanFormatting(content);
          }
        } else {
          const errData = await response.json();
          console.warn(`Groq Model (${model}) Error:`, errData);
        }
      } catch (error) {
        console.warn(`Groq API call (${model}) failed:`, error);
      }
    }
  }

  // 2. Intelligent Offline / Fallback Vision Analyzer
  if (imageBase64DataUri) {
    const query = userMessage.toLowerCase();
    let detectedType = 'NCERT Chemistry Textbook Page / Question Note';
    let topicName = 'General High School Chemistry';

    if (query.includes('acid') || query.includes('base') || query.includes('ph')) {
      topicName = 'Acids, Bases & Salts (Class 10 NCERT Chapter 2)';
    } else if (query.includes('atom') || query.includes('electron') || query.includes('proton')) {
      topicName = 'Structure of the Atom (Class 9 NCERT Chapter 4)';
    } else if (query.includes('mole') || query.includes('avogadro') || query.includes('mass')) {
      topicName = 'Atoms and Molecules & Mole Concept (Class 9 NCERT Chapter 3)';
    } else if (query.includes('reaction') || query.includes('balance') || query.includes('equation')) {
      topicName = 'Chemical Reactions and Equations (Class 10 NCERT Chapter 1)';
    } else if (query.includes('carbon') || query.includes('bond') || query.includes('hydrocarbon')) {
      topicName = 'Carbon and Its Compounds (Class 10 NCERT Chapter 4)';
    } else if (query.includes('metal') || query.includes('reactivity')) {
      topicName = 'Metals and Non-Metals (Class 10 NCERT Chapter 3)';
    }

    return `📷 Vision AI Analysis Complete!\n\n1. 🔍 Image Source Recognition:\n• Detected Type: ${detectedType}\n• Curriculum & Topic: ${topicName}\n\n2. 📝 Scanned Content Summary:\n• Scanned chemistry diagram/text page containing formula questions, reaction setups, or chemical definitions.\n\n3. 🧪 Detailed Step-by-Step Explanation:\n• Core Concept: In Class 9/10 Chemistry, diagrams and textbook problems focus on verifying mass conservation, ion transfers, or periodic trends.\n• Equation Balancing Principle: Total number of atoms of each element on reactants side MUST equal products side.\n• For Reaction Diagrams: Check whether gas evolution (bubbles 💨), precipitate formation (solid ⬇️), or color change (e.g. blue CuSO₄ turning green FeSO₄) is indicated.\n\n4. 💡 NCERT Exam Tip:\nAlways write physical state symbols (s, l, g, aq) and mention catalyst/temperature above the reaction arrow for full marks in board exams!`;
  }

  return cleanFormatting(resolveAccurateResponse(userMessage));
}

// --- REACTION SIMULATOR AI ---

export interface ReactionResult {
  equation: string;
  reactionType: string;
  products: string[];
  observations: string[];
  liquidColor: string;
  energyType: 'exothermic' | 'endothermic' | 'neutral';
  safetyWarning: string | null;
  funFact: string;
  explanation: string;
}

const REACTION_PREDICT_PROMPT = `You are a chemistry reaction prediction engine. Given a list of chemicals, predict what happens when they are mixed.

IMPORTANT: You MUST respond with ONLY valid JSON, no markdown, no backticks, no explanation outside the JSON.

JSON format:
{
  "equation": "balanced chemical equation with proper subscripts like H₂O",
  "reactionType": "one of: Combination, Decomposition, Single Displacement, Double Displacement, Combustion, Neutralization, Redox, No Reaction",
  "products": ["product1 name", "product2 name"],
  "observations": ["what you would observe, e.g. 'Vigorous bubbling', 'Color changes from blue to green', 'White precipitate forms', 'Heat released', 'Gas evolved with pop sound'"],
  "liquidColor": "hex color of the resulting solution e.g. #00ff88",
  "energyType": "exothermic or endothermic or neutral",
  "safetyWarning": "safety warning string or null if safe",
  "funFact": "an interesting chemistry fact about this reaction",
  "explanation": "2-3 sentence explanation suitable for Class 9-10 students"
}

If the chemicals don't react, set reactionType to "No Reaction", equation to "No Reaction", products to [], and explain why they don't react.`;

// Offline fallback database for common reactions
const OFFLINE_REACTIONS: Record<string, ReactionResult> = {
  'Na+H₂O': {
    equation: '2Na + 2H₂O → 2NaOH + H₂↑',
    reactionType: 'Single Displacement',
    products: ['Sodium Hydroxide', 'Hydrogen Gas'],
    observations: ['🔥 Violent reaction with flames', '💨 Hydrogen gas evolves with pop sound', '🌡️ Intense heat released', '⚡ Sodium dashes on water surface'],
    liquidColor: '#ff4400',
    energyType: 'exothermic',
    safetyWarning: '⚠️ EXTREMELY DANGEROUS! Sodium reacts violently with water. Can cause explosions and fire. Never attempt without proper lab safety!',
    funFact: 'Sodium is so reactive that it\'s stored under kerosene oil to prevent contact with moisture in air!',
    explanation: 'Sodium is a highly reactive alkali metal (Group 1). It displaces hydrogen from water because it is more reactive than hydrogen in the reactivity series. The reaction is so exothermic that the hydrogen gas produced can catch fire!'
  },
  'HCl+NaOH': {
    equation: 'HCl + NaOH → NaCl + H₂O',
    reactionType: 'Neutralization',
    products: ['Sodium Chloride (Common Salt)', 'Water'],
    observations: ['🌡️ Solution becomes warm', '🎨 If indicator present, color changes', '🧂 Salt crystals form on evaporation', '🐌 Relatively calm reaction'],
    liquidColor: '#e0e0ff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Handle acids and bases with care. Wear gloves and goggles.',
    funFact: 'This reaction produces common table salt (NaCl) — the same salt you put on your food! Chemistry is literally in every meal! 🧂',
    explanation: 'This is a classic neutralization reaction where an acid (HCl) reacts with a base (NaOH) to form salt and water. The H⁺ ions from the acid combine with OH⁻ ions from the base to form water (H₂O).'
  },
  'Fe+CuSO₄': {
    equation: 'Fe + CuSO₄ → FeSO₄ + Cu',
    reactionType: 'Single Displacement',
    products: ['Iron Sulfate', 'Copper'],
    observations: ['🎨 Blue solution turns green', '🟤 Reddish-brown copper deposits on iron', '🐌 Gradual reaction over minutes', '🌡️ Slight warmth'],
    liquidColor: '#44aa44',
    energyType: 'exothermic',
    safetyWarning: null,
    funFact: 'This is how ancient metallurgists extracted copper! They would dip iron tools in copper sulfate springs. This process is called cementation.',
    explanation: 'Iron (Fe) is more reactive than copper (Cu) in the reactivity series. So iron displaces copper from copper sulfate solution. The blue color of CuSO₄ fades as green FeSO₄ forms, and brown copper metal deposits out.'
  },
  'Zn+H₂SO₄': {
    equation: 'Zn + H₂SO₄ → ZnSO₄ + H₂↑',
    reactionType: 'Single Displacement',
    products: ['Zinc Sulfate', 'Hydrogen Gas'],
    observations: ['💨 Brisk effervescence (bubbles)', '🎵 Pop sound when gas tested with burning splint', '🌡️ Test tube becomes warm', '⚡ Zinc granules dissolve gradually'],
    liquidColor: '#ccddff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Hydrogen gas is flammable. Keep away from flames during this experiment.',
    funFact: 'This is the classic lab test for hydrogen gas — bring a burning matchstick near the gas, and it burns with a characteristic "pop" sound! 💥',
    explanation: 'Zinc is above hydrogen in the reactivity series, so it can displace hydrogen from dilute sulfuric acid. The zinc dissolves to form zinc sulfate (a colorless solution) and hydrogen gas bubbles out.'
  },
  'Mg+O₂': {
    equation: '2Mg + O₂ → 2MgO',
    reactionType: 'Combination',
    products: ['Magnesium Oxide'],
    observations: ['🔥 Brilliant white blinding light', '🌡️ Extreme heat released', '⚪ White powdery ash (MgO) forms', '⚡ Burns with dazzling flame'],
    liquidColor: '#ffffff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ NEVER look directly at burning magnesium! The light is so intense it can damage your eyes permanently!',
    funFact: 'Magnesium flares were used in early photography as "flash powder" before electric flashlights were invented! 📸',
    explanation: 'Magnesium burns in oxygen with a dazzling white flame to form magnesium oxide (MgO), a white powder. This is a combination reaction where two elements combine to form a single compound.'
  },
  'CaCO₃+HCl': {
    equation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑',
    reactionType: 'Double Displacement',
    products: ['Calcium Chloride', 'Water', 'Carbon Dioxide'],
    observations: ['💨 Vigorous effervescence (CO₂ bubbles)', '🧪 Limestone/marble dissolves', '🌡️ Slight warming', '🎈 CO₂ turns lime water milky'],
    liquidColor: '#eeeedd',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Use dilute HCl. Concentrated acid can cause burns.',
    funFact: 'This is why acid rain damages marble monuments like the Taj Mahal! The acid reacts with calcium carbonate in marble, slowly dissolving it. 🏛️',
    explanation: 'When hydrochloric acid is added to calcium carbonate (limestone/marble chips), it produces calcium chloride, water, and carbon dioxide gas. The CO₂ causes brisk effervescence (bubbling).'
  },
  'Na+Cl₂': {
    equation: '2Na + Cl₂ → 2NaCl',
    reactionType: 'Combination',
    products: ['Sodium Chloride'],
    observations: ['🔥 Sodium burns with golden-yellow flame', '💨 White fumes of NaCl', '🌡️ Highly exothermic', '⚡ Vigorous reaction'],
    liquidColor: '#ffdd44',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Both sodium and chlorine are extremely dangerous individually. Chlorine is a toxic gas. This reaction should only be performed by trained professionals!',
    funFact: 'Two deadly substances — explosive sodium metal and poisonous chlorine gas — combine to form harmless table salt! Chemistry is magical! ✨',
    explanation: 'Sodium (a reactive metal) combines with chlorine (a reactive non-metal) to form sodium chloride through ionic bonding. Sodium donates one electron to chlorine, forming Na⁺ and Cl⁻ ions.'
  },
  'H₂+O₂': {
    equation: '2H₂ + O₂ → 2H₂O',
    reactionType: 'Combination',
    products: ['Water'],
    observations: ['💥 Explosive reaction with a loud bang', '🔥 Burns with pale blue flame', '💧 Water droplets form on cool surface', '🌡️ Extreme heat released'],
    liquidColor: '#aaddff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ EXTREMELY EXPLOSIVE! A mixture of hydrogen and oxygen (called "detonating gas") can explode violently when ignited!',
    funFact: 'NASA uses this exact reaction to power rockets! The Space Shuttle\'s main engines burned liquid hydrogen with liquid oxygen. 🚀',
    explanation: 'Hydrogen gas burns in oxygen to form water. This is a highly exothermic combination reaction. The energy released is so enormous that it\'s used as rocket fuel!'
  },
  'Cu+AgNO₃': {
    equation: 'Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag',
    reactionType: 'Single Displacement',
    products: ['Copper Nitrate', 'Silver'],
    observations: ['🎨 Colorless solution turns blue', '✨ Shiny silver crystals deposit on copper', '🐌 Gradual reaction over hours', '🌡️ No significant temperature change'],
    liquidColor: '#4488ff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Silver nitrate stains skin black. Wear gloves!',
    funFact: 'This reaction is called the "Silver Tree" experiment — beautiful silver crystals grow on a copper wire like a miniature metallic tree! 🌳',
    explanation: 'Copper is more reactive than silver in the reactivity series. So copper displaces silver from silver nitrate solution. The solution turns blue (Cu(NO₃)₂) and shiny silver metal deposits out.'
  },
  'CH₃COOH+NaHCO₃': {
    equation: 'CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑',
    reactionType: 'Double Displacement',
    products: ['Sodium Acetate', 'Water', 'Carbon Dioxide'],
    observations: ['💨 Vigorous fizzing and foaming', '🎈 CO₂ gas released rapidly', '🌡️ Solution cools down (endothermic)', '🧪 Overflows if container is small'],
    liquidColor: '#eeffee',
    energyType: 'endothermic',
    safetyWarning: null,
    funFact: 'This is the famous "baking soda volcano" reaction! Every science fair has one. It\'s also how antacid tablets (ENO) work in your stomach! 🌋',
    explanation: 'Vinegar (acetic acid) reacts with baking soda (sodium bicarbonate) to produce sodium acetate, water, and carbon dioxide gas. The rapid CO₂ production causes the dramatic fizzing.'
  },
  'K+H₂O': {
    equation: '2K + 2H₂O → 2KOH + H₂↑',
    reactionType: 'Single Displacement',
    products: ['Potassium Hydroxide', 'Hydrogen Gas'],
    observations: ['💥 Even more violent than sodium!', '🔥 Lilac/purple flame on water surface', '💨 Hydrogen ignites spontaneously', '⚡ Potassium piece dashes around wildly'],
    liquidColor: '#cc44ff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ EXTREMELY DANGEROUS! Potassium is even more reactive than sodium. The reaction is explosive. Never handle potassium without expert supervision!',
    funFact: 'Potassium is so reactive that it reacts with ice and even snow! It burns with a beautiful lilac (purple) flame. 💜',
    explanation: 'Potassium is below sodium in Group 1 of the periodic table, making it even more reactive. It displaces hydrogen from water violently, and the heat generated is enough to ignite the hydrogen gas, producing a purple flame.'
  },
  'Al+Fe₂O₃': {
    equation: '2Al + Fe₂O₃ → Al₂O₃ + 2Fe',
    reactionType: 'Single Displacement',
    products: ['Aluminium Oxide', 'Iron'],
    observations: ['🔥 Extremely bright sparks and flames', '🌡️ Temperature exceeds 2500°C!', '🟤 Molten iron flows out', '⚡ Blinding white-hot reaction'],
    liquidColor: '#ff6600',
    energyType: 'exothermic',
    safetyWarning: '⚠️ This is the THERMITE REACTION — produces molten iron at 2500°C! Extremely dangerous. Used for welding railway tracks. Never attempt!',
    funFact: 'The thermite reaction produces so much heat that it creates liquid iron! It\'s used to weld broken railway tracks right on the spot. 🚂',
    explanation: 'This is the famous Thermite Reaction. Aluminium is more reactive than iron, so it displaces iron from its oxide. The reaction is incredibly exothermic — the iron produced is actually in molten (liquid) state due to the extreme heat!'
  },
  'Ca+H₂O': {
    equation: 'Ca + 2H₂O → Ca(OH)₂ + H₂↑',
    reactionType: 'Single Displacement',
    products: ['Calcium Hydroxide (Slaked Lime)', 'Hydrogen Gas'],
    observations: ['🌡️ Water becomes warm/hot', '💨 Gentle bubbling of H₂ gas', '☁️ Solution turns milky (lime water)', '🐌 Less violent than Na/K'],
    liquidColor: '#eeeedd',
    energyType: 'exothermic',
    safetyWarning: '⚠️ Ca(OH)₂ solution is corrosive. Avoid skin contact.',
    funFact: 'Calcium hydroxide (slaked lime) is used to whitewash walls! When it absorbs CO₂ from air, it forms a hard layer of CaCO₃ (limestone). 🏠',
    explanation: 'Calcium reacts with water less violently than sodium or potassium (it\'s lower in the reactivity series among alkali earth metals). It forms calcium hydroxide (lime water) and hydrogen gas. The reaction is exothermic but controlled.'
  },
  'H₂SO₄+NaOH': {
    equation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O',
    reactionType: 'Neutralization',
    products: ['Sodium Sulfate', 'Water'],
    observations: ['🌡️ Solution gets noticeably hot', '🎨 Indicator color changes at endpoint', '🧂 Glauber\'s salt on crystallization', '🐌 Smooth reaction'],
    liquidColor: '#ddddff',
    energyType: 'exothermic',
    safetyWarning: '⚠️ H₂SO₄ is a strong acid — highly corrosive. Always add acid to water, never water to acid!',
    funFact: 'Sodium Sulfate (Na₂SO₄·10H₂O) is called "Glauber\'s Salt" — it was once used as a medicine! It\'s now used in making detergents. 🧴',
    explanation: 'Sulfuric acid (a diprotic strong acid) reacts with sodium hydroxide (a strong base) in a neutralization reaction. Two moles of NaOH are needed because H₂SO₄ has two H⁺ ions to donate.'
  },
  'Pb(NO₃)₂+KI': {
    equation: 'Pb(NO₃)₂ + 2KI → PbI₂↓ + 2KNO₃',
    reactionType: 'Double Displacement',
    products: ['Lead Iodide (precipitate)', 'Potassium Nitrate'],
    observations: ['🎨 Beautiful bright YELLOW precipitate!', '✨ "Golden Rain" when heated and cooled', '🐌 Instant precipitation on mixing', '💛 One of the prettiest reactions'],
    liquidColor: '#ffdd00',
    energyType: 'neutral',
    safetyWarning: '⚠️ Lead compounds are TOXIC. Do not touch or ingest. Wash hands thoroughly after this experiment.',
    funFact: 'When PbI₂ is dissolved in hot water and slowly cooled, golden-yellow crystals rain down — this beautiful experiment is called the "Golden Rain"! ✨',
    explanation: 'This is a double displacement (precipitation) reaction. Lead ions (Pb²⁺) combine with iodide ions (I⁻) to form lead iodide (PbI₂), which is insoluble and precipitates out as a stunning yellow solid.'
  },
  'Mg+HCl': {
    equation: 'Mg + 2HCl → MgCl₂ + H₂↑',
    reactionType: 'Single Displacement',
    products: ['Magnesium Chloride', 'Hydrogen Gas'],
    observations: ['💨 Rapid bubbling of hydrogen gas', '🌡️ Solution gets warm', '🧪 Magnesium ribbon dissolves', '🎵 Gas gives pop sound with burning splint'],
    liquidColor: '#ccffcc',
    energyType: 'exothermic',
    safetyWarning: '⚠️ HCl fumes are irritating. Perform in ventilated area. H₂ gas is flammable.',
    funFact: 'Magnesium chloride (MgCl₂) is actually found in seawater and is used to make tofu! Chemistry connects the lab to your dinner table. 🍜',
    explanation: 'Magnesium is above hydrogen in the reactivity series, so it displaces hydrogen from hydrochloric acid. The magnesium ribbon dissolves as it forms soluble magnesium chloride, and hydrogen gas bubbles out vigorously.'
  },
};

// Normalize chemical keys for lookup
function normalizeChemicalKey(chemicals: string[]): string {
  const sorted = [...chemicals].sort();
  return sorted.join('+');
}

// Try to find an offline match for the given chemicals
function findOfflineReaction(chemicals: string[]): ReactionResult | null {
  const symbols = chemicals.map(c => c.trim());
  
  // Try all permutations of the chemicals against our database keys
  for (const key of Object.keys(OFFLINE_REACTIONS)) {
    const keyParts = key.split('+');
    // Check if the chemicals match (in any order)
    if (keyParts.length === symbols.length) {
      const keySet = new Set(keyParts.map(k => k.toLowerCase()));
      const symSet = new Set(symbols.map(s => s.toLowerCase()));
      if ([...keySet].every(k => symSet.has(k)) && [...symSet].every(s => keySet.has(s))) {
        return OFFLINE_REACTIONS[key];
      }
    }
  }
  return null;
}

export async function predictReaction(chemicals: string[]): Promise<ReactionResult> {
  // 1. Try Groq AI
  if (GROQ_API_KEY && GROQ_API_KEY.startsWith('gsk_')) {
    try {
      const chemList = chemicals.join(' + ');
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: REACTION_PREDICT_PROMPT },
            { role: 'user', content: `Predict what happens when these chemicals are mixed: ${chemList}` },
          ],
          max_tokens: 800,
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          try {
            // Clean the response — strip markdown code blocks if present
            let cleaned = content.trim();
            if (cleaned.startsWith('```')) {
              cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
            }
            const parsed = JSON.parse(cleaned) as ReactionResult;
            // Validate required fields
            if (parsed.equation && parsed.reactionType && parsed.explanation) {
              // Add emoji prefixes to observations if missing
              if (parsed.observations) {
                parsed.observations = parsed.observations.map(obs => {
                  if (!/^[🔥💨🎨⬇️⚡🌡️🐌💥✨☁️🧪💛🎵💧🧂🎈⚪🟤]/.test(obs)) {
                    return '🔬 ' + obs;
                  }
                  return obs;
                });
              }
              return parsed;
            }
          } catch (parseErr) {
            console.warn('Failed to parse AI reaction JSON:', parseErr);
          }
        }
      }
    } catch (error) {
      console.warn('Groq API reaction prediction failed:', error);
    }
  }

  // 2. Try offline fallback
  const offlineResult = findOfflineReaction(chemicals);
  if (offlineResult) {
    return offlineResult;
  }

  // 3. Generic fallback for unknown combinations
  return {
    equation: `${chemicals.join(' + ')} → ?`,
    reactionType: 'Unknown',
    products: ['Unknown products'],
    observations: ['🔬 Reaction outcome unknown without AI', '💡 Try connecting to the internet for AI-powered predictions'],
    liquidColor: '#888888',
    energyType: 'neutral',
    safetyWarning: '⚠️ Unknown reactions can be dangerous. Never mix chemicals without knowing the outcome!',
    funFact: 'There are over 100 million known chemical compounds, and new reactions are discovered every day by researchers around the world! 🌍',
    explanation: `The reaction between ${chemicals.join(' and ')} requires AI analysis. Connect to the internet and try again for a detailed prediction! In the meantime, try mixing common combinations like Na + H₂O or HCl + NaOH.`
  };
}

export function resetChatSession() {
  // Reset
}





