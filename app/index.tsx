import Typography from "@/src/components/Typography";
import { FlashList } from "@shopify/flash-list";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import {
  UnistylesRuntime,
  createStyleSheet,
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

export default function Screen() {
  const { styles, theme } = useStyles(stylesheet);
  const colorScheme = useColorScheme();
  const settingsStore = useSettingsStore(({ settings }) => settings);
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const flashlistRef = React.useRef<FlashList<NewsItem>>(null);
  const [testData, setTestData] = React.useState<Array<NewsItem>>([]);
  const feedSelectorPositions = [-(width - 52 - 64), 0];
  const feedSelectorSharedValue = useSharedValue(feedSelectorPositions[1]);
  const nextButtonPositions = [0, (width - 120) / 2, width - 120 - 64];
  const nextButtonSharedValue = useSharedValue(nextButtonPositions[0]);
  const nextButtonPosition = useSharedValue<"left" | "center" | "right">(
    "left"
  );
  const nextButtonTranslateXStart = useSharedValue(0);
  const flashlistPositionIndex = useSharedValue(0);

  const onNext = React.useCallback(() => {
    if (!flashlistRef.current) return;

    flashlistRef.current.scrollToIndex({
      index: flashlistPositionIndex.value + 1,
      animated: true,
    });
    flashlistPositionIndex.value = flashlistPositionIndex.value + 1;
  }, []);

  const tap = Gesture.Tap().onStart(() => {
    runOnJS(onNext)();
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      nextButtonTranslateXStart.value = nextButtonSharedValue.value;
    })
    .onUpdate((event) => {
      nextButtonSharedValue.value =
        event.translationX + nextButtonTranslateXStart.value;
    })
    .onEnd((event) => {
      const positionX = event.translationX + nextButtonSharedValue.value;

      if (positionX > width * 0.6) {
        nextButtonSharedValue.value = withSpring(nextButtonPositions[2]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[0]);
        nextButtonPosition.value = "right";
      } else if (
        positionX < width * 0.3 &&
        nextButtonPosition.value !== "right"
      ) {
        nextButtonSharedValue.value = withSpring(nextButtonPositions[0]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[1]);
        nextButtonPosition.value = "left";
      } else if (
        positionX < width * 0.3 &&
        nextButtonPosition.value !== "left"
      ) {
        nextButtonSharedValue.value = withSpring(nextButtonPositions[1]);
        feedSelectorSharedValue.value = withSpring(feedSelectorPositions[1]);
        nextButtonPosition.value = "center";
      } else {
        nextButtonSharedValue.value = withSpring(nextButtonPositions[1]);
        nextButtonPosition.value = "center";
      }
    })
    .onFinalize(() => {
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Heavy);
    });

  const composed = Gesture.Race(pan, tap);

  const themeMode = React.useMemo(() => {
    if (settingsStore.themeMode === "system") {
      return colorScheme;
    }

    return settingsStore.themeMode;
  }, [settingsStore.themeMode, UnistylesRuntime.hasAdaptiveThemes]);

  async function test() {
    try {
      const response = await fetch(
        "https://rss.app/feeds/th4bMZwtIxFdFzvk.xml"
      );
      const data = await response.text();
      const parser = new XMLParser();
      const jsonObj = parser.parse(data, {});

      setTestData(jsonObj.rss.channel.item);

      // console.log({ jsonObj: jsonObj.rss.channel.item[0] });
    } catch (error) {
      console.log({ error });
    }
  }

  React.useEffect(() => {
    test();
  }, []);

  const onScroll = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.abs(
        Math.floor(event.nativeEvent.contentOffset.y / 216)
      );
      flashlistPositionIndex.value = index;
    },
    []
  );

  const nextButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: nextButtonSharedValue.value }],
    };
  }, []);

  return (
    <View style={styles.container}>
      {settingsStore.progressiveBlursEnabled ? (
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
      {settingsStore.progressiveBlursEnabled ? (
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
        </View>
      )}

      <View style={[styles.content]}>
        <FlashList
          data={testData}
          // keyExtractor={({ title }: NewsItem) => title as string}
          renderItem={({ item }) => <FeedCard feedItem={item} />}
          estimatedItemSize={200}
          contentContainerStyle={{
            paddingTop: top + 12,
            paddingBottom: bottom + 100,
          }}
          onScroll={onScroll}
          scrollEventThrottle={16}
          ref={flashlistRef as any}
          ItemSeparatorComponent={() => (
            <View style={{ height: theme.margins["2xl"] }} />
          )}
          ListHeaderComponent={
            <View>
              <Typography
                size="3xl"
                fontWeight="900"
                style={{
                  width: "60%",
                }}
              >
                Good Morning
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
    paddingHorizontal: theme.margins["2xl"],
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
    paddingHorizontal: 32,
  },
  nextButton: {
    // position: "absolute",
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
