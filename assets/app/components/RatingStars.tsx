import React, {PropsWithChildren, useRef} from "react";
import {Star} from "lucide-react";

export default function RatingStars({rating, isWhite}: {rating: number, isWhite: boolean}) {
    const totalStars = useRef<number>(5);

    return (
        <div>
            {[...new Array(totalStars.current)].map((_, i) => {
                return i < rating ? <FullStar key={i} isWhite={isWhite} /> : <EmptyStar key={i} isWhite={isWhite} />;
            })}
        </div>
    )
}

function EmptyStar({isWhite}: {isWhite: boolean}) {
    const color = isWhite ? "#FAFAFA" : "#006D77";
    return 	<Star color={color} />
}

function FullStar({isWhite}: {isWhite: boolean}) {
    const color = isWhite ? "#FAFAFA" : "#006D77";
    return <Star fill={color} color={color} />
}

export function StarWrapper({ children }: PropsWithChildren<unknown>) {
    return (
        <div
            style={{
                display: 'inline-block',
                clipPath:
                    'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                width: '25px',
                height: '25px'
            }}
        >
            {children}
        </div>
    )
}