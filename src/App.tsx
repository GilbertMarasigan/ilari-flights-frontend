import { useEffect, useState } from "react"
import { FlightDiary, FlightDiaryProps } from "./types"
import { getAllEntries, createEntry } from "./services/flightDiaryService"

const Title = () => {
  return <h1>Ilari's flight diaries</h1>
}

const Flight = ({ flight }: { flight: FlightDiary }) => {
  console.log('show flight', flight)
  return (
    <div>
      <h3>[{flight.id}] {flight.date}</h3>
      <p>weather: {flight.weather}</p>
      <p>visibility: {flight.visibility} </p>
    </div>
  )
}

const Flights = ({ flightDiaries }: FlightDiaryProps) => {
  console.log('Flight.flightDiaries', flightDiaries);

  return (
    <div>
      {flightDiaries.map((flight, index) => (
        <Flight key={index} flight={flight} />
      ))}
    </div>
  );
};

const App = () => {

  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    getAllEntries().then(data => {
      setFlightDiaries(data)
    })
  }, [])

  console.log('flightDiaries', flightDiaries)

  return (
    <>
      <Title />
      <Flights flightDiaries={flightDiaries} />
    </>
  )
}

export default App
