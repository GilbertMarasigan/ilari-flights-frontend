import axios from "axios";
import { FlightDiary, NewFlightDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
    return axios
        .get<FlightDiary[]>(baseUrl)
        .then(response => response.data)
}

export const createEntry = async (object: NewFlightDiaryEntry) => {

    try {
        const response = await axios
            .post<FlightDiary>(baseUrl, object)
            .then(response => response.data)

        return response

    } catch (error) {
        if (axios.isAxiosError(error)) {
            const errorMessage = (error.response?.data.error as { message: string }[]).map(e => e.message).join(', ');
            throw new Error(errorMessage);
        } else {
            throw new Error('An unknown error occurred.');
        }
    }

}
