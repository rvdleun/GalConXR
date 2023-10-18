import { Meta, StoryObj } from "@storybook/react";
import { StoryBookCanvasWrapper } from "../../.storybook/StoryBookCanvasWrapper";
import { Galaxy } from "../components/Galaxy/Galaxy";
import { determineGalaxyPlanetPositions } from "../components/Galaxy/Galaxy.utils";
import { GalaxyPlanet } from "../models/game.model";
import { Provider, useDispatch, useSelector } from "react-redux";
import { selectPlanets } from "../redux/game/game.selectors";
import store from "../redux/store";
import { useEffect } from "react";
import { setPlanets } from "../redux/game/game.slice";
import { usePlanetUpdate } from "./planet-update.hook";
import { GalaxySize, generateGalaxy } from "../utils/galaxy-generator.utils";

const meta = {
    title: "Hooks/PlanetUpdate",
    component: Galaxy,
  } satisfies Meta<typeof Galaxy>;
  
  export default meta;
  type Story = StoryObj<typeof meta>;
  
  const Environment = ({ planets }: { planets: GalaxyPlanet[] }) => {
    const dispatch = useDispatch();
    const statePlanets = useSelector(selectPlanets);
    usePlanetUpdate();

    useEffect(() => {
        determineGalaxyPlanetPositions(planets);
        dispatch(setPlanets(planets));
    }, []);

    return <Galaxy planets={statePlanets} />;
  };
  
  const render = ({ planets }: { planets: GalaxyPlanet[] }) => {
    return (
        <Provider store={store}>
            <StoryBookCanvasWrapper>
                <Environment planets={planets} />
            </StoryBookCanvasWrapper>
        </Provider>
    );
  };
  export const SinglePlanet: Story = {
    render,
    args: {
      planets: [
        { id: "1", x: 0, y: 2, armyCount: 10, faction: 1, scale: 1 }
      ],
    },
  };

  export const ThreePlanets: Story = {
    render,
    args: {
      planets: [
        { id: "1", x: 0, y: 2, armyCount: 0, faction: 1, scale: .5 },
        { id: "1", x: 1, y: 2, armyCount: 0, faction: 1, scale: .75 },
        { id: "1", x: 2, y: 2, armyCount: 0, faction: 1, scale: 1 }
      ],
    },
  };

  export const GeneratedGalaxy: Story = {
    render,
    args: {
      planets: generateGalaxy(GalaxySize.LARGE),
    },
  };

  