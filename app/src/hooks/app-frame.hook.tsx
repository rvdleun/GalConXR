import { RenderCallback, useFrame } from "@react-three/fiber"
import { useDeltaModifier } from "./delta-modifer.hook"

export const useAppFrame = (callback: RenderCallback, renderPriority?: number) => {
    const { deltaModifier } = useDeltaModifier();

    useFrame((state, delta, frame) => {
        callback(state, delta * deltaModifier, frame);
    }, renderPriority);
}