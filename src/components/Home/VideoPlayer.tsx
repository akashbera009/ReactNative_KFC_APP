import { View } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
// local video path imports
import { localVideoPath } from '../../utils/VideoPaths';
const VideoPlayerComponent = ({ uri }: { uri: string | undefined }) => {
    return (
        <View style={{ width: '95%', alignSelf: 'center' }}>
            {uri === '' ?
                (
                    <Video
                        source={localVideoPath}
                        style={{ width: '100%', aspectRatio: 16 / 9 }}
                        controls={true}
                        paused={true}
                    />
                ) : (
                    <Video
                        source={{ uri }}
                        style={{ width: '100%', aspectRatio: 20 / 9 }}
                        controls={true}
                        paused={true}
                    />
                )
            }
        </View>
    )
}
export default VideoPlayerComponent