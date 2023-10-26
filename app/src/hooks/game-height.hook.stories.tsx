import { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { StoryBookCanvasWrapper } from "../../.storybook/StoryBookCanvasWrapper";
import { Galaxy } from "../components/Galaxy/Galaxy";
import store from "../redux/store";
import { useGameHeight } from "./game-height.hook";
import { FC, useEffect } from "react";
import { determineGalaxyPlanetPositions } from "../components/Galaxy/Galaxy.utils";
import { ArmyMovement } from "../components/ArmyMovement/ArmyMovement";
import { GalaxyPlanet } from "../models/game.model";

const Environment: FC<{ height: number }> = ({ height }) => {
  const { setHeight } = useGameHeight();

  useEffect(() => {
    setHeight(height);
  }, [height]);

  const planets: GalaxyPlanet[] = [
    { id: "1", x: 0, y: 2, armyCount: 0, faction: 1, scale: 1 },
    { id: "2", x: 34, y: 2, armyCount: 0, faction: 1, scale: 1 },
    { id: "3", x: 2, y: 2, armyCount: 0, faction: 1, scale: 1 },
  ];
  determineGalaxyPlanetPositions(planets);

  return (
    <>
      <Galaxy planets={planets} />
      <ArmyMovement id={1} faction={1} from={"2"} to={"3"} armyCount={100} />
    </>
  );
};

const render = ({ height }: { height: number }) => {
  return (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment height={height} />
      </StoryBookCanvasWrapper>
    </Provider>
  );
};

const meta = {
  title: "Hooks/GameHeight",
  component: Environment,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render,
  args: {
    height: 0,
  },
};
