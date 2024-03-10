import { NewsItem } from "@/src/types/types";
import { Platform, TouchableOpacity, View, Image } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "./Typography";
import { format, formatDistance } from "date-fns";
import { Entypo, EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import * as DropdownMenu from "zeego/dropdown-menu";
import * as ContextMenu from "zeego/context-menu";
import { useRouter } from "expo-router";
import webDropdownStyleSheet from "../styles/webDropdownStyleSheet";
import getContentInfo from "../utils/getContentInfo";

type FeedCardProps = {
  feedItem: NewsItem;
};

export default function FeedCard(props: FeedCardProps) {
  const { styles, theme } = useStyles(stylesheet);
  const { styles: webStyles } = useStyles(webDropdownStyleSheet);
  const router = useRouter();

  const contentInfo = getContentInfo(props.feedItem.description);

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            router.push("/news/test");
          }}
          style={styles.container}
        >
          <Typography size="lg" fontWeight="600" numberOfLines={2}>
            {props.feedItem.title}
          </Typography>
          <View style={styles.main}>
            <Image source={{ uri: contentInfo.image }} style={styles.image} />
            <Typography
              size="md"
              color="secondary"
              style={{
                flex: 1,
              }}
              numberOfLines={3}
            >
              {contentInfo.description}
            </Typography>
          </View>
          <View style={styles.footer}>
            <Typography color="secondary" size="sm" fontWeight="500">
              {formatDistance(new Date(props.feedItem.pubDate), new Date(), {
                addSuffix: true,
              })}
            </Typography>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(e) => e.stopPropagation()}
            >
              <DropdownMenu.Root>
                <DropdownMenu.Trigger action="press">
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color={theme.colors.gray100}
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content
                  style={webStyles.dropdownContent}
                  align="end"
                  alignOffset={-8}
                  sideOffset={6}
                >
                  <DropdownMenu.Group>
                    <DropdownMenu.Item
                      key="smart-summary"
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                        Smart Summary
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "wand.and.stars",
                        }}
                      />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      key="improve-title"
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                        Improve Title
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "wand.and.stars.inverse",
                        }}
                      />
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Group>
                    <DropdownMenu.Item
                      key="read-out-synopsis"
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                        Read Out Synopsis
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "waveform",
                        }}
                      />
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Group>
                    <DropdownMenu.Item
                      key="read-later"
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                        Read Later
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "bookmark",
                        }}
                      />
                    </DropdownMenu.Item>
                    <DropdownMenu.Item
                      key="mark-as-read"
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                        Mark as Read
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "text.book.closed",
                        }}
                      />
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  <DropdownMenu.Group>
                    <DropdownMenu.Item
                      key="not-interested"
                      destructive
                      style={webStyles.dropdownItem}
                    >
                      <DropdownMenu.ItemTitle
                        style={webStyles.dropdownDestructiveTitle}
                      >
                        Not interested
                      </DropdownMenu.ItemTitle>
                      <DropdownMenu.ItemIcon
                        ios={{
                          name: "minus.circle",
                        }}
                      />
                    </DropdownMenu.Item>
                  </DropdownMenu.Group>
                  {Platform.OS === "web" ? (
                    <View style={styles.row}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.iconButton}
                      >
                        <EvilIcons
                          name="share-apple"
                          size={26}
                          color={theme.colors.typography}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.iconButton}
                      >
                        <EvilIcons
                          name="link"
                          size={28}
                          color={theme.colors.typography}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.iconButton}
                      >
                        <Ionicons
                          name="browsers-outline"
                          size={20}
                          color={theme.colors.typography}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={[
                          styles.iconButton,
                          {
                            borderRightWidth: 0,
                          },
                        ]}
                      >
                        <Feather
                          name="book-open"
                          size={20}
                          color={theme.colors.typography}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <DropdownMenu.Group horizontal>
                      <DropdownMenu.Item
                        key="share"
                        style={webStyles.dropdownItem}
                      >
                        <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                          Share
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "square.and.arrow.up",
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        key="link"
                        style={webStyles.dropdownItem}
                      >
                        <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                          link
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "link",
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        key="open-browser"
                        style={webStyles.dropdownItem}
                      >
                        <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                          Open Browser
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "safari",
                          }}
                        />
                      </DropdownMenu.Item>
                      <DropdownMenu.Item
                        key="list"
                        style={webStyles.dropdownItem}
                      >
                        <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                          List
                        </DropdownMenu.ItemTitle>
                        <DropdownMenu.ItemIcon
                          ios={{
                            name: "list.bullet.rectangle.portrait",
                          }}
                        />
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                  )}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ContextMenu.Trigger>
      <ContextMenu.Content style={webStyles.dropdownContent}>
        <ContextMenu.Group>
          <ContextMenu.Item key="smart-summary" style={webStyles.dropdownItem}>
            <ContextMenu.ItemTitle style={webStyles.dropdownTitle}>
              Smart Summary
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "wand.and.stars",
              }}
            />
          </ContextMenu.Item>
          <ContextMenu.Item key="improve-title" style={webStyles.dropdownItem}>
            <ContextMenu.ItemTitle style={webStyles.dropdownTitle}>
              Improve Title
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "wand.and.stars.inverse",
              }}
            />
          </ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group>
          <ContextMenu.Item
            key="read-out-synopsis"
            style={webStyles.dropdownItem}
          >
            <ContextMenu.ItemTitle style={webStyles.dropdownTitle}>
              Read Out Synopsis
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "waveform",
              }}
            />
          </ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group>
          <ContextMenu.Item key="read-later" style={webStyles.dropdownItem}>
            <ContextMenu.ItemTitle style={webStyles.dropdownTitle}>
              Read Later
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "bookmark",
              }}
            />
          </ContextMenu.Item>
          <ContextMenu.Item key="mark-as-read" style={webStyles.dropdownItem}>
            <ContextMenu.ItemTitle style={webStyles.dropdownTitle}>
              Mark as Read
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "text.book.closed",
              }}
            />
          </ContextMenu.Item>
        </ContextMenu.Group>
        <ContextMenu.Group>
          <ContextMenu.Item
            key="not-interested"
            destructive
            style={webStyles.dropdownItem}
          >
            <ContextMenu.ItemTitle style={webStyles.dropdownDestructiveTitle}>
              Not interested
            </ContextMenu.ItemTitle>
            <ContextMenu.ItemIcon
              ios={{
                name: "minus.circle",
              }}
            />
          </ContextMenu.Item>
        </ContextMenu.Group>
        {Platform.OS === "web" ? (
          <View style={styles.row}>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <EvilIcons
                name="share-apple"
                size={26}
                color={theme.colors.typography}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <EvilIcons
                name="link"
                size={28}
                color={theme.colors.typography}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.iconButton}>
              <Ionicons
                name="browsers-outline"
                size={20}
                color={theme.colors.typography}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.iconButton,
                {
                  borderRightWidth: 0,
                },
              ]}
            >
              <Feather
                name="book-open"
                size={20}
                color={theme.colors.typography}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <ContextMenu.Group horizontal>
            <ContextMenu.Item key="share">
              <ContextMenu.ItemTitle>Share</ContextMenu.ItemTitle>
              <ContextMenu.ItemIcon
                ios={{
                  name: "square.and.arrow.up",
                }}
              />
            </ContextMenu.Item>
            <ContextMenu.Item key="link">
              <ContextMenu.ItemTitle>link</ContextMenu.ItemTitle>
              <ContextMenu.ItemIcon
                ios={{
                  name: "link",
                }}
              />
            </ContextMenu.Item>
            <ContextMenu.Item key="open-browser">
              <ContextMenu.ItemTitle>Open Browser</ContextMenu.ItemTitle>
              <ContextMenu.ItemIcon
                ios={{
                  name: "safari",
                }}
              />
            </ContextMenu.Item>
            <ContextMenu.Item key="list">
              <ContextMenu.ItemTitle>List</ContextMenu.ItemTitle>
              <ContextMenu.ItemIcon
                ios={{
                  name: "list.bullet.rectangle.portrait",
                }}
              />
            </ContextMenu.Item>
          </ContextMenu.Group>
        )}
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.cardBackground,
    height: 210,
    borderRadius: 20,
    padding: theme.margins["2xl"],
    paddingBottom: 0,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.borderColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.margins.lg,
    paddingBottom: theme.margins.xl,
    marginTop: "auto",
  },
  row: {
    flexDirection: "row",
    width: "100%",
  },
  iconButton: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: theme.colors.borderColor,
  },
  main: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    resizeMode: "cover",
  },
}));
