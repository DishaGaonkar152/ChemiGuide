export interface Flashcard {
  question: string;
  answer: string;
  hint?: string;
}

export interface FlowchartNode {
  id: string;
  label: string;
  description: string;
  children?: FlowchartNode[];
}

export interface TopicActivityData {
  title: string;
  flashcards: Flashcard[];
  flowchart: FlowchartNode;
}

export const TOPIC_ACTIVITIES: Record<string, TopicActivityData> = {
  "Atomic Structure": {
    title: "Atomic Structure",
    flashcards: [
      {
        question: "What is an Atom?",
        answer: "The basic unit of a chemical element, consisting of a dense central nucleus surrounded by a cloud of negatively charged electrons.",
        hint: "Derived from 'atomos', meaning indivisible."
      },
      {
        question: "What is Valency?",
        answer: "The combining capacity of an atom, determined by the number of electrons it needs to gain, lose, or share to achieve a stable octet configuration.",
        hint: "Example: Sodium has valency 1, Oxygen has valency 2."
      },
      {
        question: "What are Valence Electrons?",
        answer: "The electrons present in the outermost shell of an atom. They participate in chemical bonding.",
        hint: "Chlorine has 7 valence electrons in its outer shell."
      },
      {
        question: "What is an Isotope?",
        answer: "Atoms of the same element with the same atomic number (protons) but different mass numbers (neutrons).",
        hint: "Example: Carbon-12 and Carbon-14."
      },
      {
        question: "What is an Isobar?",
        answer: "Atoms of different chemical elements that have the same mass number but different atomic numbers.",
        hint: "Example: Argon-40 and Calcium-40."
      }
    ],
    flowchart: {
      id: "atom",
      label: "The Atom",
      description: "Fundamental building block of matter",
      children: [
        {
          id: "nucleus",
          label: "Nucleus (Center)",
          description: "Tiny, dense positive center carrying almost all mass",
          children: [
            {
              id: "protons",
              label: "Protons",
              description: "Positively charged particles (charge = +1, mass = 1 u). Determines Atomic Number (Z)."
            },
            {
              id: "neutrons",
              label: "Neutrons",
              description: "Neutral particles (charge = 0, mass = 1 u). Protons + Neutrons = Mass Number (A)."
            }
          ]
        },
        {
          id: "shells",
          label: "Electron Shells (Orbitals)",
          description: "Discrete energy levels where electrons orbit",
          children: [
            {
              id: "electrons",
              label: "Electrons",
              description: "Negatively charged particles (charge = -1, mass ≈ 1/1836 u) revolving around the nucleus."
            },
            {
              id: "valencyshell",
              label: "Outermost (Valence) Shell",
              description: "Determines valency and chemical reactivity based on Bohr-Bury octet rules."
            }
          ]
        }
      ]
    }
  },
  "Mole Concept": {
    title: "Mole Concept",
    flashcards: [
      {
        question: "What is a Mole?",
        answer: "The amount of substance that contains exactly 6.022 × 10²³ elementary entities (atoms, molecules, or ions).",
        hint: "It acts as a chemist's dozen."
      },
      {
        question: "What is Avogadro's Number?",
        answer: "The constant value 6.02214076 × 10²³, representing particles per mole of substance.",
        hint: "Named after Amedeo Avogadro."
      },
      {
        question: "What is Molar Mass?",
        answer: "The mass of one mole of a substance, numerically equal to its atomic/molecular mass in grams (g/mol).",
        hint: "E.g., Molar mass of Water (H₂O) = 18 g/mol."
      },
      {
        question: "Formula: Moles to Mass",
        answer: "Number of Moles (n) = Given Mass (m) / Molar Mass (M).",
        hint: "Mass (g) = Moles (mol) × Molar Mass (g/mol)."
      },
      {
        question: "What is Molar Volume of a Gas?",
        answer: "At Standard Temperature and Pressure (STP), one mole of any gas occupies exactly 22.4 liters.",
        hint: "Applies to ideal gases."
      }
    ],
    flowchart: {
      id: "mole",
      label: "The Mole (n)",
      description: "SI unit of chemical amount (6.022 × 10²³ particles)",
      children: [
        {
          id: "mole_mass",
          label: "Mass Conversion",
          description: "Relates amount to laboratory weight",
          children: [
            {
              id: "mol_to_mass",
              label: "Mass = Moles × Molar Mass",
              description: "Multiply by relative atomic/molecular mass in grams."
            },
            {
              id: "mass_to_mol",
              label: "Moles = Mass / Molar Mass",
              description: "Divide weighed substance by its molar mass."
            }
          ]
        },
        {
          id: "mole_particles",
          label: "Particle Conversion",
          description: "Relates bulk quantity to individual atoms/molecules",
          children: [
            {
              id: "mol_to_part",
              label: "Particles = Moles × Avogadro's No.",
              description: "Multiply by 6.022 × 10²³."
            },
            {
              id: "part_to_mol",
              label: "Moles = Particles / Avogadro's No.",
              description: "Divide count of particles to find moles."
            }
          ]
        },
        {
          id: "mole_volume",
          label: "Gas Volume at STP",
          description: "For gaseous reactants and products at standard parameters",
          children: [
            {
              id: "mol_to_vol",
              label: "Volume = Moles × 22.4 L",
              description: "Conversion factor at STP."
            }
          ]
        }
      ]
    }
  },
  "Atomic Models": {
    title: "Atomic Models",
    flashcards: [
      {
        question: "Thomson's Plum Pudding Model",
        answer: "An atom is a sphere of positive charge with electrons embedded in it like raisins/plums in a pudding. Net charge is zero.",
        hint: "Proposed in 1904 by J.J. Thomson."
      },
      {
        question: "Rutherford's Alpha Scattering Experiment",
        answer: "Rutherford bombarded thin gold foil with alpha particles. Most went straight, some deflected, and a tiny fraction (1 in 12,000) rebounded.",
        hint: "Led to discovery of the atomic nucleus."
      },
      {
        question: "Rutherford's Model Features",
        answer: "An atom has a tiny, dense, positively charged center (nucleus) containing protons/neutrons. Electrons orbit it in empty space.",
        hint: "Drawback: Acceleration should cause electrons to lose energy and collapse."
      },
      {
        question: "Bohr's Atomic Model",
        answer: "Electrons orbit the nucleus in specific discrete energy levels (shells). Energy is only radiated/absorbed when jumping shells.",
        hint: "Shells are designated K, L, M, N..."
      }
    ],
    flowchart: {
      id: "models",
      label: "Atomic Models Timeline",
      description: "How our understanding of atomic structure evolved",
      children: [
        {
          id: "thomson",
          label: "Thomson's Model (1904)",
          description: "Plum Pudding Model",
          children: [
            {
              id: "thomson_detail",
              label: "Positive sphere with embedded negative electrons",
              description: "Failed to explain alpha scattering observations."
            }
          ]
        },
        {
          id: "rutherford",
          label: "Rutherford's Model (1911)",
          description: "Nuclear Model of Atom",
          children: [
            {
              id: "rutherford_detail",
              label: "Discovered nucleus; planet-like orbiting electrons",
              description: "Drawback: Could not prove atomic stability."
            }
          ]
        },
        {
          id: "bohr",
          label: "Bohr's Model (1913)",
          description: "Discrete Energy Levels",
          children: [
            {
              id: "bohr_detail",
              label: "Quantized circular orbits (Shells K, L, M, N)",
              description: "Solved stability problem. Outermost capacity follows 2n²."
            }
          ]
        }
      ]
    }
  },
  "Is Matter Around Us Pure?": {
    title: "Is Matter Around Us Pure?",
    flashcards: [
      {
        question: "Pure Substance vs Mixture",
        answer: "Pure substances consist of single type of particles (Elements & Compounds). Mixtures contain different substances physically combined.",
        hint: "Pure water vs salty water."
      },
      {
        question: "Homogeneous vs Heterogeneous",
        answer: "Homogeneous: Uniform composition (e.g., alloys, air). Heterogeneous: Non-uniform composition with visible boundaries (e.g., sand & salt).",
        hint: "Look at the phase uniformity."
      },
      {
        question: "What is a Suspension?",
        answer: "A heterogeneous mixture where solute particles do not dissolve but remain suspended. They settle down over time.",
        hint: "Example: Chalk dust in water."
      },
      {
        question: "What is a Colloid?",
        answer: "A heterogeneous mixture with particle sizes intermediate between solutions and suspensions (1-1000 nm). They show Tyndall effect.",
        hint: "Example: Milk, fog, paint."
      },
      {
        question: "What is the Tyndall Effect?",
        answer: "The scattering of a beam of light by colloidal or suspension particles, making the path of light visible.",
        hint: "Can be seen in a dusty room when sunlight enters."
      }
    ],
    flowchart: {
      id: "matter",
      label: "Classification of Matter",
      description: "Everything that has mass and occupies space",
      children: [
        {
          id: "pure",
          label: "Pure Substances",
          description: "Fixed chemical composition",
          children: [
            {
              id: "elements",
              label: "Elements",
              description: "Cannot be broken down into simpler substances (e.g., Iron, Gold)."
            },
            {
              id: "compounds",
              label: "Compounds",
              description: "Chemical combinations of elements in fixed ratios (e.g., H₂O, CO₂)."
            }
          ]
        },
        {
          id: "mixtures",
          label: "Mixtures",
          description: "Variable proportions; physically separable",
          children: [
            {
              id: "homogeneous",
              label: "Homogeneous Mixtures",
              description: "Uniform phase throughout (e.g., Salt solution, Brass alloy)."
            },
            {
              id: "heterogeneous",
              label: "Heterogeneous Mixtures",
              description: "Non-uniform phase (e.g., Muddy water, Suspensions, Colloids)."
            }
          ]
        }
      ]
    }
  },
  "Chemical Reactions & Equations": {
    title: "Chemical Reactions & Equations",
    flashcards: [
      {
        question: "What is a Chemical Equation?",
        answer: "The symbolic representation of a chemical reaction using symbols and formulas of reactants and products.",
        hint: "E.g., 2H₂ + O₂ → 2H₂O."
      },
      {
        question: "Why balance equations?",
        answer: "To satisfy the Law of Conservation of Mass: mass can neither be created nor destroyed in a chemical reaction.",
        hint: "Atoms on reactant side must equal atoms on product side."
      },
      {
        question: "Combination vs Decomposition",
        answer: "Combination: A + B → C (reactants combine). Decomposition: C → A + B (a single reactant breaks down).",
        hint: "Opposite reaction processes."
      },
      {
        question: "Displacement vs Double Displacement",
        answer: "Displacement: A + BC → AC + B (more active metal displace less active). Double Displacement: AB + CD → AD + CB (exchange of ions).",
        hint: "Look at the swap pattern."
      },
      {
        question: "Redox: Oxidation & Reduction",
        answer: "Oxidation: Gain of oxygen or loss of hydrogen/electrons. Reduction: Loss of oxygen or gain of hydrogen/electrons.",
        hint: "OIL RIG: Oxidation Is Loss, Reduction Is Gain of electrons."
      }
    ],
    flowchart: {
      id: "reactions",
      label: "Chemical Reactions",
      description: "Transformation of chemical reactants into new products",
      children: [
        {
          id: "rxn_types",
          label: "Major Reaction Types",
          description: "Classified by how atoms rearrange",
          children: [
            {
              id: "combination",
              label: "Combination (A + B → AB)",
              description: "Elements or compounds unite (e.g., burning magnesium)."
            },
            {
              id: "decomposition",
              label: "Decomposition (AB → A + B)",
              description: "Requires energy (Thermal, Electrolytic, or Photolytic)."
            },
            {
              id: "displacement_rxn",
              label: "Displacement (A + BC → AC + B)",
              description: "Based on metal reactivity hierarchy."
            },
            {
              id: "double_disp",
              label: "Double Displacement",
              description: "Exchange of ions (often precipitation or neutralization)."
            }
          ]
        },
        {
          id: "energy_changes",
          label: "Energy Profiles",
          description: "Heat exchange with surroundings",
          children: [
            {
              id: "exothermic",
              label: "Exothermic",
              description: "Releases heat energy (e.g., respiration, burning coal)."
            },
            {
              id: "endothermic",
              label: "Endothermic",
              description: "Absorbs heat energy (e.g., photosynthesis, thermal decomposition)."
            }
          ]
        }
      ]
    }
  },
  "Acids, Bases & Salts": {
    title: "Acids, Bases & Salts",
    flashcards: [
      {
        question: "What is an Acid?",
        answer: "A substance that tastes sour, turns blue litmus paper red, has pH < 7, and releases H⁺ (hydronium) ions in water.",
        hint: "Examples: Citric acid, Hydrochloric acid."
      },
      {
        question: "What is a Base?",
        answer: "A substance that tastes bitter, feels slippery/soapy, turns red litmus blue, has pH > 7, and releases OH⁻ ions in water.",
        hint: "Soluble bases are called alkalis. E.g., NaOH."
      },
      {
        question: "What is pH Scale?",
        answer: "A logarithmic scale from 0 to 14 measuring hydrogen ion concentration. pH 7 is neutral; <7 is acidic; >7 is basic.",
        hint: "pH stands for 'potential of hydrogen'."
      },
      {
        question: "What is Neutralization?",
        answer: "The reaction between an acid and a base to form salt and water. Acid + Base → Salt + Water.",
        hint: "E.g., HCl + NaOH → NaCl + H₂O."
      },
      {
        question: "Water of Crystallization",
        answer: "The fixed number of water molecules chemically combined in each formula unit of a salt crystal.",
        hint: "E.g., Copper sulphate pentahydrate is CuSO₄·5H₂O."
      }
    ],
    flowchart: {
      id: "acids_bases",
      label: "Acids, Bases & Salts",
      description: "Classification of compounds by ionic characteristics",
      children: [
        {
          id: "acids_branch",
          label: "Acids (pH < 7)",
          description: "Generate H⁺ / H₃O⁺ ions in solution",
          children: [
            {
              id: "strong_acids",
              label: "Strong Acids",
              description: "Fully ionized (e.g., HCl, HNO₃, H₂SO₄)."
            },
            {
              id: "weak_acids",
              label: "Weak Acids",
              description: "Partially ionized (e.g., CH₃COOH, H₂CO₃)."
            }
          ]
        },
        {
          id: "bases_branch",
          label: "Bases (pH > 7)",
          description: "Generate OH⁻ ions in solution",
          children: [
            {
              id: "alkali",
              label: "Alkalis",
              description: "Water-soluble bases (e.g., NaOH, KOH, Ca(OH)₂)."
            }
          ]
        },
        {
          id: "salts_branch",
          label: "Salts (Neutralization Products)",
          description: "Ionic compounds from acid-base reaction",
          children: [
            {
              id: "salt_types",
              label: "Classification",
              description: "Acidic, Basic, or Neutral salts depending on parent acid/base strength."
            }
          ]
        }
      ]
    }
  },
  "Metals & Non-Metals": {
    title: "Metals & Non-Metals",
    flashcards: [
      {
        question: "Malleability vs Ductility",
        answer: "Malleability is the ability to be beaten into thin sheets (e.g., Gold). Ductility is the ability to be drawn into wires (e.g., Copper).",
        hint: "Key physical properties of metals."
      },
      {
        question: "What is an Ionic Bond?",
        answer: "A chemical bond formed by the electrostatic attraction between oppositely charged ions, via transfer of electrons from metal to non-metal.",
        hint: "E.g., NaCl, MgCl₂. High melting points."
      },
      {
        question: "What is an Amphoteric Oxide?",
        answer: "Metal oxides that display both acidic and basic behaviors, reacting with both acids and bases to produce salt and water.",
        hint: "Examples: Al₂O₃ (Aluminium oxide) and ZnO (Zinc oxide)."
      },
      {
        question: "What is Roasting?",
        answer: "Heating sulphide ores strongly in the presence of excess air to convert them into metal oxides.",
        hint: "Part of metallurgy. Releases SO₂ gas."
      },
      {
        question: "What is Calcination?",
        answer: "Heating carbonate ores strongly in limited or no air to convert them into oxides.",
        hint: "Part of metallurgy. Releases CO₂ gas."
      }
    ],
    flowchart: {
      id: "metals_non_metals",
      label: "Metals & Non-Metals",
      description: "Classified by physical properties and chemical structures",
      children: [
        {
          id: "metals",
          label: "Metals",
          description: "Electropositive elements (lose valence electrons)",
          children: [
            {
              id: "metals_phys",
              label: "Physical Traits",
              description: "Lustrous, high density, sonorous, malleable, ductile, good conductors."
            },
            {
              id: "metals_chem",
              label: "Chemical Traits",
              description: "Form basic or amphoteric oxides; displace hydrogen from dilute acids."
            }
          ]
        },
        {
          id: "non_metals",
          label: "Non-Metals",
          description: "Electronegative elements (gain/share electrons)",
          children: [
            {
              id: "non_metals_phys",
              label: "Physical Traits",
              description: "Brittle (solids), low density, dull, thermal/electrical insulators."
            },
            {
              id: "non_metals_chem",
              label: "Chemical Traits",
              description: "Form acidic or neutral oxides (like CO₂ or H₂O)."
            }
          ]
        },
        {
          id: "bonding",
          label: "Interaction: Ionic Bonding",
          description: "Transfer of electrons from electropositive Metal to electronegative Non-Metal",
          children: [
            {
              id: "ionic_props",
              label: "Ionic Compound Properties",
              description: "High melting/boiling points, soluble in water, conduct electricity when molten/aqueous."
            }
          ]
        }
      ]
    }
  },
  "Carbon & Its Compounds": {
    title: "Carbon & Its Compounds",
    flashcards: [
      {
        question: "Why is Carbon Tetravalent?",
        answer: "Carbon has 4 valence electrons. It achieves stability by sharing 4 electrons with other atoms (covalent bonding).",
        hint: "Atomic Number Z = 6. Configuration is 2, 4."
      },
      {
        question: "What is Catenation?",
        answer: "The unique ability of carbon atoms to form strong, stable covalent bonds with other carbon atoms, forming long chains or rings.",
        hint: "Allows millions of carbon compounds to exist."
      },
      {
        question: "Saturated vs Unsaturated",
        answer: "Saturated hydrocarbons have single carbon-carbon bonds (Alkanes). Unsaturated have double (Alkenes) or triple (Alkynes) carbon-carbon bonds.",
        hint: "Alkanes vs Alkenes/Alkynes."
      },
      {
        question: "General Hydrocarbon Formulas",
        answer: "Alkanes: C_n H_{2n+2}\nAlkenes: C_n H_{2n}\nAlkynes: C_n H_{2n-2}",
        hint: "General molecular pattern for straight chains."
      },
      {
        question: "What is Homologous Series?",
        answer: "A family of organic compounds sharing the same functional group and chemical properties, where successive members differ by a -CH₂- unit (14 mass units).",
        hint: "E.g., Methanol, Ethanol, Propanol..."
      }
    ],
    flowchart: {
      id: "carbon_compounds",
      label: "Carbon & Compounds",
      description: "The study of organic molecular structures based on carbon",
      children: [
        {
          id: "bonding_carbon",
          label: "Covalent Bonding in Carbon",
          description: "Formed by electron sharing to achieve stable octet",
          children: [
            {
              id: "tetravalency",
              label: "Tetravalency (4 outer e-)",
              description: "Allows bonding with hydrogen, oxygen, chlorine, nitrogen, etc."
            },
            {
              id: "catenation",
              label: "Catenation",
              description: "Creates linear, branched, or cyclic molecular chains."
            }
          ]
        },
        {
          id: "hydrocarbons",
          label: "Hydrocarbons",
          description: "Compounds containing only hydrogen and carbon",
          children: [
            {
              id: "saturated",
              label: "Saturated (Alkanes)",
              description: "Single bonds (C-C). E.g., Methane (CH₄), Ethane (C₂H₆)."
            },
            {
              id: "unsaturated",
              label: "Unsaturated (Alkenes/Alkynes)",
              description: "Double bonds (C=C, Alkenes) or Triple bonds (C≡C, Alkynes)."
            }
          ]
        },
        {
          id: "allotropes",
          label: "Allotropes of Carbon",
          description: "Different physical forms of the same element",
          children: [
            {
              id: "allotrope_types",
              label: "Diamond, Graphite, C₆₀",
              description: "Diamond is extremely hard (3D network). Graphite is soft and conducts (layered planes)."
            }
          ]
        }
      ]
    }
  }
};
