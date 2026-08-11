import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function AtomicModelsScreen() {
  return (
    <DetailScreenLayout title="Atomic Models" color="#00ff00" emoji="🔬">
      
      <Text style={styles.heading}>1. The Dawn of Atomic Theory</Text>
      <Text style={styles.paragraph}>
        Long before modern science, ancient philosophers pondered the fundamental nature of matter. Around 400 BC, the Greek philosopher <Text style={styles.highlight}>Democritus</Text> proposed that all matter is composed of tiny, indivisible, and indestructible particles. He called these particles <Text style={styles.highlight}>'atomos'</Text>, which translates to "uncuttable" or "indivisible" in Greek. Although purely philosophical and lacking experimental evidence, this brilliant insight laid the conceptual foundation for all future atomic theories.
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Historical Fact: Maharishi Kanad, an ancient Indian philosopher, also formulated a similar theory around the same time, referring to the smallest indivisible particles as 'Parmanu'.
        </Text>
      </View>

      <Text style={styles.heading}>2. Dalton's Atomic Theory (1803)</Text>
      <Text style={styles.paragraph}>
        The first scientific theory of the atom was proposed by <Text style={styles.highlight}>John Dalton</Text> in 1803. He based his theory on the laws of chemical combination, particularly the Law of Conservation of Mass and the Law of Definite Proportions.
      </Text>
      
      <Text style={styles.paragraph}>His theory included the following key postulates:</Text>
      <Text style={styles.bulletPoint}>• All matter is made of extremely small particles called atoms.</Text>
      <Text style={styles.bulletPoint}>• Atoms are indivisible and indestructible; they can neither be created nor destroyed in a chemical reaction.</Text>
      <Text style={styles.bulletPoint}>• Atoms of a given element are identical in mass and chemical properties.</Text>
      <Text style={styles.bulletPoint}>• Atoms of different elements have different masses and chemical properties.</Text>
      <Text style={styles.bulletPoint}>• Atoms combine in ratio of small whole numbers to form compounds.</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Merits & Limitations: While Dalton successfully explained the laws of chemical combination, his theory fell short later when subatomic particles were discovered, proving atoms ARE divisible. The discovery of isotopes also disproved that atoms of the same element are always identical in mass.
        </Text>
      </View>

      <Text style={styles.heading}>3. Discovery of the Electron</Text>
      <Text style={styles.paragraph}>
        The idea of the indivisible atom was shattered in 1897 by <Text style={styles.highlight}>J.J. Thomson</Text> through his famous <Text style={styles.highlight}>Cathode Ray Tube</Text> experiment. By applying high voltage to gases at very low pressure in a glass tube, he observed a glowing beam of rays traveling from the cathode (negative) to the anode (positive). 
      </Text>
      <Text style={styles.paragraph}>
        These cathode rays deflected towards a positively charged plate, proving they consisted of negatively charged particles. Thomson named these particles <Text style={styles.highlight}>electrons</Text>. He also determined the charge-to-mass ratio (e/m) of the electron, showing it was independent of the gas or the metal used for the electrodes.
      </Text>

      <Text style={styles.heading}>4. Thomson's Atomic Model (1897)</Text>
      <Text style={styles.paragraph}>
        After discovering the electron, Thomson proposed the first structure of an atom, widely known as the <Text style={styles.highlight}>Plum Pudding Model</Text> or Watermelon Model. 
      </Text>
      <Text style={styles.bulletPoint}>• An atom consists of a positively charged sphere, and electrons are embedded in it.</Text>
      <Text style={styles.bulletPoint}>• The negative and positive charges are equal in magnitude. Thus, the atom as a whole is electrically neutral.</Text>

      <InlineAtomModel atomicNumber={6} elementName="Carbon (Thomson Era)" elementSymbol="C" color="#00ff00" caption="Carbon atom with 6 electrons — Thomson imagined them embedded in a positive sphere" />

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Shortcomings: Thomson's model successfully explained electrical neutrality but completely failed to explain the results of subsequent scattering experiments conducted by Rutherford.
        </Text>
      </View>

      <Text style={styles.heading}>5. Discovery of the Nucleus</Text>
      <Text style={styles.paragraph}>
        In 1911, <Text style={styles.highlight}>Ernest Rutherford</Text> and his students conducted the <Text style={styles.highlight}>Alpha Particle Scattering Experiment</Text> (Gold Foil Experiment). They bombarded a very thin gold foil (about 1000 atoms thick) with high-energy alpha particles (helium nuclei, +2 charge).
      </Text>
      <Text style={styles.paragraph}>Observations:</Text>
      <Text style={styles.bulletPoint}>1. Most alpha particles passed straight through the foil without deflection.</Text>
      <Text style={styles.bulletPoint}>2. A small fraction of particles were deflected by small angles.</Text>
      <Text style={styles.bulletPoint}>3. Surprisingly, a very small number (1 in 12,000) rebounded exactly backwards!</Text>
      
      <Text style={styles.paragraph}>Conclusions:</Text>
      <Text style={styles.bulletPoint}>• Most of the space inside an atom is empty.</Text>
      <Text style={styles.bulletPoint}>• The positive charge occupies a very small space.</Text>
      <Text style={styles.bulletPoint}>• All the positive charge and mass of the atom is concentrated in a tiny central volume called the <Text style={styles.highlight}>nucleus</Text>.</Text>

      <Text style={styles.heading}>6. Rutherford's Nuclear Model</Text>
      <Text style={styles.paragraph}>
        Based on these results, Rutherford proposed a new atomic model:
      </Text>
      <Text style={styles.bulletPoint}>• The atom has a tiny, dense, positively charged center (nucleus).</Text>
      <Text style={styles.bulletPoint}>• The electrons revolve around the nucleus in circular paths, much like planets around the sun.</Text>
      <Text style={styles.bulletPoint}>• The size of the nucleus is extremely small compared to the size of the atom (about 100,000 times smaller).</Text>

      <InlineAtomModel atomicNumber={79} elementName="Gold" elementSymbol="Au" color="#ffaa00" caption="Gold atom (Z=79) — Rutherford's gold foil experiment revealed the nuclear structure" />

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Major Flaw: According to classical physics, an accelerating charged particle (like a revolving electron) must continuously radiate energy. It would spiral into the nucleus in a fraction of a second. Rutherford's model could not explain the <Text style={styles.highlight}>stability of the atom</Text>.
        </Text>
      </View>

      <Text style={styles.heading}>7. Bohr's Model of the Atom (1913)</Text>
      <Text style={styles.paragraph}>
        To overcome Rutherford's limitations, <Text style={styles.highlight}>Niels Bohr</Text> applied early quantum concepts and proposed a groundbreaking model:
      </Text>
      <Text style={styles.bulletPoint}>• Electrons revolve in certain fixed, distinct circular orbits around the nucleus without radiating energy. These are called <Text style={styles.highlight}>Stationary Orbits</Text> or Energy Levels.</Text>
      <Text style={styles.bulletPoint}>• Each orbit corresponds to a specific, quantized energy. They are designated as K, L, M, N... shells or n = 1, 2, 3, 4...</Text>
      <Text style={styles.bulletPoint}>• Energy is only absorbed or emitted when an electron "jumps" from one allowed orbit to another.</Text>

      <Text style={styles.heading}>Maximum Electrons per Shell</Text>
      <Text style={styles.paragraph}>
        The distribution of electrons into various shells is governed by the <Text style={styles.highlight}>Bohr-Bury rules</Text>. The maximum number of electrons present in a shell is given by the formula <Text style={styles.highlight}>2n²</Text>, where 'n' is the orbit number.
      </Text>
      <Text style={styles.bulletPoint}>• K shell (n=1): 2(1)² = 2 electrons max</Text>
      <Text style={styles.bulletPoint}>• L shell (n=2): 2(2)² = 8 electrons max</Text>
      <Text style={styles.bulletPoint}>• M shell (n=3): 2(3)² = 18 electrons max</Text>
      <Text style={styles.bulletPoint}>• N shell (n=4): 2(4)² = 32 electrons max</Text>

      <InlineAtomModel atomicNumber={11} elementName="Sodium (Bohr Model)" elementSymbol="Na" color="#ff4444" caption="Sodium: 2,8,1 — Bohr's model correctly predicts electrons in K, L, M shells" />

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Limitations of Bohr's Model: While excellent for hydrogen, it failed to accurately predict the spectra of multi-electron atoms. It also couldn't account for the wave nature of electrons (de Broglie) or the uncertainty principle (Heisenberg).
        </Text>
      </View>

      <Text style={styles.heading}>8. The Quantum Mechanical Model</Text>
      <Text style={styles.paragraph}>
        Modern chemistry relies on the <Text style={styles.highlight}>Quantum Mechanical Model</Text>, developed by Schrödinger and others. Instead of fixed planetary orbits, this model introduces "orbitals" — 3D regions of space around the nucleus where the probability of finding an electron is maximum. This model fully embraces the wave-particle duality of matter and the uncertainty principle, providing the most accurate picture of atomic structure we have today.
      </Text>
      
    </DetailScreenLayout>
  );
}
