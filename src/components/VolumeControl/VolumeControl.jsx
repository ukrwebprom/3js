import { useState } from "react";
const Volume = [NORMAL, WHISPER, ALOUD, SCREAM, CRY];

export const VolumeControl = ({initialLevel}) => {
    const [level, setLevel] = useState(initialLevel);

    return (
        <div>
            <button>-</button>

            <button>+</button>
        </div>
    )
}