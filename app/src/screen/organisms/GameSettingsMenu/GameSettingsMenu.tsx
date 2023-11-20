import { FC } from "react";
import { Select, SelectOption } from "../../molecules/Select/Select";
import { GalaxySize } from "../../../utils/galaxy-generator.utils";

export interface GameSettings {
  galaxySize: GalaxySize;
  numberOfPlayers: number;
}

interface GameSettingsMenuProps {
  onNewSettings: (settings: GameSettings) => void;
  settings: GameSettings;
  x: number;
  y: number;
  width: number;
}

export const galaxySizeOptions: SelectOption<GalaxySize>[] = [
  { text: "Small Galaxy", value: GalaxySize.SMALL },
  { text: "Medium Galaxy", value: GalaxySize.MEDIUM },
  { text: "Large Galaxy", value: GalaxySize.LARGE },
];

export const numberOfPlayersOptions: SelectOption<number>[] = [
  { text: "2 Players", value: 2 },
  { text: "3 Players", value: 3 },
  { text: "4 Players", value: 4 },
];

export const GameSettingsMenu: FC<GameSettingsMenuProps> = ({
  onNewSettings,
  settings,
  x,
  y,
  width,
}) => {
  const handleUpdateNumberOfPlayers = (selected: SelectOption<number>) => {
    onNewSettings({
      ...settings,
      numberOfPlayers: selected.value,
    });
  };

  const handleUpdateGalaxySize = (selected: SelectOption<GalaxySize>) => {
    onNewSettings({
      ...settings,
      galaxySize: selected.value,
    });
  };

  return (
    <>
      <Select
        onNewSelectedOption={handleUpdateGalaxySize}
        options={galaxySizeOptions}
        selectedOption={
          galaxySizeOptions.find(
            (option) => option.value === settings.galaxySize,
          )!
        }
        x={y}
        y={y}
        width={width}
      />
      <Select
        onNewSelectedOption={handleUpdateNumberOfPlayers}
        options={numberOfPlayersOptions}
        selectedOption={
          numberOfPlayersOptions.find(
            (option) => option.value === settings.numberOfPlayers,
          )!
        }
        x={y}
        y={y + 100}
        width={width}
      />
    </>
  );
};
