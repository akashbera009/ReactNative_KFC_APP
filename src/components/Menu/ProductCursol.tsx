import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Dimensions,
    StyleSheet,
    Animated,
    ImageSourcePropType,
    Image,
} from 'react-native';
const { width } = Dimensions.get('window');
// utils
import Images from '../../utils/LocalImages';
import { useThemeColors } from '../../utils/Colors';
import { normalize, vh, vw } from '../../utils/Dimensions';
// width calculaiton
const ITEM_WIDTH = width * 0.65;
const SPACING = width * 0.025;
const SNAP_INTERVAL = ITEM_WIDTH + SPACING * 2;

export default function ImageCarousel() {
    const [index, setIndex] = useState(0);
    const Colors = useThemeColors();
    const styles = createDynamicStyles(Colors);
    const scrollRef = useRef<ScrollView | null>(null);
    const images: ImageSourcePropType[] = [
        Images.FoodImage1,
        Images.FoodImage3,
        Images.FoodImage2,
        Images.FoodImage4,
        Images.FoodImage5,
        Images.FoodImage6,
    ];
    useEffect(() => {
        const timer = setInterval((): void => {
            const nextIndex: number = (index + 1) % images.length;
            scrollRef.current?.scrollTo({
                x: nextIndex * SNAP_INTERVAL,
                animated: true,
            });
            setIndex(nextIndex);
        }, 2000);

        return () => clearInterval(timer);
    }, [index , images.length]);
    const scrollX = useRef<Animated.Value>(new Animated.Value(0)).current;
    return (
        <View>
            <Animated.ScrollView
                ref={scrollRef}
                horizontal
                snapToInterval={SNAP_INTERVAL}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: (width - SNAP_INTERVAL) / 2,
                }}
                onMomentumScrollEnd={(e) => {
                    const newIndex = Math.round(
                        e.nativeEvent.contentOffset.x / SNAP_INTERVAL
                    );
                    setIndex(newIndex);
                }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
            >
                {images.map((img, i) => {
                    const inputRange = [
                        (i - 1) * SNAP_INTERVAL,
                        i * SNAP_INTERVAL,
                        (i + 1) * SNAP_INTERVAL,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1.15, 0.9],
                        extrapolate: 'clamp',
                    });
                    const opacity =scrollX.interpolate({
                        inputRange , 
                        outputRange:[.7 , 1 , .7],
                        extrapolate : 'clamp'
                    })
                    return (
                        <Animated.View
                            key={i}
                            style={[styles.imageContainer, {
                                transform: [{ scale }],
                                opacity :opacity
                            }]} >
                            <Image
                                source={img}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </Animated.View>
                    )
                })}
            </Animated.ScrollView>
            <View style={styles.dots}>
                {images.map((_, i) => (
                    <View
                        key={i}
                        style={[
                            styles.dot,
                            index === i && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View >
    );
}

const createDynamicStyles = (Colors: ColorType) => {
    const Styles = StyleSheet.create({
        imageContainer: {
            overflow: 'hidden',
            marginHorizontal: SPACING,
        },
        image: {
            width: ITEM_WIDTH,
            height: vh(300),
        },
        dots: {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: vh(8),
        },
        dot: {
            width: normalize(8),
            height: normalize(8),
            borderRadius: normalize(4),
            backgroundColor: Colors.bodyColor,
            borderColor : Colors.textFadeBlack, 
            borderWidth : normalize(1),
            marginHorizontal: vw(4),
        },
        activeDot: {
            backgroundColor: Colors.textBlack,
        }
    })
    return Styles;
};