import React, {useRef} from "react";
import {Star} from "lucide-react";

export default function RatingStars({rating}: {rating: number}) {
    const totalStars = useRef<number>(5);

    return (
        <div>
            {[...new Array(totalStars.current)].map((_, i) => {
                return i < rating ? <FullStar key={i} /> : <EmptyStar key={i} />;
            })}
        </div>
    )
}

function EmptyStar() {
    return 	<Star color="#006D77" />
}

function FullStar() {
    return <Star fill="#006D77" color="#006D77" />
}