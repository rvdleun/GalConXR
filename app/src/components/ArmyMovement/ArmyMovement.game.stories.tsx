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
  selectPlanets,
  selectSelectedPlanetId,
} from "../../redux/game/game.selectors.tsx";
import {
  GalaxySize,
  generateGalaxy,
} from "../../utils/galaxy-generator.utils.ts";

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
    faction: 3,
    x: 5,
    y: 0,
  },
];
determineGalaxyPlanetPositions(planetsData);

const Environment = ({
  scenarioPlanets,
  startMovement,
}: {
  scenarioPlanets: GalaxyPlanet[];
  startMovement?: boolean;
}) => {
  const dispatch = useDispatch();

  const armyMovements = useSelector(selectArmyMovements);
  const planets = useSelector(selectPlanets);
  const selectedPlanetId = useSelector(selectSelectedPlanetId);

  useEffect(() => {
    dispatch(reset());
    dispatch(setPlanets(scenarioPlanets));

    if (startMovement) {
      dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 11 }));
    }
  }, []);

  return (
    <StoryBookCanvasWrapper>
      <Galaxy planets={planets} selectedPlanetId={selectedPlanetId} />
      <group>
        {armyMovements.map((props) => (
          <ArmyMovement key={props.id} {...props} />
        ))}
      </group>
    </StoryBookCanvasWrapper>
  );
};

export const Automatic: Story = {
  render: () => (
    <Provider store={store}>
      <Environment scenarioPlanets={planetsData} startMovement />
    </Provider>
  ),
};

export const RequiresInteraction: Story = {
  render: () => (
    <Provider store={store}>
      <Environment scenarioPlanets={planetsData} />
    </Provider>
  ),
};

export const WithGeneratedGalaxy: Story = {
  render: () => {
    const planets = generateGalaxy(GalaxySize.LARGE);

    planets[0].faction = 1;
    planets[0].armyCount = 50;

    return (
      <Provider store={store}>
        <Environment scenarioPlanets={planets} />
      </Provider>
    );
  },
};
