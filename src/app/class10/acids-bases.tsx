import React from 'react';
import { Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';
import InteractiveExperiment from '../../components/InteractiveExperiment';
import InteractiveConceptCheck from '../../components/InteractiveConceptCheck';

export default function AcidsBasesScreen() {
  return (
    <DetailScreenLayout title="Acids, Bases & Salts" color="#ff00ff" emoji="🧫">
      <ScrollView>
        <Text style={styles.heading}>1. Introduction to Acids and Bases</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=DupXDD87oHc')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Introduction to Acids & Bases</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Acids and bases are fundamental chemical compounds that we encounter every day. The sour taste of <Text style={styles.highlight}>citrus fruits</Text> (like lemons and oranges) is due to citric acid, while the sourness of <Text style={styles.highlight}>vinegar</Text> comes from acetic acid.
        </Text>
        <Text style={styles.paragraph}>
          On the other hand, bases have a bitter taste and a slippery, soapy feel. For example, <Text style={styles.highlight}>soap</Text> and detergents contain bases like sodium hydroxide, and <Text style={styles.highlight}>antacids</Text> (used to cure indigestion) contain mild bases like magnesium hydroxide (Milk of Magnesia).
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.highlight}>Natural Indicators (NCERT):</Text> Litmus solution is a natural dye extracted from Lichens (Thallophyta). Neutral litmus is purple in color. Other natural indicators include Red Cabbage leaf extract, colored petals of Hydrangea, Petunia, and Geranium flowers.
        </Text>

        <Text style={styles.heading}>2. Acid-Base Indicators</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=JKFnZgp0m5U')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Acid-Base Indicators</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          How do we test if a substance is an acid or a base without tasting it? We use <Text style={styles.highlight}>indicators</Text> — special substances that change their color (or odor) in acidic or basic media.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Color Changes of Common Indicators:</Text>
          <Text style={styles.infoBoxText}>• Litmus (Natural): Acid → Red | Base → Blue</Text>
          <Text style={styles.infoBoxText}>• Turmeric (Natural): Acid → Yellow | Base → Reddish-Brown</Text>
          <Text style={styles.infoBoxText}>• Phenolphthalein (Synthetic): Acid → Colorless | Base → Pink</Text>
          <Text style={styles.infoBoxText}>• Methyl Orange (Synthetic): Acid → Red | Base → Yellow</Text>
        </View>

        <Text style={styles.heading}>3. Olfactory Indicators</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=OFNMjOi7wkE')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Olfactory Indicators</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Some substances change their odor (smell) in acidic or basic media. These are called <Text style={styles.highlight}>olfactory indicators</Text>.
        </Text>
        <Text style={styles.bulletPoint}>• Onion extract: Loses its distinct smell in a basic solution, but retains it in an acidic solution.</Text>
        <Text style={styles.bulletPoint}>• Vanilla essence: The pleasant smell vanishes in a basic solution but persists in an acidic solution.</Text>

        <Text style={styles.heading}>4. Chemical Properties of Acids</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=DG7Bq6oUjlM')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Chemical Properties of Acids</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Acids are highly reactive. Let's look at how they react with various types of compounds.
        </Text>
        
        <Text style={styles.paragraph}><Text style={styles.highlight}>a) Acids + Metals</Text></Text>
        <Text style={styles.paragraph}>Acids react with active metals to displace hydrogen gas and form a metal salt.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Acid + Metal → Salt + Hydrogen Gas (H₂)</Text>
          <Text style={styles.infoBoxText}>Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)</Text>
          <Text style={styles.infoBoxText}>Fe(s) + H₂SO₄(aq) → FeSO₄(aq) + H₂(g)</Text>
        </View>

        <Text style={styles.paragraph}><Text style={styles.highlight}>b) Acids + Metal Carbonates/Bicarbonates</Text></Text>
        <Text style={styles.paragraph}>They react with metal carbonates and hydrogen carbonates (bicarbonates) to give out carbon dioxide gas, water, and a salt.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)</Text>
          <Text style={styles.infoBoxText}>NaHCO₃(s) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)</Text>
        </View>
        <Text style={styles.paragraph}>
          When this CO₂ gas is passed through lime water (calcium hydroxide), it turns milky due to the formation of a white precipitate of <Text style={styles.highlight}>calcium carbonate</Text> (limestone test).
        </Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>c) Acids + Metal Oxides</Text></Text>
        <Text style={styles.paragraph}>Metal oxides are basic in nature. Thus, they react with acids to form salt and water.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Metal Oxide + Acid → Salt + Water</Text>
          <Text style={styles.infoBoxText}>CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)</Text>
        </View>

        <Text style={styles.paragraph}><Text style={styles.highlight}>d) Acids + Bases (Neutralisation)</Text></Text>
        <Text style={styles.paragraph}>An acid neutralizes a base to form salt and water. This is called a <Text style={styles.highlight}>neutralisation reaction</Text>.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Acid + Base → Salt + Water</Text>
          <Text style={styles.infoBoxText}>HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)</Text>
        </View>
        <Text style={styles.paragraph}>
          <Text style={styles.highlight}>Testing Gases (NCERT):</Text> Hydrogen gas can be tested by passing it through soap solution — the bubbles rise and burn with a 'pop' sound when a burning candle is brought near them. When excess CO₂ is passed through lime water, the milkiness disappears because insoluble CaCO₃ converts to soluble Ca(HCO₃)₂: CaCO₃(s) + H₂O(l) + CO₂(g) → Ca(HCO₃)₂(aq)
        </Text>
        <InteractiveExperiment type="pop_test" color="#ff00ff" />

        <Text style={styles.heading}>5. Chemical Properties of Bases</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=JzeLknaFwPI')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Chemical Properties of Bases</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}><Text style={styles.highlight}>a) Bases + Metal Oxides</Text></Text>
        <Text style={styles.paragraph}>Bases generally do not react with metal oxides because metal oxides are already basic in nature.</Text>
        
        <Text style={styles.paragraph}><Text style={styles.highlight}>b) Bases + Non-metal Oxides</Text></Text>
        <Text style={styles.paragraph}>Non-metal oxides are acidic in nature. They react with bases to form salt and water (similar to a neutralisation reaction).</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)</Text>
        </View>

        <Text style={styles.paragraph}><Text style={styles.highlight}>c) Reaction with Metals</Text></Text>
        <Text style={styles.paragraph}>Strong bases react with active metals (like zinc and aluminum) to form salt and hydrogen gas. Note: Such reactions are not possible with all metals.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>2NaOH(aq) + Zn(s) → Na₂ZnO₂(aq) + H₂(g)</Text>
          <Text style={styles.infoBoxText}>(Sodium zincate)</Text>
        </View>

        <Text style={styles.heading}>6. What do all Acids and Bases have in common?</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=pP2SRxPiUMo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Acids & Bases in Common</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          All acids generate <Text style={styles.highlight}>hydrogen ions (H⁺)</Text> when dissolved in water. It is the presence of these H⁺ ions that gives acids their acidic properties.
        </Text>
        <Text style={styles.paragraph}>
          Similarly, all bases generate <Text style={styles.highlight}>hydroxide ions (OH⁻)</Text> in water. Bases that are soluble in water are called <Text style={styles.highlight}>alkalis</Text>.
        </Text>
        <InlineAtomModel atomicNumber={1} elementName="Hydrogen" elementSymbol="H" color="#ff00ff" caption="Hydrogen (Z=1): Just 1 electron. Acids release this as H⁺ — a bare proton!" height={280} />

        <Text style={styles.heading}>7. The Role of Water</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ASLUY2U1M-8')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Role of Water in Acids & Bases</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Acids exhibit acidic behavior <Text style={styles.highlight}>only in the presence of water</Text>. For example, dry HCl gas does not change the color of dry blue litmus paper. It is only when HCl is dissolved in water that it dissociates to produce H⁺ ions (or hydronium ions, H₃O⁺).
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>HCl + H₂O → H₃O⁺ + Cl⁻</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            ⚠️ Dilution Safety Rule (NCERT): The process of dissolving an acid or a base in water is highly exothermic. ALWAYS add ACID to WATER slowly with constant stirring. NEVER add water to concentrated acid — the heat generated can cause the mixture to splash violently, causing severe burns. "Do as you oughta — add acid to water!"
          </Text>
        </View>

        <Text style={styles.heading}>8. Strong vs Weak Acids</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ANi709MYnWo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Strong vs Weak Acids</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          The strength of an acid depends on its degree of dissociation in water.
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Strong Acids</Text>: Dissociate completely in water, yielding high concentrations of H⁺ ions. Examples: Hydrochloric acid (HCl), Sulfuric acid (H₂SO₄), Nitric acid (HNO₃).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Weak Acids</Text>: Dissociate partially in water, yielding low concentrations of H⁺ ions. Examples: Acetic acid (CH₃COOH), Carbonic acid (H₂CO₃).</Text>

        <Text style={styles.heading}>9. Strong vs Weak Bases</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=DypIn2FiME4')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Strong vs Weak Bases</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Similarly, bases are classified by their dissociation.
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Strong Bases</Text>: Dissociate completely in water. Examples: Sodium hydroxide (NaOH), Potassium hydroxide (KOH).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Weak Bases</Text>: Dissociate only partially. Examples: Ammonium hydroxide (NH₄OH), Calcium hydroxide (Ca(OH)₂).</Text>

        <Text style={styles.heading}>10. The pH Scale</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ckbsHEJ1JVQ')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: The pH Scale Explained</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          The <Text style={styles.highlight}>pH scale</Text> measures the hydrogen ion concentration in a solution. It ranges from 0 (very acidic) to 14 (very alkaline).
        </Text>
        <Text style={styles.bulletPoint}>• pH {"<"} 7: Acidic (Lower the pH, stronger the acid)</Text>
        <Text style={styles.bulletPoint}>• pH = 7: Neutral (Pure water, neutral salts)</Text>
        <Text style={styles.bulletPoint}>• pH {">"} 7: Basic/Alkaline (Higher the pH, stronger the base)</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>pH of Common Substances:</Text>
          <Text style={styles.infoBoxText}>- Gastric juice: ~1.2 (Highly Acidic)</Text>
          <Text style={styles.infoBoxText}>- Lemon juice: ~2.2</Text>
          <Text style={styles.infoBoxText}>- Vinegar: ~3.0</Text>
          <Text style={styles.infoBoxText}>- Pure water / Blood: ~7.0 to 7.4 (Neutral/Slightly basic)</Text>
          <Text style={styles.infoBoxText}>- Milk of Magnesia: ~10.5</Text>
          <Text style={styles.infoBoxText}>- 1M NaOH: ~14 (Highly Basic)</Text>
        </View>
        <Text style={styles.paragraph}>
          The 'p' in pH stands for <Text style={styles.highlight}>'potenz'</Text> (German for 'power'). A <Text style={styles.highlight}>Universal Indicator</Text> is a mixture of several indicators that shows a gradual color change across the entire pH range: Red (pH 1-2) → Orange (pH 3-4) → Yellow (pH 5-6) → Green (pH 7) → Blue (pH 8-9) → Indigo (pH 10-12) → Violet (pH 13-14).
        </Text>
        <InteractiveExperiment type="ph_scale" color="#ff00ff" />

        <Text style={styles.heading}>11. Importance of pH in Everyday Life</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=XnNxOdCmRWs')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: pH in Everyday Life</Text>
        </TouchableOpacity>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Digestive System:</Text> Our stomach produces HCl to digest food. During indigestion, excess acid causes pain. We use mild bases called <Text style={styles.highlight}>antacids</Text> (like Mg(OH)₂) to neutralize it.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Agriculture:</Text> Plants require a specific pH range for healthy growth. If soil is too acidic, farmers treat it with quicklime (CaO) or slaked lime (Ca(OH)₂).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Tooth Decay:</Text> Tooth decay starts when the pH of the mouth drops below 5.5. Bacteria degrade sugar to produce acid. Using basic toothpastes helps neutralize the acid and prevent decay.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Self-Defence by Animals & Plants:</Text> A bee sting leaves <Text style={styles.highlight}>methanoic (formic) acid</Text> which causes pain. Applying a mild base like baking soda provides relief. Nettle leaves also inject methanoic acid when touched.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Acid Rain:</Text> When the pH of rain water drops below 5.6, it is called acid rain. It damages crops, corrodes buildings, and reduces the pH of rivers, threatening aquatic life.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Dock Plant Remedy:</Text> Nettle leaves inject methanoic acid (formic acid) causing a burning sting. The dock plant, which often grows near nettles, provides a natural remedy when rubbed on the skin.</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            💡 Exam Pro-Tip: Board exams frequently ask about the bee sting remedy. Remember: Bee sting = ACIDIC (formic acid), so you apply a BASE (baking soda). Wasp sting = ALKALINE, so you apply an ACID (vinegar). Neutralization is key!
          </Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>
            Naturally Occurring Acids (NCERT Table 2.3):{"\n\n"}• Vinegar → Acetic Acid (CH₃COOH){"\n"}• Orange / Lemon → Citric Acid{"\n"}• Tamarind → Tartaric Acid{"\n"}• Tomato → Oxalic Acid{"\n"}• Curd / Sour Milk → Lactic Acid{"\n"}• Ant Sting / Nettle Sting → Methanoic Acid (HCOOH)
          </Text>
        </View>
        <InteractiveConceptCheck
          question="Tooth decay starts when the pH inside the mouth falls below:"
          options={["7.0", "6.5", "5.5", "4.0"]}
          correctIndex={2}
          explanation="Tooth enamel (calcium hydroxyapatite) begins to corrode when the mouth pH drops below 5.5 due to acid produced by bacteria."
          color="#ff00ff"
        />

        <Text style={styles.heading}>12. Salts</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=XVc4k8fOaGI')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Formation of Salts</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Salts are ionic compounds formed by the neutralization of an acid with a base. Salts having the same positive or negative radicals are said to belong to a <Text style={styles.highlight}>family of salts</Text> (e.g., NaCl and Na₂SO₄ belong to the sodium salts family).
        </Text>

        <Text style={styles.heading}>13. pH of Salt Solutions</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=2FqOPFMfGGU')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: pH of Salt Solutions</Text>
        </TouchableOpacity>
        <Text style={styles.paragraph}>
          Not all salts are neutral. Their pH depends on the strength of the parent acid and base:
        </Text>
        <Text style={styles.bulletPoint}>• Strong Acid + Strong Base = <Text style={styles.highlight}>Neutral Salt</Text> (pH = 7) [e.g., NaCl]</Text>
        <Text style={styles.bulletPoint}>• Strong Acid + Weak Base = <Text style={styles.highlight}>Acidic Salt</Text> (pH {"<"} 7) [e.g., NH₄Cl]</Text>
        <Text style={styles.bulletPoint}>• Weak Acid + Strong Base = <Text style={styles.highlight}>Basic Salt</Text> (pH {">"} 7) [e.g., Na₂CO₃]</Text>

        <Text style={styles.heading}>14. Important Chemical Compounds</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ZYRwrR1GaLY')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
          <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Important Chemical Compounds</Text>
        </TouchableOpacity>
        
        <Text style={styles.paragraph}><Text style={styles.highlight}>a) Common Salt (NaCl)</Text></Text>
        <Text style={styles.paragraph}>Obtained from seawater or rock salt. It's an essential dietary component and an important raw material for producing other chemicals (NaOH, baking soda, washing soda) through processes like the <Text style={styles.highlight}>Chlor-alkali process</Text>.</Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>b) Sodium Hydroxide (NaOH)</Text></Text>
        <Text style={styles.paragraph}>Prepared by passing electricity through an aqueous solution of NaCl (brine) in the Chlor-alkali process. Chlorine gas is given off at the anode, hydrogen gas at the cathode, and NaOH forms near the cathode.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>2NaCl(aq) + 2H₂O(l) → 2NaOH(aq) + Cl₂(g) + H₂(g)</Text>
        </View>
        <Text style={styles.paragraph}>Uses: Degreasing metals, soaps and detergents, paper making.</Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>c) Bleaching Powder (CaOCl₂)</Text></Text>
        <Text style={styles.paragraph}>Produced by the action of chlorine gas on dry slaked lime (Ca(OH)₂).</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O</Text>
        </View>
        <Text style={styles.paragraph}>Uses: Bleaching cotton/linen, disinfecting drinking water, oxidizing agent in chemical industries.</Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>d) Baking Soda (NaHCO₃)</Text></Text>
        <Text style={styles.paragraph}>Sodium hydrogen carbonate. It is a mild, non-corrosive basic salt.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>NaCl + H₂O + CO₂ + NH₃ → NH₄Cl + NaHCO₃</Text>
        </View>
        <Text style={styles.paragraph}>Uses: Making baking powder (baking soda + tartaric acid), in antacids, and in soda-acid fire extinguishers.</Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>e) Washing Soda (Na₂CO₃·10H₂O)</Text></Text>
        <Text style={styles.paragraph}>Obtained by heating baking soda to form sodium carbonate, followed by recrystallization from water.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>2NaHCO₃ (heat) → Na₂CO₃ + H₂O + CO₂</Text>
          <Text style={styles.infoBoxText}>Na₂CO₃ + 10H₂O → Na₂CO₃·10H₂O</Text>
        </View>
        <Text style={styles.paragraph}>Uses: Glass, soap, and paper industries; removing permanent hardness of water.</Text>

        <Text style={styles.paragraph}><Text style={styles.highlight}>f) Plaster of Paris (CaSO₄·½H₂O)</Text></Text>
        <Text style={styles.paragraph}>Calcium sulphate hemihydrate. It is obtained by heating Gypsum (CaSO₄·2H₂O) at exactly 373 K. At this temperature, it loses 1.5 molecules of water.</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>CaSO₄·2H₂O (heat to 373K) → CaSO₄·½H₂O + 1½ H₂O</Text>
        </View>
        <Text style={styles.paragraph}>
          Setting reaction: When mixed with water, POP changes back to solid gypsum, setting into a hard mass.
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>CaSO₄·½H₂O + 1½ H₂O → CaSO₄·2H₂O (Gypsum)</Text>
        </View>
        <Text style={styles.paragraph}>Uses: Setting fractured bones, making toys, decorative materials, and smooth surfaces.</Text>

        <Text style={styles.heading}>Water of Crystallization</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.highlight}>Water of crystallization</Text> is a fixed number of water molecules present in one formula unit of a salt. These water molecules are responsible for the crystal shape and color of the salt.
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>CuSO₄·5H₂O</Text> (Copper Sulphate) — Blue crystals. On heating, it loses water and turns white (anhydrous CuSO₄). Adding water turns it blue again — this is used as a test for water!</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>FeSO₄·7H₂O</Text> (Ferrous Sulphate / Green Vitriol) — Green crystals.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>CaSO₄·2H₂O</Text> (Gypsum) — On heating at 373 K, forms Plaster of Paris (CaSO₄·½H₂O).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Na₂CO₃·10H₂O</Text> (Washing Soda) — Transparent crystals that effloresce (lose water) in dry air.</Text>
      </ScrollView>
    </DetailScreenLayout>
  );
}
