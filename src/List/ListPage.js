import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

const ListPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <ImageBackground
      style={styles.container}
      source={require('../images/background.png')}
      resizeMode={'stretch'}>
      <Header loading={loading} setLoading={setLoading} />
      <Body />
      <Footer />
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
          ]}>
          <ActivityIndicator />
        </View>
      )}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
export default ListPage;
