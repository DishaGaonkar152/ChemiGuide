import React from 'react';
import { View, Text } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';
import Accordion from '../../components/Accordion';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function AtomicStructureScreen() {
  return (
    <DetailScreenLayout title="Atomic Structure" color="#00ffff" emoji="⚛">
      
      <Text style={styles.heading}>1. What is an Atom?</Text>
      <Text style={styles.paragraph}>
        Since ancient times, philosophers have speculated about the fundamental building blocks of matter. The term "atom" comes from the Greek word <Text style={styles.highlight}>"atomos"</Text>, meaning indivisible. However, modern chemistry has revealed that the atom is not indivisible, but rather made up of even smaller sub-atomic particles.
      </Text>
      <Text style={styles.paragraph}>
        An atom is the smallest unit of ordinary matter that forms a chemical element. Every solid, liquid, gas, and plasma is composed of neutral or ionized atoms. Atoms are incredibly small, typically around 100 picometers across (1 x 10⁻¹⁰ meters). To put this into perspective, if an apple were magnified to the size of the Earth, the atoms in the apple would be approximately the size of the original apple!
      </Text>
      
      <Text style={styles.heading}>2. Sub-Atomic Particles</Text>
      <Text style={styles.paragraph}>
        Atoms are composed of three primary sub-atomic particles: protons, neutrons, and electrons. The nucleus, located at the center of the atom, contains the protons and neutrons. The electrons orbit the nucleus in specific energy levels or shells.
      </Text>
      <AnimatedInfoBox color="#00ffff" delay={0}>
        <Text style={styles.highlight}>Proton:</Text> Charge = +1, Mass ≈ 1 u. Location: Nucleus.{'\n\n'}
        <Text style={styles.highlight}>Neutron:</Text> Charge = 0, Mass ≈ 1 u. Location: Nucleus.{'\n\n'}
        <Text style={styles.highlight}>Electron:</Text> Charge = -1, Mass ≈ 1/1836 u. Location: Electron Shells (Orbitals).
      </AnimatedInfoBox>

      <Text style={styles.heading}>3. Atomic Number and Mass Number</Text>
      <Text style={styles.paragraph}>
        The identity of an element is determined by its <Text style={styles.highlight}>Atomic Number (Z)</Text>, which is the number of protons in its nucleus. For a neutral atom, this is also equal to the number of electrons.
      </Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>Mass Number (A)</Text> is the total number of protons and neutrons (together called nucleons) in an atom's nucleus.
      </Text>
      <AnimatedInfoBox color="#00ffff" delay={100}>
        Formula:{'\n'}Mass Number (A) = Atomic Number (Z) + Number of Neutrons (N)
      </AnimatedInfoBox>

      <Text style={styles.heading}>4. The Carbon Atom</Text>
      <Text style={styles.paragraph}>
        Carbon (Atomic Number 6) is the fundamental element of life. Let's look at its 3D atomic model. A neutral carbon atom has 6 protons, 6 neutrons (most commonly), and 6 electrons orbiting the nucleus.
      </Text>
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#00ffff" caption="Carbon atom: 2 electrons in K shell, 4 electrons in L shell" />

      <Text style={styles.heading}>5. Electron Distribution (Bohr-Bury Rules)</Text>
      <Text style={styles.paragraph}>
        Electrons revolve around the nucleus in definite circular paths called orbits or shells, represented by the letters K, L, M, N, or numbers n=1, 2, 3, 4.
      </Text>
      <AnimatedInfoBox color="#00ffff" delay={200}>
        The maximum number of electrons present in a shell is given by the formula <Text style={styles.highlight}>2n²</Text>, where 'n' is the orbit number.{'\n'}
        • K shell (n=1) = 2(1)² = 2 electrons{'\n'}
        • L shell (n=2) = 2(2)² = 8 electrons{'\n'}
        • M shell (n=3) = 2(3)² = 18 electrons{'\n'}
        • N shell (n=4) = 2(4)² = 32 electrons
      </AnimatedInfoBox>
      <Text style={styles.paragraph}>
        According to the Bohr-Bury rules, the outermost shell can accommodate a maximum of 8 electrons (octet rule), and electrons are not accommodated in a given shell unless the inner shells are filled.
      </Text>

      <Text style={styles.heading}>6. Electron Configuration Examples</Text>
      <Text style={styles.paragraph}>Here is the electronic configuration for some common elements:</Text>
      <Text style={styles.bulletPoint}>• Hydrogen (H, Z=1): 1</Text>
      <Text style={styles.bulletPoint}>• Carbon (C, Z=6): 2, 4</Text>
      <Text style={styles.bulletPoint}>• Sodium (Na, Z=11): 2, 8, 1</Text>
      <Text style={styles.bulletPoint}>• Chlorine (Cl, Z=17): 2, 8, 7</Text>
      <Text style={styles.bulletPoint}>• Calcium (Ca, Z=20): 2, 8, 8, 2</Text>

      <Text style={styles.heading}>7. The Sodium Atom</Text>
      <Text style={styles.paragraph}>
        Sodium (Atomic Number 11) has an electron configuration of 2, 8, 1. It has one electron in its outermost M shell.
      </Text>
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium atom: 2,8,1 — one valence electron in the M shell" />

      <Text style={styles.heading}>8. Valence Electrons vs Valency</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Valence electrons</Text> are the electrons present in the outermost shell of an atom. They determine the chemical properties of the element.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Valency</Text> is the combining capacity of an element. It is the number of electrons an atom needs to lose, gain, or share to achieve a stable octet (or duplet) configuration.
      </Text>
      <Text style={styles.bulletPoint}>• Sodium (Na: 2,8,1) has 1 valence electron. It loses 1 to become stable. Valency = 1.</Text>
      <Text style={styles.bulletPoint}>• Magnesium (Mg: 2,8,2) has 2 valence electrons. Valency = 2.</Text>
      <Text style={styles.bulletPoint}>• Aluminum (Al: 2,8,3) has 3 valence electrons. Valency = 3.</Text>
      <Text style={styles.bulletPoint}>• Carbon (C: 2,4) has 4 valence electrons. It shares 4. Valency = 4.</Text>
      <Text style={styles.bulletPoint}>• Nitrogen (N: 2,5) has 5 valence electrons. It gains 3. Valency = 3.</Text>
      <Text style={styles.bulletPoint}>• Oxygen (O: 2,6) has 6 valence electrons. It gains 2. Valency = 2.</Text>
      <Text style={styles.bulletPoint}>• Chlorine (Cl: 2,8,7) has 7 valence electrons. It gains 1. Valency = 1.</Text>

      <Text style={styles.heading}>9. Isotopes</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Isotopes</Text> are atoms of the same element having the same atomic number but different mass numbers. This means they have the same number of protons but different numbers of neutrons.
      </Text>
      <Text style={styles.bulletPoint}>• Carbon: C-12 (6p, 6n) and C-14 (6p, 8n)</Text>
      <Text style={styles.bulletPoint}>• Chlorine: Cl-35 (17p, 18n) and Cl-37 (17p, 20n)</Text>
      <Text style={styles.bulletPoint}>• Hydrogen: Protium (1p, 0n), Deuterium (1p, 1n), and Tritium (1p, 2n)</Text>
      <AnimatedInfoBox color="#00ffff" delay={300}>
        Applications of Isotopes:{'\n'}
        1. Carbon-14 is used in radiocarbon dating to determine the age of fossils.{'\n'}
        2. Isotope of Cobalt (Co-60) is used in the treatment of cancer.{'\n'}
        3. Isotope of Iodine (I-131) is used in the treatment of goiter.
      </AnimatedInfoBox>

      <Text style={styles.heading}>10. Isobars</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Isobars</Text> are atoms of different elements having different atomic numbers but the same mass number. Since they are different elements, they have different chemical properties.
      </Text>
      <Text style={styles.paragraph}>
        For example, Argon (Atomic Number = 18) and Calcium (Atomic Number = 20) both have a mass number of 40. This means their nuclei contain the same total number of nucleons (protons + neutrons), but the ratio of protons to neutrons is different.
      </Text>

      <Text style={styles.heading}>11. The Chlorine Atom</Text>
      <Text style={styles.paragraph}>
        Chlorine (Atomic Number 17) has an electron configuration of 2, 8, 7. It requires just one more electron to complete its octet, making it highly reactive.
      </Text>
      <InlineAtomModel atomicNumber={17} elementName="Chlorine" elementSymbol="Cl" color="#ffff00" caption="Chlorine atom: 2,8,7 — needs 1 electron to complete its octet" />
      
      <Text style={styles.heading}>Deep Dive & Real-World Connections</Text>
      
      <Accordion title="Quantum Mechanics: Orbitals vs Shells" color="#00ffff">
        <Text style={styles.paragraph}>
          While the Bohr model teaches us about electron "shells", quantum mechanics shows that electrons don't orbit like planets. Instead, they exist in "probability clouds" called orbitals (s, p, d, f) where an electron is most likely to be found!
        </Text>
      </Accordion>

      <Accordion title="The Math of Carbon Dating" color="#00ffff">
        <Text style={styles.paragraph}>
          Carbon-14 is radioactive and decays over time with a half-life of 5,730 years. By comparing the ratio of C-14 to stable C-12 in a fossil, scientists can calculate its age using the formula: t = [ln(N0/Nt) / 0.693] × t1/2.
        </Text>
      </Accordion>

      <Accordion title="The Discovery of Quarks" color="#00ffff">
        <Text style={styles.paragraph}>
          Protons and neutrons aren't fundamental particles either! In 1968, scientists discovered they are made of smaller particles called quarks. A proton has two "up" quarks and one "down" quark, while a neutron has one "up" and two "down" quarks.
        </Text>
      </Accordion>

      <Text style={styles.heading}>Knowledge Check</Text>
      
      <Accordion title="Q: An atom has 15 protons and 16 neutrons. What is its atomic number and mass number?" color="#00ffff">
        <Text style={styles.paragraph}>
          <Text style={styles.highlight}>Answer:</Text> Its atomic number is 15 (number of protons) and its mass number is 31 (15 + 16).
        </Text>
      </Accordion>

    </DetailScreenLayout>
  );
}
