import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { normalize } from '../utils/Dimensions';
const MediaSkeleton = ({ height, width }: { height: number, width: number }) => {
    return (
        <SkeletonPlaceholder
            borderRadius={normalize(12)}
            speed={1000}
        >
            <View
                style={{
                    width,
                    height,
                    alignSelf: 'center'
                }}
            />
        </SkeletonPlaceholder>
    );
};

export default MediaSkeleton;