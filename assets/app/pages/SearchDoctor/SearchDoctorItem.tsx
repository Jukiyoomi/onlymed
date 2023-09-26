import RatingStars from "@comps/RatingStars";
import React, {PropsWithChildren} from "react";
import Skeleton, {SkeletonTheme} from "react-loading-skeleton";
import {Link} from "react-router-dom";
import useSearchStore from "@store/search";
import {Doctor} from "@schemas/doctor";

export default function SearchDoctorItem({doctor}: Doctor) {
    const searchTerm = useSearchStore(state => state.search);
    const matchingSpeciality = doctor.specialities
        .find((speciality: any) => speciality.name.toLowerCase().includes(searchTerm.toLowerCase()));

   return (
       <div className="search_doctor">
           <img className="search_doctor_img" src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg" alt={`Image of ${doctor.firstname} ${doctor.lastname}`}/>
           <article>
               <div className="search_doctor_info">
                   <div>
                       <Link to={`/doctors/${doctor.id}`}>
                           <h2 className="second-title">{doctor.firstname} {doctor.lastname}</h2>
                       </Link>
                       <p className="search_doctor_address subtitle">{doctor.address}</p>
                   </div>

                   <div>
                       <p className="reg-bold">{matchingSpeciality!.name}</p>
                   </div>
               </div>

               <RatingStars rating={Math.round(Math.random() * 5)} isWhite={false} />
           </article>
       </div>
   )
}

export function SearchDoctorLoading() {
    return (
        <SkeletonTheme
            highlightColor={"#e1e1e1"}
        >
            <div className="search_doctor">
                <Skeleton
                    circle
                    height={150}
                    width={150}
                    containerClassName="avatar-skeleton"
                />
                <article>
                    <div className="search_doctor_info">
                        <div>
                            <p><Skeleton width={250} /></p>
                            <p><Skeleton count={2} width={200} /></p>
                        </div>

                        <div>
                            <p className="reg-bold"><Skeleton width={250} /></p>
                        </div>
                    </div>

                    <Skeleton
                        count={5}
                        wrapper={StarWrapper}
                        height="100%"
                        duration={0.9}
                    />
                </article>
            </div>
        </SkeletonTheme>
    )
}

function StarWrapper({ children }: PropsWithChildren<unknown>) {
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