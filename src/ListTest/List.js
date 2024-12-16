import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, TouchableOpacity } from 'react-native';

const LotteryResultModal = ({ visible, onClose, date, station, ticketNumber, prize }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>🎉 Chúc mừng! 🎉</Text>
          <Text style={styles.message}>Bạn đã trúng giải!</Text>

          {/* Thông tin chi tiết */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Ngày: {date}</Text>
            <Text style={styles.infoText}>Đài: {station}</Text>
            <Text style={styles.infoText}>Số trên vé: {ticketNumber}</Text>
            <Text style={styles.infoText}>Giải: {prize}</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const List = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Button title="Thông báo" onPress={() => setModalVisible(true)} />
      <LotteryResultModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        date="27/10/2024"
        station="Đài TP.HCM"
        ticketNumber="123456"
        prize="Giải Nhất"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default List;
