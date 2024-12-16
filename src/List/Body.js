import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';

const Body = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.content}>
      <TouchableOpacity
        style={styles.mainButton}
        onPress={() => navigation.navigate('Camera')}>
        <Text style={styles.buttonText}>DÒ NHANH</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('DoTay')}>
        <Text style={styles.secondaryButtonText}>DÒ THỦ CÔNG</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.banketquaButton}
        onPress={() => navigation.navigate('BangKq')}>
        <Text style={styles.banketquaButtonText}>BẢNG KẾT QUẢ XỔ SỐ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.lichsuButton}
        onPress={() => navigation.navigate('LichSu')}>
        <Text style={styles.lichsuButtonText}>LỊCH SỬ DÒ VÉ</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goiysoButton}
        onPress={() => navigation.navigate('GoiY')}>
        <Text style={styles.goiysoButtonText}>GỢI Ý SỐ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 2,
    padding: 20,
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 40,
    marginBottom: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 40,
    width: '90%',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  banketquaButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginBottom: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
  },
  banketquaButtonText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  lichsuButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 40,
    width: '90%',
    alignItems: 'center',
  },
  lichsuButtonText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  goiysoButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: '90%',
    alignItems: 'center',
  },
  goiysoButtonText: {
    color: '#0099FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Body;
