import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function GoiY() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [suggestedNumbers, setSuggestedNumbers] = useState([]);

  // Hàm để tạo gợi ý số từ thông tin cá nhân
  const generateSuggestedNumbers = () => {
    const randomNumbers = [];
    const nameSum = name
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const birthdateSum = birthdate
      .split('-')
      .join('')
      .split('')
      .reduce((sum, num) => sum + parseInt(num, 10), 0);
    const phoneSum = phoneNumber
      .split('')
      .reduce((sum, num) => sum + parseInt(num, 10), 0);

    randomNumbers.push((nameSum % 100).toString().padStart(2, '0'));
    randomNumbers.push((birthdateSum % 100).toString().padStart(2, '0'));
    randomNumbers.push((phoneSum % 100).toString().padStart(2, '0'));

    setSuggestedNumbers(randomNumbers);
  };

  // Hàm xử lý chọn ngày
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(birthdate);
    setShowDatePicker(false);
    setBirthdate(currentDate.toISOString().split('T')[0]); // Lưu ngày ở định dạng yyyy-mm-dd
  };

  return (
    <View style={styles.container}>
      {/* Thêm hình ảnh ở đầu giao diện */}
      <Image source={require('../images/AI.png')} style={styles.image} />
      <View style={styles.overlay}>
      <Text style={styles.title1}>Dò Số Nhanh sử dụng nền tảng trí tuệ nhân tạo (AI) để tính toán và gợi ý cho bạn các con số có xác suất trúng phù hợp với bạn. </Text>
        <Text style={styles.title}>Gợi ý số may mắn</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập họ và tên của bạn"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
        />

        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.input}>
          <Text style={{color: birthdate ? '#333' : '#aaa'}}>
            {birthdate ? birthdate : 'Chọn ngày sinh'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={birthdate ? new Date(birthdate) : new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#aaa"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={generateSuggestedNumbers}>
          <Text style={styles.buttonText}>Xem gợi ý số</Text>
        </TouchableOpacity>

        {suggestedNumbers.length > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Các bộ số may mắn phù hợp với bạn:</Text>
            <Text style={styles.suggestedNumbers}>
              {suggestedNumbers.join(' - ')}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  image: {
    position: 'absolute', // Đặt ảnh phía sau
    top: 0,
    left: 0,
    width: Dimensions.get('window').width, // Đảm bảo chiều rộng bằng kích thước màn hình
    height: 200, // Chiều cao cố định cho phần đầu
    resizeMode: 'cover', // Căn chỉnh ảnh để giữ tỷ lệ và phủ kín
  },
  overlay: {
    flex: 1,
    paddingTop: 200, // Đẩy nội dung xuống dưới ảnh
    paddingHorizontal: 20,
  },
  title1: {
    fontSize: 16,
    textAlign: 'justify',
    color: '#333',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bb5',
  },
  suggestedNumbers: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#007bb5',
    marginTop: 8,
  },
});
