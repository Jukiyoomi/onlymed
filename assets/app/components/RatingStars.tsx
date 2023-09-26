import React, {useRef} from "react";
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