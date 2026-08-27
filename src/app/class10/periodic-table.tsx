import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import AnimatedInfoBox from '../../components/AnimatedInfoBox';
import InteractiveConceptCheck from '../../components/InteractiveConceptCheck';

export default function PeriodicTableScreen() {
  const color = "#ffaa00"; // Orange/Gold

  return (
    <DetailScreenLayout title="The Periodic Table & Trends" color={color} emoji="📊">
      
      <Text style={styles.heading}>1. Need for Classification</Text>
      <Text style={styles.paragraph}>
        Imagine walking into a supermarket where all items are thrown randomly on the floor. It would be impossible to find what you need! The same goes for the 118 known elements. Scientists needed a way to <Text style={styles.highlight}>classify</Text> elements based on their properties so they could be studied systematically.
      </Text>

      <Text style={styles.heading}>2. Early Attempts</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=O-48znAg7VE')} 
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', 
                 borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Early Classification</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>• Dobereiner's Triads (1817): Grouped elements in threes (e.g., Li, Na, K) where the middle element's mass is the average of the other two.</Text>
      <Text style={styles.bulletPoint}>• Newlands' Law of Octaves (1866): Arranged by atomic mass, every 8th element had properties similar to the 1st (like musical notes!). Failed for elements heavier than Calcium.</Text>

      <Text style={styles.heading}>3. Mendeleev's Periodic Table</Text>
      <Text style={styles.paragraph}>
        Dmitri Mendeleev is the "Father of the Periodic Table." His brilliant move? He left <Text style={styles.highlight}>blank spaces</Text> for elements that hadn't been discovered yet and accurately predicted their properties!
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          📝 Mendeleev's Periodic Law: "The properties of elements are the periodic function of their atomic masses."
        </Text>
      </View>

      <Text style={styles.heading}>4. The Modern Periodic Table</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=fLSfgNxoVGk')} 
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', 
                 borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Modern Periodic Table</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        In 1913, Henry Moseley discovered that atomic number is a more fundamental property than atomic mass.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          👑 Modern Periodic Law: "The properties of elements are the periodic function of their ATOMIC NUMBERS."
        </Text>
      </View>
      <Text style={styles.bulletPoint}>• Groups: 18 vertical columns (elements in a group have the same valence electrons = similar chemical properties).</Text>
      <Text style={styles.bulletPoint}>• Periods: 7 horizontal rows (elements in a period have the same number of electron shells).</Text>

      <Text style={styles.heading}>5. Deep Dive: Periodic Trends</Text>
      <Text style={styles.paragraph}>
        How do properties change as you move across the table? These are the most common exam questions!
      </Text>

      <AnimatedInfoBox color={color} delay={100}>
        📏 Atomic Size (Radius)
        • Down a Group: INCREASES (New shells are added, pushing electrons further from the nucleus).
        • Across a Period (L to R): DECREASES (Nuclear charge increases, pulling the same shell closer).
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={200}>
        ⚡ Valency
        • Down a Group: Remains the SAME (Same number of valence electrons).
        • Across a Period: Increases from 1 to 4, then decreases from 4 to 0.
      </AnimatedInfoBox>

      <AnimatedInfoBox color={color} delay={300}>
        ⛏ Metallic Character (Tendency to lose electrons)
        • Down a Group: INCREASES (Easier to lose electrons as size increases).
        • Across a Period: DECREASES (Non-metals are on the right side!).
      </AnimatedInfoBox>

      <View style={{ marginTop: 30 }}>
        <InteractiveConceptCheck
          question="As you move from Left to Right across a Period, what happens to the Atomic Size?"
          options={["It Increases", "It Decreases", "It remains the same", "It fluctuates wildly"]}
          correctIndex={1}
          explanation="Correct! Across a period, electrons are added to the SAME shell, while protons are added to the nucleus. This increases the effective nuclear charge, pulling the shell tighter and decreasing the atomic size."
          color={color}
        />
      </View>

    </DetailScreenLayout>
  );
}
