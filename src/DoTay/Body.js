
import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {timDai, timKetQua} from '../utils';
import BangKetQuaThuCong from './BangKetQuaThuCong';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const danhSachDai = {
  0: [
    {label: 'Tiền Giang', value: 'xstg'},
    {label: 'Kiên Giang', value: 'xskg'},
    {label: 'Đà Lạt', value: 'xsdl'},
    {label: 'Thừa T.Huế', value: 'xstth'},
    {label: 'Kon Tum', value: 'xskt'},
    {label: 'Khánh Hòa', value: 'xskh'},
  ],
  1: [
    {label: 'TP.HCM', value: 'xshcm'},
    {label: 'Đồng Tháp', value: 'xsdt'},
    {label: 'Cà Mau', value: 'xscm'},
    {label: 'Thừa T.Huế', value: 'xstth'},
    {label: 'Phú Yên', value: 'xspy'},
  ],
  2: [
    {label: 'Bến Tre', value: 'xsbt'},
    {label: 'Vũng Tàu', value: 'xsvt'},
    {label: 'Bạc Liêu', value: 'xsblc'},
    {label: 'Quảng Nam', value: 'xsqnm'},
    {label: 'Đắk Lắk', value: 'xsdlk'},
  ],
  3: [
    {label: 'Đồng Nai', value: 'xsdn'},
    {label: 'Cần Thơ', value: 'xsct'},
    {label: 'Sóc Trăng', value: 'xsst'},
    {label: 'Đà Nẵng', value: 'xsdng'},
    {label: 'Khánh Hòa', value: 'xskh'},
  ],
  4: [
    {label: 'Tây Ninh', value: 'xstn'},
    {label: 'An Giang', value: 'xsag'},
    {label: 'Bình Thuận', value: 'xsbth'},
    {label: 'Quảng Trị', value: 'xsqt'},
    {label: 'Bình Định', value: 'xsbdh'},
    {label: 'Quảng Bình', value: 'xsqb'},
  ],
  5: [
    {label: 'Vĩnh Long', value: 'xsvl'},
    {label: 'Bình Dương', value: 'xsbd'},
    {label: 'Trà Vinh', value: 'xstv'},
    {label: 'Gia Lai', value: 'xsgl'},
    {label: 'Ninh Thuận', value: 'xsnth'},
  ],
  6: [
    {label: 'Long An', value: 'xsla'},
    {label: 'Bình Phước', value: 'xsbp'},
    {label: 'Hậu Giang', value: 'xshg'},
    {label: 'Bà Rịa - Vũng Tàu', value: 'xsvt'},
    {label: 'Quảng Ngãi', value: 'xsqng'},
    {label: 'Đà Nẵng', value: 'xsdng'},
    {label: 'Đắk Nông', value: 'xsdkn'},
  ],
};

const Body = () => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [danhSach, setDanhSach] = useState(danhSachDai[0]);
  const [ketQua, setKetQua] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const date = moment().subtract(1, 'day').toDate();
    onChangeDate(null, date);
  }, []);

  const onChangeDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const dayOfWeek = moment(date).day();
      const newDanhSach = danhSachDai[dayOfWeek] || [];
      setDanhSach(newDanhSach);
      if (newDanhSach.length > 0) {
        setSelectedProvince(newDanhSach[0].value);
      }
    }
  };

  const onCheckTicket = async () => {
    if (!ticketNumber || ticketNumber.length !== 6) {
      Alert.alert('Lỗi', 'Vui lòng nhập số vé hợp lệ (6 chữ số).');
      return;
    }

    setIsButtonDisabled(true); // Vô hiệu hóa nút
    const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
    const maDai = timDai(selectedProvince);

    try {
      const result = await timKetQua(formattedDate, maDai, ticketNumber);
      const item = result || {
        ngay: formattedDate,
        dai: selectedProvince,
        daySo: ticketNumber,
        giai: null,
      };
      setKetQua(item);
      setModalVisible(true);

      firestore()
        .collection(auth().currentUser.uid)
        .add(item)
        .then(data => {
          console.log('added!', data.id);
        })
        .catch(error => Alert.alert('Thông báo!', error.message));
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi dò kết quả. Vui lòng thử lại.');
    } finally {
      setTimeout(() => setIsButtonDisabled(false), 2000); // Kích hoạt lại nút sau 2 giây
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nhập số vé:</Text>
      <TextInput
        style={styles.input}
        //placehoder để hiện chữ nhạt.
        placeholder="Nhập 6 số trên vé của bạn"
        keyboardType="numeric"
        maxLength={6}
        value={ticketNumber}
        onChangeText={setTicketNumber}
      />

      <Text style={styles.label}>Chọn ngày xổ:</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>
            {moment(selectedDate).format('DD-MM-YYYY')}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <Text style={styles.label}>Chọn đài xổ số:</Text>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedProvince}
          onValueChange={itemValue => setSelectedProvince(itemValue)}
          style={styles.picker}>
          {danhSach.map(item => (
            <Picker.Item key={item.value} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[styles.checkButton, isButtonDisabled && styles.disabledButton]}
        onPress={onCheckTicket}
        disabled={isButtonDisabled}>
        <Text style={styles.checkButtonText}>Dò số</Text>
      </TouchableOpacity>

      <BangKetQuaThuCong
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        ketQua={ketQua}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#0099FF',
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#C4C4C4',
    borderRadius: 8,
    padding: 5,
    marginBottom: 15,
    backgroundColor: '#0099FF',
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#0099FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  datePickerText: {
    fontSize: 20,
    color: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  checkButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default Body;
