import React from 'react';
import { View, Text } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';
import Accordion from '../../components/Accordion';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function MoleConceptScreen() {
  const color = "#ff00ff";

  return (
    <DetailScreenLayout title="Mole Concept" color={color} emoji="🔢">
      
      {/* 1. Introduction */}
      <Text style={styles.heading}>1. Introduction to the Mole Concept</Text>
      <Text style={styles.paragraph}>
        In everyday life, we use specific terms to count large quantities of items. For example, a <Text style={styles.highlight}>pair</Text> means 2, a <Text style={styles.highlight}>dozen</Text> means 12, and a <Text style={styles.highlight}>gross</Text> means 144. However, when we deal with atoms and molecules in chemistry, these numbers are far too small. Atoms and molecules are unimaginably tiny. Even in a single drop of water, there are more molecules than there are stars in the observable universe! 
      </Text>
      <Text style={styles.paragraph}>
        Because atoms are so small, it is impossible to count them individually or even in dozens. To solve this problem, chemists introduced a new unit for counting fundamental particles (atoms, molecules, ions, electrons) called the <Text style={styles.highlight}>mole</Text>. The mole concept provides a bridge between the macroscopic world (things we can weigh and measure) and the microscopic world (individual atoms and molecules).
      </Text>

      {/* 2. Atomic Mass Unit */}
      <Text style={styles.heading}>2. Atomic Mass Unit (AMU / u)</Text>
      <Text style={styles.paragraph}>
        Before we can understand how to count atoms in bulk, we must know how much a single atom weighs. Because atoms are extraordinarily light, expressing their mass in standard units like grams (g) or kilograms (kg) is inconvenient. Instead, chemists use a relative unit called the <Text style={styles.highlight}>Atomic Mass Unit (amu)</Text>, which is now universally written as a unified mass unit, represented by the symbol <Text style={styles.highlight}>u</Text>.
      </Text>
      
      <InlineAtomModel atomicNumber={6} elementName="Carbon-12" elementSymbol="C" color="#ff00ff" caption="The Carbon-12 isotope — the universal standard for atomic mass (1 u = 1/12th of C-12 mass)" />
      <AnimatedInfoBox color={color} delay={100}>
        A single atom of Carbon-12 is shown above.
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        Scientists needed a standard reference to compare the masses of all other elements. Initially, hydrogen was chosen as the standard because it is the lightest element. Later, oxygen was used. However, in 1961, the International Union of Pure and Applied Chemistry (IUPAC) adopted the <Text style={styles.highlight}>Carbon-12 isotope</Text> as the universal standard for atomic mass. 
      </Text>
      <AnimatedInfoBox color={color} delay={200}>
        Definition: One atomic mass unit (1 u) is defined as a mass exactly equal to one-twelfth (1/12th) of the mass of one carbon-12 atom.
      </AnimatedInfoBox>

      {/* 3. Relative Atomic Mass */}
      <Text style={styles.heading}>3. Relative Atomic Mass</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>relative atomic mass</Text> of an element is the average mass of the atom, as compared to 1/12th the mass of one carbon-12 atom. Because it is a ratio, relative atomic mass is dimensionless, but we express it in units of <Text style={styles.highlight}>u</Text>.
      </Text>
      <Text style={styles.paragraph}>
        For instance, an oxygen atom is 16 times heavier than 1/12th of a carbon-12 atom. Therefore, the relative atomic mass of oxygen is 16 u.
      </Text>
      <Text style={styles.bulletPoint}>• Hydrogen (H) = 1 u</Text>
      <Text style={styles.bulletPoint}>• Carbon (C) = 12 u</Text>
      <Text style={styles.bulletPoint}>• Nitrogen (N) = 14 u</Text>
      <Text style={styles.bulletPoint}>• Oxygen (O) = 16 u</Text>
      <Text style={styles.bulletPoint}>• Sodium (Na) = 23 u</Text>
      <Text style={styles.bulletPoint}>• Calcium (Ca) = 40 u</Text>

      {/* 4. Molecular Mass */}
      <Text style={styles.heading}>4. Molecular Mass</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>molecular mass</Text> of a substance is the sum of the atomic masses of all the atoms present in one molecule of that substance. It is also expressed in atomic mass units (u). To calculate it, you multiply the atomic mass of each element by the number of its atoms in the formula, and then add them all together.
      </Text>
      
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#ff00ff" caption="Carbon atom — building block of methane (CH₄). Molecular mass of CH₄ = 12 + 4(1) = 16 u" height={280} />
      <AnimatedInfoBox color={color} delay={300}>
        3D model of a Methane (CH4) molecule. Molecular mass = 12 + 4(1) = 16 u.
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>Let's look at some detailed worked examples:</Text>

      <AnimatedInfoBox color={color} delay={400}>
        Example 1: Water (H2O){"\n"}
        Atomic mass of H = 1 u, O = 16 u.{"\n"}
        Molecular mass = (2 × 1) + (1 × 16) = 2 + 16 = 18 u
      </AnimatedInfoBox>
      
      <AnimatedInfoBox color={color} delay={500}>
        Example 2: Carbon Dioxide (CO2){"\n"}
        Atomic mass of C = 12 u, O = 16 u.{"\n"}
        Molecular mass = (1 × 12) + (2 × 16) = 12 + 32 = 44 u
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={600}>
        Example 3: Sulfuric Acid (H2SO4){"\n"}
        Atomic mass of H = 1 u, S = 32 u, O = 16 u.{"\n"}
        Molecular mass = (2 × 1) + (1 × 32) + (4 × 16) = 2 + 32 + 64 = 98 u
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={700}>
        Example 4: Calcium Carbonate (CaCO3){"\n"}
        Atomic mass of Ca = 40 u, C = 12 u, O = 16 u.{"\n"}
        Molecular mass = (1 × 40) + (1 × 12) + (3 × 16) = 40 + 12 + 48 = 100 u
      </AnimatedInfoBox>

      {/* 5. Formula Unit Mass */}
      <Text style={styles.heading}>5. Formula Unit Mass</Text>
      <Text style={styles.paragraph}>
        For substances that are made up of ions rather than distinct molecules (such as ionic compounds like Sodium Chloride, NaCl), we use the term <Text style={styles.highlight}>Formula Unit Mass</Text> instead of molecular mass. The calculation method is exactly the same as for molecular mass—you sum the atomic masses of the ions present in the empirical formula of the compound.
      </Text>
      
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium atom (Na) — part of ionic compound NaCl. Formula unit mass of NaCl = 23 + 35.5 = 58.5 u" height={280} />
      <AnimatedInfoBox color={color} delay={800}>
        Sodium Atom (Na)
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        For example, the formula unit mass of Sodium Chloride (NaCl):
      </Text>
      <AnimatedInfoBox color={color} delay={900}>
        Atomic mass of Na = 23 u, Cl = 35.5 u.{"\n"}
        Formula unit mass of NaCl = (1 × 23) + (1 × 35.5) = 58.5 u
      </AnimatedInfoBox>
      <Text style={styles.paragraph}>
        Similarly, for Calcium Chloride (CaCl2), the formula unit mass would be 40 + (2 × 35.5) = 111 u.
      </Text>

      {/* 6. The Mole & Avogadro's Number */}
      <Text style={styles.heading}>6. The Mole and Avogadro's Number</Text>
      <Text style={styles.paragraph}>
        A <Text style={styles.highlight}>mole</Text> is the SI unit for the amount of substance. Just like "a dozen" always means exactly 12 items, regardless of whether you are talking about a dozen eggs, a dozen apples, or a dozen cars, one mole always means a very specific, enormous number of items. 
      </Text>
      <Text style={styles.paragraph}>
        This fundamental number is known as <Text style={styles.highlight}>Avogadro's Number</Text> (or Avogadro's Constant), denoted by the symbol <Text style={styles.highlight}>Nₐ</Text>, in honor of the Italian scientist Amedeo Avogadro.
      </Text>
      <AnimatedInfoBox color={color} delay={1000}>
        1 Mole = 6.022 × 10²³ particles (atoms, molecules, ions, or electrons)
      </AnimatedInfoBox>
      <Text style={styles.paragraph}>
        To put this into perspective:
      </Text>
      <Text style={styles.bulletPoint}>• 1 dozen = 12 items</Text>
      <Text style={styles.bulletPoint}>• 1 gross = 144 items</Text>
      <Text style={styles.bulletPoint}>• 1 mole = 602,200,000,000,000,000,000,000 items</Text>
      <Text style={styles.paragraph}>
        So, 1 mole of hydrogen atoms contains exactly 6.022 × 10²³ hydrogen atoms. 1 mole of water molecules contains exactly 6.022 × 10²³ water molecules.
      </Text>

      {/* 7. Molar Mass */}
      <Text style={styles.heading}>7. Molar Mass</Text>
      <Text style={styles.paragraph}>
        The magic of the mole concept lies in how it connects to mass. The <Text style={styles.highlight}>molar mass</Text> of a substance is defined as the mass of 1 mole (6.022 × 10²³ particles) of that substance. 
      </Text>
      <Text style={styles.paragraph}>
        The incredible property of the mole is that the molar mass of an element or compound in grams is numerically equal to its atomic or molecular mass in 'u'. This is why Carbon-12 is the standard!
      </Text>
      <Text style={styles.bulletPoint}>• Atomic mass of Carbon = 12 u</Text>
      <Text style={styles.bulletPoint}>• Molar mass of Carbon = 12 g/mol (meaning 6.022 × 10²³ carbon atoms weigh exactly 12 grams)</Text>
      <Text style={styles.bulletPoint}>• Molecular mass of H2O = 18 u</Text>
      <Text style={styles.bulletPoint}>• Molar mass of H2O = 18 g/mol</Text>

      {/* 8. Number of Moles formula */}
      <Text style={styles.heading}>8. Calculating Number of Moles (n)</Text>
      <Text style={styles.paragraph}>
        The most important formula in stoichiometry connects the given mass of a substance to the number of moles.
      </Text>
      <AnimatedInfoBox color={color} delay={1100}>
        Formula: n = m / M{"\n"}
        Where:{"\n"}
        n = number of moles{"\n"}
        m = given mass (in grams){"\n"}
        M = molar mass (in g/mol)
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>Let's solve some examples step-by-step:</Text>
      
      <AnimatedInfoBox color={color} delay={1200}>
        Example 1: Calculate the number of moles in 52g of Helium (He).{"\n"}
        Step 1: Identify given mass (m) = 52g{"\n"}
        Step 2: Find molar mass of He (M) = 4 g/mol{"\n"}
        Step 3: Apply formula: n = m / M = 52 / 4 = 13 moles.
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={1300}>
        Example 2: How many moles are present in 36g of Water (H2O)?{"\n"}
        Step 1: Given mass (m) = 36g{"\n"}
        Step 2: Molar mass of H2O (M) = 18 g/mol{"\n"}
        Step 3: Apply formula: n = 36 / 18 = 2 moles.
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={1400}>
        Example 3: Find the number of moles in 22g of Carbon Dioxide (CO2).{"\n"}
        Step 1: Given mass (m) = 22g{"\n"}
        Step 2: Molar mass of CO2 (M) = 44 g/mol{"\n"}
        Step 3: Apply formula: n = 22 / 44 = 0.5 moles.
      </AnimatedInfoBox>

      {/* 9. Number of Particles formula */}
      <Text style={styles.heading}>9. Calculating Number of Particles (N)</Text>
      <Text style={styles.paragraph}>
        If you know the number of moles, you can easily calculate the total number of particles (atoms, molecules, or ions) using Avogadro's number.
      </Text>
      <AnimatedInfoBox color={color} delay={1500}>
        Formula: N = n × Nₐ{"\n"}
        Where:{"\n"}
        N = total number of particles{"\n"}
        n = number of moles{"\n"}
        Nₐ = Avogadro's number (6.022 × 10²³)
      </AnimatedInfoBox>
      <Text style={styles.paragraph}>
        You can also combine formulas if mass is given directly: N = (m / M) × Nₐ
      </Text>

      <AnimatedInfoBox color={color} delay={1600}>
        Example 1: Calculate the number of atoms in 0.5 moles of Carbon.{"\n"}
        Step 1: n = 0.5 moles{"\n"}
        Step 2: Apply formula N = n × Nₐ{"\n"}
        Step 3: N = 0.5 × (6.022 × 10²³) = 3.011 × 10²³ carbon atoms.
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={1700}>
        Example 2: How many molecules are in 8g of Oxygen gas (O2)?{"\n"}
        Step 1: Molar mass of O2 (M) = 32 g/mol{"\n"}
        Step 2: Find moles (n) = 8 / 32 = 0.25 moles{"\n"}
        Step 3: Find molecules N = 0.25 × (6.022 × 10²³) = 1.5055 × 10²³ O2 molecules.
      </AnimatedInfoBox>

      {/* 10. Mole concept for gases */}
      <Text style={styles.heading}>10. Mole Concept for Gases</Text>
      <Text style={styles.paragraph}>
        For substances in the gaseous state, there is an incredible relationship discovered by Amedeo Avogadro known as <Text style={styles.highlight}>Avogadro's Law</Text>. It states that equal volumes of all gases, at the same temperature and pressure, contain an equal number of molecules.
      </Text>
      <Text style={styles.paragraph}>
        Because of this, 1 mole of ANY ideal gas occupies a specific, predictable volume at Standard Temperature and Pressure (STP), which is defined as 0°C (273.15 K) and 1 atm pressure.
      </Text>
      <AnimatedInfoBox color={color} delay={1800}>
        Molar Volume Formula:{"\n"}
        1 mole of any gas at STP = 22.4 Liters (L)
      </AnimatedInfoBox>
      <Text style={styles.paragraph}>
        This means that 22.4 L of Helium gas, 22.4 L of Oxygen gas, and 22.4 L of Carbon Dioxide gas at STP all contain exactly 1 mole of molecules (6.022 × 10²³ molecules), even though their masses will be very different (4g, 32g, and 44g respectively).
      </Text>

      {/* 11. Percentage Composition */}
      <Text style={styles.heading}>11. Percentage Composition</Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>percentage composition</Text> is the percentage by mass of each element in a compound. It is incredibly useful for analytical chemists when trying to determine the chemical formula of an unknown substance.
      </Text>
      <AnimatedInfoBox color={color} delay={1900}>
        Formula:{"\n"}
        % of element = (Mass of element in 1 mole of compound / Molar mass of compound) × 100
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>Let's work through some detailed examples.</Text>

      <AnimatedInfoBox color={color} delay={2000}>
        Example 1: Find the percentage of Oxygen in Water (H2O).{"\n"}
        Step 1: Molar mass of H2O = 18 g/mol{"\n"}
        Step 2: Mass of Oxygen in 1 mole of H2O = 16 g{"\n"}
        Step 3: % Oxygen = (16 / 18) × 100 = 88.89%
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={2100}>
        Example 2: Find the percentage composition of each element in Sulfuric Acid (H2SO4).{"\n"}
        Step 1: Molar mass of H2SO4 = (2×1) + 32 + (4×16) = 98 g/mol{"\n"}
        Step 2: % of Hydrogen (H) = (2 / 98) × 100 = 2.04%{"\n"}
        Step 3: % of Sulfur (S) = (32 / 98) × 100 = 32.65%{"\n"}
        Step 4: % of Oxygen (O) = (64 / 98) × 100 = 65.31%{"\n"}
        (Check: 2.04 + 32.65 + 65.31 = 100%)
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        Mastering the mole concept is the key to understanding chemical equations, reactions, and the true quantitative nature of chemistry!
      </Text>

      {/* 12. Deep Dive & Real-World Connections */}
      <Text style={styles.heading}>12. Deep Dive & Real-World Connections</Text>
      <Accordion title="How did Avogadro determine 'The Number'?" color={color}>
        <Text style={styles.paragraph}>
          Interestingly, Amedeo Avogadro never actually calculated the number 6.022 × 10²³. He only proposed that equal volumes of gases at the same temperature and pressure contain the same number of particles.
        </Text>
        <Text style={styles.paragraph}>
          It was the Austrian physicist Josef Loschmidt who first estimated the number of molecules in a given volume of gas in 1865. Later, Jean Perrin, a French physicist, coined the term "Avogadro's number" in 1909. Perrin calculated it precisely using Brownian motion experiments and won the Nobel Prize for his work!
        </Text>
      </Accordion>

      <Accordion title="Stoichiometry in Industrial Chemical Manufacturing" color={color}>
        <Text style={styles.paragraph}>
          The mole concept isn't just for textbook problems; it's the foundation of all chemical manufacturing. When a company wants to produce a billion tons of fertilizer (like Ammonia, NH3), they can't just mix random amounts of nitrogen and hydrogen.
        </Text>
        <Text style={styles.paragraph}>
          Using the mole concept and stoichiometry, chemical engineers calculate exactly how many tons of reactants are needed to produce the desired yield without wasting expensive materials. This ensures maximum efficiency, safety, and profitability in the chemical industry.
        </Text>
        <Text style={styles.bulletPoint}>• Pharmaceuticals: Precise dosing and active ingredient scaling.</Text>
        <Text style={styles.bulletPoint}>• Food Industry: Perfect ratios of preservatives and flavorings.</Text>
        <Text style={styles.bulletPoint}>• Materials Science: Creating exact alloys and polymers.</Text>
      </Accordion>

      {/* 13. Knowledge Check */}
      <Text style={styles.heading}>13. Knowledge Check</Text>
      <Accordion title="Question: How many moles of H2O are in 90g of water?" color={color}>
        <Text style={styles.paragraph}>
          Step 1: The molar mass of water (H2O) is 18 g/mol.
        </Text>
        <Text style={styles.paragraph}>
          Step 2: Use the formula n = m / M
        </Text>
        <Text style={styles.paragraph}>
          Step 3: n = 90 / 18 = 5
        </Text>
        <Text style={styles.paragraph}>
          Answer: There are exactly 5 moles of H2O in 90g of water.
        </Text>
      </Accordion>

    </DetailScreenLayout>
  );
}
