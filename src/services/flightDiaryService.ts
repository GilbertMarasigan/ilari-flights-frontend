import axios from "axios";
import { FlightDiary, NewFlightDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
    return axios
        .get<FlightDiary[]>(baseUrl)
        .then(response => response.data)
}

export const createEntry = (object: NewFlightDiaryEntry) => {
    return axios
        .post<FlightDiary>(baseUrl, object)
        .then(response => response.data)
}