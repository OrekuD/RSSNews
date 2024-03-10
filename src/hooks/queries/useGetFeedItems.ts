import { XMLParser } from "fast-xml-parser";
import { Feed, NewsItem } from "../../types/types";
import { useQuery } from "@tanstack/react-query";

type GetFeedItems = {
  feedId: Feed;
};

async function getFeedItems(payload: GetFeedItems) {
  const response = await fetch("https://rss.app/feeds/qTubE5F8RP7wb7tN.xml");
  const data = await response.text();
  const parser = new XMLParser();
  const jsonObj = parser.parse(data, {
    allowBooleanAttributes: true,
  });

  return jsonObj.rss.channel.item;
}

export default function useGetFeedItems(feedId: Feed) {
  const query = useQuery<Array<NewsItem>>({
    queryKey: ["feed-items", feedId],
    queryFn: () => getFeedItems({ feedId }),
    enabled: !!feedId,
  });

  return query;
}

// https://politepol.com/fd/lFIgw29OY7OH.xml
