import {
    Animated,
    Button,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, {
    useCallback,
    useContext,
    useState,
} from 'react';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Context} from './MyContext';
import Icon from 'react-native-vector-icons/Ionicons';
import ProgressLoader from 'rn-progress-loader';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import color from '../../assets/colors';

export default function YoutubeQuote() {
    const {cardStyle, textHeader} = styles;
    const {Youtube, getYoutube, deleteYoutube, Loading, setLoading} = useContext(
      Context,
    );
    const [refresh, setrefresh] = useState(false);
    const onRefresh = useCallback(() => {
      setrefresh(true);
      getYoutube().then(() => {
        setrefresh(false);
      });
    }, [refresh]);
    const onDelete = useCallback(
      (data) => {
        setLoading(true);
        deleteYoutube(data);
      },
      [refresh],
    );
    const renderLeftActions = (channelName) => {
      return (
        <TouchableOpacity
          onPress={() => {
            onDelete(channelName);
          }}
          style={{justifyContent: 'center'}}>
          <View style={{justifyContent: 'center'}}>
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: wp(5),
                marginHorizontal: wp(5),
                textAlign: 'right',
                fontWeight: '600',
              }}>
              <Icon name="md-trash-bin" size={40} />
            </Animated.Text>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }>
        <View style={{paddingBottom: hp(5)}}>
          {Youtube.map((channel) => (
            <View
              key={channel.channelId}
              style={{backgroundColor: color.delete, marginVertical: hp(1)}}>
              <Swipeable
                friction={2}
                leftThreshold={30}
                rightThreshold={40}
                renderRightActions={() => renderLeftActions(channel.channelId)}>
                <View style={{backgroundColor: 'green', marginVertical: hp(-2)}}>
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
                        source={{uri: channel.channelPicture}}></Image>
                    </View>
  
                    <View style={{padding: hp(1)}}>
                      <Text style={textHeader}>{channel.channelTitle}</Text>
                    </View>
                    <View>
                      <Icon
                        name="chevron-back-outline"
                        size={30}
                        style={{color: 'white'}}
                      />
                    </View>
                  </View>
                </View>
              </Swipeable>
            </View>
          ))}
        </View>
        <ProgressLoader
          visible={Loading}
          isModal={true}
          isHUD={true}
          hudColor={'#0e0e10'}
          color={color.primary}
        />
      </ScrollView>
    );
  }
  const styles = StyleSheet.create({
    butStyle: {
      backgroundColor: color.primary,
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
    textHeader: {
      paddingBottom: wp(1),
      fontSize: hp(2.3),
      width: wp(45),
      color: color.white,
    },
  });
  