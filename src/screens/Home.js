import {Context, MyContext} from '../components/MyContext'
import React,{useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import Header from '../components/Header';
import Qoute from '../components/Qoute';
import color from '../../assets/colors';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const defaultAppMessaging = messaging();
export default function Home(props) {
    const { registerChannel,getChannels } = useContext(Context);
    useEffect(() => {
      getChannels();

    }, [])
    const {viewStyle} = styles;

    return (

           <View>
               <Header type="Twitch" functions={
                 registerChannel
               }  />
               <View style={viewStyle}>
            <Qoute />
          </View>
           </View>

    )
}
const styles = StyleSheet.create({
    viewStyle: {
      backgroundColor: color.secondary,
      height: hp(80),
    },
  });
