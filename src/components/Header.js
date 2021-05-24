import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Context} from './MyContext';
import Modal from 'react-native-modal';
import color from '../../assets/colors';

export default function Header(props) {
  const {viewStyle, inputStyle, toStyle, pressable} = styles;
  const [modalVisible, setModalVisible] = useState(false);

  const {setInput, Input, Loading, setLoading} = useContext(Context);
  return (
    <View>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        backdropOpacity={0.3}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.modalView}>
          {(() => {
            if (props.type == 'Youtube') {
              return (
                <View style={{padding:20}} >
                  <Text style={styles.modalTitle}>
                    TYPE YOUTUBE CHANNEL URL 
                  </Text>
                  <Text style={styles.modalText}>
                 1. Open the YouTube app.
                  </Text>

                  <Text style={styles.modalText}>
                 2. Open the YouTube Channel.

                  </Text>
                  <Text style={styles.modalText}>
                 3. Click on the 3 dots in the right upper corner and click "Share".


                  </Text>
                  <Text style={styles.modalText}>
                4.  Click the option "Copy link" which will copy the Channel link to your clipboard.

                  </Text>
                  <Text style={styles.modalText}>
                5.  Paste copied link to area.

                  </Text>

                </View>
              );
            } else if (props.type == 'Twitter') {
              return (
                <View style={{padding:20}} >
                <Text style={styles.modalTitle}>
                   TWITTER
                </Text>
                
               
                <Text style={styles.modalText}>
               1.  get twitter username ( which includes `@` )
                </Text>
                <Text style={styles.modalText}>
               2. Then type username  without `@` 
                </Text>
              </View>
              );
            } else if (props.type == 'Twitch') {
              return (
                <View style={{padding:20}} >
                  <Text style={styles.modalTitle}>
                    TWITCH
                  </Text>
                  <Text style={styles.modalText}>
                 1.Type channel name directly.

                  </Text>
                 
                  
                  
                </View>
              );
            }
          })()}
        </View>
      </Modal>

      <View style={viewStyle}>
        <TextInput
          onChangeText={(data) => setInput(data)}
          style={inputStyle}
          maxLength={100}
          placeholder={'Fill to add new channel'}
          value={Input}
          placeholderTextColor={color.white}></TextInput>
        <TouchableOpacity
          onPress={() => {
            let input;
            if (Input.length > 0 && !Input.includes(' ')) {
              if (props.type == 'Youtube') {
                if (Input.includes('youtube.com')) {
                  let link = Input.split('/');
                  console.log(Input)
                   input = link[ link.length - 1]
                  
                } else {
                  input = Input;
                }
              }
              else if(props.type == "Twitter"){
                if(Input.includes("@")){
                  input = Input.split("@")[1];
                }
                else{
                  input = Input;
                }
              } else {
                input = Input;
              }

              setLoading(true);
              props.functions(input);
              setInput('');
            } else {
              Alert.alert(
                'Warning',
                ' Channel name can not be empty or can not includes spaces ',
              );
            }
          }}
          style={toStyle}>
          <Text
            style={{
              fontSize: hp('2.5%'),
              color: color.dark2,
              fontWeight: 'bold',
            }}>
            ADD
          </Text>
        </TouchableOpacity>
        <Pressable
          style={pressable}
          onPress={() => {
            setModalVisible(true);
          }}>
          <Text style={{fontSize: wp(8), color: color.white}}>?</Text>
        </Pressable>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: color.secondary,
    borderBottomWidth: 2,
    borderColor: color.bordercolor,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: wp(4),

    alignItems: 'center',
  },

  inputStyle: {
    color: color.white,
    borderBottomWidth: 1.2,
    borderColor: 'white',
    width: wp(45),
    fontSize: hp(2.2),
  },
  toStyle: {
    backgroundColor: color.primary,
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3.0),
    borderRadius: 3,

    alignItems: 'center',
    justifyContent: 'center',
  },
  pressable: {
    backgroundColor: color.dark,
    width: wp(12),
    height: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(12),
    borderColor: color.white,
    borderWidth: 1,
  },
  modalView: {
    width: wp(95),
    height: hp(45),
    backgroundColor: '#0e0e10',
    display: 'flex',
    marginHorizontal: wp(5),
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    color:"white",
    textAlign:"center",
    marginBottom:25,
    fontSize:20
  },
  modalText: {
    marginBottom: 15,
    color: 'white',
    paddingHorizontal:0,
    fontSize:16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    height: hp(200),
  },
});
