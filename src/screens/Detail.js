import React,{useContext, useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {Context} from '../components/MyContext'
import Header from '../components/Header';
import TwitterQuote from '../components/TwitterQuote';
import color from '../../assets/colors';

export default function Detail(props) {
    const {registerTwitter, getTwitter} = useContext(Context);
    useEffect(() => {
      getTwitter();

    }, [])
    const {viewStyle} = styles;

    return (

      <View>
          <Header functions={registerTwitter} type="Twitter" />
          <View style={viewStyle}>
              <TwitterQuote />
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

