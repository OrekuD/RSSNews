import { create } from "zustand";
import { Feed, NewsItem } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type FeedStore = {
  items: Array<NewsItem>;
  setItems: (items: Array<NewsItem>) => void;
};

const useFeedStore = create(
  persist<FeedStore>(
    (set) => ({
      items: [],
      setItems: (items: Array<NewsItem>) => set({ items }),
    }),
    {
      name: "feed",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useFeedStore;
