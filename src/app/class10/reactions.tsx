import React from 'react';
import { View, Text, ScrollView, Linking, TouchableOpacity } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';
import InteractiveExperiment from '../../components/InteractiveExperiment';
import InteractiveConceptCheck from '../../components/InteractiveConceptCheck';

export default function ReactionsScreen() {
  return (
    <DetailScreenLayout title="Chemical Reactions & Equations" color="#00ffff" emoji="⚡">
      
      <Text style={styles.heading}>1. Introduction to Chemical Reactions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=eNsVaUCzvLA')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Chemical Reactions - Introduction</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A <Text style={styles.highlight}>chemical reaction</Text> is a process where one or more substances (reactants) undergo a chemical change to form one or more new substances (products) with entirely different properties. During this process, old chemical bonds are broken, and new chemical bonds are formed.
      </Text>

      <InteractiveExperiment type="magnesium_burn" color="#00ffff" />
      
      <Text style={styles.paragraph}>
        How do we know a chemical reaction has taken place? The following observations help us determine whether a chemical reaction has occurred:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Change in State:</Text> For example, solid wax melting and burning to form gases (carbon dioxide and water vapor).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Change in Color:</Text> Rusting of iron changes its color from silver-grey to reddish-brown.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Evolution of a Gas:</Text> When zinc reacts with dilute hydrochloric acid, hydrogen gas bubbles are released.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Change in Temperature:</Text> Mixing water with quicklime produces a lot of heat, raising the temperature.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Formation of a Precipitate:</Text> A solid substance that settles out of a liquid mixture.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>NCERT Activity 1.1:</Text> Clean a magnesium ribbon with sandpaper to remove the protective layer of basic magnesium carbonate. Hold it with tongs and burn it over a watch glass. It burns with a dazzling white flame and forms a white powder — Magnesium Oxide (MgO). 2Mg + O₂ → 2MgO
      </Text>
      <InteractiveExperiment type="magnesium_burn" color="#00ffff" />
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>NCERT Activity 1.2:</Text> When Lead Nitrate solution is mixed with Potassium Iodide solution, a bright yellow precipitate of Lead Iodide (PbI₂) is formed: Pb(NO₃)₂(aq) + 2KI(aq) → PbI₂↓(s) + 2KNO₃(aq)
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>NCERT Activity 1.3:</Text> Take zinc granules in a conical flask and add dilute H₂SO₄. Hydrogen gas evolves (test with a burning matchstick — it burns with a 'pop' sound) and the flask becomes warm: Zn(s) + H₂SO₄(aq) → ZnSO₄(aq) + H₂(g)↑
      </Text>

      <Text style={styles.heading}>2. Chemical Equations</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=TShVMClhtYk')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Writing Chemical Equations</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A <Text style={styles.highlight}>chemical equation</Text> is a shorthand representation of a chemical reaction using symbols and formulae.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Word Equations:</Text> Describe a reaction using words. For example: Magnesium + Oxygen → Magnesium oxide.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Formula Equations:</Text> Substitute symbols and chemical formulas for names. This is much more concise and informative: Mg + O₂ → MgO.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Tip: Always write the physical state of the reactants and products (s for solid, l for liquid, g for gas, aq for aqueous) to make the equation more informative.
        </Text>
      </View>

      
      <Text style={styles.paragraph}>The Magnesium atom (Mg) has 12 electrons, which it interacts with during reactions.</Text>
      <InlineAtomModel atomicNumber={12} elementName="Magnesium" elementSymbol="Mg" color="#ffaa00" caption="Magnesium (Z=12): 2,8,2 — loses 2 electrons during reactions to form Mg²⁺" height={300} />

      <Text style={styles.heading}>3. Balanced vs Unbalanced Equations</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=RnGu3xO2h74')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Balancing Chemical Equations</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        The <Text style={styles.highlight}>Law of Conservation of Mass</Text> states that mass can neither be created nor destroyed in a chemical reaction. Therefore, the total mass of the elements present in the products must equal the total mass of the elements present in the reactants. 
      </Text>
      <Text style={styles.paragraph}>
        This means the number of atoms of each element must remain the same before and after the reaction. A <Text style={styles.highlight}>balanced chemical equation</Text> satisfies this condition, while a skeletal (unbalanced) equation does not.
      </Text>

      <Text style={styles.heading}>4. Steps to Balance Equations (Hit-and-Trial Method)</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=8CPFKxKYWRE')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Hit-and-Trial Balancing Method</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        The hit-and-trial method involves counting the number of atoms of each element on both sides and adding coefficients to balance them.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Example 1: Iron reacting with steam
          {"\n"}Unbalanced: Fe + H₂O → Fe₃O₄ + H₂
          {"\n"}Step 1: Balance Oxygen. Multiply H₂O by 4: Fe + 4H₂O → Fe₃O₄ + H₂
          {"\n"}Step 2: Balance Hydrogen. Multiply H₂ by 4: Fe + 4H₂O → Fe₃O₄ + 4H₂
          {"\n"}Step 3: Balance Iron. Multiply Fe by 3: 3Fe + 4H₂O → Fe₃O₄ + 4H₂
          {"\n"}Balanced!
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Example 2 (Complex): Photosynthesis
          {"\n"}Unbalanced: CO₂ + H₂O → C₆H₁₂O₆ + O₂
          {"\n"}Step 1: Balance Carbon (multiply CO₂ by 6): 6CO₂ + H₂O → C₆H₁₂O₆ + O₂
          {"\n"}Step 2: Balance Hydrogen (multiply H₂O by 6): 6CO₂ + 6H₂O → C₆H₁₂O₆ + O₂
          {"\n"}Step 3: Check Oxygen. Left = 12+6 = 18. Right = 6 (in glucose) + 2 = 8.
          {"\n"}Step 4: Multiply O₂ by 6 to get 12 more oxygen. Total right = 6+12 = 18.
          {"\n"}Balanced: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          💡 Exam Pro-Tip: ALWAYS start balancing the element that appears in the fewest number of compounds on both sides. Leave Oxygen and Hydrogen for last, as they are often scattered across multiple compounds!
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Example 2: Manganese dioxide with hydrochloric acid
          {"\n"}Unbalanced: MnO₂ + HCl → MnCl₂ + Cl₂ + H₂O
          {"\n"}Step 1: Balance Chlorine. Multiply HCl by 4: MnO₂ + 4HCl → MnCl₂ + Cl₂ + H₂O
          {"\n"}Step 2: Balance Hydrogen. Multiply H₂O by 2: MnO₂ + 4HCl → MnCl₂ + Cl₂ + 2H₂O
          {"\n"}Check Mn and O—they are balanced!
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Example 3: Nitric acid with calcium hydroxide
          {"\n"}Unbalanced: HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + H₂O
          {"\n"}Step 1: Balance Nitrate (NO₃). Multiply HNO₃ by 2: 2HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + H₂O
          {"\n"}Step 2: Balance Hydrogen and Oxygen. Multiply H₂O by 2: 2HNO₃ + Ca(OH)₂ → Ca(NO₃)₂ + 2H₂O
          {"\n"}Balanced!
        </Text>
      </View>

      <Text style={styles.heading}>5. Types of Chemical Reactions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=OY3Ry2yBSno')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Types of Chemical Reactions</Text>
      </TouchableOpacity>
      
      <Text style={styles.paragraph}><Text style={styles.highlight}>a) Combination Reaction</Text></Text>
      <Text style={styles.paragraph}>A reaction in which two or more reactants combine to form a single product. (A + B → AB)</Text>
      <Text style={styles.bulletPoint}>• Calcium oxide (quicklime) reacting vigorously with water to form slaked lime: CaO(s) + H₂O(l) → Ca(OH)₂(aq)</Text>
      <Text style={styles.bulletPoint}>• Burning of coal: C(s) + O₂(g) → CO₂(g)</Text>
      <Text style={styles.bulletPoint}>• Formation of water: 2H₂(g) + O₂(g) → 2H₂O(l)</Text>

      
      <Text style={styles.paragraph}>Oxygen atom (O) with 8 electrons, highly reactive and involved in combination reactions like burning coal.</Text>
      <InlineAtomModel atomicNumber={8} elementName="Oxygen" elementSymbol="O" color="#00ffff" caption="Oxygen atom (Z=8): 2,6 — highly reactive, essential for combustion and combination reactions" height={300} />

      <Text style={styles.paragraph}><Text style={styles.highlight}>b) Decomposition Reaction</Text></Text>
      <Text style={styles.paragraph}>A reaction in which a single reactant breaks down to give simpler products. (AB → A + B)</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Thermal Decomposition</Text> (heat): Heating ferrous sulphate crystals: 2FeSO₄(s) → Fe₂O₃(s) + SO₂(g) + SO₃(g)</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Electrolytic Decomposition</Text> (electricity): Electrolysis of water: 2H₂O(l) → 2H₂(g) + O₂(g)</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Photo Decomposition</Text> (light): Silver chloride turning grey in sunlight: 2AgCl(s) → 2Ag(s) + Cl₂(g)</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>c) Displacement Reaction</Text></Text>
      <Text style={styles.paragraph}>A reaction in which a more reactive element displaces a less reactive element from its compound. (A + BC → AC + B)</Text>
      <Text style={styles.bulletPoint}>• Iron nail in copper sulphate solution: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)</Text>
      <Text style={styles.bulletPoint}>• Zinc granules with dilute hydrochloric acid: Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)</Text>
      <Text style={styles.bulletPoint}>• Lead with copper chloride: Pb(s) + CuCl₂(aq) → PbCl₂(aq) + Cu(s)</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>d) Double Displacement Reaction</Text></Text>
      <Text style={styles.paragraph}>A reaction in which there is an exchange of ions between the reactants. (AB + CD → AD + CB)</Text>
      <Text style={styles.bulletPoint}>• Precipitation of Barium Sulphate: Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s) + 2NaCl(aq)</Text>
      <Text style={styles.bulletPoint}>• Neutralization reaction (acid + base): NaOH(aq) + HCl(aq) → NaCl(aq) + H₂O(l)</Text>
      <Text style={styles.bulletPoint}>• Potassium iodide and lead nitrate: 2KI(aq) + Pb(NO₃)₂(aq) → PbI₂(s) + 2KNO₃(aq)</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>e) Exothermic vs f) Endothermic Reactions</Text></Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Exothermic Reactions</Text> release energy in the form of heat or light. Examples include respiration, burning of natural gas (CH₄ + 2O₂ → CO₂ + 2H₂O + heat), and mixing quicklime with water.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Endothermic Reactions</Text> absorb energy (heat, light, or electricity). Examples include photosynthesis, thermal decomposition of calcium carbonate (CaCO₃ → CaO + CO₂), and the cooling effect of mixing ammonium chloride with water.
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Real-Life Applications from NCERT:{"\n\n"}• Whitewashing Walls: Ca(OH)₂ + CO₂ → CaCO₃ + H₂O (shiny layer forms over 2-3 days){"\n"}• Heating Lead Nitrate: 2Pb(NO₃)₂ →(heat) 2PbO + 4NO₂↑ + O₂↑ (brown fumes of NO₂){"\n"}• Silver Bromide in Photography: 2AgBr →(light) 2Ag + Br₂ (photolytic decomposition){"\n"}• Displacement Observation: When iron nail is placed in CuSO₄ solution, blue color fades to pale green (FeSO₄) and reddish-brown copper deposits on the nail.{"\n"}• Respiration Equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + Energy (exothermic)
        </Text>
      </View>

      <Text style={styles.heading}>6. Oxidation and Reduction</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=lQ6FBA1HM3s')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Oxidation & Reduction Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Oxidation</Text> is defined as the addition of oxygen, the removal of hydrogen, or the loss of electrons.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Reduction</Text> is the addition of hydrogen, the removal of oxygen, or the gain of electrons.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Remember: LEO the lion says GER!
          {"\n"}LEO: Loss of Electrons is Oxidation
          {"\n"}GER: Gain of Electrons is Reduction
        </Text>
      </View>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>NCERT Activity:</Text> When copper powder is heated in a china dish, the surface turns black due to formation of Copper(II) Oxide: 2Cu + O₂ →(heat) 2CuO (Oxidation). When hydrogen gas is passed over this heated CuO, it turns brown again: CuO + H₂ →(heat) Cu + H₂O (Reduction). Here, CuO is reduced and H₂ is oxidized — both happen simultaneously!
      </Text>

      <Text style={styles.heading}>7. Redox Reactions</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=5rtJdjas-mY')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Redox Reactions</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Reactions where oxidation and reduction take place simultaneously are called <Text style={styles.highlight}>Redox</Text> (Reduction-Oxidation) reactions. The substance getting oxidized acts as a reducing agent, and the substance getting reduced acts as an oxidizing agent.
      </Text>
      <Text style={styles.bulletPoint}>• CuO + H₂ → Cu + H₂O. Copper oxide is reduced (loses O) to Cu, acting as oxidizing agent. Hydrogen is oxidized (gains O) to H₂O, acting as reducing agent.</Text>
      <Text style={styles.bulletPoint}>• ZnO + C → Zn + CO. ZnO is reduced to Zn, Carbon is oxidized to CO.</Text>
      <Text style={styles.bulletPoint}>• MnO₂ + 4HCl → MnCl₂ + 2H₂O + Cl₂. MnO₂ is reduced to MnCl₂, HCl is oxidized to Cl₂.</Text>

      <InteractiveConceptCheck
        question="When Copper Oxide (CuO) reacts with Hydrogen gas (H₂), which substance is OXIDIZED?"
        options={["Copper Oxide (CuO)", "Hydrogen gas (H₂)", "Water (H₂O)", "Copper (Cu)"]}
        correctIndex={1}
        explanation="Hydrogen (H₂) gains oxygen to form H₂O, so H₂ is oxidized! CuO loses oxygen to form Cu, so CuO is reduced."
        color="#00ffff"
      />

      <Text style={styles.heading}>8. Effects of Oxidation in Daily Life</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=MnN1atGYGlk')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Corrosion & Rancidity</Text>
      </TouchableOpacity>
      
      <Text style={styles.paragraph}><Text style={styles.highlight}>a) Corrosion</Text></Text>
      <Text style={styles.paragraph}>
        The slow eating away of metals by the action of air, moisture, or chemicals (like acids) on their surface. <Text style={styles.highlight}>Rusting of Iron</Text> is a classic example: 4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃.xH₂O (hydrated iron(III) oxide).
      </Text>
      <Text style={styles.paragraph}>Conditions for rusting: Presence of both air (oxygen) and moisture.</Text>
      <Text style={styles.paragraph}>Prevention: Painting, oiling, greasing, galvanization (coating with zinc), chrome plating, anodizing, or making alloys.</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>b) Rancidity</Text></Text>
      <Text style={styles.paragraph}>
        When fats and oils are oxidized, they become rancid and their smell and taste change. This ruins food items over time.
      </Text>
      <Text style={styles.paragraph}>Prevention:</Text>
      <Text style={styles.bulletPoint}>• Adding antioxidants (like BHA and BHT) to foods.</Text>
      <Text style={styles.bulletPoint}>• Flushing bags of chips with unreactive Nitrogen gas to prevent oxygen contact.</Text>
      <Text style={styles.bulletPoint}>• Keeping food in airtight containers.</Text>
      <Text style={styles.bulletPoint}>• Refrigeration, which slows down the oxidation process.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Corrosion of other metals (NCERT):</Text> Silver articles become black over time due to formation of Silver Sulphide (Ag₂S) when they react with sulphur compounds in the atmosphere. Copper articles develop a green coating of basic Copper Carbonate — CuCO₃·Cu(OH)₂ — when exposed to moist air containing CO₂.
      </Text>

    </DetailScreenLayout>
  );
}
