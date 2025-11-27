import { View } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
import { localVideoPath } from '../../utils/VideoPaths';
const VideoPlayerComponent = () => {
    return (
        <View style={{ width: '95%', alignSelf: 'center' }}>
            <Video
                source={localVideoPath}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
                controls={true}
                paused={true}
            />
        </View>
    )
}

export default VideoPlayerComponent