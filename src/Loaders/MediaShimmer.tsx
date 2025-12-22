import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { screenWidth, vh, normalize } from '../utils/Dimensions';
const MediaSkeleton = () => {
    return (
        <SkeletonPlaceholder
            borderRadius={normalize(12)}
            speed={1000}
        >
            <View
                style={{
                    width: screenWidth * 0.9,
                    height: vh(240),
                    alignSelf: 'center',
                }}
            />
        </SkeletonPlaceholder>
    );
};

export default MediaSkeleton;
