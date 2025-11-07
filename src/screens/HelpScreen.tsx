import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HelpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View>
      <Text
      // style={}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dicta in culpa optio nostrum adipisci, corporis repudiandae expedita dignissimos laborum facilis explicabo ipsa laboriosam quisquam mollitia, iusto eos. Quibusdam, unde cum. Quasi temporibus, laborum, cumque, similique ab debitis enim molestiae consectetur nostrum aliquid inventore doloribus accusamus? Nam veritatis tempore repudiandae nostrum iste deleniti voluptas veniam earum ab, ex quod tenetur libero dicta aut vitae dolor deserunt debitis aspernatur laborum a quisquam! Ducimus placeat omnis tempora excepturi laudantium, id quis libero saepe numquam aliquam! Cumque tempore veniam fuga veritatis corrupti assumenda officia molestias. Magnam odit et voluptate aperiam nulla laboriosam quis qui veritatis ullam cumque dolore nisi a fugit, molestiae inventore praesentium eos accusantium totam voluptatem iure aspernatur quas dolorum doloribus? Quia porro neque, at et, voluptatem eius nemo enim possimus alias error repudiandae ea delectus est! Vero eius nesciunt maiores provident veritatis nobis commodi, culpa officia reiciendis expedita repudiandae alias totam eligendi consequatur velit numquam! Harum ratione quis reiciendis veritatis odit enim fuga ipsam odio officia consectetur maxime similique nihil ipsum, blanditiis quo sapiente excepturi velit, sit ut sed explicabo error a corrupti? Harum consequuntur repellat dolore laborum, rerum, assumenda unde, consequatur modi dicta beatae illum labore ducimus libero delectus.
      </Text>
      <Text>HelpScreen</Text>
      <TouchableOpacity
        onPress={() => navigation.pop()}>

        <Text>go Back</Text>
      </TouchableOpacity>
    </View >
  )
}

export default HelpScreen