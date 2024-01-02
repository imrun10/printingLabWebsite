
import { useDebugValue } from 'react';
import * as THREE from 'three';

export default function useFindVolume(mesh: any) {

    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const width = boundingBox.max.x - boundingBox.min.x;
    const height = boundingBox.max.y - boundingBox.min.y;
    const depth = boundingBox.max.z - boundingBox.min.z;
    const volume = width * height * depth;
    useDebugValue(volume);

    return volume;

}

