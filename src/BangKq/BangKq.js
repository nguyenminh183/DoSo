

import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, ScrollView, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {timDai, timKetQua} from '../utilsBKQ';

const danhSachDai = {
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

// tên giải
const tenGiaiMap = {
  1: 'Giải Đặc Biệt',
  2: 'Giải Nhất',
  3: 'Giải Nhì',
  4: 'Giải Ba',
  5: 'Giải Tư',
  6: 'Giải Năm',
  7: 'Giải Sáu',
  8: 'Giải Bảy',
  9: 'Giải Tám',
};

const BangKq = () => {
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [danhSach, setDanhSach] = useState([]);
  const [ketQua, setKetQua] = useState(null);

  useEffect(() => {
    const date = moment().subtract(1, 'day').toDate();
    setSelectedDate(date);

    const dayOfWeek = moment(date).day();
    const danhSachMoi = danhSachDai[dayOfWeek] || [];

    setDanhSach(danhSachMoi);

    if (danhSachMoi.length > 0) {
      setSelectedProvince(danhSachMoi[0].value);
    }
  }, []);

  const onChangeDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const dayOfWeek = moment(date).day();
      const danhSachMoi = danhSachDai[dayOfWeek] || [];
      setDanhSach(danhSachMoi);

      if (danhSachMoi.length > 0) {
        setSelectedProvince(danhSachMoi[0].value);
      }
    }
  };

  const onCheckResults = async () => {
    const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
    const maDai = timDai(selectedProvince);

    try {
      const result = await timKetQua(formattedDate, maDai);
      if (result) {
        setKetQua(result);
      } else {
        Alert.alert('Thông báo', 'Không có kết quả cho ngày được chọn.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi dò kết quả. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chọn ngày xổ:</Text>
      <Button
        title={moment(selectedDate).format('DD-MM-YYYY')}
        onPress={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      <Text style={styles.label}>Chọn đài xổ số:</Text>
      <Picker
        selectedValue={selectedProvince}
        onValueChange={itemValue => setSelectedProvince(itemValue)}
        style={styles.picker}>
        {danhSach.map(item => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.checkButton}
        onPress={onCheckResults}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
          Xem kết quả
        </Text>
      </TouchableOpacity>

      {ketQua && (
        <ScrollView style={styles.resultContainer}>
          {/* Tiêu đề */}
          <Text style={styles.title}>🎉 Kết quả xổ số 🎉</Text>

          {/* Thông tin Đài xổ và Ngày xổ */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Đài xổ: </Text>
              {danhSach.find(d => d.value === selectedProvince)?.label ||
                'Không xác định'}
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.infoLabel}>Ngày xổ: </Text>
              {moment(selectedDate).format('DD-MM-YYYY')}
            </Text>
          </View>

          {/* Hiển thị kết quả xổ số */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Giải</Text>
            <Text style={styles.headerText}>Số trúng</Text>
          </View>
          {Object.entries(ketQua).map(([giai, danhSachSo]) => (
            <View key={giai} style={styles.tableRow}>
              <Text style={styles.giai}>{tenGiaiMap[giai] || giai}</Text>
              <View style={styles.soContainer}>
                {danhSachSo.map((so, index) => (
                  <Text key={index} style={styles.so}>
                    {so}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      )}
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
    color: 'black',
  },
  picker: {
    backgroundColor: '#0099FF',
    borderRadius: 5,
  },
  checkButton: {
    marginTop: 20,
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  resultContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: 8,
    borderRadius: 5,
  },
  headerText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  
  infoContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 22,
    color: 'black',
    marginVertical: 5,
  },
  infoLabel: {
    fontWeight: '600',
    color: 'black',
  },
  giai: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  soContainer: {
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  so: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 2,
  },
});

export default BangKq;
