export interface FlightDiary {
    id: string,
    date: string,
    weather: string,
    visibility: string
}

export interface FlightDiaryProps {
    flightDiaries: FlightDiary[]
}

export type NewFlightDiaryEntry = Omit<FlightDiary, 'id'>