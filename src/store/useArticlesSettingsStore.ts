import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type OpenInSetting = {
  setting: "open-in";
  type: "reader-view" | "web-view";
};

type SortOrderSetting = {
  setting: "sort-order";
  type: "newest-first" | "oldest-first";
};

type TimestampsSetting = {
  setting: "timestamps";
  mode: "relative" | "absolute";
};

type FaviconsSetting = {
  setting: "favicons";
};

type HighContrastReaderBackgroundSetting = {
  setting: "high-contrast-reader-background";
};

type OneSentenceSmartSummariesSetting = {
  setting: "one-sentence-smart-summaries";
};

type AutoRemoveFromReadLaterSetting = {
  setting: "auto-remove-from-read-later";
};

type AutoHideReadArticlesSetting = {
  setting: "auto-hide-read-articles";
};

type ScrollToMarkReadSetting = {
  setting: "scroll-to-mark-read";
};

type UpdateSetting =
  | OpenInSetting
  | SortOrderSetting
  | TimestampsSetting
  | FaviconsSetting
  | HighContrastReaderBackgroundSetting
  | OneSentenceSmartSummariesSetting
  | AutoRemoveFromReadLaterSetting
  | AutoHideReadArticlesSetting
  | ScrollToMarkReadSetting;

type Settings = {
  openIn: OpenInSetting["type"];
  sortOrder: SortOrderSetting["type"];
  timestamps: TimestampsSetting["mode"];
  faviconsEnabled: boolean;
  highContrastReaderBackgroundEnabled: boolean;
  oneSentenceSmartSummariesEnabled: boolean;
  autoRemoveFromReadLaterEnabled: boolean;
  autoHideReadArticlesEnabled: boolean;
  scrollToMarkReadEnabled: boolean;
};

type SettingsStore = {
  settings: Settings;
  updateSetting: (setting: UpdateSetting) => void;
};

const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      settings: {
        openIn: "reader-view",
        sortOrder: "newest-first",
        timestamps: "relative",
        faviconsEnabled: true,
        highContrastReaderBackgroundEnabled: false,
        oneSentenceSmartSummariesEnabled: false,
        autoRemoveFromReadLaterEnabled: true,
        autoHideReadArticlesEnabled: false,
        scrollToMarkReadEnabled: false,
      },
      updateSetting: (setting: UpdateSetting) => {
        switch (setting.setting) {
          case "open-in":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                openIn: setting.type,
              },
            }));

          case "sort-order":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                sortOrder: setting.type,
              },
            }));

          case "timestamps":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                timestamps: setting.mode,
              },
            }));

          case "favicons":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                faviconsEnabled: !prevState.settings.faviconsEnabled,
              },
            }));

          case "high-contrast-reader-background":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                highContrastReaderBackgroundEnabled:
                  !prevState.settings.highContrastReaderBackgroundEnabled,
              },
            }));

          case "one-sentence-smart-summaries":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                oneSentenceSmartSummariesEnabled:
                  !prevState.settings.oneSentenceSmartSummariesEnabled,
              },
            }));

          case "auto-remove-from-read-later":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                autoRemoveFromReadLaterEnabled:
                  !prevState.settings.autoRemoveFromReadLaterEnabled,
              },
            }));

          case "auto-hide-read-articles":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                autoHideReadArticlesEnabled:
                  !prevState.settings.autoHideReadArticlesEnabled,
              },
            }));

          case "scroll-to-mark-read":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                scrollToMarkReadEnabled:
                  !prevState.settings.scrollToMarkReadEnabled,
              },
            }));

          default:
            break;
        }
      },
    }),
    {
      name: "articles-settings",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useSettingsStore;
