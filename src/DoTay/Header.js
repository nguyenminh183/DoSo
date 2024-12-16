// Header.js
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const Header = ({}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = index => {
    console.warn('press', index);
    switch (index) {
      case 1:
        break;
      case 2:
        break;

      default:
        break;
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
            console.warn('press');
          }}>
          <Text style={styles.menuText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>DÒ VÉ SỐ THỦ CÔNG</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chức năng khác</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onPress(1)}>
              <Text style={styles.menuItemText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onPress(2)}>
              <Text style={styles.menuItemText}>Chức năng 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onPress(3)}>
              <Text style={styles.menuItemText}>Chức năng 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#0099FF',
    fontSize: 24,
    marginRight: 15,
  },
  headerText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginBottom: 20,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#D32F2F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Header;
