import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const BangKetQuaThuCong = ({ visible, onClose, ketQua }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>🎉 Kết quả dò vé số 🎉</Text>
          <View style={styles.infoContainer}>
            {!!ketQua && (
              <>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>📅 Ngày:</Text> {ketQua.ngay}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>📍 Đài:</Text> {ketQua.daiCoDau}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={styles.label}>🔢 Số trên vé:</Text> {ketQua.daySo}
                </Text>
                <Text style={[styles.infoText, ketQua.giai ? styles.winText : styles.loseText]}>
                  {ketQua.giai
                    ? `🏆 Giải: ${ketQua.giai}`
                    : '❌ Chúc bạn may mắn lần sau!'}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    padding: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
    width: '100%',
  },
  infoText: {
    fontSize: 22,
    marginVertical: 5,
    color: '#333333',
  },
  label: {
    fontWeight: 'bold',
    color: '#FF5733',
  },
  winText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  loseText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#FF5733',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BangKetQuaThuCong;
