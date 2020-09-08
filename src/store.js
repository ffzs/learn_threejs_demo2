import { createRef } from "react"
import { Vector3 } from "three"

const state = {
    sections: 3,
    pages: 3,
    zoom: 75,
    top: createRef(),
    diamonds: [
        { x: 9, offset: 0.1, pos: new Vector3(), factor: 1.25 },
        { x: -8, offset: 1.0, pos: new Vector3(), factor: 1.5 },
        { x: 7, offset: 2.1, pos: new Vector3(), factor: 0.75 }
    ],
};

export default state