import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function CarbonScreen() {
  return (
    <DetailScreenLayout title="Carbon & Its Compounds" color="#ffff00" emoji="💎">
      <Text style={styles.heading}>1. Introduction to Carbon</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=QnQe0xW_JY4')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Introduction to Carbon</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Carbon is a versatile element that forms the basis of all living organisms and many of the things we use. Its atomic number is 6, which means it has 6 electrons in total, with <Text style={styles.highlight}>4 valence electrons</Text> in its outermost shell. Because it is difficult to either lose 4 electrons (requiring immense energy) or gain 4 electrons (difficult for the nucleus to hold), carbon shares its electrons.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Why Carbon is Special (NCERT):</Text> Carbon's atomic number is 6, with electronic configuration 2,4. To achieve a noble gas configuration, it could gain 4 electrons (forming C⁴⁻) — but the nucleus with 6 protons cannot hold 10 electrons stably. It could lose 4 electrons (forming C⁴⁺) — but removing 4 electrons requires enormous energy. Therefore, carbon achieves stability by <Text style={styles.highlight}>sharing</Text> its 4 valence electrons with other atoms through covalent bonding.
      </Text>

      <Text style={styles.heading}>2. The Covalent Bond</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=jHKKF4IbbVQ')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Covalent Bond Explained</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        The bonds formed by the <Text style={styles.highlight}>sharing of electrons</Text> between two atoms are known as covalent bonds. This sharing allows both atoms to achieve a stable noble gas configuration.
      </Text>
      <Text style={styles.bulletPoint}>• Hydrogen (H2): Single covalent bond formed by sharing 1 pair of electrons.</Text>
      <Text style={styles.bulletPoint}>• Oxygen (O2): Double covalent bond formed by sharing 2 pairs of electrons.</Text>
      <Text style={styles.bulletPoint}>• Nitrogen (N2): Triple covalent bond formed by sharing 3 pairs of electrons.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Electron Dot Structures (NCERT):</Text> Lewis dot structures show shared electron pairs between atoms:
      </Text>
      <Text style={styles.bulletPoint}>• H₂: Single covalent bond (1 shared pair) — H:H</Text>
      <Text style={styles.bulletPoint}>• O₂: Double covalent bond (2 shared pairs) — O::O</Text>
      <Text style={styles.bulletPoint}>• N₂: Triple covalent bond (3 shared pairs) — N:::N (strongest bond among diatomic molecules)</Text>
      <Text style={styles.bulletPoint}>• H₂O: Two single bonds — H-O-H (oxygen also has 2 lone pairs)</Text>
      <Text style={styles.bulletPoint}>• NH₃: Three single bonds — N has 1 lone pair giving it a pyramidal shape</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Properties of Covalent Compounds:{'\n'}
          - Have comparatively <Text style={styles.highlight}>low melting and boiling points</Text> because intermolecular forces are weak.{'\n'}
          - Generally <Text style={styles.highlight}>poor conductors of electricity</Text> as no ions are formed.
        </Text>
      </View>

      <Text style={styles.heading}>3. Carbon Atom Structure</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=aL-Fs3BzXaw')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Carbon Atom Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Carbon has 6 protons and 6 electrons, with 4 electrons in its outermost shell. This tetravalency is the key to carbon's versatility.</Text>
      <InlineAtomModel atomicNumber={6} elementName="Carbon" elementSymbol="C" color="#ffff00" caption="Carbon (Z=6): 2,4 — shares all 4 valence electrons via covalent bonds" />
      <Text style={styles.heading}>4. Allotropes of Carbon</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=CJEBjGcYI2o')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Allotropes of Carbon</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        The phenomenon by which an element exists in two or more different physical forms with similar chemical properties is called allotropy.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Diamond:</Text> Each carbon is bonded to 4 other carbon atoms forming a rigid 3D structure. It is the hardest known natural substance, has a very high melting point, and does not conduct electricity (no free electrons).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Graphite:</Text> Each carbon is bonded to 3 other carbon atoms in the same plane, forming hexagonal arrays placed in layers. One electron per carbon is free, making it a good conductor of electricity. It is soft and slippery, used in pencils and as a lubricant.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Fullerenes:</Text> The first to be identified was C60 (Buckminsterfullerene) which has carbon atoms arranged in the shape of a football.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Synthetic Diamonds (NCERT):</Text> Synthetic diamonds can be made by subjecting pure carbon to extremely high pressure and temperature. These are as real as natural diamonds but are usually smaller. Buckminsterfullerene (C₆₀) was named after the American architect Buckminster Fuller, because the molecule's structure resembles the geodesic dome structures he designed.
      </Text>

      <Text style={styles.heading}>5. Versatile Nature of Carbon</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=ejYfnKMD5-w')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Versatile Nature of Carbon</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>a) <Text style={styles.highlight}>Catenation:</Text> The unique ability of carbon to form bonds with other atoms of carbon, giving rise to large molecules. These can be long chains, branched chains, or rings. Carbon-carbon bonds are very strong and stable.</Text>
      <Text style={styles.bulletPoint}>b) <Text style={styles.highlight}>Tetravalency:</Text> Since carbon has a valency of 4, it is capable of bonding with 4 other atoms of carbon or atoms of some other mono-valent elements, enabling immense diversity.</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Why Silicon Cannot Form Long Chains (NCERT):</Text> Although Silicon (Si) also has 4 valence electrons, it cannot form long stable chains like carbon. The Si-Si bond is much weaker than the C-C bond because silicon atoms are larger, so the nucleus cannot hold the shared pairs tightly. Silicon compounds (silanes) with more than 7-8 Si atoms are extremely unstable and reactive.
      </Text>

      <Text style={styles.heading}>6. Methane (CH4) 3D Model</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=GxRG0SkZJnE')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Methane Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Methane is the simplest organic compound. One carbon atom shares its 4 valence electrons with 4 hydrogen atoms.</Text>
      <InlineAtomModel atomicNumber={1} elementName="Hydrogen" elementSymbol="H" color="#00ffff" caption="Hydrogen (Z=1) — each H atom shares 1 electron with carbon to form CH₄" height={260} />
      
      <Text style={styles.heading}>7. Saturated Hydrocarbons (Alkanes)</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=GtSFJwtZMCg')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Saturated Hydrocarbons</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Compounds of carbon and hydrogen are called hydrocarbons. In saturated hydrocarbons, all carbon atoms are linked by <Text style={styles.highlight}>single bonds</Text>. They are relatively unreactive.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          General Formula: <Text style={styles.highlight}>CnH2n+2</Text>{'\n'}
          1. Methane (CH4)  2. Ethane (C2H6){'\n'}
          3. Propane (C3H8) 4. Butane (C4H10){'\n'}
          5. Pentane (C5H12) 6. Hexane (C6H14){'\n'}
          7. Heptane (C7H16) 8. Octane (C8H18){'\n'}
          9. Nonane (C9H20) 10. Decane (C10H22)
        </Text>
      </View>

      <Text style={styles.heading}>8. Unsaturated Hydrocarbons</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=JhRmMf7SdaA')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Unsaturated Hydrocarbons</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Compounds where valencies of at least two carbon atoms are not fully satisfied by single bonds.
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Alkenes:</Text> Contain one or more double bonds. General formula: CnH2n. (e.g., Ethene - C2H4, Propene - C3H6).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Alkynes:</Text> Contain one or more triple bonds. General formula: CnH2n-2. (e.g., Ethyne - C2H2, Propyne - C3H4).</Text>

      <Text style={styles.heading}>9. Structural Isomers</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=SjR_GjfoKMk')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Structural Isomers</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Compounds with identical molecular formula but different structures are called structural isomers.
      </Text>
      <Text style={styles.bulletPoint}>For example, Butane (C4H10) can exist as a straight chain (n-butane) or as a branched chain (isobutane or 2-methylpropane).</Text>

      <Text style={styles.heading}>10. Nomenclature (IUPAC)</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=aTRBKJhJE5A')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: IUPAC Nomenclature</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Naming carbon compounds depends on the number of carbon atoms (root word) and the type of bond or functional group (suffix/prefix).
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Root words based on Carbon Count:{'\n'}
          1C = Meth, 2C = Eth, 3C = Prop, 4C = But, 5C = Pent, 6C = Hex{'\n'}
          Suffixes:{'\n'}
          Single bond = -ane, Double bond = -ene, Triple bond = -yne
        </Text>
      </View>

      <Text style={styles.heading}>11. Functional Groups</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=KuO4bEmxKcc')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Functional Groups</Text>
      </TouchableOpacity>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          A functional group dictates the chemical properties of a compound.{'\n'}
          • <Text style={styles.highlight}>Alcohol:</Text> -OH (Suffix: -ol){'\n'}
          • <Text style={styles.highlight}>Aldehyde:</Text> -CHO (Suffix: -al){'\n'}
          • <Text style={styles.highlight}>Ketone:</Text> &gt;C=O (Suffix: -one){'\n'}
          • <Text style={styles.highlight}>Carboxylic Acid:</Text> -COOH (Suffix: -oic acid){'\n'}
          • <Text style={styles.highlight}>Halogen:</Text> -Cl, -Br (Prefix: chloro-, bromo-)
        </Text>
      </View>

      <Text style={styles.heading}>12. Homologous Series</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=2qEmxLd3kz8')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Homologous Series</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        A series of compounds in which the same functional group substitutes for hydrogen in a carbon chain. Successive members differ by a <Text style={styles.highlight}>-CH2 unit</Text> and have a mass difference of 14u. They show a gradual change in physical properties but similar chemical properties.
      </Text>

      <Text style={styles.heading}>13. Chemical Properties of Carbon Compounds</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dpsSFU_8ZEo')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Chemical Properties of Carbon Compounds</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>a) <Text style={styles.highlight}>Combustion:</Text> Carbon and its compounds burn in oxygen to give CO2, water, heat, and light. Saturated hydrocarbons give a clean flame; unsaturated give a yellow, sooty flame. Incomplete combustion of saturated hydrocarbons also gives a sooty flame.</Text>
      <Text style={styles.bulletPoint}>b) <Text style={styles.highlight}>Oxidation:</Text> Alcohols can be oxidized to carboxylic acids. Ethanol is converted to ethanoic acid using oxidizing agents like alkaline KMnO4 or acidified K2Cr2O7.</Text>
      <Text style={styles.bulletPoint}>c) <Text style={styles.highlight}>Addition Reaction:</Text> Unsaturated hydrocarbons add hydrogen in the presence of catalysts (palladium or nickel) to give saturated hydrocarbons. Used in the hydrogenation of vegetable oils (making vanaspati ghee).</Text>
      <Text style={styles.bulletPoint}>d) <Text style={styles.highlight}>Substitution Reaction:</Text> In the presence of sunlight, chlorine is added to hydrocarbons (e.g., CH4 + Cl2 → CH3Cl + HCl).</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Key Combustion Equations (NCERT):</Text>
      </Text>
      <Text style={styles.bulletPoint}>• CH₄ + 2O₂ → CO₂ + 2H₂O + Heat + Light</Text>
      <Text style={styles.bulletPoint}>• C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O + Heat + Light</Text>
      <Text style={styles.paragraph}>
        Saturated hydrocarbons generally burn with a clean blue flame, while unsaturated hydrocarbons burn with a yellow sooty flame due to incomplete combustion (unburnt carbon particles).
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Oxidation Equation:</Text> CH₃CH₂OH + 2[O] →(Alkaline KMnO₄ / Acidified K₂Cr₂O₇) CH₃COOH + H₂O. These reagents are called <Text style={styles.highlight}>oxidizing agents</Text> — they supply oxygen to convert alcohols to carboxylic acids.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Health Note (NCERT):</Text> Vegetable oils contain unsaturated fatty acids and are generally healthy. When hydrogenated (addition reaction with H₂), they convert to saturated fats (e.g., vanaspati ghee), which are harmful for health as they increase cholesterol levels.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Substitution Chain:</Text> In the presence of sunlight, chlorine replaces hydrogen atoms one at a time: CH₄ → CH₃Cl (Chloromethane) → CH₂Cl₂ (Dichloromethane) → CHCl₃ (Chloroform / Trichloromethane) → CCl₄ (Carbon Tetrachloride).
      </Text>

      <Text style={styles.heading}>14. Important Carbon Compounds</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=uOgHeNsCuaE')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Ethanol & Ethanoic Acid</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Ethanol (C2H5OH):</Text> Liquid at room temperature, active ingredient of all alcoholic drinks, good solvent. Reacts with sodium to form sodium ethoxide and hydrogen gas. Dehydration with concentrated H2SO4 yields ethene. Harmful if consumed in large quantities or as pure alcohol (absolute alcohol).
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Ethanoic Acid (CH3COOH):</Text> Also called acetic acid. A 5-8% solution in water is vinegar. Its melting point is 290 K (17°C), so it often freezes in cold climates, giving it the name "glacial acetic acid". Reacts with alcohols (esterification) to form sweet-smelling esters. Reacts with bases (NaOH) and carbonates/hydrogencarbonates to release CO2 gas.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Key Ethanol Equations (NCERT):</Text>
      </Text>
      <Text style={styles.bulletPoint}>• Reaction with Na: 2Na + 2C₂H₅OH → 2C₂H₅ONa (Sodium Ethoxide) + H₂↑</Text>
      <Text style={styles.bulletPoint}>• Dehydration: CH₃CH₂OH →(Conc. H₂SO₄, 443 K) CH₂=CH₂ (Ethene) + H₂O</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Denatured Alcohol:</Text> To prevent misuse, commercial alcohol is made unfit for drinking by adding poisonous substances like methanol, copper sulphate (blue colour), or pyridine (foul smell). This is called denatured alcohol.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Key Ethanoic Acid Equations (NCERT):</Text>
      </Text>
      <Text style={styles.bulletPoint}>• Esterification: CH₃COOH + C₂H₅OH →(Conc. H₂SO₄) CH₃COOC₂H₅ (Ethyl Ethanoate) + H₂O</Text>
      <Text style={styles.bulletPoint}>• With NaOH: CH₃COOH + NaOH → CH₃COONa (Sodium Acetate) + H₂O</Text>
      <Text style={styles.bulletPoint}>• With Na₂CO₃: 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂↑</Text>
      <Text style={styles.bulletPoint}>• With NaHCO₃: CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑</Text>

      <Text style={styles.heading}>15. Oxygen Atom Structure</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=aL-Fs3BzXaw')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Oxygen Atom Structure</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>Oxygen plays a crucial role in combustion and oxidation reactions of carbon compounds.</Text>
      <InlineAtomModel atomicNumber={8} elementName="Oxygen" elementSymbol="O" color="#ff4444" caption="Oxygen (Z=8): 2,6 — gains or shares 2 electrons. Essential for combustion of carbon compounds" />
      
      <Text style={styles.heading}>16. Soaps and Detergents</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=t5sGftG9sLM')} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,0,0,0.1)', borderRadius: 8, padding: 8, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255,0,0,0.3)' }}>
        <Text style={{ color: '#ff4444', fontSize: 14 }}>🎬 Watch: Soaps & Detergents</Text>
      </TouchableOpacity>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Saponification:</Text> When esters react with an alkali (like NaOH), they form an alcohol and the sodium salt of a carboxylic acid (soap).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Micelle Formation:</Text> Soap molecules have a hydrophilic (water-loving) ionic head and a hydrophobic (water-hating) carbon chain tail. In water, tails point inwards trapping dirt/oil, forming a cluster called a micelle, which can then be washed away.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Hard Water Problem:</Text> Calcium and magnesium salts in hard water react with soap to form an insoluble precipitate called scum, making cleaning difficult.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Detergents:</Text> These are sodium salts of sulphonic acids or ammonium salts with chlorides or bromides. They do not form insoluble precipitates in hard water, maintaining their cleaning action, but many are non-biodegradable (environmental concern).</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Soap Chemistry (NCERT):</Text> Soaps are sodium or potassium salts of long-chain fatty acids (e.g., Sodium Stearate: C₁₇H₃₅COONa). In hard water containing Ca²⁺ and Mg²⁺ ions, soaps form insoluble precipitates (scum): 2C₁₇H₃₅COONa + Ca²⁺ → (C₁₇H₃₅COO)₂Ca↓ (Scum) + 2Na⁺. This is why soaps do not work well in hard water.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.highlight}>Environmental Concern:</Text> Some synthetic detergents have non-biodegradable branched hydrocarbon chains that persist in water bodies, causing pollution in rivers and lakes. Biodegradable detergents with straight-chain hydrocarbons are better for the environment.
      </Text>
      
    </DetailScreenLayout>
  );
}
