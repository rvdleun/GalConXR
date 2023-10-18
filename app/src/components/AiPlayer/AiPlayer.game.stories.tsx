import type { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../../.storybook/StoryBookCanvasWrapper.tsx";
import { GalaxyPlanet, Player, PlayerType } from "../../models/game.model.ts";
import { Galaxy } from "../Galaxy/Galaxy.tsx";
import { determineGalaxyPlanetPositions } from "../Galaxy/Galaxy.utils.ts";
import { AiPlayer } from "./AiPlayer.tsx";
import { useEffect } from "react";
import { setPlanets } from "../../redux/game/game.slice.tsx";
import { AiMethod } from "../../utils/ai-player.utils.ts";
import { Provider, useDispatch, useSelector } from "react-redux";
import { selectArmyMovements, selectPlanets } from "../../redux/game/game.selectors.tsx";
import store from "../../redux/store.tsx";
import { ArmyMovement } from "../ArmyMovement/ArmyMovement.tsx";

const player: Player = {
    aiMethod: AiMethod.RANDOM,
    faction: 1,
    type: PlayerType.AI
}

const Environment = ({ newPlanets, overrideArmyCount, updateEverySeconds }: { newPlanets: GalaxyPlanet[], overrideArmyCount: number, updateEverySeconds: number }) => {
  const dispatch = useDispatch();

  const armyMovements = useSelector(selectArmyMovements);
  const planets = useSelector(selectPlanets);

  useEffect(() => {
    dispatch(setPlanets(newPlanets));
  }, [newPlanets]);


  return <>
    <Galaxy planets={planets} />
    <AiPlayer overrideArmyCount={overrideArmyCount} player={player} planets={planets} updateEverySeconds={updateEverySeconds} />
    { armyMovements.map((armyMovement, index) => <ArmyMovement key={index} {...armyMovement} />)}
  </>
};

const render = (props: { newPlanets: GalaxyPlanet[], overrideArmyCount: number, updateEverySeconds: number }) => {
  determineGalaxyPlanetPositions(props.newPlanets);

  return (<Provider store={store}> <StoryBookCanvasWrapper>
    <Environment {...props} />
  </StoryBookCanvasWrapper></Provider>)
};

const meta = {
  title: "Game/AiPlayer",
  component: Environment,
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnePlanet: Story = {
  render,
  args: {
    newPlanets: [
      { id: "red", x: 33, y: 0, armyCount: 20, faction: 1, scale: 1 },
      { id: "neutral", x: 3, y: 1, armyCount: 9, faction: 0, scale: 1 },
    ],
    overrideArmyCount: 1,
    updateEverySeconds: 3
  },
};
