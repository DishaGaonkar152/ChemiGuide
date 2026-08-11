import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Platform,
  Pressable,
  KeyboardAvoidingView
} from 'react-native';
import * as Speech from 'expo-speech';
import { FORMULA_DATABASE, ChemicalFormula } from '../utils/formulaDatabase';

// Type colors for badges
const TYPE_COLORS = {
  Acid: '#ff4444',
  Base: '#4444ff',
  Salt: '#ffff00',
  Gas: '#00ffff',
  Organic: '#00ff88',
  Other: '#ffaa00',
};

export default function FloatingAssistant() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormula, setSelectedFormula] = useState<ChemicalFormula | null>(null);

  // Filter formulas based on search
  const filteredFormulas = useMemo(() => {
    if (!searchQuery) return FORMULA_DATABASE;
    const lowerQuery = searchQuery.toLowerCase();
    return FORMULA_DATABASE.filter(
      (f) =>
        f.name.toLowerCase().includes(lowerQuery) ||
        f.formula.toLowerCase().includes(lowerQuery) ||
        f.type.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Handle closing modal and resetting state
  const handleClose = () => {
    setModalVisible(false);
    setSearchQuery('');
    setSelectedFormula(null);
    Speech.stop(); // Stop speaking if closing modal
  };

  const handleSpell = async (formula: ChemicalFormula) => {
    const isSpeaking = await Speech.isSpeakingAsync();
    if (isSpeaking) {
      Speech.stop();
    }
    
    // Map subscripts and special chars to readable text
    const subscriptToNormal: Record<string, string> = {
      '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
      '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
      '½': '1 half', '·': 'dot', '⁺': 'plus', '⁻': 'minus',
      '²': '2', '³': '3'
    };
    
    let readable = formula.formula;
    for (const [sub, norm] of Object.entries(subscriptToNormal)) {
      readable = readable.split(sub).join(norm);
    }
    
    // Split by character to force spelling, ignoring empty spaces
    const spelledOut = readable.split('').filter(c => c !== ' ').join(', ');
    
    Speech.speak(`The formula for ${formula.name} is: ${spelledOut}`, {
      rate: 0.7, // Slightly slower for clear spelling
      pitch: 1.1,
    });
  };

  return (
    <>
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.fabIcon}>🧠</Text>
      </TouchableOpacity>

      {/* Assistant Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          {/* Background dismiss */}
          <Pressable style={StyleSheet.absoluteFill} onPress={handleClose}>
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.6)' }]} />
          </Pressable>

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Formula Assistant</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            {selectedFormula ? (
              /* --- Formula Detail View (Teaching Mode) --- */
              <ScrollView contentContainerStyle={styles.detailContainer}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => setSelectedFormula(null)}
                >
                  <Text style={styles.backBtnText}>← Back to Search</Text>
                </TouchableOpacity>

                <View style={styles.detailHeader}>
                  <View style={styles.formulaRow}>
                    <Text style={styles.detailFormula}>{selectedFormula.formula}</Text>
                    <TouchableOpacity 
                      style={styles.spellBtn}
                      onPress={() => handleSpell(selectedFormula)}
                    >
                      <Text style={styles.spellBtnText}>🔊 Spell</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.detailName}>{selectedFormula.name}</Text>
                  <View
                    style={[
                      styles.typeBadge,
                      { backgroundColor: TYPE_COLORS[selectedFormula.type] + '33' }, // 33 for 20% opacity
                    ]}
                  >
                    <Text style={[styles.typeText, { color: TYPE_COLORS[selectedFormula.type] }]}>
                      {selectedFormula.type}
                    </Text>
                  </View>
                </View>

                <View style={styles.teachingCard}>
                  <Text style={styles.cardSectionTitle}>How to remember it:</Text>
                  <Text style={styles.mnemonicText}>"{selectedFormula.mnemonic}"</Text>
                  
                  <View style={styles.separator} />
                  
                  <Text style={styles.cardSectionTitle}>Breakdown:</Text>
                  <Text style={styles.breakdownText}>{selectedFormula.breakdown}</Text>
                  
                  <View style={styles.separator} />
                  
                  <Text style={styles.cardSectionTitle}>Pro Trick 💡:</Text>
                  <Text style={styles.trickText}>{selectedFormula.trick}</Text>
                </View>
              </ScrollView>
            ) : (
              /* --- Search & List View --- */
              <View style={styles.searchContainer}>
                <Text style={styles.searchSubtitle}>
                  Search any chemical to learn the easiest way to remember its formula!
                </Text>
                
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search (e.g., Water, HCl, Acid)..."
                  placeholderTextColor="rgba(255,255,255,0.4)"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  autoCorrect={false}
                />

                <ScrollView contentContainerStyle={styles.listContainer}>
                  {filteredFormulas.length === 0 ? (
                    <Text style={styles.noResultsText}>No formulas found.</Text>
                  ) : (
                    filteredFormulas.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        style={styles.listItem}
                        onPress={() => setSelectedFormula(item)}
                      >
                        <View style={styles.listItemLeft}>
                          <Text style={styles.listItemFormula}>{item.formula}</Text>
                          <Text style={styles.listItemName}>{item.name}</Text>
                        </View>
                        <View
                          style={[
                            styles.typeBadge,
                            { backgroundColor: TYPE_COLORS[item.type] + '33' },
                          ]}
                        >
                          <Text style={[styles.typeText, { color: TYPE_COLORS[item.type] }]}>
                            {item.type}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  // ─── FAB ───
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    zIndex: 999, // Ensure it's on top of everything
  },
  fabIcon: {
    fontSize: 30,
  },

  // ─── Modal Layout ───
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#0a0a14',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '80%',
    paddingTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.2)',
    borderBottomWidth: 0,
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ─── Search View ───
  searchContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  searchSubtitle: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  searchInput: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 40,
  },
  noResultsText: {
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  listItemLeft: {
    flex: 1,
  },
  listItemFormula: {
    color: '#00ffff',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  listItemName: {
    color: '#fff',
    fontSize: 14,
  },

  // ─── Common Badges ───
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ─── Detail View (Teaching Mode) ───
  detailContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backBtnText: {
    color: '#00ffff',
    fontSize: 16,
    fontWeight: '600',
  },
  detailHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  formulaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 16,
  },
  detailFormula: {
    color: '#fff',
    fontSize: 54,
    fontWeight: '900',
    textShadowColor: 'rgba(0, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  spellBtn: {
    backgroundColor: 'rgba(0,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.4)',
  },
  spellBtnText: {
    color: '#00ffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailName: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  
  teachingCard: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0,255,255,0.2)',
  },
  cardSectionTitle: {
    color: '#00ffff',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  mnemonicText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    lineHeight: 26,
  },
  breakdownText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  trickText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    lineHeight: 24,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginVertical: 16,
  },
});
