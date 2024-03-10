import Typography from "@/src/components/Typography";
import { FlashList } from "@shopify/flash-list";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  UnistylesRuntime,
  createStyleSheet,
  mq,
  useStyles,
} from "react-native-unistyles";
import React from "react";
import { Feed, NewsItem } from "@/src/types/types";
import { AntDesign } from "@expo/vector-icons";
import { XMLParser } from "fast-xml-parser";
import FeedCard from "@/src/components/FeedCard";
import { BlurView } from "expo-blur";
import { format } from "date-fns";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import ActiveFeedIndicator from "@/src/components/ActiveFeedIndicator";
import FeedSelector from "@/src/components/FeedSelector";
import useSettingsStore from "@/src/store/useSettingsStore";
import useScreenType from "@/src/hooks/useScreenType";
import hapticFeedback from "@/src/utils/hapticFeedback";
import useGesturesSettingsStore from "@/src/store/useGesturesSettingsStore";
import useFeedStore from "@/src/store/useFeedStore";
import useGetFeedItems from "@/src/hooks/queries/useGetFeedItems";

export default function Screen() {
  const { styles, theme } = useStyles(stylesheet);
  const { width } = useWindowDimensions();
  const feedSelectorPositions = [-(width - 52 - 64), 0];
  const nextButtonPositions = [0, (width - 120) / 2 - 30, width - 120 - 64];
  const colorScheme = useColorScheme();
  const settingsStore = useSettingsStore(({ settings }) => settings);
  const { top, bottom } = useSafeAreaInsets();
  const gesturesSettingsStore = useGesturesSettingsStore();
  const flashlistRef = React.useRef<FlashList<NewsItem>>(null);
  const feedSelectorSharedValue = useSharedValue(feedSelectorPositions[1]);
  const nextButtonSharedValueX = useSharedValue(nextButtonPositions[0]);
  const nextButtonSharedValueY = useSharedValue(0);
  const nextButtonPosition = useSharedValue<"left" | "center" | "right">(
    "left"
  );
  const nextButtonTranslateXStart = useSharedValue(0);
  const nextButtonTranslateYStart = useSharedValue(0);
  const flashlistPositionIndex = useSharedValue(0);
  const { isMobile } = useScreenType();
  const feedStore = useFeedStore();
  const feedItemsQuery = useGetFeedItems(Feed.ForYou);

  const onNext = React.useCallback(() => {
    if (!flashlistRef.current) return;

    flashlistRef.current.scrollToIndex({
      index: flashlistPositionIndex.value + 1,
      animated: true,
    });
    flashlistPositionIndex.value = flashlistPositionIndex.value + 1;
  }, []);

  const scrollToEnd = React.useCallback(() => {
    if (!flashlistRef.current) return;

    flashlistRef.current.scrollToEnd({
      animated: true,
    });
  }, []);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(onNext)();
  });

  const longPress = Gesture.LongPress()
    .onStart(() => {
      runOnJS(scrollToEnd)();
    })
    .enabled(gesturesSettingsStore.settings.longPressNextButton);

  const pan = Gesture.Pan()
    .onStart(() => {
      nextButtonTranslateXStart.value = nextButtonSharedValueX.value;
      nextButtonTranslateYStart.value = nextButtonSharedValueY.value;
    })
    .onUpdate((event) => {
      nextButtonSharedValueX.value =
        event.translationX + nextButtonTranslateXStart.value;
      nextButtonSharedValueY.value =
        event.translationY + nextButtonTranslateYStart.value;
    })
    .onEnd((event) => {
      const positionX = event.translationX + nextButtonSharedValueX.value;

      if (positionX > width * 0.6) {
        nextButtonSharedValueX.value = withSpring(nextButtonPositions[2]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[0]);
        nextButtonPosition.value = "right";
      } else if (
        positionX < width * 0.3 &&
        nextButtonPosition.value !== "right"
      ) {
        nextButtonSharedValueX.value = withSpring(nextButtonPositions[0]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[1]);
        nextButtonPosition.value = "left";
      } else if (
        positionX < width * 0.3 &&
        nextButtonPosition.value !== "left"
      ) {
        nextButtonSharedValueX.value = withSpring(nextButtonPositions[1]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[1]);
        nextButtonPosition.value = "center";
      } else {
        nextButtonSharedValueX.value = withSpring(nextButtonPositions[1]);
        nextButtonPosition.value = "center";
      }
      nextButtonSharedValueY.value = withSpring(0);
    })
    .onFinalize(() => {
      runOnJS(hapticFeedback)();
    })
    .enabled((Platform.OS === "ios" || Platform.OS === "android") && isMobile);

  const composed = Gesture.Race(pan, tap, longPress);

  const themeMode = React.useMemo(() => {
    if (settingsStore.themeMode === "system") {
      return colorScheme;
    }

    return settingsStore.themeMode;
  }, [settingsStore.themeMode, UnistylesRuntime.hasAdaptiveThemes]);

  const onScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.abs(
        Math.floor(event.nativeEvent.contentOffset.y / 226)
      );
      flashlistPositionIndex.value = index;
    },
    []
  );

  const nextButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: nextButtonSharedValueX.value },
        {
          translateY: nextButtonSharedValueY.value,
        },
      ],
    };
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && settingsStore.progressiveBlursEnabled ? (
        <BlurView
          intensity={24}
          tint={themeMode === "light" ? "systemThickMaterialLight" : undefined}
          style={[
            styles.blurView,
            {
              top: 0,
              height: top + 12,
            },
          ]}
        />
      ) : null}
      {Platform.OS === "ios" && settingsStore.progressiveBlursEnabled ? (
        <BlurView
          intensity={24}
          tint={themeMode === "light" ? "systemThickMaterialLight" : undefined}
          style={[
            styles.blurView,
            {
              bottom: 0,
              height: bottom + 68,
              paddingBottom: bottom + 24,
            },
          ]}
        >
          <GestureDetector gesture={composed}>
            <Animated.View style={[styles.nextButton, nextButtonAnimatedStyle]}>
              <Typography size="xl" fontWeight="700">
                Next
              </Typography>
              <AntDesign
                name="arrowdown"
                size={24}
                color={theme.colors.typography}
              />
            </Animated.View>
          </GestureDetector>
          <FeedSelector translateX={feedSelectorSharedValue} />
        </BlurView>
      ) : (
        <View
          style={[
            styles.blurView,
            {
              bottom: 0,
              minHeight: bottom + 68,
              paddingBottom: isMobile ? bottom + 24 : 70,
            },
          ]}
        >
          <GestureDetector gesture={composed}>
            <Animated.View style={[styles.nextButton, nextButtonAnimatedStyle]}>
              <Typography size="xl" fontWeight="700">
                Next
              </Typography>
              <AntDesign
                name="arrowdown"
                size={24}
                color={theme.colors.typography}
              />
            </Animated.View>
          </GestureDetector>
          <FeedSelector translateX={feedSelectorSharedValue} />
        </View>
      )}
      <View style={styles.content}>
        <FlashList
          data={feedItemsQuery.data || []}
          keyExtractor={({ title }) => title}
          renderItem={({ item }) => <FeedCard feedItem={item} />}
          estimatedItemSize={210}
          contentContainerStyle={{
            paddingTop: isMobile ? top + 12 : 54,
            paddingBottom: isMobile ? bottom + 100 : 150,
            paddingHorizontal: theme.margins["2xl"],
          }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={flashlistRef as any}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.margins["2xl"] }} />
          )}
          ListHeaderComponent={
            <View>
              <Typography size="3xl" fontWeight="900">
                Good
              </Typography>
              <Typography size="3xl" fontWeight="900">
                Morning
              </Typography>
              <View
                style={[
                  styles.row,
                  {
                    justifyContent: "space-between",
                    marginTop: 16,
                    marginBottom: 24,
                  },
                ]}
              >
                <Typography size="2xl" fontWeight="700" color="secondary">
                  {format(new Date(), "eee dd MMM")}
                </Typography>
                <ActiveFeedIndicator />
              </View>
            </View>
          }
        />
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    alignSelf: "center",
    width: {
      [mq.only.width(0, 480)]: "100%",
      [mq.only.width(480, 768)]: "75%",
      [mq.only.width(768, 1024)]: "70%",
      [mq.only.width(1024, 1440)]: 720,
      [mq.only.width(1440)]: 920,
    },
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  blurView: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: {
      [mq.only.width(0, 480)]: 32,
      [mq.only.width(480, 768)]: "6.25%",
      [mq.only.width(768, 1024)]: "7.5%",
      [mq.only.width(1024, 1440)]: (UnistylesRuntime.screen.width - 720) * 0.2,
      [mq.only.width(1440)]: (UnistylesRuntime.screen.width - 920) * 0.35,
    },
  },
  nextButton: {
    width: 120,
    height: 52,
    borderRadius: 52 / 2,
    backgroundColor: theme.colors.secondaryButtonBackgroundColor,
    zIndex: 5,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
}));
