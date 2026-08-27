import React from 'react';
import { View, Text, Linking, TouchableOpacity } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';
import Accordion from '../../components/Accordion';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function AtomicStructureScreen() {
  return (
    <DetailScreenLayout title="Atomic Structure" color="#00ffff" emoji="⚛">
      
      <Text style={styles.heading}>1. What is an Atom?</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=NicR4A_GOq0')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: What is an Atom?</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Since ancient times, philosophers have speculated about the fundamental building blocks of matter. The term "atom" comes from the Greek word <Text style={styles.highlight}>"atomos"</Text>, meaning indivisible. However, modern chemistry has revealed that the atom is not indivisible, but rather made up of even smaller sub-atomic particles.
      </Text>
      <Text style={styles.paragraph}>
        An atom is the smallest unit of ordinary matter that forms a chemical element. Every solid, liquid, gas, and plasma is composed of neutral or ionized atoms. Atoms are incredibly small, typically around 100 picometers across (1 x 10⁻¹⁰ meters). To put this into perspective, if an apple were magnified to the size of the Earth, the atoms in the apple would be approximately the size of the original apple!
      </Text>
      
      <Text style={styles.heading}>2. Sub-Atomic Particles</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=IdTxGJjA4Jc')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Sub-Atomic Particles</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Atoms are composed of three primary sub-atomic particles: protons, neutrons, and electrons. The nucleus, located at the center of the atom, contains the protons and neutrons. The electrons orbit the nucleus in specific energy levels or shells.
      </Text>
      <AnimatedInfoBox color="#00ffff" delay={0}>
        <Text style={styles.highlight}>Proton:</Text> Charge = +1, Mass ≈ 1 u. Location: Nucleus.{'\n\n'}
        <Text style={styles.highlight}>Neutron:</Text> Charge = 0, Mass ≈ 1 u. Location: Nucleus.{'\n\n'}
        <Text style={styles.highlight}>Electron:</Text> Charge = -1, Mass ≈ 1/1836 u. Location: Electron Shells (Orbitals).
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Discoverers & Values (NCERT):</Text> The electron was discovered by <Text style={styles.highlight}>J.J. Thomson (1897)</Text>, the proton by <Text style={styles.highlight}>E. Goldstein (1886)</Text>, and the neutron by <Text style={styles.highlight}>J. Chadwick (1932)</Text>. The absolute charge of an electron or proton is 1.6 × 10⁻¹⁹ Coulombs. The mass of a proton or neutron is approximately 1.67 × 10⁻²⁷ kg (about 1 u), while an electron's mass is only 9.1 × 10⁻³¹ kg (~1/1836 u).
      </Text>

      <Text style={styles.heading}>3. Atomic Number and Mass Number</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=B4MbJMvMePo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Atomic Number & Mass Number</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        The identity of an element is determined by its <Text style={styles.highlight}>Atomic Number (Z)</Text>, which is the number of protons in its nucleus. For a neutral atom, this is also equal to the number of electrons.
      </Text>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>Mass Number (A)</Text> is the total number of protons and neutrons (together called nucleons) in an atom's nucleus.
      </Text>
      <AnimatedInfoBox color="#00ffff" delay={100}>
        Formula:{'\n'}Mass Number (A) = Atomic Number (Z) + Number of Neutrons (N)
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Standard Notation (NCERT):</Text> An element X with atomic number Z and mass number A is represented as: ᴬ_z X. For example: ¹⁴₇N (Nitrogen, Z=7, A=14), ¹²₆C (Carbon, Z=6, A=12), ²⁷₁₃Al (Aluminium, Z=13, A=27). Protons and neutrons together are called <Text style={styles.highlight}>nucleons</Text>.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Practice: Calculate neutrons (N = A - Z):{"\n"}• Oxygen-16: Z=8, A=16, N = 16-8 = 8 neutrons{"\n"}• Sodium-23: Z=11, A=23, N = 23-11 = 12 neutrons{"\n"}• Iron-56: Z=26, A=56, N = 56-26 = 30 neutrons
        </Text>
      </View>

      <Text style={styles.heading}>4. The Carbon Atom</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=aL-Fs3BzXaw')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Carbon Atom Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Carbon (Atomic Number 6) is the fundamental element of life. Let's look at its 3D atomic model. A neutral carbon atom has 6 protons, 6 neutrons (most commonly), and 6 electrons orbiting the nucleus.
      </Text>
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#00ffff" caption="Carbon atom: 2 electrons in K shell, 4 electrons in L shell" />

      <Text style={styles.heading}>5. Electron Distribution (Bohr-Bury Rules)</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=Aoi4j8es4gQ')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Electron Distribution Rules</Text>
      </TouchableOpacity>
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
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=JehMI2kgRIo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Electron Configuration Examples</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Here is the electronic configuration for some common elements:</Text>
      <Text style={styles.bulletPoint}>• Hydrogen (H, Z=1): 1</Text>
      <Text style={styles.bulletPoint}>• Carbon (C, Z=6): 2, 4</Text>
      <Text style={styles.bulletPoint}>• Sodium (Na, Z=11): 2, 8, 1</Text>
      <Text style={styles.bulletPoint}>• Chlorine (Cl, Z=17): 2, 8, 7</Text>
      <Text style={styles.bulletPoint}>• Calcium (Ca, Z=20): 2, 8, 8, 2</Text>

      <Text style={styles.heading}>7. The Sodium Atom</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=VI9sFJG3AQs')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Sodium Atom Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Sodium (Atomic Number 11) has an electron configuration of 2, 8, 1. It has one electron in its outermost M shell.
      </Text>
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium atom: 2,8,1 — one valence electron in the M shell" />

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Ion Formation (NCERT):</Text> Sodium has 1 electron in its outermost shell (2,8,1). By losing this 1 electron, it achieves a stable octet (2,8) and becomes a positively charged ion: Na → Na⁺ + e⁻. The sodium cation (Na⁺) has 11 protons but only 10 electrons, giving it a net positive charge of +1.
      </Text>

      <Text style={styles.heading}>8. Valence Electrons vs Valency</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=1xWuf8gIFjU')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Valence Electrons & Valency</Text>
      </TouchableOpacity>
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

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Valency Calculation Rule (NCERT):</Text> If the number of valence electrons is 1, 2, 3, or 4, the valency equals the number of valence electrons. If the number of valence electrons is 5, 6, or 7, the valency = 8 minus the number of valence electrons. Noble gases (He, Ne, Ar) have a completely filled outermost shell (duplet for He, octet for others), so their valency is <Text style={styles.highlight}>zero</Text> — they are chemically inert.
      </Text>

      <Text style={styles.heading}>9. Isotopes</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=F8cT_LZWgho')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Isotopes Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Atoms of the same element that have the <Text style={styles.highlight}>same atomic number but different mass numbers</Text> are called isotopes.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          💡 Exam Pro-Tip: Isotopes have identical chemical properties (because chemical properties depend on electrons, and they have the same number of electrons). But they have different physical properties (like mass or density) due to the different number of neutrons.
        </Text>
      </View>

      <Text style={styles.bulletPoint}>• Hydrogen has three isotopes: Protium (1H), Deuterium (2H), and Tritium (3H).</Text>
      <Text style={styles.bulletPoint}>• Carbon has two main isotopes: C-12 and C-14.</Text>
      <Text style={styles.bulletPoint}>• Chlorine occurs in nature as Cl-35 (75%) and Cl-37 (25%).</Text>

      <AnimatedInfoBox color="#00ffff" delay={100}>
        🌍 Real World Applications of Isotopes:
        • Uranium-235: Used as fuel in nuclear reactors.
        • Cobalt-60: Used in the medical treatment of cancer (radiotherapy).
        • Iodine-131: Used to treat goitre (thyroid gland disease).
        • Carbon-14: Used in carbon dating to find the age of ancient fossils!
      </AnimatedInfoBox>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Average Atomic Mass (NCERT):</Text> Since isotopes of an element have different masses, the atomic mass of an element is the weighted average of the masses of its naturally occurring isotopes. For example, Chlorine has two isotopes: Cl-35 (75%) and Cl-37 (25%). Average atomic mass = (35 × 75/100) + (37 × 25/100) = 26.25 + 9.25 = <Text style={styles.highlight}>35.5 u</Text>.
      </Text>
      <Text style={styles.paragraph}>
        Isotopes have identical chemical properties (because they have the same number of electrons and same electronic configuration) but different physical properties (density, rate of diffusion) due to different masses. <Text style={styles.highlight}>Uranium-235</Text> is used as a fuel in nuclear reactors.
      </Text>

      <Text style={styles.heading}>10. Isobars</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=F8cT_LZWgho')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Isobars Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Isobars</Text> are atoms of different elements having different atomic numbers but the same mass number. Since they are different elements, they have different chemical properties.
      </Text>
      <Text style={styles.paragraph}>
        For example, Argon (Atomic Number = 18) and Calcium (Atomic Number = 20) both have a mass number of 40. This means their nuclei contain the same total number of nucleons (protons + neutrons), but the ratio of protons to neutrons is different.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Isotopes vs Isobars Comparison:{"\n\n"}• Isotopes: Same atomic number (Z), different mass number (A). Same element, same chemical properties. Example: C-12 and C-14 (both Z=6).{"\n"}• Isobars: Different atomic number (Z), same mass number (A). Different elements, different chemical properties. Example: Ca-40 (Z=20) and Ar-40 (Z=18).
        </Text>
      </View>

      <Text style={styles.heading}>11. The Chlorine Atom</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=PaGJwOQb6Lc')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Chlorine Atom Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Chlorine (Atomic Number 17) has an electron configuration of 2, 8, 7. It requires just one more electron to complete its octet, making it highly reactive.
      </Text>
      <InlineAtomModel atomicNumber={17} elementName="Chlorine" elementSymbol="Cl" color="#ffff00" caption="Chlorine atom: 2,8,7 — needs 1 electron to complete its octet" />
      
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Chloride Ion Formation (NCERT):</Text> Chlorine (2,8,7) needs 1 more electron to complete its octet. By gaining 1 electron, it forms the Chloride anion: Cl + e⁻ → Cl⁻. The Cl⁻ ion has 17 protons and 18 electrons, giving it a net negative charge of -1. Its electronic configuration becomes 2,8,8 (stable octet). The atomic mass of chlorine is 35.5 u because it is a weighted average of its isotopes Cl-35 and Cl-37.
      </Text>
      
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
