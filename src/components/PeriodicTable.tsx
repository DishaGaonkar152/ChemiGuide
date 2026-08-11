import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Pressable, Dimensions } from 'react-native';
import AtomModel3D from './AtomModel3D';

// ════════════════════════════════════════════════════
// FULL 118-ELEMENT DATA
// ════════════════════════════════════════════════════
// Each element: [number, symbol, name, group, row, col, electrons]
// row/col define the standard periodic table grid position (1-indexed)
// Lanthanides: row 8, Actinides: row 9

type ElementData = {
  number: number; symbol: string; name: string; group: string;
  row: number; col: number; electrons: number;
};

const ELEMENTS: ElementData[] = [
  // ─── Period 1 ───
  { number: 1, symbol: 'H', name: 'Hydrogen', group: 'nonmetal', row: 1, col: 1, electrons: 1 },
  { number: 2, symbol: 'He', name: 'Helium', group: 'noble', row: 1, col: 18, electrons: 2 },
  // ─── Period 2 ───
  { number: 3, symbol: 'Li', name: 'Lithium', group: 'alkali', row: 2, col: 1, electrons: 3 },
  { number: 4, symbol: 'Be', name: 'Beryllium', group: 'alkaline', row: 2, col: 2, electrons: 4 },
  { number: 5, symbol: 'B', name: 'Boron', group: 'metalloid', row: 2, col: 13, electrons: 5 },
  { number: 6, symbol: 'C', name: 'Carbon', group: 'nonmetal', row: 2, col: 14, electrons: 6 },
  { number: 7, symbol: 'N', name: 'Nitrogen', group: 'nonmetal', row: 2, col: 15, electrons: 7 },
  { number: 8, symbol: 'O', name: 'Oxygen', group: 'nonmetal', row: 2, col: 16, electrons: 8 },
  { number: 9, symbol: 'F', name: 'Fluorine', group: 'halogen', row: 2, col: 17, electrons: 9 },
  { number: 10, symbol: 'Ne', name: 'Neon', group: 'noble', row: 2, col: 18, electrons: 10 },
  // ─── Period 3 ───
  { number: 11, symbol: 'Na', name: 'Sodium', group: 'alkali', row: 3, col: 1, electrons: 11 },
  { number: 12, symbol: 'Mg', name: 'Magnesium', group: 'alkaline', row: 3, col: 2, electrons: 12 },
  { number: 13, symbol: 'Al', name: 'Aluminium', group: 'post-transition', row: 3, col: 13, electrons: 13 },
  { number: 14, symbol: 'Si', name: 'Silicon', group: 'metalloid', row: 3, col: 14, electrons: 14 },
  { number: 15, symbol: 'P', name: 'Phosphorus', group: 'nonmetal', row: 3, col: 15, electrons: 15 },
  { number: 16, symbol: 'S', name: 'Sulfur', group: 'nonmetal', row: 3, col: 16, electrons: 16 },
  { number: 17, symbol: 'Cl', name: 'Chlorine', group: 'halogen', row: 3, col: 17, electrons: 17 },
  { number: 18, symbol: 'Ar', name: 'Argon', group: 'noble', row: 3, col: 18, electrons: 18 },
  // ─── Period 4 ───
  { number: 19, symbol: 'K', name: 'Potassium', group: 'alkali', row: 4, col: 1, electrons: 19 },
  { number: 20, symbol: 'Ca', name: 'Calcium', group: 'alkaline', row: 4, col: 2, electrons: 20 },
  { number: 21, symbol: 'Sc', name: 'Scandium', group: 'transition', row: 4, col: 3, electrons: 21 },
  { number: 22, symbol: 'Ti', name: 'Titanium', group: 'transition', row: 4, col: 4, electrons: 22 },
  { number: 23, symbol: 'V', name: 'Vanadium', group: 'transition', row: 4, col: 5, electrons: 23 },
  { number: 24, symbol: 'Cr', name: 'Chromium', group: 'transition', row: 4, col: 6, electrons: 24 },
  { number: 25, symbol: 'Mn', name: 'Manganese', group: 'transition', row: 4, col: 7, electrons: 25 },
  { number: 26, symbol: 'Fe', name: 'Iron', group: 'transition', row: 4, col: 8, electrons: 26 },
  { number: 27, symbol: 'Co', name: 'Cobalt', group: 'transition', row: 4, col: 9, electrons: 27 },
  { number: 28, symbol: 'Ni', name: 'Nickel', group: 'transition', row: 4, col: 10, electrons: 28 },
  { number: 29, symbol: 'Cu', name: 'Copper', group: 'transition', row: 4, col: 11, electrons: 29 },
  { number: 30, symbol: 'Zn', name: 'Zinc', group: 'transition', row: 4, col: 12, electrons: 30 },
  { number: 31, symbol: 'Ga', name: 'Gallium', group: 'post-transition', row: 4, col: 13, electrons: 31 },
  { number: 32, symbol: 'Ge', name: 'Germanium', group: 'metalloid', row: 4, col: 14, electrons: 32 },
  { number: 33, symbol: 'As', name: 'Arsenic', group: 'metalloid', row: 4, col: 15, electrons: 33 },
  { number: 34, symbol: 'Se', name: 'Selenium', group: 'nonmetal', row: 4, col: 16, electrons: 34 },
  { number: 35, symbol: 'Br', name: 'Bromine', group: 'halogen', row: 4, col: 17, electrons: 35 },
  { number: 36, symbol: 'Kr', name: 'Krypton', group: 'noble', row: 4, col: 18, electrons: 36 },
  // ─── Period 5 ───
  { number: 37, symbol: 'Rb', name: 'Rubidium', group: 'alkali', row: 5, col: 1, electrons: 37 },
  { number: 38, symbol: 'Sr', name: 'Strontium', group: 'alkaline', row: 5, col: 2, electrons: 38 },
  { number: 39, symbol: 'Y', name: 'Yttrium', group: 'transition', row: 5, col: 3, electrons: 39 },
  { number: 40, symbol: 'Zr', name: 'Zirconium', group: 'transition', row: 5, col: 4, electrons: 40 },
  { number: 41, symbol: 'Nb', name: 'Niobium', group: 'transition', row: 5, col: 5, electrons: 41 },
  { number: 42, symbol: 'Mo', name: 'Molybdenum', group: 'transition', row: 5, col: 6, electrons: 42 },
  { number: 43, symbol: 'Tc', name: 'Technetium', group: 'transition', row: 5, col: 7, electrons: 43 },
  { number: 44, symbol: 'Ru', name: 'Ruthenium', group: 'transition', row: 5, col: 8, electrons: 44 },
  { number: 45, symbol: 'Rh', name: 'Rhodium', group: 'transition', row: 5, col: 9, electrons: 45 },
  { number: 46, symbol: 'Pd', name: 'Palladium', group: 'transition', row: 5, col: 10, electrons: 46 },
  { number: 47, symbol: 'Ag', name: 'Silver', group: 'transition', row: 5, col: 11, electrons: 47 },
  { number: 48, symbol: 'Cd', name: 'Cadmium', group: 'transition', row: 5, col: 12, electrons: 48 },
  { number: 49, symbol: 'In', name: 'Indium', group: 'post-transition', row: 5, col: 13, electrons: 49 },
  { number: 50, symbol: 'Sn', name: 'Tin', group: 'post-transition', row: 5, col: 14, electrons: 50 },
  { number: 51, symbol: 'Sb', name: 'Antimony', group: 'metalloid', row: 5, col: 15, electrons: 51 },
  { number: 52, symbol: 'Te', name: 'Tellurium', group: 'metalloid', row: 5, col: 16, electrons: 52 },
  { number: 53, symbol: 'I', name: 'Iodine', group: 'halogen', row: 5, col: 17, electrons: 53 },
  { number: 54, symbol: 'Xe', name: 'Xenon', group: 'noble', row: 5, col: 18, electrons: 54 },
  // ─── Period 6 ───
  { number: 55, symbol: 'Cs', name: 'Caesium', group: 'alkali', row: 6, col: 1, electrons: 55 },
  { number: 56, symbol: 'Ba', name: 'Barium', group: 'alkaline', row: 6, col: 2, electrons: 56 },
  // La-Lu → Lanthanides (row 8)
  { number: 57, symbol: 'La', name: 'Lanthanum', group: 'lanthanide', row: 8, col: 3, electrons: 57 },
  { number: 58, symbol: 'Ce', name: 'Cerium', group: 'lanthanide', row: 8, col: 4, electrons: 58 },
  { number: 59, symbol: 'Pr', name: 'Praseodymium', group: 'lanthanide', row: 8, col: 5, electrons: 59 },
  { number: 60, symbol: 'Nd', name: 'Neodymium', group: 'lanthanide', row: 8, col: 6, electrons: 60 },
  { number: 61, symbol: 'Pm', name: 'Promethium', group: 'lanthanide', row: 8, col: 7, electrons: 61 },
  { number: 62, symbol: 'Sm', name: 'Samarium', group: 'lanthanide', row: 8, col: 8, electrons: 62 },
  { number: 63, symbol: 'Eu', name: 'Europium', group: 'lanthanide', row: 8, col: 9, electrons: 63 },
  { number: 64, symbol: 'Gd', name: 'Gadolinium', group: 'lanthanide', row: 8, col: 10, electrons: 64 },
  { number: 65, symbol: 'Tb', name: 'Terbium', group: 'lanthanide', row: 8, col: 11, electrons: 65 },
  { number: 66, symbol: 'Dy', name: 'Dysprosium', group: 'lanthanide', row: 8, col: 12, electrons: 66 },
  { number: 67, symbol: 'Ho', name: 'Holmium', group: 'lanthanide', row: 8, col: 13, electrons: 67 },
  { number: 68, symbol: 'Er', name: 'Erbium', group: 'lanthanide', row: 8, col: 14, electrons: 68 },
  { number: 69, symbol: 'Tm', name: 'Thulium', group: 'lanthanide', row: 8, col: 15, electrons: 69 },
  { number: 70, symbol: 'Yb', name: 'Ytterbium', group: 'lanthanide', row: 8, col: 16, electrons: 70 },
  { number: 71, symbol: 'Lu', name: 'Lutetium', group: 'lanthanide', row: 8, col: 17, electrons: 71 },
  // Continue Period 6
  { number: 72, symbol: 'Hf', name: 'Hafnium', group: 'transition', row: 6, col: 4, electrons: 72 },
  { number: 73, symbol: 'Ta', name: 'Tantalum', group: 'transition', row: 6, col: 5, electrons: 73 },
  { number: 74, symbol: 'W', name: 'Tungsten', group: 'transition', row: 6, col: 6, electrons: 74 },
  { number: 75, symbol: 'Re', name: 'Rhenium', group: 'transition', row: 6, col: 7, electrons: 75 },
  { number: 76, symbol: 'Os', name: 'Osmium', group: 'transition', row: 6, col: 8, electrons: 76 },
  { number: 77, symbol: 'Ir', name: 'Iridium', group: 'transition', row: 6, col: 9, electrons: 77 },
  { number: 78, symbol: 'Pt', name: 'Platinum', group: 'transition', row: 6, col: 10, electrons: 78 },
  { number: 79, symbol: 'Au', name: 'Gold', group: 'transition', row: 6, col: 11, electrons: 79 },
  { number: 80, symbol: 'Hg', name: 'Mercury', group: 'transition', row: 6, col: 12, electrons: 80 },
  { number: 81, symbol: 'Tl', name: 'Thallium', group: 'post-transition', row: 6, col: 13, electrons: 81 },
  { number: 82, symbol: 'Pb', name: 'Lead', group: 'post-transition', row: 6, col: 14, electrons: 82 },
  { number: 83, symbol: 'Bi', name: 'Bismuth', group: 'post-transition', row: 6, col: 15, electrons: 83 },
  { number: 84, symbol: 'Po', name: 'Polonium', group: 'post-transition', row: 6, col: 16, electrons: 84 },
  { number: 85, symbol: 'At', name: 'Astatine', group: 'halogen', row: 6, col: 17, electrons: 85 },
  { number: 86, symbol: 'Rn', name: 'Radon', group: 'noble', row: 6, col: 18, electrons: 86 },
  // ─── Period 7 ───
  { number: 87, symbol: 'Fr', name: 'Francium', group: 'alkali', row: 7, col: 1, electrons: 87 },
  { number: 88, symbol: 'Ra', name: 'Radium', group: 'alkaline', row: 7, col: 2, electrons: 88 },
  // Ac-Lr → Actinides (row 9)
  { number: 89, symbol: 'Ac', name: 'Actinium', group: 'actinide', row: 9, col: 3, electrons: 89 },
  { number: 90, symbol: 'Th', name: 'Thorium', group: 'actinide', row: 9, col: 4, electrons: 90 },
  { number: 91, symbol: 'Pa', name: 'Protactinium', group: 'actinide', row: 9, col: 5, electrons: 91 },
  { number: 92, symbol: 'U', name: 'Uranium', group: 'actinide', row: 9, col: 6, electrons: 92 },
  { number: 93, symbol: 'Np', name: 'Neptunium', group: 'actinide', row: 9, col: 7, electrons: 93 },
  { number: 94, symbol: 'Pu', name: 'Plutonium', group: 'actinide', row: 9, col: 8, electrons: 94 },
  { number: 95, symbol: 'Am', name: 'Americium', group: 'actinide', row: 9, col: 9, electrons: 95 },
  { number: 96, symbol: 'Cm', name: 'Curium', group: 'actinide', row: 9, col: 10, electrons: 96 },
  { number: 97, symbol: 'Bk', name: 'Berkelium', group: 'actinide', row: 9, col: 11, electrons: 97 },
  { number: 98, symbol: 'Cf', name: 'Californium', group: 'actinide', row: 9, col: 12, electrons: 98 },
  { number: 99, symbol: 'Es', name: 'Einsteinium', group: 'actinide', row: 9, col: 13, electrons: 99 },
  { number: 100, symbol: 'Fm', name: 'Fermium', group: 'actinide', row: 9, col: 14, electrons: 100 },
  { number: 101, symbol: 'Md', name: 'Mendelevium', group: 'actinide', row: 9, col: 15, electrons: 101 },
  { number: 102, symbol: 'No', name: 'Nobelium', group: 'actinide', row: 9, col: 16, electrons: 102 },
  { number: 103, symbol: 'Lr', name: 'Lawrencium', group: 'actinide', row: 9, col: 17, electrons: 103 },
  // Continue Period 7
  { number: 104, symbol: 'Rf', name: 'Rutherfordium', group: 'transition', row: 7, col: 4, electrons: 104 },
  { number: 105, symbol: 'Db', name: 'Dubnium', group: 'transition', row: 7, col: 5, electrons: 105 },
  { number: 106, symbol: 'Sg', name: 'Seaborgium', group: 'transition', row: 7, col: 6, electrons: 106 },
  { number: 107, symbol: 'Bh', name: 'Bohrium', group: 'transition', row: 7, col: 7, electrons: 107 },
  { number: 108, symbol: 'Hs', name: 'Hassium', group: 'transition', row: 7, col: 8, electrons: 108 },
  { number: 109, symbol: 'Mt', name: 'Meitnerium', group: 'transition', row: 7, col: 9, electrons: 109 },
  { number: 110, symbol: 'Ds', name: 'Darmstadtium', group: 'transition', row: 7, col: 10, electrons: 110 },
  { number: 111, symbol: 'Rg', name: 'Roentgenium', group: 'transition', row: 7, col: 11, electrons: 111 },
  { number: 112, symbol: 'Cn', name: 'Copernicium', group: 'transition', row: 7, col: 12, electrons: 112 },
  { number: 113, symbol: 'Nh', name: 'Nihonium', group: 'post-transition', row: 7, col: 13, electrons: 113 },
  { number: 114, symbol: 'Fl', name: 'Flerovium', group: 'post-transition', row: 7, col: 14, electrons: 114 },
  { number: 115, symbol: 'Mc', name: 'Moscovium', group: 'post-transition', row: 7, col: 15, electrons: 115 },
  { number: 116, symbol: 'Lv', name: 'Livermorium', group: 'post-transition', row: 7, col: 16, electrons: 116 },
  { number: 117, symbol: 'Ts', name: 'Tennessine', group: 'halogen', row: 7, col: 17, electrons: 117 },
  { number: 118, symbol: 'Og', name: 'Oganesson', group: 'noble', row: 7, col: 18, electrons: 118 },
];

const GROUP_COLORS: Record<string, string> = {
  nonmetal: '#00ffff',
  noble: '#ff00ff',
  alkali: '#ff4444',
  alkaline: '#ffaa00',
  metalloid: '#00ff44',
  halogen: '#ffff00',
  'post-transition': '#4488ff',
  transition: '#cc88ff',
  lanthanide: '#ff8888',
  actinide: '#88ffcc',
};

const GROUP_LABELS = [
  { label: 'Alkali', color: '#ff4444' },
  { label: 'Alkaline', color: '#ffaa00' },
  { label: 'Transition', color: '#cc88ff' },
  { label: 'Post-Trans.', color: '#4488ff' },
  { label: 'Metalloid', color: '#00ff44' },
  { label: 'Non-Metal', color: '#00ffff' },
  { label: 'Halogen', color: '#ffff00' },
  { label: 'Noble Gas', color: '#ff00ff' },
  { label: 'Lanthanide', color: '#ff8888' },
  { label: 'Actinide', color: '#88ffcc' },
];

// Total cols = 18, rows = 7 (main) + gap + 2 (lanthanides/actinides)
const COLS = 18;
const MAIN_ROWS = 7;
const CELL_SIZE = 62;
const GAP = 3;

function ElementCell({ el, onPress }: { el: ElementData; onPress: () => void }) {
  const color = GROUP_COLORS[el.group] || '#ffffff';
  return (
    <TouchableOpacity
      style={[styles.elementBox, { borderColor: color, shadowColor: color }]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={[styles.glassHighlight, { backgroundColor: color, opacity: 0.08 }]} />
      <Text style={[styles.number, { color }]}>{el.number}</Text>
      <Text style={[styles.symbol, { color, textShadowColor: color }]}>{el.symbol}</Text>
      <Text style={[styles.name, { color }]} numberOfLines={1}>{el.name}</Text>
    </TouchableOpacity>
  );
}

export default function PeriodicTable() {
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(null);

  // Build the grid: place elements by (row, col)
  const elementMap = new Map<string, ElementData>();
  ELEMENTS.forEach(el => elementMap.set(`${el.row}-${el.col}`, el));

  // Render main table rows (1-7)
  const renderMainTable = () => {
    const rows = [];
    for (let r = 1; r <= MAIN_ROWS; r++) {
      const cells = [];
      for (let c = 1; c <= COLS; c++) {
        const key = `${r}-${c}`;
        const el = elementMap.get(key);
        // Show placeholder for La*/Ac* positions
        if (r === 6 && c === 3) {
          cells.push(
            <View key={key} style={[styles.elementBox, styles.placeholderBox]}>
              <Text style={styles.placeholderText}>57-71</Text>
              <Text style={[styles.placeholderLabel, { color: '#ff8888' }]}>La*</Text>
            </View>
          );
        } else if (r === 7 && c === 3) {
          cells.push(
            <View key={key} style={[styles.elementBox, styles.placeholderBox]}>
              <Text style={styles.placeholderText}>89-103</Text>
              <Text style={[styles.placeholderLabel, { color: '#88ffcc' }]}>Ac*</Text>
            </View>
          );
        } else if (el) {
          cells.push(<ElementCell key={key} el={el} onPress={() => setSelectedElement(el)} />);
        } else {
          cells.push(<View key={key} style={styles.emptyCell} />);
        }
      }
      rows.push(<View key={`row-${r}`} style={styles.row}>{cells}</View>);
    }
    return rows;
  };

  // Render lanthanide row (row 8) and actinide row (row 9)
  const renderExtraRows = () => {
    const rows = [];
    for (let r = 8; r <= 9; r++) {
      const cells = [];
      // Cols 3-17 for lanthanides/actinides
      // Add 2 empty cells at the start to indent them to col 3
      cells.push(<View key={`${r}-1`} style={styles.emptyCell} />);
      cells.push(<View key={`${r}-2`} style={styles.emptyCell} />);
      for (let c = 3; c <= 17; c++) {
        const key = `${r}-${c}`;
        const el = elementMap.get(key);
        if (el) {
          cells.push(<ElementCell key={key} el={el} onPress={() => setSelectedElement(el)} />);
        } else {
          cells.push(<View key={key} style={styles.emptyCell} />);
        }
      }
      // Fill remaining empty cells
      cells.push(<View key={`${r}-18`} style={styles.emptyCell} />);
      rows.push(<View key={`row-${r}`} style={styles.row}>{cells}</View>);
    }
    return rows;
  };

  return (
    <View style={styles.container}>
      {/* Legend */}
      <View style={styles.legendRow}>
        {GROUP_LABELS.map(g => (
          <View key={g.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: g.color }]} />
            <Text style={[styles.legendText, { color: g.color }]}>{g.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.tableWrapper}>
          {/* Main 7-row table */}
          {renderMainTable()}

          {/* Spacer */}
          <View style={styles.spacerRow}>
            <Text style={styles.spacerText}>⬇ Lanthanides & Actinides ⬇</Text>
          </View>

          {/* Lanthanides & Actinides */}
          {renderExtraRows()}
        </View>
      </ScrollView>

      {/* ─── 3D Model Modal ─── */}
      <Modal visible={!!selectedElement} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalGlassCard}>
            {selectedElement && (
              <>
                <Text style={[styles.modalTitle, { color: GROUP_COLORS[selectedElement.group] }]}>
                  {selectedElement.name} ({selectedElement.symbol})
                </Text>
                <Text style={styles.modalSubtitle}>Atomic Number: {selectedElement.number}</Text>
                <Text style={styles.modalGroup}>
                  Group: {selectedElement.group.charAt(0).toUpperCase() + selectedElement.group.slice(1)}
                </Text>

                <View style={styles.modelWrapper}>
                  <AtomModel3D
                    atomicNumber={selectedElement.number}
                    nucleusColor={GROUP_COLORS[selectedElement.group]}
                    showInfo={true}
                  />
                </View>

                <Pressable style={[styles.closeBtn, { borderColor: GROUP_COLORS[selectedElement.group] }]} onPress={() => setSelectedElement(null)}>
                  <Text style={[styles.closeBtnText, { color: GROUP_COLORS[selectedElement.group] }]}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  // ─── Legend ───
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  // ─── Table ───
  tableWrapper: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    gap: GAP,
    marginBottom: GAP,
  },
  emptyCell: {
    width: CELL_SIZE,
    height: CELL_SIZE + 10,
  },
  elementBox: {
    width: CELL_SIZE,
    height: CELL_SIZE + 10,
    borderWidth: 1,
    borderRadius: 8,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 15, 25, 0.85)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
  },
  glassHighlight: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  placeholderBox: {
    borderColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 9,
    fontWeight: '600',
  },
  placeholderLabel: {
    fontSize: 14,
    fontWeight: '900',
    marginTop: 2,
  },
  number: {
    fontSize: 8,
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginLeft: 2,
  },
  symbol: {
    fontSize: 20,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 6,
    marginTop: -2,
  },
  name: {
    fontSize: 7,
    fontWeight: '500',
    marginTop: 1,
  },

  // ─── Spacer ───
  spacerRow: {
    marginVertical: 12,
    alignItems: 'center',
  },
  spacerText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    letterSpacing: 2,
  },

  // ─── Modal ───
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.88)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalGlassCard: {
    width: '96%',
    maxWidth: 520,
    maxHeight: Dimensions.get('window').height * 0.85,
    backgroundColor: 'rgba(15, 15, 30, 0.95)',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
    padding: 28,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOpacity: 0.2,
    shadowRadius: 30,
  },
  modalTitle: {
    fontSize: 34,
    fontWeight: '900',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  modalSubtitle: {
    color: '#aaa',
    fontSize: 17,
    marginTop: 6,
  },
  modalGroup: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
    marginTop: 4,
    letterSpacing: 1,
    textTransform: 'capitalize',
  },
  modelWrapper: {
    flex: 1,
    width: '100%',
    minHeight: 320,
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingVertical: 14,
    paddingHorizontal: 44,
    borderRadius: 30,
    borderWidth: 1.5,
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
