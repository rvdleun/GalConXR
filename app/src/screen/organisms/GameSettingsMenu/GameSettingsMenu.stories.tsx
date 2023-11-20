import { Meta, StoryObj } from "@storybook/react";
import { StorybookScreenWrapper } from "../../StorybookScreenWrapper";
import { useState } from "react";
import { GameSettings, GameSettingsMenu } from "./GameSettingsMenu";
import { GalaxySize } from "../../../utils/galaxy-generator.utils";

const meta = {
  title: "Screen/Organisms/GameSettingsMenu",
  component: GameSettingsMenu,
} satisfies Meta<typeof GameSettingsMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (props) => {
    const [settings, setSettings] = useState<GameSettings>(props.settings);

    return (
      <StorybookScreenWrapper height={200} width={640}>
        <GameSettingsMenu
          {...props}
          onNewSettings={setSettings}
          settings={settings}
        />
      </StorybookScreenWrapper>
    );
  },
  args: {
    onNewSettings: console.log,
    settings: {
      galaxySize: GalaxySize.SMALL,
      numberOfPlayers: 2,
    },
    x: 10,
    y: 10,
    width: 620,
  },
};
