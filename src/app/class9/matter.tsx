import React from 'react';
import { Text, View } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function MatterScreen() {
  return (
    <DetailScreenLayout title="Is Matter Around Us Pure?" color="#ffff00" emoji="🧪">
      
      <Text style={styles.heading}>1. What is Matter?</Text>
      <Text style={styles.paragraph}>
        Matter is anything that occupies space and has mass. Everything around us, from the air we breathe to the food we eat, stones, clouds, stars, plants, and animals, is made up of matter. The two fundamental properties of matter are <Text style={styles.highlight}>mass</Text> and <Text style={styles.highlight}>volume</Text>.
      </Text>

      <Text style={styles.heading}>2. States of Matter</Text>
      <Text style={styles.paragraph}>
        Matter typically exists in three states based on the physical arrangement of particles:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solid:</Text> Definite shape and volume. High density, very low compressibility, and negligible diffusion.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Liquid:</Text> No definite shape but a definite volume. Take the shape of the container. Moderate density and compressibility. They can flow, hence called fluids.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Gas:</Text> Neither definite shape nor definite volume. Highly compressible, low density, and diffuse very rapidly.</Text>
      
      <Text style={styles.heading}>3. Elements</Text>
      <Text style={styles.paragraph}>
        An element is a basic form of matter that cannot be broken down into simpler substances by chemical reactions. Elements are the building blocks of all matter.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Metals:</Text> Lustrous, malleable, ductile, good conductors of heat and electricity (e.g., Iron, Gold, Sodium).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Non-metals:</Text> Non-lustrous, brittle, poor conductors (e.g., Oxygen, Hydrogen, Carbon).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Metalloids:</Text> Have intermediate properties (e.g., Silicon, Germanium).</Text>
      <InlineAtomModel atomicNumber={1} elementName="Hydrogen" elementSymbol="H" color="#00ffff" caption="Hydrogen — the simplest non-metal element with just 1 electron" height={280} />
      
      <Text style={styles.heading}>4. Compounds</Text>
      <Text style={styles.paragraph}>
        A compound is a substance composed of two or more elements, chemically combined with one another in a fixed proportion. The properties of a compound are entirely different from those of its constituent elements. Examples include Water (H₂O), Salt (NaCl), and Carbon Dioxide (CO₂).
      </Text>
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#ffff00" caption="Carbon atom — bonds with 4 hydrogen atoms to form methane (CH₄), a chemical compound" height={280} />

      <Text style={styles.heading}>5. Difference Between Elements and Compounds</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Element:</Text> Consists of only one type of atom.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Consists of two or more types of atoms chemically bonded.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Element:</Text> Cannot be broken down chemically into simpler substances.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Can be broken down into its constituent elements by chemical methods.</Text>
      </View>

      <Text style={styles.heading}>6. Mixtures</Text>
      <Text style={styles.paragraph}>
        Mixtures are constituted by more than one kind of pure form of matter. They can be separated into pure substances by physical methods.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Homogeneous Mixtures:</Text> Uniform composition throughout. There are no visible boundaries of separation. Examples: Salt dissolved in water, sugar in water, air, alloys.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Heterogeneous Mixtures:</Text> Non-uniform composition; distinct parts are visible. Examples: Sand and salt mixed, oil in water, soil.</Text>

      <Text style={styles.heading}>7. Difference Between Mixtures and Compounds</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Mixture:</Text> Elements or compounds just mix together without forming new chemical bonds. Composition is variable.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Elements react to form new substances. Composition is always fixed.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Mixture:</Text> Shows the properties of its constituent substances.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Has totally new properties compared to its constituents.</Text>
      </View>

      <Text style={styles.heading}>8. Solutions</Text>
      <Text style={styles.paragraph}>
        A solution is a homogeneous mixture of two or more substances. It consists of two main parts:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solvent:</Text> The component that dissolves the other component (usually present in larger amount). For instance, water in a sugar solution.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solute:</Text> The component that is dissolved in the solvent (usually present in lesser amount). For instance, sugar in a sugar solution.</Text>
      <Text style={styles.paragraph}>Solutions can be solid-liquid (salt in water), liquid-liquid (alcohol in water), gas-liquid (carbon dioxide in aerated drinks), or even solid-solid (alloys).</Text>

      <Text style={styles.heading}>9. Saturated vs Unsaturated Solutions</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Unsaturated Solution:</Text> A solution in which more solute can be dissolved at a given temperature without raising its temperature.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Saturated Solution:</Text> A solution in which no more solute can be dissolved at that particular temperature. It has reached its maximum capacity.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Supersaturated Solution:</Text> A solution that contains more dissolved solute than a saturated solution under the same conditions (usually formed by heating and cooling). It is unstable.</Text>

      <Text style={styles.heading}>10. Suspensions</Text>
      <Text style={styles.paragraph}>
        A suspension is a heterogeneous mixture in which the solute particles do not dissolve but remain suspended throughout the bulk of the medium. The particles are visible to the naked eye (e.g., chalk powder in water, muddy water). If left undisturbed, the particles eventually settle down.
      </Text>

      <Text style={styles.heading}>11. Colloids (Colloidal Solutions)</Text>
      <Text style={styles.paragraph}>
        A colloid is a heterogeneous mixture where the particle size is intermediate between a true solution and a suspension. The particles cannot be seen with naked eyes, but they easily scatter a beam of visible light. This scattering of light is known as the <Text style={styles.highlight}>Tyndall Effect</Text>.
      </Text>
      <Text style={styles.paragraph}>
        Examples include milk (liquid in liquid emulsion), fog (liquid in gas aerosol), butter, and smoke.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}><Text style={styles.highlight}>Did You Know?</Text> The Tyndall effect can also be observed when a fine beam of light enters a dark room through a small hole, scattering off microscopic dust and smoke particles in the air.</Text>
      </View>

      <Text style={styles.heading}>12. Separation Techniques</Text>
      <Text style={styles.paragraph}>Various physical methods are used to separate components of a mixture based on their distinct physical properties:</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Evaporation:</Text> Separating a volatile component (solvent) from its non-volatile solute by heating (e.g., obtaining salt from seawater).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Centrifugation:</Text> Spinning a mixture rapidly in a centrifuge to push denser particles to the bottom and lighter ones to the top (e.g., separating cream from milk or blood separation in labs).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Separating Funnel:</Text> Used for separating immiscible liquids based on their differences in densities (e.g., separating oil and water).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Sublimation:</Text> Used to separate a sublimable volatile component from a non-sublimable impurity (e.g., separating camphor or ammonium chloride from salt).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Chromatography:</Text> Separating solutes that dissolve in the same solvent, based on their differential movement along a stationary phase (e.g., separating colours in a dye or ink).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Distillation:</Text> Separating miscible liquids that boil without decomposition and have a sufficient difference in their boiling points (usually more than 25 K).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Fractional Distillation:</Text> Used when the difference in boiling points of miscible liquids is less than 25 K (e.g., separating different gases from air or petroleum refining).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Crystallisation:</Text> Purifying solid substances by forming pure crystals from a hot saturated solution (e.g., obtaining pure copper sulphate crystals from an impure sample).</Text>

      <Text style={styles.heading}>13. Physical vs Chemical Changes</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Physical Change:</Text> A change in physical properties (such as shape, size, color, or state) without forming a new chemical substance. It is usually reversible. Examples: Melting of ice, tearing of paper, boiling of water.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Chemical Change:</Text> A change where new substances with new chemical properties are formed. It is mostly irreversible. Examples: Rusting of iron, burning of wood, digestion of food.</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>Remember: Dissolving salt in water is a physical change (you can evaporate the water to get salt back), but burning a magnesium ribbon is a chemical change (it forms magnesium oxide, a new substance)!</Text>
      </View>
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium — a highly reactive metal element with 11 electrons (2, 8, 1)" height={280} />

    </DetailScreenLayout>
  );
}
