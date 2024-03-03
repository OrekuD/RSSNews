import { create } from "zustand";
import { Feed } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type FeedStore = {
  selectedFeedId: Feed;
  setSelectedFeedId: (selectedFeedId: Feed) => void;
};

const useFeedStore = create(
  persist<FeedStore>(
    (set) => ({
      selectedFeedId: Feed.ForYou,
      setSelectedFeedId: (selectedFeedId: Feed) => set({ selectedFeedId }),
    }),
    {
      name: "feed",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useFeedStore;
