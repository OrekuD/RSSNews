import { NewsItem } from "@/src/types/types";
import { TouchableOpacity, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";
import Typography from "./Typography";
import { format, formatDistance } from "date-fns";
import { Entypo } from "@expo/vector-icons";

type FeedItemProps = {
  feedItem: NewsItem;
};

export default function FeedItem(props: FeedItemProps) {
  const { styles, theme } = useStyles(stylesheet);

  //   if (props.feedItem.pubDate) {
  //     console.log({ time: props.feedItem.pubDate });
  //   }

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
        <TouchableOpacity activeOpacity={0.8}>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={theme.colors.gray100}
          />
        </TouchableOpacity>
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
