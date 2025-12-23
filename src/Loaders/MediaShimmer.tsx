import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { screenWidth, vh, normalize } from '../utils/Dimensions';
const MediaSkeleton = () => {
    const Styles = createDynamicStyles();
    return (
        <SkeletonPlaceholder
            borderRadius={normalize(12)}
            speed={1000}
        >
            <View
                style={[Styles.centerMedia, {
                    width: screenWidth * 0.9,
                    height: vh(240),
                }]}
            />
        </SkeletonPlaceholder>
    );
};

export default MediaSkeleton;
const createDynamicStyles = () => {
    const Styles = StyleSheet.create({
        centerMedia: { alignSelf: 'center' }
    });
    return Styles;
};