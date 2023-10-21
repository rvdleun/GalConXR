import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import {
  AiMethod,
  determineNextArmyMovementAction,
} from "./ai-player.utils.ts";
import { StoryBookCanvasWrapper } from "../../.storybook/StoryBookCanvasWrapper.tsx";
import { Galaxy } from "../components/Galaxy/Galaxy.tsx";
import { determineGalaxyPlanetPositions } from "../components/Galaxy/Galaxy.utils.ts";
import { GalaxyPlanet } from "../models/game.model.ts";

const meta = {
  title: "Utils/AiPlayer",
  component: Galaxy,
} satisfies Meta<typeof Galaxy>;

export default meta;
type Story = StoryObj<typeof meta>;

const Environment = ({ planets }: { planets: GalaxyPlanet[] }) => {
  determineGalaxyPlanetPositions(planets);

  return <Galaxy planets={planets} />;
};

const render = ({ planets }: { planets: GalaxyPlanet[] }) => {
  const [result, setResult] = useState<string>();

  const runAiTick = () => {
    setResult(
      JSON.stringify(
        determineNextArmyMovementAction(AiMethod.RANDOM, 1, planets),
      ),
    );
  };

  useEffect(() => {
    runAiTick();
  });

  return (
    <>
      {result && (
        <input
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            zIndex: 1,
          }}
          value={result}
        />
      )}
      <button
        onClick={runAiTick}
        style={{ position: "fixed", bottom: "10px", left: "10px", zIndex: 1 }}
      >
        Run AI Tick
      </button>
      <StoryBookCanvasWrapper>
        <Environment planets={planets} />
      </StoryBookCanvasWrapper>
    </>
  );
};
export const OneTarget: Story = {
  render,
  args: {
    planets: [
      { id: "left", x: 0, y: 0, armyCount: 10, faction: 1, scale: 1 },
      { id: "right", x: 3, y: 1, armyCount: 5, faction: 0, scale: 1 },
    ],
  },
};
