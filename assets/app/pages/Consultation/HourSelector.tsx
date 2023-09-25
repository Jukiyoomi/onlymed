import React, {useEffect, useState} from "react";
import DatePicker from "react-date-picker";
import {CalendarCheck, X} from "lucide-react";
import Button from "@comps/Button";
import useAction from "@pages/Consultation/action";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

type Props = {
    disabledDates: number[],
    doctorId: number
}

type HoursProps = {
    selectedDate: string,
    disabledDates: number[],
    onDateSelect: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

type DisplayHour = {
    date: number;
    label: string;
}

export default function HourSelector({disabledDates, doctorId}: Props) {
    const [date, setDate] = React.useState<Date>(new Date());
    const [selectedHour, setSelectedHour] = useState<number | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    const {mutateAsync, isLoading, error} = useAction();
    const navigate = useNavigate();

    const selectedDateRef =
        !!selectedHour ? (new Date(selectedHour * 1000)).toISOString().slice(0, 19).replace('T', ' ') :
        ""
    ;

    const onDateSelect = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        setSelectedHour(Number(e.currentTarget.dataset.timestamp));
    }

    const onClick = () => {
        mutateAsync({doctorId, date: selectedDateRef}).then(() => navigate("/dashboard"));
    }

    return (
        <>
            <section className="doctor_detail_date">
                <h2 className="second-title">Ce médecin vous convient ?</h2>
                <h3 className="reg-bold">N'hésitez plus !</h3>

                {
                    isActive ? (
                        <>
                            <p>Sélectionnez la date et l'heure de rendez-vous souhaités</p>
                            <DatePicker
                                value={date}
                                onChange={(date) => setDate(new Date(date as Date))}
                                minDate={new Date()}
                                calendarIcon={<CalendarCheck />}
                                clearIcon={<X />}
                                format="dd/MM/yyyy"
                            />

                            <Hours selectedDate={date.toLocaleDateString()} disabledDates={disabledDates} onDateSelect={onDateSelect} />

                            {
                                !!selectedDateRef ? <p>Vous avez sélectionné {selectedDateRef}</p> :
                                    <p>Veuillez sélectionner une date et une heure</p>
                            }
                            <Button
                                type="primary"
                                onClick={onClick}
                                disabled={isLoading || !selectedDateRef}
                            >
                                {isLoading ? "Chargement..." : "Valider"}
                            </Button>

                            {!!error && <p>{error as string}</p>}
                        </>
                    ) : (
                        <Button type="primary" onClick={() => setIsActive(true)}>
                            Prendre rendez-vous
                        </Button>
                    )
                }

            </section>
        </>
    )
}
const Hours = ({selectedDate, disabledDates, onDateSelect}: HoursProps) => {
    const [hours, setHours] = useState<DisplayHour[]>([]);
    const formattedDateRef = selectedDate.split("/").reverse().join("-"); // Format date using hyphens

    // Generate hours from 8AM to 5PM
    const generateHours = () => {
        const newHours: DisplayHour[] = [];
        for (let hour = 8; hour <= 17; hour++) {
            const hourToString = (hour < 10) ? "0" + hour : String(hour);
            const timestamp = Date.parse(formattedDateRef + "T" + hourToString + ":00:00");
            const date = new Date(timestamp);
            newHours.push({
                date: timestamp / 1000,
                label: date.getHours() + "h",
            });

        }
        setHours(newHours);
    };

    useEffect(() => {
        generateHours();
    }, [selectedDate]);

    return (
        <ul className="doctor_detail_hours">
            {hours.map((hour, index) => (
                <Hour key={index} hour={hour} disabled={disabledDates.includes(hour.date)} onDateSelect={onDateSelect} />
            ))}
        </ul>
    );
}

function Hour({hour, disabled, onDateSelect}: {hour: DisplayHour, disabled: boolean, onDateSelect: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void}) {
    const classes = classNames({
        "reg-bold": true,
        "disabled": disabled
    });

    return (
        <li
            onClick={onDateSelect}
            data-timestamp={hour.date}
            className={classes}
        >
            {hour.label} - 5PM
        </li>
    )
}