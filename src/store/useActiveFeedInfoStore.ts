import { create } from "zustand";
import { Feed } from "../types/types";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type ActiveFeedInfoStore = {
  selectedFeedId: Feed;
  setSelectedFeedId: (selectedFeedId: Feed) => void;
};

const useActiveFeedInfoStore = create(
  persist<ActiveFeedInfoStore>(
    (set) => ({
      selectedFeedId: Feed.ForYou,
      setSelectedFeedId: (selectedFeedId: Feed) => set({ selectedFeedId }),
    }),
    {
      name: "active-feed-info",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useActiveFeedInfoStore;
