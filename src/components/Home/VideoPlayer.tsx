import { View } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import { localVideoPath } from '../../utils/VideoPaths';
const VideoPlayerComponent = () => { 
    return (
        <View style={{ width: '95%', alignSelf: 'center' }}>
            <Video
                source={localVideoPath} 
                // source={{   
                //     uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                // }}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                controls = {true}

            />
        </View>
    )
}

export default VideoPlayerComponent