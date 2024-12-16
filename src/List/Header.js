// Header.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const Header = ({loading, setLoading}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = async index => {
    console.warn('press', index);
    setLoading(true);
    try {
      await auth().signOut();
    } catch (error) {
      Alert.alert('Thông báo!', error.message);
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
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>DÒ SỐ NHANH</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle1}>
            👤
            </Text>
            <Text style={styles.modalTitle}>
            Xin chào,
            </Text>
            <Text style={styles.modalTitle2}>
            {auth().currentUser.phoneNumber || auth().currentUser.email}
            </Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => onPress(1)}>
              <Text style={styles.menuItemText}>Đăng xuất</Text>
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
    fontSize: 35,
    marginRight: 15,
  },
  headerText: {
    color: '#0099FF',
    fontSize: 26,
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
    color: 'black',
    fontSize: 20,
    //fontWeight: 'bold',
    //marginBottom: 5,
  },
  modalTitle1: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    //marginBottom: 5,
  },
  modalTitle2: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    //marginBottom: 5,
  },
  menuItem: {
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: '#D32F2F',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  menuItemText: {
    fontSize: 18,
    color: '#fff',
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  closeButtonText: {
    color: 'black',
    fontSize: 20,
  },
});

export default Header;
