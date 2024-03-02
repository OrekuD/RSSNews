import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

type FontSetting = {
  setting: "font";
  type: "san-francisco" | "new-york";
};

type CardSizeSetting = {
  setting: "card-size";
  type: "list" | "compressed" | "small" | "medium" | "large" | "wide";
};

type ThemeSetting = {
  setting: "theme";
  mode: "light" | "dark" | "system";
};

type ProgressiveBlursSetting = {
  setting: "progressive-blurs";
};

type HapticsSetting = {
  setting: "haptics";
};

type UpdateSetting =
  | FontSetting
  | CardSizeSetting
  | ThemeSetting
  | ProgressiveBlursSetting
  | HapticsSetting;

type Settings = {
  fontType: FontSetting["type"];
  cardSize: CardSizeSetting["type"];
  themeMode: ThemeSetting["mode"];
  progressiveBlursEnabled: boolean;
  hapticsEnabled: boolean;
};

type SettingsStore = {
  settings: Settings;
  updateSetting: (setting: UpdateSetting) => void;
};

const useSettingsStore = create(
  persist<SettingsStore>(
    (set) => ({
      settings: {
        fontType: "san-francisco",
        cardSize: "medium",
        themeMode: "system",
        progressiveBlursEnabled: true,
        hapticsEnabled: true,
      },
      updateSetting: (setting: UpdateSetting) => {
        switch (setting.setting) {
          case "card-size":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                cardSize: setting.type,
              },
            }));

          case "font":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                fontType: setting.type,
              },
            }));

          case "theme":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                themeMode: setting.mode,
              },
            }));

          case "progressive-blurs":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                progressiveBlursEnabled:
                  !prevState.settings.progressiveBlursEnabled,
              },
            }));

          case "haptics":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                hapticsEnabled: !prevState.settings.hapticsEnabled,
              },
            }));

          default:
            break;
        }
      },
    }),
    {
      name: "settings",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useSettingsStore;
