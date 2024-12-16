import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';
import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {timDai, timKetQua} from '../utils';
import LotteryResultModal from './BangKetQua';
import moment from 'moment';
import {danhSachDai} from '../DoTay/Body';
import {launchImageLibrary} from 'react-native-image-picker';

const Body = () => {
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();
  const camera = useRef();
  const [ketQua, setKetQua] = useState(null);
  const [dangChup, setDangChup] = useState(false);
  //
  const chonanh = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    const uri = result.assets?.[0]?.uri;
    if (uri) {
      xuLy(uri);
    }
  };
  const onChupHinh = async () => {
    setDangChup(true);
    const photo = await camera.current.takePhoto();
    setDangChup(false);

    console.log('path', photo.path);
    xuLy('file://' + photo.path);
  };
  //
  const xuLy = async imageURL => {
    const result = await TextRecognition.recognize(
      imageURL,
      TextRecognitionScript.LATIN,
    );

    console.log('Recognized text:', result.text);

    const text1 = result.text.replaceAll(' ', '');
    const so = text1.match(/\d{6}/g)?.[0];
    console.log('numbers:', so);
    let ngay = text1.match(/\d{2}-\d{2}-\d{4}/g)?.[0];
    console.log('ngay1', ngay);
    if (!ngay) {
      ngay = text1.match(/\d{2}-\d{1}-\d{4}/g)?.[0];
    }
    if (!ngay) {
      ngay = text1.match(/\d{1}-\d{2}-\d{4}/g)?.[0];
    }
    if (!ngay) {
      ngay = text1.match(/\d{1}-\d{1}-\d{4}/g)?.[0];
    }
    console.log('date:', ngay);

    const dai = timDai(result.text);
    console.log('dai:', dai);

    if (so && ngay && dai) {
      try {
        const dayOfWeek = moment(ngay, 'DD-MM-YYYY').day();
        const newDanhSach = danhSachDai[dayOfWeek] || [];

        const hopLe = newDanhSach.find(item => item.value === dai);
        if (!hopLe) {
          Alert.alert('Thông báo!', 'Dò không thành công! Vui lòng thử lại!', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
          return;
        }
        const ketQua = await timKetQua(ngay, dai, so);
        console.log('ketQua', ketQua);

        const item = ketQua || {
          ngay,
          dai,
          daySo: so,
          giai: null,
        };
        setKetQua(item);
        // Lưu cái kq vào Firestore
        await firestore().collection(auth().currentUser.uid).add(item);
        console.log('Kết quả đã được lưu thành công!');
      } catch (error) {
        console.error(error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi xử lý. Vui lòng thử lại.');
      }
    } else {
      Alert.alert('Thông báo!', 'Dò không thành công! Vui lòng thử lại!', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  };

  if (!hasPermission) {
    requestPermission();
  }

  return (
    <View style={styles.content}>
      <View style={styles.camContainer}>
        {hasPermission && device ? (
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
            photoQualityBalance="quality"
          />
        ) : (
          <View>
            <Text>Vui lòng cấp quyền camera để tiếp tục!</Text>
          </View>
        )}
        <Text style={styles.cam}>Đưa vé vào khung hình để dò kết quả</Text>
        <TouchableOpacity
          disabled={dangChup}
          onPress={onChupHinh}
          style={[
            styles.captureButton,
            dangChup && styles.captureButtonDisabled,
          ]}>
          <Text style={styles.captureButtonText}>
            {dangChup ? 'Đang chụp...' : 'Chụp hình'}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.libraryButton} onPress={chonanh}>
        <Text style={styles.libraryIcon}>📸</Text>
      </TouchableOpacity>
      <LotteryResultModal
        visible={ketQua !== null}
        onClose={() => setKetQua(null)}
        ketQua={ketQua}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 2,
  },
  camContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderColor: 'black',
  },
  cam: {
    fontSize: 18,
    color: '#fff',
    width: 300,
    height: 700,
  },
  captureButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
  },
  captureButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  captureButtonDisabled: {
    backgroundColor: '#FF8080',
  },
  libraryButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  libraryIcon: {
    fontSize: 24, // Kích thước biểu tượng
    color: '#FFFFFF',
  },
});

export default Body;
