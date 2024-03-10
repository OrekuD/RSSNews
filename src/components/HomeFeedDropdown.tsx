import * as DropdownMenu from "zeego/dropdown-menu";
import feeds from "../constants/feeds";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useStyles } from "react-native-unistyles";
import useActiveFeedInfoStore from "../store/useActiveFeedInfoStore";
import { Feed } from "../types/types";
import webDropdownStyleSheet from "../styles/webDropdownStyleSheet";

type HomeFeedDropdownProps = {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

export default function HomeFeedDropdown(props: HomeFeedDropdownProps) {
  const activeFeedInfoStore = useActiveFeedInfoStore();
  const { styles: webStyles, theme } = useStyles(webDropdownStyleSheet);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger action="press">
        {props.children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        style={webStyles.dropdownContent}
        align="end"
        alignOffset={-8}
        sideOffset={6}
      >
        <DropdownMenu.Group>
          <DropdownMenu.CheckboxItem
            value={activeFeedInfoStore.selectedFeedId === Feed.ForYou}
            onValueChange={(next) => {
              if (next === "on") {
                activeFeedInfoStore.setSelectedFeedId(Feed.ForYou);
              }
            }}
            key="for-you"
            style={webStyles.dropdownCheckboxItem}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              For You
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              articles from across all categories
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "heart.text.square",
              }}
            />
            {activeFeedInfoStore.selectedFeedId === Feed.ForYou ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color={theme.colors.typography}
                style={webStyles.dropdownIcon}
              />
            ) : null}
          </DropdownMenu.CheckboxItem>
          <DropdownMenu.CheckboxItem
            value={activeFeedInfoStore.selectedFeedId === Feed.ReadLater}
            onValueChange={(next) => {
              if (next === "on") {
                activeFeedInfoStore.setSelectedFeedId(Feed.ReadLater);
              }
            }}
            key="read-later"
            style={webStyles.dropdownCheckboxItem}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Read Later
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              articles saved to read later
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "bookmark",
              }}
            />
            {activeFeedInfoStore.selectedFeedId === Feed.ReadLater ? (
              <AntDesign
                name="checkcircle"
                size={24}
                color={theme.colors.typography}
                style={webStyles.dropdownIcon}
              />
            ) : null}
          </DropdownMenu.CheckboxItem>
        </DropdownMenu.Group>
        <DropdownMenu.Group>
          {feeds.map((feed) => {
            return (
              <DropdownMenu.CheckboxItem
                value={feed.id === activeFeedInfoStore.selectedFeedId}
                onValueChange={(next) => {
                  if (next === "on") {
                    activeFeedInfoStore.setSelectedFeedId(feed.id);
                  }
                }}
                key={feed.name}
                style={webStyles.dropdownCheckboxItem}
              >
                <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                  {feed.name}
                </DropdownMenu.ItemTitle>
                <DropdownMenu.ItemIcon
                  ios={{
                    name: feed.iosIconName,
                  }}
                />
                {feed.id === activeFeedInfoStore.selectedFeedId ? (
                  <AntDesign
                    name="checkcircle"
                    size={24}
                    color={theme.colors.typography}
                    style={webStyles.dropdownIcon}
                  />
                ) : null}
              </DropdownMenu.CheckboxItem>
            );
          })}
        </DropdownMenu.Group>
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger
            key="sub"
            style={webStyles.dropdownSubTrigger}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              All Feeds
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "tag",
              }}
            />
            <Entypo
              name="chevron-right"
              size={24}
              color={theme.colors.typography}
              style={webStyles.dropdownSubTriggerIcon}
            />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent style={webStyles.dropdownSubContent}>
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <DropdownMenu.Item
                  key={index + 1 + ""}
                  style={[
                    webStyles.dropdownSubContentItem,
                    {
                      borderTopWidth: index === 0 ? 0 : 1,
                    },
                  ]}
                >
                  <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
                    label
                  </DropdownMenu.ItemTitle>
                </DropdownMenu.Item>
              ))}
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>
        <DropdownMenu.Group>
          <DropdownMenu.Item
            key="manage"
            style={webStyles.dropdownCheckboxItem}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Manage
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              add and remove feeds
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "list.bullet",
              }}
            />
          </DropdownMenu.Item>
          <DropdownMenu.Item
            key="settings"
            onSelect={() => router.push("/settings")}
            style={[
              webStyles.dropdownCheckboxItem,
              {
                borderBottomWidth: 0,
              },
            ]}
          >
            <DropdownMenu.ItemTitle style={webStyles.dropdownTitle}>
              Settings
            </DropdownMenu.ItemTitle>
            <DropdownMenu.ItemSubtitle style={webStyles.dropdownSubTitle}>
              make the app your own
            </DropdownMenu.ItemSubtitle>
            <DropdownMenu.ItemIcon
              ios={{
                name: "gear",
              }}
            />
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
