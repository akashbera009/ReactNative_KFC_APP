import { StyleSheet, View } from 'react-native'
import React from 'react'
import Video from 'react-native-video';
// local video path imports
import { localVideoPath } from '../utils/VideoPaths';
const VideoPlayerComponent = ({ uri, paused = false, onLoad, onLoadStart, muted, repeat }: { uri: string | undefined, paused?: boolean, onLoad?: () => void, onLoadStart?: () => void, muted?: boolean, repeat?: boolean }) => {
    const Styles = createDynamicStyles();
    const controlConfig = {
        hideFullscreen: false,
        hideDuration: false,
        hideSeekBar: false,
        hideForward: false,
        hideSettingButton: false
    }

    return (
        <View style={Styles.videoContainer}>
            {uri === '' ?
                (
                    <Video
                        source={localVideoPath}
                        controlsStyles={
                            controlConfig
                        }
                        style={[Styles.videoPlayer, { aspectRatio: 16 / 9 }]}
                        fullscreen={false}
                        controls={true}
                        repeat={true}
                        paused={true}
                    />
                ) : (
                    <Video
                        source={{ uri }}
                        style={[Styles.videoPlayer, { aspectRatio: 5 / 3 }]}
                        controls={true}
                        paused={paused}
                        onLoad={onLoad}
                        onLoadStart={onLoadStart}
                        muted={muted}
                        repeat={repeat}
                    />
                )
            }
        </View>
    )
}
export default VideoPlayerComponent
const createDynamicStyles = () => {
    const Styles = StyleSheet.create({
        videoContainer: {
            width: '100%',
            height: '100%',
            alignSelf: 'center'
        },
        videoPlayer: {
            width: '100%'
        }
    })
    return Styles;
}