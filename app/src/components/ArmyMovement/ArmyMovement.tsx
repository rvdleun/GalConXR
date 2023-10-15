import { Army, ArmyProps } from '../Army/Army.tsx';
import { FC, useEffect, useRef, useState } from 'react';
import { Object3D, Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface ArmyMovementProps extends ArmyProps {
    from: [number, number, number];
    to: [number, number, number];
}

export const ArmyMovement: FC<ArmyMovementProps> = ({ from, to, ...props}) => {
    const ref = useRef<Object3D>(new Object3D())
    const [destination, setDestination] = useState<Vector3>(new Vector3());
    const [position, setPosition] = useState<Vector3>(new Vector3());

    useEffect(() => {
        destination.fromArray(to);
        position.fromArray(from);

        console.log(position);
    }, [from, to]);

    useFrame(() => {
        if (position.distanceTo(destination) < 0.1) {
            return;
        }

        ref.current!.lookAt(destination);
        ref.current!.translateZ(0.015);
    })

    console.log(position);

    return <object3D ref={ref} position={position}>
        <Army {...props} />
    </object3D>
}
