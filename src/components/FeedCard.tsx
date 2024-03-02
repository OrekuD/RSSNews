import { NewsItem } from "@/src/types/types";
import { TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "./Typography";
import { format, formatDistance } from "date-fns";
import { Entypo } from "@expo/vector-icons";
import * as DropdownMenu from "zeego/dropdown-menu";

type FeedCardProps = {
  feedItem: NewsItem;
};

export default function FeedCard(props: FeedCardProps) {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Typography size="lg" fontWeight="600" numberOfLines={2}>
        {props.feedItem.title}
      </Typography>
      <View style={styles.footer}>
        <Typography color="secondary" size="md" fontWeight="500">
          {formatDistance(new Date(props.feedItem.pubDate), new Date(), {
            addSuffix: true,
          })}
        </Typography>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger action="press">
            <Entypo
              name="dots-three-horizontal"
              size={24}
              color={theme.colors.gray100}
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Group>
              <DropdownMenu.Item key="smart-summary">
                <DropdownMenu.ItemTitle>Smart Summary</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "wand.and.stars",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="improve-title">
                <DropdownMenu.ItemTitle>Improve Title</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "wand.and.stars.inverse",
                  }}
                />
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Group>
              <DropdownMenu.Item key="read-out-synopsis">
                <DropdownMenu.ItemTitle>
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
              <DropdownMenu.Item key="read-later">
                <DropdownMenu.ItemTitle>Read Later</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "bookmark",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="mark-as-read">
                <DropdownMenu.ItemTitle>Mark as Read</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "text.book.closed",
                  }}
                />
              </DropdownMenu.Item>
            </DropdownMenu.Group>
            <DropdownMenu.Group horizontal>
              <DropdownMenu.Item key="share">
                <DropdownMenu.ItemTitle>Share</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "square.and.arrow.up",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="link">
                <DropdownMenu.ItemTitle>link</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "link",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="open-browser">
                <DropdownMenu.ItemTitle>Open Browser</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "safari",
                  }}
                />
              </DropdownMenu.Item>
              <DropdownMenu.Item key="list">
                <DropdownMenu.ItemTitle>List</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: "list.bullet.rectangle.portrait",
                  }}
                />
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    width: "100%",
    borderWidth: 1,
    borderColor: theme.colors.borderColor,
    backgroundColor: theme.colors.cardBackground,
    height: 200,
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
}));
