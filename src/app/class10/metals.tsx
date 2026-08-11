import React from 'react';
import { View, Text } from 'react-native';
import DetailScreenLayout, { styles } from '../../components/DetailScreenLayout';
import InlineAtomModel from '../../components/InlineAtomModel';

export default function MetalsScreen() {
  return (
    <DetailScreenLayout title="Metals & Non-Metals" color="#00ff00" emoji="⛏">
      <Text style={styles.heading}>1. Introduction to Metals and Non-Metals</Text>
      <Text style={styles.paragraph}>
        The elements found in nature can be broadly classified into <Text style={styles.highlight}>metals</Text> and <Text style={styles.highlight}>non-metals</Text> based on their physical and chemical properties. In the Earth's crust, metals like aluminum and iron are abundant. Oxygen and silicon, which are non-metals and metalloids respectively, make up a large portion as well.
      </Text>
      
      <Text style={styles.heading}>2. Physical Properties of Metals</Text>
      <Text style={styles.paragraph}>
        Metals exhibit several characteristic physical properties that make them useful in everyday life:
      </Text>
      <Text style={styles.bulletPoint}>• Metallic Lustre: Pure metals have a shining surface.</Text>
      <Text style={styles.bulletPoint}>• Malleability: Metals can be beaten into thin sheets. Gold and silver are the most malleable metals.</Text>
      <Text style={styles.bulletPoint}>• Ductility: The ability of metals to be drawn into thin wires. Gold is the most ductile metal (2 km wire from 1g gold).</Text>
      <Text style={styles.bulletPoint}>• Thermal Conductivity: Metals are good conductors of heat. Silver and copper are the best conductors.</Text>
      <Text style={styles.bulletPoint}>• Electrical Conductivity: Metals conduct electricity well due to free electrons.</Text>
      <Text style={styles.bulletPoint}>• Sonorous: Metals produce a ringing sound when struck.</Text>
      <Text style={styles.bulletPoint}>• Hardness: Generally hard, varying from metal to metal.</Text>
      <Text style={styles.bulletPoint}>• Melting & Boiling Points: Generally very high.</Text>
      <Text style={styles.bulletPoint}>• State: Solid at room temperature.</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Exceptions: 
          1) Mercury is a liquid at room temperature. 
          2) Alkali metals (Sodium, Potassium) are soft enough to be cut with a knife and have low melting points. 
          3) Lead and mercury are poor conductors of heat. 
          4) Gallium and Cesium have very low melting points and will melt if kept on your palm.
        </Text>
      </View>

      <Text style={styles.heading}>3. Physical Properties of Non-Metals</Text>
      <Text style={styles.paragraph}>
        Non-metals (e.g., Carbon, Sulphur, Iodine, Oxygen, Hydrogen) possess properties mostly opposite to those of metals:
      </Text>
      <Text style={styles.bulletPoint}>• Non-lustrous: They do not have a shiny surface.</Text>
      <Text style={styles.bulletPoint}>• Brittle: Solid non-metals break easily when hammered.</Text>
      <Text style={styles.bulletPoint}>• Poor Conductors: They generally do not conduct heat and electricity.</Text>
      <Text style={styles.bulletPoint}>• Non-sonorous: They do not produce a ringing sound.</Text>
      <Text style={styles.bulletPoint}>• Melting/Boiling Points: Generally lower compared to metals.</Text>
      <Text style={styles.bulletPoint}>• State: May be solid, liquid (Bromine), or gas at room temperature.</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Exceptions:
          1) Iodine is a non-metal but has a metallic lustre.
          2) Carbon (as diamond) is the hardest natural substance known and has a very high melting point.
          3) Carbon (as graphite) is a good conductor of electricity.
        </Text>
      </View>

      <Text style={styles.heading}>4. Atomic Structure of a Metal</Text>
      <Text style={styles.paragraph}>
        Metals tend to have 1, 2, or 3 electrons in their outermost shell, which they can easily lose to form positive ions (cations). Below is the 3D model of a Sodium atom (Na) with 11 electrons, showing its single valence electron.
      </Text>
      <InlineAtomModel atomicNumber={11} elementName="Sodium" elementSymbol="Na" color="#ff4444" caption="Sodium (Z=11): 2,8,1 — metals have few valence electrons, easily lost to form cations" />

      <Text style={styles.heading}>5. Chemical Properties of Metals</Text>
      
      <Text style={styles.paragraph}><Text style={styles.highlight}>a) Reaction with Oxygen:</Text> Almost all metals combine with oxygen to form metal oxides (Metal + Oxygen → Metal oxide). Metal oxides are generally basic in nature. However, some oxides like Aluminum oxide (Al2O3) and Zinc oxide (ZnO) show both acidic and basic behavior and are known as <Text style={styles.highlight}>amphoteric oxides</Text>.</Text>
      <Text style={styles.bulletPoint}>• Sodium and Potassium react so vigorously that they catch fire if kept in the open. They are kept immersed in kerosene oil.</Text>
      <Text style={styles.bulletPoint}>• Magnesium burns with a dazzling white flame.</Text>
      <Text style={styles.bulletPoint}>• Iron does not burn on heating, but iron filings burn vigorously when sprinkled in the flame.</Text>
      <Text style={styles.bulletPoint}>• Copper does not burn, but is coated with black copper(II) oxide.</Text>
      <Text style={styles.bulletPoint}>• Silver and Gold do not react with oxygen even at high temperatures.</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>b) Reaction with Water:</Text> Metals react with water to form a metal oxide and hydrogen gas. Metal oxides that are soluble in water dissolve in it to form metal hydroxides.</Text>
      <Text style={styles.bulletPoint}>• Potassium and Sodium react violently with cold water, and the evolved hydrogen catches fire immediately.</Text>
      <Text style={styles.bulletPoint}>• Calcium reacts less violently; the heat is not sufficient for hydrogen to catch fire. It starts floating due to hydrogen bubbles sticking to its surface.</Text>
      <Text style={styles.bulletPoint}>• Magnesium reacts only with hot water.</Text>
      <Text style={styles.bulletPoint}>• Aluminum, Iron, and Zinc do not react with cold or hot water, but react with steam.</Text>
      <Text style={styles.bulletPoint}>• Lead, Copper, Silver, and Gold do not react with water at all.</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>c) Reaction with Acids:</Text> Metals react with dilute acids to give a salt and hydrogen gas (Metal + Dilute acid → Salt + H2).</Text>
      <Text style={styles.bulletPoint}>• Exceptions: Copper, Silver, and Gold do not react with dilute acids.</Text>

      <Text style={styles.paragraph}><Text style={styles.highlight}>d) Reaction with Solutions of other Metal Salts:</Text> A more reactive metal can displace a less reactive metal from its compound in a solution. (Metal A + Salt solution of B → Salt solution of A + Metal B).</Text>

      <Text style={styles.heading}>6. The Reactivity Series</Text>
      <Text style={styles.paragraph}>
        The reactivity series is a list of metals arranged in the order of their decreasing activities.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Most Reactive: K (Potassium) &gt; Na (Sodium) &gt; Ca (Calcium) &gt; Mg (Magnesium) &gt; Al (Aluminum){'\n\n'}
          Medium Reactivity: Zn (Zinc) &gt; Fe (Iron) &gt; Pb (Lead) &gt; H (Hydrogen){'\n\n'}
          Least Reactive: Cu (Copper) &gt; Hg (Mercury) &gt; Ag (Silver) &gt; Au (Gold)
        </Text>
      </View>
      <Text style={styles.paragraph}>
        Metals above hydrogen can displace it from dilute acids. This series helps predict displacement reactions and methods of extraction.
      </Text>

      <Text style={styles.heading}>7. Atomic Structure of a Non-Metal</Text>
      <Text style={styles.paragraph}>
        Non-metals usually have 5, 6, or 7 valence electrons and tend to gain electrons to achieve a stable octet. Below is Chlorine (17 electrons), needing just one more to complete its shell.
      </Text>
      <InlineAtomModel atomicNumber={17} elementName="Chlorine" elementSymbol="Cl" color="#ffff00" caption="Chlorine (Z=17): 2,8,7 — non-metals gain electrons to achieve a stable octet" />

      <Text style={styles.heading}>8. Ionic Bonding</Text>
      <Text style={styles.paragraph}>
        When a metal reacts with a non-metal, the metal loses electrons and the non-metal gains them. The resulting positively and negatively charged ions attract each other with strong electrostatic forces, forming an <Text style={styles.highlight}>ionic bond</Text>.
      </Text>
      <Text style={styles.bulletPoint}>• Formation of NaCl: Sodium (2,8,1) loses 1 electron to become Na+. Chlorine (2,8,7) gains 1 electron to become Cl-. They form Sodium Chloride (NaCl).</Text>
      <Text style={styles.bulletPoint}>• Formation of MgO: Magnesium (2,8,2) loses 2 electrons. Oxygen (2,6) gains 2 electrons. They form Magnesium Oxide (MgO).</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Properties of Ionic Compounds:
          - Solid and somewhat hard.
          - High melting and boiling points.
          - Generally soluble in water, insoluble in solvents like kerosene or petrol.
          - Conduct electricity in molten state or in solution (due to free-moving ions), but not in solid state.
        </Text>
      </View>

      <Text style={styles.heading}>9. Occurrence of Metals</Text>
      <Text style={styles.paragraph}>
        Metals at the bottom of the reactivity series are least reactive and often found in a <Text style={styles.highlight}>free (native) state</Text> (e.g., Gold, Silver, Platinum). Most other metals are found in the Earth's crust in a <Text style={styles.highlight}>combined state</Text> as oxides, sulphides, or carbonates.
      </Text>
      <Text style={styles.bulletPoint}>• Minerals: Elements or compounds occurring naturally in the Earth's crust.</Text>
      <Text style={styles.bulletPoint}>• Ores: Minerals containing a high percentage of a particular metal that can be profitably extracted.</Text>
      <Text style={styles.bulletPoint}>• Gangue: Earthy impurities like sand, soil, etc., present in the ore.</Text>

      <Text style={styles.heading}>10. Extraction of Metals</Text>
      <Text style={styles.paragraph}>
        The process of extracting a metal from its ore depends on its position in the reactivity series:
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Low Reactivity</Text>: Ores of these metals (e.g., Cinnabar - HgS) are reduced to metals by heating alone (Roasting).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Medium Reactivity</Text>: (Zn, Fe, Pb) occur mainly as sulphides or carbonates. Sulphide ores are heated in excess air (<Text style={styles.highlight}>Roasting</Text>). Carbonate ores are heated in limited air (<Text style={styles.highlight}>Calcination</Text>). The resulting metal oxides are then reduced to metals using carbon.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>High Reactivity</Text>: (Na, K, Ca, Al) cannot be reduced by carbon. They are obtained by <Text style={styles.highlight}>electrolytic reduction</Text> of their molten chlorides or oxides.</Text>

      <Text style={styles.heading}>11. Refining of Metals</Text>
      <Text style={styles.paragraph}>
        Metals produced by reduction processes are not very pure. The most common method to obtain pure metal is <Text style={styles.highlight}>electrolytic refining</Text>.
      </Text>
      <Text style={styles.paragraph}>
        In this process, a thick block of impure metal acts as the <Text style={styles.highlight}>anode</Text> and a thin strip of pure metal acts as the <Text style={styles.highlight}>cathode</Text>. A solution of the metal salt is used as an electrolyte. On passing electric current, pure metal from the anode dissolves into the electrolyte, and an equivalent amount of pure metal from the electrolyte deposits onto the cathode. The insoluble impurities settle at the bottom (anode mud).
      </Text>

      <Text style={styles.heading}>12. Corrosion</Text>
      <Text style={styles.paragraph}>
        The gradual eating away of metals by the action of air, moisture, or a chemical on their surface is called <Text style={styles.highlight}>corrosion</Text>. Iron rusts when exposed to both air and moisture, forming a flaky brown substance. Silver tarnishes by reacting with sulphur in the air, and copper forms a green coating of basic copper carbonate.
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoBoxText}>
          Prevention of Corrosion:
          - Painting, oiling, or greasing the surface.
          - Galvanisation: Coating iron or steel with a thin layer of zinc.
          - Electroplating: Depositing a layer of a less reactive metal.
          - Anodising: Coating aluminum with a thick oxide layer.
          - Alloying: Mixing the metal with other elements to change its properties.
        </Text>
      </View>

      <Text style={styles.heading}>13. Alloys</Text>
      <Text style={styles.paragraph}>
        An <Text style={styles.highlight}>alloy</Text> is a homogeneous mixture of two or more metals, or a metal and a non-metal. Alloying is a very good method of improving the properties of a metal (e.g., increasing strength, resisting corrosion).
      </Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Brass</Text>: Copper and Zinc.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Bronze</Text>: Copper and Tin. (Poor conductors of electricity compared to pure copper).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Solder</Text>: Lead and Tin. (Low melting point, used for welding electrical wires).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Amalgam</Text>: An alloy where one of the metals is mercury.</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Steel</Text>: Iron with a small amount of Carbon (makes it hard and strong).</Text>
      <Text style={styles.bulletPoint}>• <Text style={styles.highlight}>Stainless Steel</Text>: Iron mixed with Nickel and Chromium (hard and does not rust).</Text>
    </DetailScreenLayout>
  );
}
