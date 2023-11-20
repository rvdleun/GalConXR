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
import { usePlanetUpdate } from "../../hooks/planet-update.hook.tsx";
import { useDeltaModifier } from "../../hooks/delta-modifer.hook.tsx";

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
    scale: 1,
  },
  {
    id: "2",
    armyCount: 10,
    faction: 3,
    x: 5,
    y: 0,
    scale: 1,
  },
];
determineGalaxyPlanetPositions(planetsData);

const Environment = ({
  deltaModifier = 1,
  scenarioPlanets,
  showMultiple,
  startMovement,
  updatePlanets,
}: {
  deltaModifier?: number;
  scenarioPlanets: GalaxyPlanet[];
  showMultiple?: boolean;
  startMovement?: boolean;
  updatePlanets?: boolean;
}) => {
  const dispatch = useDispatch();

  const armyMovements = useSelector(selectArmyMovements);
  const planets = useSelector(selectPlanets);
  const selectedPlanetId = useSelector(selectSelectedPlanetId);
  const { setDeltaModifier } = useDeltaModifier();

  usePlanetUpdate(updatePlanets);

  useEffect(() => {
    setDeltaModifier(deltaModifier);
  }, [deltaModifier]);

  useEffect(() => {
    dispatch(reset());
    dispatch(setPlanets(scenarioPlanets));

    if (startMovement) {
      dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 11 }));
    }

    if (showMultiple) {
      dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 4 }));

      setTimeout(() => {
        dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 3 }));
      }, 2000);

      setTimeout(() => {
        dispatch(addArmyMovement({ from: "1", to: "2", armyCount: 5 }));
      }, 4000);
    }
  }, []);

  return (
    <>
      <Galaxy planets={planets} selectedPlanetId={selectedPlanetId} />
      <group>
        {armyMovements.map((props) => (
          <ArmyMovement key={props.id} {...props} />
        ))}
      </group>
    </>
  );
};

export const Automatic: Story = {
  render: () => (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment scenarioPlanets={planetsData} startMovement />
      </StoryBookCanvasWrapper>
    </Provider>
  ),
};

export const HalfSpeed: Story = {
  render: () => (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment
          deltaModifier={0.5}
          scenarioPlanets={planetsData}
          startMovement
        />
      </StoryBookCanvasWrapper>
    </Provider>
  ),
};

export const ShowMultiple: Story = {
  render: () => (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment scenarioPlanets={planetsData} showMultiple />
      </StoryBookCanvasWrapper>
    </Provider>
  ),
};

export const RequiresInteraction: Story = {
  render: () => (
    <Provider store={store}>
      <StoryBookCanvasWrapper>
        <Environment scenarioPlanets={planetsData} />
      </StoryBookCanvasWrapper>
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
        <StoryBookCanvasWrapper>
          <Environment scenarioPlanets={planets} updatePlanets />
        </StoryBookCanvasWrapper>
      </Provider>
    );
  },
};
