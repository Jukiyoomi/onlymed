import emptyStar from "@img/star_empty.svg";
import fullStar from "@img/star_full.svg";
import React, {useRef} from "react";

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
    return <img src={emptyStar} alt="Full Star"/>
}

function FullStar() {
    return <img src={fullStar} alt="Empty Star"/>
}