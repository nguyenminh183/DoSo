// import React, { useState, useEffect } from 'react';
// import {
//   Alert,
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image
// } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';

// async function onFacebookButtonPress() {
//   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
//   if (result.isCancelled) {
//     throw 'User cancelled the login process';
//   }
//   const data = await AccessToken.getCurrentAccessToken();
//   if (!data) {
//     throw 'Something went wrong obtaining access token';
//   }
//   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
//   return auth().signInWithCredential(facebookCredential);
// }

// function Login() {
//   const [confirm, setConfirm] = useState(null);
//   const [phone, setPhone] = useState('');
//   const [code, setCode] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(user => {
//       if (user) {
//         Alert.alert('Thông báo', 'Đăng nhập thành công!');
//       }
//     });
//     return subscriber;
//   }, []);

//   const isValidPhoneNumber = (phoneNumber) => {
//     if (!phoneNumber.startsWith('0')) {
//       setErrorMessage('Số điện thoại phải bắt đầu bằng 0.');
//       return false;
//     }
//     if (phoneNumber.length > 10) {
//       setErrorMessage('Số điện thoại không được vượt quá 10 ký tự.');
//       return false;
//     }
//     setErrorMessage('');
//     return true;
//   };

//   async function signInWithPhoneNumber(phoneNumber) {
//     if (!isValidPhoneNumber(phone)) return;

//     try {
//       const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
//       setConfirm(confirmation);
//     } catch (error) {
//       Alert.alert('Thông báo', error.message);
//     }
//   }

//   async function confirmCode() {
//     try {
//       await confirm.confirm(code);
//       Alert.alert('Thông báo', 'Đăng nhập thành công!');
//     } catch (error) {
//       Alert.alert('Thông báo', 'Mã OTP không đúng.');
//     }
//   }

//   if (!confirm) {
//     return (
//       <View style={styles.container}>
//         <Image
//         source={require('../images/dsn.png')}  // Đường dẫn tới hình ảnh
//         style={styles.logo}
//       />
//         <Text style={styles.title}>Đăng nhập</Text>
//         <TextInput
//           style={[styles.input, errorMessage ? styles.inputError : null]}
//           keyboardType="phone-pad"
//           placeholder="Nhập số điện thoại"
//           placeholderTextColor="#aaa"
//           value={phone}
//           onChangeText={(text) => {
//             setPhone(text);
//             if (text.length <= 10) setErrorMessage('');
//           }}
//         />
//         {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
//         <TouchableOpacity
//           style={[styles.button, phone.length !== 10 && styles.buttonDisabled]}
//           disabled={phone.length !== 10 || errorMessage !== ''}
//           onPress={() =>
//             signInWithPhoneNumber(
//               `+84 ${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`
//             )
//           }
//         >
//           <Text style={styles.buttonText}>Đăng nhập bằng số điện thoại</Text>
//         </TouchableOpacity>
//         <Text style={styles.orText}>HOẶC</Text>
//         <TouchableOpacity
//           style={[styles.button, styles.facebookButton]}
//           onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}
//         >
//           <Text style={styles.buttonText}>Đăng nhập bằng Facebook</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Nhập mã OTP</Text>
//       <TextInput
//         style={styles.input}
//         keyboardType="number-pad"
//         placeholder="Nhập mã OTP"
//         placeholderTextColor="#aaa"
//         value={code}
//         onChangeText={text => setCode(text)}
//       />
//       <TouchableOpacity style={styles.button} onPress={confirmCode}>
//         <Text style={styles.buttonText}>Xác nhận mã</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//   },
//   logo: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//     alignSelf: 'center',  //logo ở giữa
//     marginTop: -250,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#333',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     color: 'black',
//   },
//   inputError: {
//     borderColor: '#FF0000', // Viền đỏ khi có lỗi
//   },
//   errorText: {
//     color: '#FF0000',
//     marginBottom: 10,
//     fontSize: 14,
//   },
//   button: {
//     height: 50,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#007BFF',
//     marginBottom: 15,
//   },
//   buttonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   facebookButton: {
//     backgroundColor: '#4267B2',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   orText: {
//     textAlign: 'center',
//     marginVertical: 10,
//     color: '#666',
//   },
// });

// export default Login;

import React, {useState, useEffect} from 'react';
import {
  Alert,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

async function onFacebookButtonPress() {
  const result = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }
  const data = await AccessToken.getCurrentAccessToken();
  if (!data) {
    throw 'Something went wrong obtaining access token';
  }
  const facebookCredential = auth.FacebookAuthProvider.credential(
    data.accessToken,
  );
  return auth().signInWithCredential(facebookCredential);
}

function Login() {
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        Alert.alert('Thông báo', 'Đăng nhập thành công!');
      }
    });
    return subscriber;
  }, []);

  const isValidPhoneNumber = phoneNumber => {
    if (!phoneNumber.startsWith('0')) {
      setErrorMessage('Số điện thoại phải bắt đầu bằng 0.');
      return false;
    }
    if (phoneNumber.length > 10) {
      setErrorMessage('Số điện thoại không được vượt quá 10 ký tự.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  async function signInWithPhoneNumber(phoneNumber) {
    if (!isValidPhoneNumber(phone)) return;

    setLoading(true); // Bắt đầu loading
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      Alert.alert('Thông báo', error.message);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  }

  async function confirmCode() {
    setLoading(true); // Bắt đầu loading
    try {
      await confirm.confirm(code);
      Alert.alert('Thông báo', 'Đăng nhập thành công!');
    } catch (error) {
      Alert.alert('Thông báo', 'Mã OTP không đúng.');
    } finally {
      setLoading(false); // Kết thúc loading
    }
  }

  if (!confirm) {
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/dsn.png')} // Đường dẫn tới hình ảnh
          style={styles.logo}
        />
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          keyboardType="phone-pad"
          placeholder="Nhập số điện thoại"
          placeholderTextColor="#aaa"
          value={phone}
          onChangeText={text => {
            setPhone(text);
            if (text.length <= 10) setErrorMessage('');
          }}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <TouchableOpacity
          style={[styles.button, phone.length !== 10 && styles.buttonDisabled]}
          disabled={phone.length !== 10 || errorMessage !== '' || loading}
          onPress={() =>
            signInWithPhoneNumber(
              `+84 ${phone.slice(1, 4)}-${phone.slice(4, 7)}-${phone.slice(7)}`,
            )
          }>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập bằng số điện thoại</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.orText}>HOẶC</Text>
        <TouchableOpacity
          style={[styles.button, styles.facebookButton]}
          onPress={() =>
            onFacebookButtonPress().then(() =>
              console.log('Signed in with Facebook!'),
            )
          }>
          <Text style={styles.buttonText}>Đăng nhập bằng Facebook</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã OTP</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        placeholder="Nhập mã OTP"
        placeholderTextColor="#aaa"
        value={code}
        onChangeText={text => setCode(text)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={confirmCode}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Xác nhận mã</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: -250,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: 'black',
  },
  inputError: {
    borderColor: '#FF0000', // Viền đỏ khi có lỗi
  },
  errorText: {
    color: '#FF0000',
    marginBottom: 10,
    fontSize: 14,
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
});

export default Login;
