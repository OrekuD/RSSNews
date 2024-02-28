import Typography from "@/src/components/Typography";
import { FlashList } from "@shopify/flash-list";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DropdownMenu from "zeego/dropdown-menu";
import * as Haptics from "expo-haptics";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import { useRouter } from "expo-router";
import React from "react";
import { Feed, NewsItem } from "@/src/types/types";
import feeds from "@/src/constants/feeds";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { XMLParser } from "fast-xml-parser";
import FeedItem from "@/src/components/FeedItem";
import { BlurView } from "expo-blur";
import { format } from "date-fns";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import useFeedStore from "@/src/store/useFeedStore";

export default function Screen() {
  const { styles, theme } = useStyles(stylesheet);
  const { top, bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const flashlistRef = React.useRef<FlashList<NewsItem>>(null);
  const feedStore = useFeedStore();
  const router = useRouter();
  const [testData, setTestData] = React.useState<Array<NewsItem>>([]);
  const feedSelectorPositions = [32, width - 52 - 32];
  const feedSelectorSharedValue = useSharedValue(feedSelectorPositions[1]);
  const nextButtonPositions = [32, (width - 120) / 2, width - 120 - 32];
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

  const selectedFeed = React.useMemo(
    () => feeds.find((feed) => feed.id === feedStore.selectedFeedId),
    [feedStore.selectedFeedId]
  );

  const feedSelectorAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: feedSelectorSharedValue.value,
    };
  }, []);

  const nextButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: nextButtonSharedValue.value,
    };
  }, []);

  return (
    <View style={styles.container}>
      <BlurView
        intensity={24}
        style={[
          styles.blurView,
          {
            top: 0,
            height: top + 12,
          },
        ]}
      />
      <BlurView
        intensity={24}
        style={[
          styles.blurView,
          {
            bottom: 0,
            height: bottom + 76,
          },
        ]}
      />
      <GestureDetector gesture={composed}>
        <Animated.View
          style={[
            styles.nextButton,
            {
              bottom: bottom + 18,
            },
            nextButtonAnimatedStyle,
          ]}
        >
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
      <Animated.View
        style={[
          styles.feedSelector,
          {
            bottom: bottom + 18,
          },
          feedSelectorAnimatedStyle,
        ]}
      >
        <Octicons name="stack" size={24} color={theme.colors.typography} />
      </Animated.View>
      <View style={[styles.content]}>
        <FlashList
          data={testData}
          // keyExtractor={({ title }: NewsItem) => title as string}
          renderItem={({ item }) => <FeedItem feedItem={item} />}
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
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger action="press">
                    <View style={styles.dropdownTrigger}>
                      <Typography size="lg" fontWeight="600">
                        {selectedFeed?.name || "For You"}
                      </Typography>
                      <Entypo
                        name="chevron-small-down"
                        size={34}
                        color={theme.colors.secondaryTypography}
                      />
                    </View>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      <DropdownMenu.CheckboxItem
                        value={feedStore.selectedFeedId === Feed.ForYou}
                        onValueChange={(next) => {
                          if (
                            feedStore.selectedFeedId !== Feed.ForYou &&
                            next === "on"
                          ) {
                            feedStore.setSelectedFeedId(Feed.ForYou);
                          }
                        }}
                        key="for-you"
                      >
                        <DropdownMenu.ItemTitle>For You</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemSubtitle>
                          articles from across all categories
                        </DropdownMenu.ItemSubtitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "heart.text.square",
                          }}
                        />
                      </DropdownMenu.CheckboxItem>
                      <DropdownMenu.CheckboxItem
                        value={feedStore.selectedFeedId === Feed.ReadLater}
                        onValueChange={(next) => {
                          if (
                            feedStore.selectedFeedId !== Feed.ReadLater &&
                            next === "on"
                          ) {
                            feedStore.setSelectedFeedId(Feed.ReadLater);
                          }
                        }}
                        key="read-later"
                      >
                        <DropdownMenu.ItemTitle>
                          Read Later
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemSubtitle>
                          articles saved to read later
                        </DropdownMenu.ItemSubtitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "bookmark",
                          }}
                        />
                      </DropdownMenu.CheckboxItem>
                    </DropdownMenu.Group>
                    <DropdownMenu.Group>
                      {feeds.map((feed) => {
                        return (
                          <DropdownMenu.CheckboxItem
                            value={feed.id === feedStore.selectedFeedId}
                            onValueChange={(next) => {
                              if (
                                feedStore.selectedFeedId !== feed.id &&
                                next === "on"
                              ) {
                                feedStore.setSelectedFeedId(feed.id);
                              }
                            }}
                            key={feed.name}
                          >
                            <DropdownMenu.ItemTitle>
                              {feed.name}
                            </DropdownMenu.ItemTitle>
                            <DropdownMenu.ItemIcon
                              ios={{
                                name: feed.iosIconName,
                              }}
                            />
                          </DropdownMenu.CheckboxItem>
                        );
                      })}
                    </DropdownMenu.Group>
                    <DropdownMenu.Sub>
                      <DropdownMenu.ItemTitle>Iå</DropdownMenu.ItemTitle>
                      <DropdownMenu.SubTrigger key="sub">
                        <DropdownMenu.ItemTitle>
                          All Feeds
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "tag",
                          }}
                        />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item key="4">
                          <DropdownMenu.ItemTitle>Ok</DropdownMenu.ItemTitle>
                        </DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Group>
                      <DropdownMenu.Item key="manage">
                        <DropdownMenu.ItemTitle>Manage</DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemSubtitle>
                          add and remove feeds
                        </DropdownMenu.ItemSubtitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "list.bullet",
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        key="settings"
                        onSelect={() => router.push("/settings")}
                      >
                        <DropdownMenu.ItemTitle>
                          Settings
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemSubtitle>
                          make the app your own
                        </DropdownMenu.ItemSubtitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "gear",
                          }}
                        />
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
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
  dropdownTrigger: {
    paddingLeft: 16,
    paddingRight: 6,
    height: 36,
    borderRadius: 14,
    backgroundColor: theme.colors.cardBackground,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  blurView: {
    position: "absolute",
    left: 0,
    width: "100%",
    zIndex: 3,
  },
  feedSelector: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 52 / 2,
    backgroundColor: theme.colors.secondaryButtonBackgroundColor,
    zIndex: 4,
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: {
    position: "absolute",
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
