import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function AcidsBasesScreen() {
  return (
    <DetailScreenLayout title="Acids, Bases & Salts" color="#ff00ff" emoji="🧫">
      <ScrollView>
        <Text style={styles.heading}>1. Introduction to Acids and Bases</Text>
        <Text style={styles.paragraph}>
          Acids and bases are fundamental chemical compounds that we encounter every day. The sour taste of <Text style={styles.highlight}>citrus fruits</Text> (like lemons and oranges) is due to citric acid, while the sourness of <Text style={styles.highlight}>vinegar</Text> comes from acetic acid.
        </Text>
        <Text style={styles.paragraph}>
          On the other hand, bases have a bitter taste and a slippery, soapy feel. For example, <Text style={styles.highlight}>soap</Text> and detergents contain bases like sodium hydroxide, and <Text style={styles.highlight}>antacids</Text> (used to cure indigestion) contain mild bases like magnesium hydroxide (Milk of Magnesia).
        </Text>

        <Text style={styles.heading}>2. Acid-Base Indicators</Text>
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
        <Text style={styles.paragraph}>
          Some substances change their odor (smell) in acidic or basic media. These are called <Text style={styles.highlight}>olfactory indicators</Text>.
        </Text>
        <Text style={styles.bulletPoint}>• Onion extract: Loses its distinct smell in a basic solution, but retains it in an acidic solution.</Text>
        <Text style={styles.bulletPoint}>• Vanilla essence: The pleasant smell vanishes in a basic solution but persists in an acidic solution.</Text>

        <Text style={styles.heading}>4. Chemical Properties of Acids</Text>
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

        <Text style={styles.heading}>5. Chemical Properties of Bases</Text>
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
        <Text style={styles.paragraph}>
          All acids generate <Text style={styles.highlight}>hydrogen ions (H⁺)</Text> when dissolved in water. It is the presence of these H⁺ ions that gives acids their acidic properties.
        </Text>
        <Text style={styles.paragraph}>
          Similarly, all bases generate <Text style={styles.highlight}>hydroxide ions (OH⁻)</Text> in water. Bases that are soluble in water are called <Text style={styles.highlight}>alkalis</Text>.
        </Text>
        <InlineAtomModel atomicNumber={1} elementName="Hydrogen" elementSymbol="H" color="#ff00ff" caption="Hydrogen (Z=1): Just 1 electron. Acids release this as H⁺ — a bare proton!" height={280} />

        <Text style={styles.heading}>7. The Role of Water</Text>
        <Text style={styles.paragraph}>
          Acids exhibit acidic behavior <Text style={styles.highlight}>only in the presence of water</Text>. For example, dry HCl gas does not change the color of dry blue litmus paper. It is only when HCl is dissolved in water that it dissociates to produce H⁺ ions (or hydronium ions, H₃O⁺).
        </Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxText}>HCl + H₂O → H₃O⁺ + Cl⁻</Text>
        </View>

        <Text style={styles.heading}>8. Strong vs Weak Acids</Text>
        <Text style={styles.paragraph}>
          The strength of an acid depends on its degree of dissociation in water.
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Strong Acids</Text>: Dissociate completely in water, yielding high concentrations of H⁺ ions. Examples: Hydrochloric acid (HCl), Sulfuric acid (H₂SO₄), Nitric acid (HNO₃).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Weak Acids</Text>: Dissociate partially in water, yielding low concentrations of H⁺ ions. Examples: Acetic acid (CH₃COOH), Carbonic acid (H₂CO₃).</Text>

        <Text style={styles.heading}>9. Strong vs Weak Bases</Text>
        <Text style={styles.paragraph}>
          Similarly, bases are classified by their dissociation.
        </Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Strong Bases</Text>: Dissociate completely in water. Examples: Sodium hydroxide (NaOH), Potassium hydroxide (KOH).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Weak Bases</Text>: Dissociate only partially. Examples: Ammonium hydroxide (NH₄OH), Calcium hydroxide (Ca(OH)₂).</Text>

        <Text style={styles.heading}>10. The pH Scale</Text>
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

        <Text style={styles.heading}>11. Importance of pH in Everyday Life</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Digestive System:</Text> Our stomach produces HCl to digest food. During indigestion, excess acid causes pain. We use mild bases called <Text style={styles.highlight}>antacids</Text> (like Mg(OH)₂) to neutralize it.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Agriculture:</Text> Plants require a specific pH range for healthy growth. If soil is too acidic, farmers treat it with quicklime (CaO) or slaked lime (Ca(OH)₂).</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Tooth Decay:</Text> Tooth decay starts when the pH of the mouth drops below 5.5. Bacteria degrade sugar to produce acid. Using basic toothpastes helps neutralize the acid and prevent decay.</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Self-Defence by Animals & Plants:</Text> A bee sting leaves <Text style={styles.highlight}>methanoic (formic) acid</Text> which causes pain. Applying a mild base like baking soda provides relief. Nettle leaves also inject methanoic acid when touched.</Text>

        <Text style={styles.heading}>12. Salts</Text>
        <Text style={styles.paragraph}>
          Salts are ionic compounds formed by the neutralization of an acid with a base. Salts having the same positive or negative radicals are said to belong to a <Text style={styles.highlight}>family of salts</Text> (e.g., NaCl and Na₂SO₄ belong to the sodium salts family).
        </Text>

        <Text style={styles.heading}>13. pH of Salt Solutions</Text>
        <Text style={styles.paragraph}>
          Not all salts are neutral. Their pH depends on the strength of the parent acid and base:
        </Text>
        <Text style={styles.bulletPoint}>• Strong Acid + Strong Base = <Text style={styles.highlight}>Neutral Salt</Text> (pH = 7) [e.g., NaCl]</Text>
        <Text style={styles.bulletPoint}>• Strong Acid + Weak Base = <Text style={styles.highlight}>Acidic Salt</Text> (pH {"<"} 7) [e.g., NH₄Cl]</Text>
        <Text style={styles.bulletPoint}>• Weak Acid + Strong Base = <Text style={styles.highlight}>Basic Salt</Text> (pH {">"} 7) [e.g., Na₂CO₃]</Text>

        <Text style={styles.heading}>14. Important Chemical Compounds</Text>
        
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
      </ScrollView>
    </DetailScreenLayout>
  );
}
