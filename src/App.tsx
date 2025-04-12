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


// const noteCreation = (event: React.SyntheticEvent) => {
//   event.preventDefault()
//   createNote({ content: newNote }).then(data => {
//     setNotes(notes.concat(data))
//   })

//   setNewNote('')
// };

const Form = () => {

  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newFlightEntry = {
      date: date,
      weather: weather,
      visibility: visibility,
      comment: comment
    }

    console.log('newFlightEntry', newFlightEntry)

    createEntry(newFlightEntry)
      .then(data => {
        console.log('data', data)
      })
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case 'date':
        setDate(value);
        break;
      case 'weather':
        setWeather(value);
        break;
      case 'visibility':
        setVisibility(value);
        break;
      case 'comment':
        setComment(value);
        break;
      default:
        break;
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div> date: <input type="date" name="date" value={date} onChange={handleChange} /></div>
        <div>weather: <input type="text" name="weather" value={weather} onChange={handleChange} /></div>
        <div>  visibility: <input type="text" name="visibility" value={visibility} onChange={handleChange} /></div>
        <div> comment: <input type="text" name="comment" value={comment} onChange={handleChange} /></div>
        <button type="submit">submit</button>
      </form>
    </div>
  )
}

const App = () => {

  const [flightDiaries, setFlightDiaries] = useState<FlightDiary[]>([])


  useEffect(() => {
    getAllEntries().then(data => {
      setFlightDiaries(data)
    })
  }, [])

  console.log('flightDiaries', flightDiaries)

  return (
    <>
      <Title />
      <Form />
      <Flights flightDiaries={flightDiaries} />
    </>
  )
}

export default App
