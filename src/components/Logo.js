import { Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react'

export default function Logo() {
    return (
       <View style={{flexDirection:"row", justifyContent:"center" }} >
          
           <Text style={{fontWeight:"bold",fontFamily: "Papyrus" , fontSize:25}} > NotiNoti </Text>
       </View>
    )
}
