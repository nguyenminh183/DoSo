import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import CameraPage from '../CameraPage/CameraPage';

const Test = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [index, setIndex] = useState(0);

  const onChonChucNang = (chucNang) => {
    setModalVisible(false);
    setIndex(chucNang);
  }

  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef();
  const [dangChup, setDangChup] = useState(false);
  const onChupHinh = async () => {
    setDangChup(true);
    const photo = await camera.current.takePhoto();
    setDangChup(false);
    console.log(photo);

  };

  // Did mount
  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, []);

  const renderContent = () => {
    if (index === 1) {
      return (
        <CameraPage />
      )
    } else if (index === 2) {
      return (
        <CameraPage />
      )
    } else {
      return (
        <View style={styles.content}>
          <Text style={styles.subText}>Dò tự động Xổ Số Kiến Thiết</Text>

          <View style={styles.camContainer}>
            {hasPermission && device ? (
              <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                photo={true}
              />
            ) : (
              <View>
                <Button title='Cho phep dung camera' />
              </View>
            )}
            <Text style={styles.cam}>Dò Số Nhanh</Text>
            <Button disabled={dangChup} title={dangChup ? 'Dang chup' : 'Chup hinh'} onPress={onChupHinh} />
          </View>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.buttonText}>Dò Vé</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Dò Tay</Text>
          </TouchableOpacity>
        </View>
      )
    }

  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Dò Số Nhanh</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Chức năng khác</Text>
            <TouchableOpacity style={styles.menuItem} onPress={() => onChonChucNang(1)}>
              <Text style={styles.menuItemText}>Chức năng 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onChonChucNang(2)}>
              <Text style={styles.menuItemText}>Chức năng 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => onChonChucNang(3)}>
              <Text style={styles.menuItemText}>Chức năng 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  header: {
    backgroundColor: 'green',
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 24,
    marginRight: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  subText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  camContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 30,
    borderColor: 'blue',
    borderWidth: 1,
  },
  cam: {
    width: 300,
    height: 150,
  },
  mainButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    borderColor: 'blue',
    borderWidth: 1,
  },
  secondaryButtonText: {
    color: 'blue',
    fontSize: 16,
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
    marginBottom: 20,
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


export default Test;
