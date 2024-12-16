import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

const BangKetQua = ({ visible, onClose, ketQua }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {ketQua?.giai ? (
            <View>
              <Text style={styles.title}>🎉 Chúc mừng! 🎉</Text>
              <Text style={styles.winMessage}>Bạn đã trúng giải!</Text>
            </View>
          ) : (
            <Text style={styles.loseMessage}>❌ Chúc bạn may mắn lần sau!</Text>
          )}

          {/* Thông tin chi tiết */}
          <View style={styles.infoContainer}>
            {!!ketQua && (
              <Text style={styles.infoText}>
                <Text style={styles.label}>📅 Ngày:</Text> {ketQua.ngay}
              </Text>
            )}
            <Text style={styles.infoText}>
              <Text style={styles.label}>📍 Đài:</Text> {ketQua?.daiCoDau}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.label}>🔢 Số trên vé:</Text> {ketQua?.daySo}
            </Text>
            {!!ketQua?.giai && (
              <Text style={[styles.infoText, styles.winHighlight]}>
                🏆 Giải: {ketQua.giai}
              </Text>
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
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FF5733',
    marginBottom: 15,
    textAlign: 'center',
  },
  winMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  loseMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
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
  winHighlight: {
    color: '#4CAF50',
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

export default BangKetQua;
