import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

export type UpdateGesturesSetting =
  | "swipe-artiles-left"
  | "swipe-articles-right"
  | "long-press-next-button"
  | "drag-up-next-button"
  | "shake-device"
  | "tilt-device";

type GesturesSettings = {
  swipeArticlesLeft: boolean;
  swipeArticlesRight: boolean;
  longPressNextButton: boolean;
  dragUpNextButton: boolean;
  shakeDevice: boolean;
  tiltDevice: boolean;
};

type GesturesSettingsStore = {
  settings: GesturesSettings;
  updateSetting: (setting: UpdateGesturesSetting) => void;
};

const useGesturesSettingsStore = create(
  persist<GesturesSettingsStore>(
    (set) => ({
      settings: {
        swipeArticlesLeft: true,
        swipeArticlesRight: true,
        longPressNextButton: true,
        dragUpNextButton: true,
        shakeDevice: true,
        tiltDevice: false,
      },
      updateSetting: (setting: UpdateGesturesSetting) => {
        switch (setting) {
          case "swipe-artiles-left":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                swipeArticlesLeft: !prevState.settings.swipeArticlesLeft,
              },
            }));

          case "swipe-articles-right":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                swipeArticlesRight: !prevState.settings.swipeArticlesRight,
              },
            }));

          case "long-press-next-button":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                longPressNextButton: !prevState.settings.longPressNextButton,
              },
            }));

          case "drag-up-next-button":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                dragUpNextButton: !prevState.settings.dragUpNextButton,
              },
            }));

          case "shake-device":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                shakeDevice: !prevState.settings.shakeDevice,
              },
            }));

          case "tilt-device":
            return set((prevState) => ({
              ...prevState,
              settings: {
                ...prevState.settings,
                tiltDevice: !prevState.settings.tiltDevice,
              },
            }));

          default:
            break;
        }
      },
    }),
    {
      name: "gestures-settings",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
);

export default useGesturesSettingsStore;
