import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { ArmyMovement } from "./ArmyMovement.tsx";
import { GalaxyPlanet } from "../../models/game.model.ts";
import { determineGalaxyPlanetPositions } from "../Galaxy/Galaxy.utils.ts";
import { Galaxy } from "../Galaxy/Galaxy.tsx";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  addArmyMovement,
  reset,
  setPlanets,
} from "../../redux/game/game.slice.tsx";
import store from "../../redux/store.tsx";
import {
  selectArmyMovements,
  selectPlanets, selectSelectedPlanetId,
} from "../../redux/game/game.selectors.tsx";

const meta = {
  title: "Game/ArmyMovement",
  component: ArmyMovement,
} satisfies Meta<typeof ArmyMovement>;

export default meta;
type Story = StoryObj<typeof meta>;

const planetsData: GalaxyPlanet[] = [
  {
    id: "1",
    armyCount: 15,
    faction: 1,
    x: -5,
    y: 0,
  },
  {
    id: "2",
    armyCount: 10,
    faction: 2,
    x: 5,
    y: 0,
  },
];
determineGalaxyPlanetPositions(planetsData);

const Environment = ({ startMovement }: { startMovement?: boolean}) => {
  const dispatch = useDispatch();

  const armyMovements = useSelector(selectArmyMovements);
  const planets = useSelector(selectPlanets);
  const selectedPlanetId = useSelector(selectSelectedPlanetId);

  useEffect(() => {
    dispatch(reset());
    dispatch(setPlanets(planetsData));

    if (startMovement) {
      dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 11 }));
    }
  }, []);

  return (
    <>
      <Galaxy planets={planets} selectedPlanetId={selectedPlanetId} />
      <group>
        {armyMovements.map((props) => (
          <ArmyMovement key={props.id} {...props} speed={3} />
        ))}
      </group>
    </>
  );
};

export const Automatic: Story = {
  render: () => (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment startMovement />
      </StoryBookCanvasWrapper>
    </Provider>
  ),
};

export const RequiresInteraction: Story = {
  render: () => (
      <Provider store={store}>
        <StoryBookCanvasWrapper>
          <Environment />
        </StoryBookCanvasWrapper>
      </Provider>
  ),
};
