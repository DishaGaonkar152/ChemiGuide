import React from 'react';
import { Linking, Text, TouchableOpacity, View } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';
import InteractiveExperiment from '../../components/InteractiveExperiment';
import InteractiveConceptCheck from '../../components/InteractiveConceptCheck';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';

export default function MatterScreen() {
  return (
    <DetailScreenLayout title="Is Matter Around Us Pure?" color="#ffff00" emoji="🧪">
      
      <Text style={styles.heading}>1. What is Matter?</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=wyRRRI9sGEo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: What is Matter?</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Matter is anything that occupies space and has mass. Everything around us, from the air we breathe to the food we eat, stones, clouds, stars, plants, and animals, is made up of matter. The two fundamental properties of matter are <Text style={styles.highlight}>mass</Text> and <Text style={styles.highlight}>volume</Text>.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Particles of Matter (NCERT):</Text> Matter is made up of tiny particles. These particles are so small that we cannot see them with the naked eye. Activity: Dissolve 2-3 crystals of potassium permanganate in 100 mL of water. Take 10 mL of this solution and dilute it further with 90 mL of water. The color persists even after several dilutions, proving that matter is made of extremely tiny particles!
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Three Characteristics of Particles of Matter:</Text>
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Particles have spaces between them:</Text> When sugar dissolves in water, the level does not rise proportionally because sugar particles fit into the spaces between water molecules.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Particles are continuously moving:</Text> Their kinetic energy increases with temperature. This explains diffusion — the mixing of particles of two different substances (e.g., ink spreading in water, perfume smell spreading in a room).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Particles attract each other:</Text> The force of attraction between particles holds matter together. This force is strongest in solids and weakest in gases.</Text>

      <Text style={styles.heading}>2. States of Matter</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=s-KvoVzukHo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: States of Matter</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Matter typically exists in three states based on the physical arrangement of particles:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solid:</Text> Definite shape and volume. High density, very low compressibility, and negligible diffusion.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Liquid:</Text> No definite shape but a definite volume. Take the shape of the container. Moderate density and compressibility. They can flow, hence called fluids.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Gas:</Text> Neither definite shape nor definite volume. Highly compressible, low density, and diffuse very rapidly.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Effect of Temperature and Pressure (NCERT):</Text> On increasing temperature, particles gain kinetic energy and vibrate faster. At the melting point, solid changes to liquid — the heat absorbed without temperature change is called <Text style={styles.highlight}>Latent Heat of Fusion</Text>. At the boiling point, liquid changes to gas — this hidden heat is called <Text style={styles.highlight}>Latent Heat of Vaporization</Text>.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Sublimation:</Text> Direct conversion of solid to gas without passing through the liquid state (e.g., dry ice, camphor, ammonium chloride, naphthalene).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Deposition:</Text> Direct conversion of gas to solid (reverse of sublimation).</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Beyond Three States (NCERT):</Text> Apart from solid, liquid, and gas, two more states exist: <Text style={styles.highlight}>Plasma</Text> (super-heated ionized gas found in stars, neon signs, and fluorescent tubes) and <Text style={styles.highlight}>Bose-Einstein Condensate (BEC)</Text> (formed at temperatures near absolute zero, where atoms behave as a single super-atom).
      </Text>
      <InteractiveExperiment type="states_of_matter" color="#ffff00" />
      
      <Text style={styles.heading}>3. Elements</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=d0zIOQjYJLs')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Elements Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        An element is a basic form of matter that cannot be broken down into simpler substances by chemical reactions. Elements are the building blocks of all matter.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Metals:</Text> Lustrous, malleable, ductile, good conductors of heat and electricity (e.g., Iron, Gold, Sodium).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Non-metals:</Text> Non-lustrous, brittle, poor conductors (e.g., Oxygen, Hydrogen, Carbon).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Metalloids:</Text> Have intermediate properties (e.g., Silicon, Germanium).</Text>
      <InlineAtomModel atomicNumber={1} elementName="Hydrogen" elementSymbol="H" color="#00ffff" caption="Hydrogen — the simplest non-metal element with just 1 electron" height={280} />
      
      <Text style={styles.heading}>4. Compounds</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=XmNsJpM6UbQ')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Compounds Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A compound is a substance composed of two or more elements, chemically combined with one another in a fixed proportion. The properties of a compound are entirely different from those of its constituent elements. Examples include Water (H₂O), Salt (NaCl), and Carbon Dioxide (CO₂).
      </Text>
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#ffff00" caption="Carbon atom — bonds with 4 hydrogen atoms to form methane (CH₄), a chemical compound" height={280} />

      <Text style={styles.heading}>5. Difference Between Elements and Compounds</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=Rd4LjPZ5sJI')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Elements vs Compounds</Text>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Element:</Text> Consists of only one type of atom.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Consists of two or more types of atoms chemically bonded.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Element:</Text> Cannot be broken down chemically into simpler substances.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Can be broken down into its constituent elements by chemical methods.</Text>
      </View>

      <Text style={styles.heading}>6. Mixtures</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=jDW4ULqZbJI')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Mixtures Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Mixtures are constituted by more than one kind of pure form of matter. They can be separated into pure substances by physical methods.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Homogeneous Mixtures:</Text> Uniform composition throughout. There are no visible boundaries of separation. Examples: Salt dissolved in water, sugar in water, air, alloys.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Heterogeneous Mixtures:</Text> Non-uniform composition; distinct parts are visible. Examples: Sand and salt mixed, oil in water, soil.</Text>

      <Text style={styles.heading}>7. Difference Between Mixtures and Compounds</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=j-Qbpv1-U0o')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Mixtures vs Compounds</Text>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Mixture:</Text> Elements or compounds just mix together without forming new chemical bonds. Composition is variable.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Elements react to form new substances. Composition is always fixed.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Mixture:</Text> Shows the properties of its constituent substances.</Text>
        <Text style={styles.infoBoxText}>• <Text style={styles.highlight}>Compound:</Text> Has totally new properties compared to its constituents.</Text>
      </View>

      <Text style={styles.heading}>8. Solutions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=9h2f1Bjr0p4')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Solutions Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A solution is a homogeneous mixture of two or more substances. It consists of two main parts:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solvent:</Text> The component that dissolves the other component (usually present in larger amount). For instance, water in a sugar solution.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solute:</Text> The component that is dissolved in the solvent (usually present in lesser amount). For instance, sugar in a sugar solution.</Text>
      <Text style={styles.paragraph}>Solutions can be solid-liquid (salt in water), liquid-liquid (alcohol in water), gas-liquid (carbon dioxide in aerated drinks), or even solid-solid (alloys).</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Concentration of a Solution (NCERT):</Text> The amount of solute present in a given amount of solution is called its concentration.
      </Text>
      <Text style={styles.bulletPoint}>• Mass by mass percentage = (Mass of solute / Mass of solution) × 100</Text>
      <Text style={styles.bulletPoint}>• Mass by volume percentage = (Mass of solute / Volume of solution) × 100</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Properties of True Solutions:</Text> Particle size less than 1 nm, transparent (does not scatter light), stable (particles do not settle down), and passes through filter paper.
      </Text>

      <Text style={styles.heading}>9. Saturated vs Unsaturated Solutions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=JW3lEM4S08k')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Saturated vs Unsaturated Solutions</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Unsaturated Solution:</Text> A solution in which more solute can be dissolved at a given temperature without raising its temperature.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Saturated Solution:</Text> A solution in which no more solute can be dissolved at that particular temperature. It has reached its maximum capacity.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Supersaturated Solution:</Text> A solution that contains more dissolved solute than a saturated solution under the same conditions (usually formed by heating and cooling). It is unstable.</Text>

      <Text style={styles.heading}>10. Suspensions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=EGoJ7GW7hMs')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Suspensions</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A suspension is a heterogeneous mixture in which the solute particles do not dissolve but remain suspended throughout the bulk of the medium. The particles are visible to the naked eye (e.g., chalk powder in water, muddy water). If left undisturbed, the particles eventually settle down.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Properties of Suspensions (NCERT):</Text> Particle size greater than 100 nm. Particles are visible to the naked eye. A suspension scatters a beam of light passing through it (Tyndall effect may be visible). It is unstable — particles settle down when left undisturbed. Particles can be separated by ordinary filtration.
      </Text>

      <Text style={styles.heading}>11. Colloids (Colloidal Solutions)</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=FqGjR0E8Nss')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Colloids & Tyndall Effect</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A colloid is a heterogeneous mixture where the particle size is intermediate between a true solution and a suspension. The particles cannot be seen with naked eyes, but they easily scatter a beam of visible light. This scattering of light is known as the <Text style={styles.highlight}>Tyndall Effect</Text>.
      </Text>
      <Text style={styles.paragraph}>
        Examples include milk (liquid in liquid emulsion), fog (liquid in gas aerosol), butter, and smoke.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}><Text style={styles.highlight}>Did You Know?</Text> The Tyndall effect can also be observed when a fine beam of light enters a dark room through a small hole, scattering off microscopic dust and smoke particles in the air.</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Types of Colloids (NCERT Table):{"\n\n"}• Aerosol (Liquid in Gas): Fog, clouds, mist{"\n"}• Aerosol (Solid in Gas): Smoke, dust{"\n"}• Foam (Gas in Liquid): Shaving cream{"\n"}• Emulsion (Liquid in Liquid): Milk, face cream{"\n"}• Sol (Solid in Liquid): Mud water, starch solution, ink{"\n"}• Solid Foam (Gas in Solid): Sponge, pumice stone{"\n"}• Gel (Liquid in Solid): Jelly, cheese, butter{"\n"}• Solid Sol (Solid in Solid): Coloured gemstones, milky glass{"\n\n"}The substance dispersed is called the Dispersed Phase, and the medium in which it is dispersed is called the Dispersion Medium.
        </Text>
      </View>
      <InteractiveConceptCheck
        question="Which phenomenon is responsible for the visible beam of light when sunlight enters a dusty room?"
        options={["Sublimation", "Tyndall Effect", "Electrolysis", "Evaporation"]}
        correctIndex={1}
        explanation="The Tyndall Effect is the scattering of light by colloidal or suspended particles in a medium!"
        color="#ffff00"
      />

      <Text style={styles.heading}>12. Separation Techniques</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=O0Ql7M9D0rQ')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Separation Techniques</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Various physical methods are used to separate components of a mixture based on their distinct physical properties:</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Evaporation:</Text> Separating a volatile component (solvent) from its non-volatile solute by heating (e.g., obtaining salt from seawater).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Centrifugation:</Text> Spinning a mixture rapidly in a centrifuge to push denser particles to the bottom and lighter ones to the top (e.g., separating cream from milk or blood separation in labs).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Separating Funnel:</Text> Used for separating immiscible liquids based on their differences in densities (e.g., separating oil and water).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Sublimation:</Text> Used to separate a sublimable volatile component from a non-sublimable impurity (e.g., separating camphor or ammonium chloride from salt).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Chromatography:</Text> Separating solutes that dissolve in the same solvent, based on their differential movement along a stationary phase (e.g., separating colours in a dye or ink).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Distillation:</Text> Separating miscible liquids that boil without decomposition and have a sufficient difference in their boiling points (usually more than 25 K).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Fractional Distillation:</Text> Used when the difference in boiling points of miscible liquids is less than 25 K (e.g., separating different gases from air or petroleum refining).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Crystallisation:</Text> Purifying solid substances by forming pure crystals from a hot saturated solution (e.g., obtaining pure copper sulphate crystals from an impure sample).</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Key Techniques Explained (NCERT):</Text>
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Centrifugation:</Text> Denser particles are forced to the bottom by spinning rapidly. Used in diagnostic labs (blood/urine testing), dairies (cream from milk), and washing machines (squeezing water from clothes).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Separating Funnel:</Text> Used to separate two immiscible liquids (e.g., oil and water) based on their difference in densities. The heavier liquid is drained out from the bottom.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Fractional Distillation:</Text> Uses a fractionating column packed with glass beads to separate miscible liquids with close boiling points (e.g., separation of components of air — liquid nitrogen boils at -196°C, liquid oxygen at -183°C).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Crystallization:</Text> A better technique than simple evaporation for purifying solids because evaporation may decompose some solutes and impurities may contaminate the solid. Used to obtain pure salt from sea water, and to purify alum and copper sulphate.</Text>

      <AnimatedInfoBox color="#ffff00" delay={100}>
        💡 Exam Pro-Tip: Separation Techniques
        • Evaporation vs Crystallization: Crystallization is ALWAYS preferred because heating to dryness during evaporation can char or decompose the substance (like sugar).
        • Chromatography: The dye that is MORE SOLUBLE in water rises FASTER on the filter paper.
      </AnimatedInfoBox>

      <Text style={styles.heading}>13. Physical vs Chemical Changes</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=gMwIP2RvIko')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Physical vs Chemical Changes</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Physical Change:</Text> A change in physical properties (such as shape, size, color, or state) without forming a new chemical substance. It is usually reversible. Examples: Melting of ice, tearing of paper, boiling of water.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Chemical Change:</Text> A change where new substances with new chemical properties are formed. It is mostly irreversible. Examples: Rusting of iron, burning of wood, digestion of food.</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>Remember: Dissolving salt in water is a physical change (you can evaporate the water to get salt back), but burning a magnesium ribbon is a chemical change (it forms magnesium oxide, a new substance)!</Text>
      </View>
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium — a highly reactive metal element with 11 electrons (2, 8, 1)" height={280} />

    </DetailScreenLayout>
  );
}

