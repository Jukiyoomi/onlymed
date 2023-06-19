import RatingStars from "@comps/RatingStars";
import React from "react";

type Props = {
    doctor: any;

}
export default function SearchDoctorItem({doctor}: Props) {
   return (
       <div className="search_doctor">
           <img className="search_doctor_img" src="https://www.tomsguide.fr/content/uploads/sites/2/2020/12/tony-stark-robert.jpg" alt={`Image of ${doctor.firstname} ${doctor.lastname}`}/>
           <article>
               <div className="search_doctor_info">
                   <div>
                       <h2 className="second-title">{doctor.firstname} {doctor.lastname}</h2>
                       <p className="search_doctor_address subtitle">10880 Malibu Point, 90265, Malibu, California</p>
                   </div>

                   <div>
                       <p className="reg-bold">Proctologue</p>
                   </div>
               </div>

               <RatingStars rating={Math.round(Math.random() * 5)} />
           </article>
       </div>
   )
}