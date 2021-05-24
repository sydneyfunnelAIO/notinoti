import {
  Animated,
  Button,
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Context} from './MyContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressLoader from 'rn-progress-loader';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import color from '../../assets/colors';

export default function Qoute() {
  const {cardStyle, textHeader} = styles;
  const {onLineChannels, ofLineChannels, getChannels,deleteChannel,Loading,setLoading} = useContext(Context);
  const [refresh, setrefresh] = useState(false);
  const onRefresh = useCallback(() => {
    setrefresh(true);
    getChannels().then(()=>{
      setrefresh(false);
    });
    
  }, [refresh]);
  const onDelete = useCallback((data) => {
    setLoading(true);
    deleteChannel(data)

 
    
    
    
  }, [refresh]);
  const renderLeftActions = (channelName)=>{
   
    return (
      
      <TouchableOpacity onPress={()=>{ 
        onDelete(channelName)
         }} style={{ justifyContent:"center"}} >
      <View
      style={{  justifyContent: 'center',}}>
        <Animated.Text
        style={{
          color: 'white',
          paddingHorizontal: wp(5),
          marginHorizontal:wp(5),
          textAlign:"right",
          fontWeight: '600',
      
        }}>
          
          <Icon name="md-trash-bin" size={40} />
        </Animated.Text>
        
    
    </View>
        </TouchableOpacity>
    )   
  }
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
      }>
      <View style={{paddingBottom: hp(5),}}>
        
        {onLineChannels.map((channel) => (
            <View key={channel.channelName}  style={{backgroundColor:color.delete, marginVertical:hp(1)   }} >
                <Swipeable renderRightActions={()=> renderLeftActions(channel.channelName)}>
                <View style={{backgroundColor:"green", marginVertical:hp(-2)}} >
                <View style={cardStyle}>
            <View style={{paddingTop: hp(0.8), paddingBottom: hp(1.3)}}>
              <Image
                style={{
                  borderRadius: 50,
                  width: wp(20),
                  height: wp(20),
                  borderColor: color.primary,
                  borderWidth: 3,
                }}
                source={{uri: channel.ChannelPic}}></Image>
              <View
                style={{
                  backgroundColor: color.delete,
                  marginTop: hp(9),
                  paddingHorizontal: wp(1.5),
                  paddingVertical: hp(0.5),
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: color.dark,
                }}>
                <Text style={{color: color.white, fontSize: hp(2.2)}}>
                  {channel.type}
                </Text>
              </View>
            </View>
            <View style={{padding:hp(1)}}>
              <Text style={textHeader}>{channel.channelName}</Text>
            </View>
            <View>
  <Icon name="chevron-back-outline"  size={30} style={{color:"white"}} />
  </View>
          </View>
                </View>

          </Swipeable>
            </View>
        
         
        ))}

        {ofLineChannels.map((channel) => (
          
          
       
        
          <View key={channel.channelName}  style={{backgroundColor:color.delete, marginVertical:hp(1)   }} >
            <Swipeable friction={2}  leftThreshold={30}
            rightThreshold={40}  renderRightActions={()=> renderLeftActions(channel.channelName)}>
  
    <View style={{backgroundColor:"green", marginVertical:hp(-2)}} >
    <View style={cardStyle}>
  <View style={{paddingTop: hp(0.8), paddingBottom: hp(1.3)}}>
    <Fragment>
      <View>
        <Image
          style={{
            tintColor: 'gray',
            borderRadius: 50,
            width: wp(20),
            height: wp(20),
            borderColor: color.primary,
            borderWidth: 3,
          }}
          source={{uri: channel.ChannelPic}}></Image>
        <Image
          style={{
            position: 'absolute',
            opacity: 0.3,
            borderRadius: 50,
            width: wp(20),
            backgroundColor: 'black',
            height: wp(20),
          }}
          source={{uri: channel.ChannelPic}}></Image>
      </View>
    </Fragment>
  </View>

  <View style={{padding: hp(1)}}>
    <Text style={textHeader}>{channel.channelName}</Text>
  </View>
  <View>
  <Icon name="chevron-back-outline"  size={30} style={{color:"white"}} />
  </View>
  
</View>  
    </View>
      
      


</Swipeable> 
       </View>
        ))}
      </View>
      <ProgressLoader
                visible={Loading}
                isModal={true} isHUD={true}
                hudColor={"#0e0e10"}
                color={color.primary} />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  butStyle:{
    backgroundColor:color.primary
  },
  cardStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: hp(1.5),
    padding: wp(5),
    
    overflow: 'hidden',
    alignItems: 'center',

    backgroundColor: color.dark,
  },
  textHeader: {paddingBottom: wp(1), fontSize: hp(2.3), width: wp(45), color: color.white}
 
});
