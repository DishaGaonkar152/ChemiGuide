import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';
import InteractiveConceptCheck from '../../components/InteractiveConceptCheck';

export default function ChemicalFormulasScreen() {
  const color = "#00ff88"; // Bright mint green

  return (
    <DetailScreenLayout title="Chemical Formulas" color={color} emoji="🧪">
      
      <Text style={styles.heading}>1. The Language of Chemistry</Text>
      <Text style={styles.paragraph}>
        Just as words are made of letters, chemical compounds are represented by <Text style={styles.highlight}>chemical formulas</Text>. A chemical formula tells us the exact number of atoms of each element present in one molecule of a compound.
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          💡 Exam Pro-Tip: A formula doesn't just show WHAT elements are in a compound, it shows the EXACT RATIO. H2O means exactly 2 parts Hydrogen to 1 part Oxygen. H2O2 is hydrogen peroxide—a completely different and dangerous chemical!
        </Text>
      </View>

      <Text style={styles.heading}>2. Valency: The Combining Capacity</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=cMbsy4sJ_l0')} 
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', 
                 borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Understanding Valency</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        To write a formula, you must know the <Text style={styles.highlight}>valency</Text> of the elements involved. Valency is the combining power of an element—think of it as the number of "hands" an atom has to hold onto other atoms.
      </Text>
      <Text style={styles.bulletPoint}>• Sodium (Na) has a valency of 1 (1 hand).</Text>
      <Text style={styles.bulletPoint}>• Oxygen (O) has a valency of 2 (2 hands).</Text>
      
      <AnimatedInfoBox color={color} delay={100}>
        Common Valencies to Memorize:
        +1 : H, Li, Na, K, Ag
        +2 : Mg, Ca, Zn, Ba, Cu(II)
        +3 : Al, Fe(III)
        -1 : F, Cl, Br, I
        -2 : O, S
      </AnimatedInfoBox>

      <Text style={styles.heading}>3. Polyatomic Ions</Text>
      <Text style={styles.paragraph}>
        Sometimes, a group of atoms acts together as a single unit with an overall charge. We call these <Text style={styles.highlight}>polyatomic ions</Text>. You treat them exactly like single atoms when writing formulas!
      </Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Crucial Polyatomic Ions:
          • Hydroxide: OH⁻ (Valency 1)
          • Nitrate: NO₃⁻ (Valency 1)
          • Carbonate: CO₃²⁻ (Valency 2)
          • Sulfate: SO₄²⁻ (Valency 2)
          • Phosphate: PO₄³⁻ (Valency 3)
          • Ammonium: NH₄⁺ (Valency 1)
        </Text>
      </View>

      <Text style={styles.heading}>4. The Criss-Cross Method</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=PkaLN_8qf5o')} 
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', 
                 borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: The Criss-Cross Method</Text>
      </TouchableOpacity>
      
      <Text style={styles.paragraph}>
        This is the ultimate trick for writing ANY chemical formula. Follow these steps:
      </Text>
      <Text style={styles.bulletPoint}>Step 1: Write the symbols (metal/positive first, non-metal/negative second).</Text>
      <Text style={styles.bulletPoint}>Step 2: Write their valencies directly below them.</Text>
      <Text style={styles.bulletPoint}>Step 3: "Criss-Cross" the numbers to become subscripts for the opposite element.</Text>
      <Text style={styles.bulletPoint}>Step 4: Simplify the ratio if possible (e.g., C2O4 becomes CO2).</Text>

      <AnimatedInfoBox color={color} delay={200}>
        Example 1: Hydrogen Sulfide
        Symbols:    H      S
        Valencies:  1      2
        Criss-Cross! H gets 2, S gets 1.
        Formula: H₂S
      </AnimatedInfoBox>
      
      <AnimatedInfoBox color={color} delay={300}>
        Example 2: Aluminum Sulfate
        Symbols:    Al     SO₄
        Valencies:  3      2
        Criss-Cross! Al gets 2, SO₄ gets 3.
        *Use brackets for polyatomic ions!*
        Formula: Al₂(SO₄)₃
      </AnimatedInfoBox>

      <Text style={styles.heading}>5. Common vs IUPAC Names</Text>
      <Text style={styles.paragraph}>
        Many chemicals have common everyday names alongside their official chemical (IUPAC) names.
      </Text>
      <Text style={styles.bulletPoint}>• Baking Soda = Sodium Bicarbonate (NaHCO₃)</Text>
      <Text style={styles.bulletPoint}>• Washing Soda = Sodium Carbonate (Na₂CO₃)</Text>
      <Text style={styles.bulletPoint}>• Quicklime = Calcium Oxide (CaO)</Text>

      <View style={{ marginTop: 30 }}>
        <InteractiveConceptCheck
          question="What is the correct chemical formula for Magnesium Chloride? (Mg valency=2, Cl valency=1)"
          options={["MgCl", "Mg₂Cl", "MgCl₂", "Mg₂Cl₂"]}
          correctIndex={2}
          explanation="Correct! Using the criss-cross method: Mg has valency 2, Cl has valency 1. Criss-crossing gives Mg(1) Cl(2), so MgCl₂."
          color={color}
        />
      </View>

    </DetailScreenLayout>
  );
}
