// import React, {useEffect, useState} from 'react';
// import {
//   Alert,
//   FlatList,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';


// const Item = ({item, onPress, backgroundColor, textColor}) => (
//   <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
//     <Text style={[styles.title, {color: textColor}]}>{item.dai}</Text>
//     <Text style={[styles.title, {color: textColor}]}>{item.daySo}</Text>
//     <Text style={[styles.title, {color: textColor}]}>{item.ngay}</Text>
//   </TouchableOpacity>
// );

// const LichSu = () => {
//   const [array, setArray] = useState([]);
//   const [selectedId, setSelectedId] = useState();
//   useEffect(() => {
//     firestore()
//       .collection(auth().currentUser.uid)
//       .get()
//       .then(querySnapshot => {
//         console.log('Total: ', querySnapshot.size);

//         querySnapshot.forEach(documentSnapshot => {
//           console.log(documentSnapshot.id, documentSnapshot.data());
//           array.push(documentSnapshot.data());
//         });
//         setArray([...array]);
//       })
//       .catch(error => Alert.alert('', error.message));
//   }, []);

//   const renderItem = ({item}) => {
//     const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
//     const color = item.id === selectedId ? 'white' : 'black';

//     return (
//       <Item
//         item={item}
//         onPress={() => setSelectedId(item.id)}
//         backgroundColor={backgroundColor}
//         textColor={color}
//       />
//     );
//   };

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.container}>
//         <FlatList
//           data={array}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index}
//           extraData={selectedId}
//         />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   item: {
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 32,
//   },
// });

// export default LichSu;

import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { object3 } from '../utils';

const Item = ({ item, index, onPress, isSelected }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.item,
      isSelected ? styles.selectedItem : styles.unselectedItem,
    ]}>
    <Text style={styles.indexText}>#{index + 1}</Text>
    <View style={styles.infoContainer}>
      <Text style={styles.daiText}>Đài: {object3[item.dai]}</Text>
      <Text style={styles.daySoText}>🎫 {item.daySo}</Text>
      <Text style={styles.dateText}>📅 {item.ngay}</Text>
      {item.giai ? (
        <Text style={styles.giaiText}>🏆 Giải: {item.giai}</Text>
      ) : (
        <Text style={styles.noGiaiText}>❌ Không trúng</Text>
      )}
    </View>
  </TouchableOpacity>
);

const LichSu = () => {
  const [array, setArray] = useState([]);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    firestore()
      .collection(auth().currentUser.uid)
      .get()
      .then(querySnapshot => {
        const tempArray = [];
        querySnapshot.forEach(documentSnapshot => {
          tempArray.push({
            id: documentSnapshot.id,
            ...documentSnapshot.data(),
          });
        });
        setArray(tempArray);
      })
      .catch(error => Alert.alert('Lỗi', error.message));
  }, []);

  const renderItem = ({ item, index }) => {
    const isSelected = item.id === selectedId;
    return (
      <Item
        item={item}
        index={index}
        onPress={() => setSelectedId(item.id)}
        isSelected={isSelected}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.totalText}>📊 Tổng vé số đã dò: {array.length}</Text>
        </View>
        <FlatList
          data={array}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          extraData={selectedId}
          contentContainerStyle={styles.listContent}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 16,
    backgroundColor: 'red',
    alignItems: 'center',
  },
  totalText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  selectedItem: {
    backgroundColor: '#bdd1c5',
  },
  unselectedItem: {
    backgroundColor: '#FFFFFF',
  },
  indexText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  daiText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333333',
  },
  daySoText: {
    fontSize: 18,
    color: 'red',
    marginVertical: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#666666',
  },
  giaiText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  noGiaiText: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default LichSu;
