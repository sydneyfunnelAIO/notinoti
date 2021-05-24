import React,{useContext, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Context} from '../components/MyContext'
import Header from '../components/Header';
import YoutubeQuote from '../components/YoutubeQoute';
import color from '../../assets/colors';

export default function Youtube(props) {
    const {registerYoutube, getYoutube} = useContext(Context);
    useEffect(() => {
      getYoutube();

    }, [])
    const {viewStyle} = styles;

    return (

      <View>
          <Header type="Youtube" functions={registerYoutube} />
          <View style={viewStyle}>
          <YoutubeQuote/>
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

