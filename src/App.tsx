import { useEffect, useState } from "react"
import { FlightDiary, FlightDiaryProps } from "./types"
import { getAllEntries, createEntry } from "./services/flightDiaryService"

interface FormProps {
  setFlightDiaries: React.Dispatch<React.SetStateAction<FlightDiary[]>>;
}

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

const Form = ({ setFlightDiaries }: FormProps) => {

  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<string>('')

  // Show error and hide after 5 seconds
  useEffect(() => {
    if (errorMessage !== '') {
      const timer = setTimeout(() => {
        setErrorMessage('');
      }, 5000);

      return () => clearTimeout(timer); // cleanup if component unmounts
    }
  }, [errorMessage]);


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
      .then((data: FlightDiary) => {
        setFlightDiaries((prev: FlightDiary[]) => [...prev, data]);
        setDate("")
        setWeather("")
        setVisibility("")
        setComment("")
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
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
      <div style={{ color: 'red' }}>
        {(errorMessage !== '') && (<div>{errorMessage}</div>)}
      </div>
      <form onSubmit={handleSubmit}>
        <div> date: <input type="date" name="date" value={date} onChange={handleChange} /></div>

        <div>
          visibility:
          <label>
            <input
              type="radio"
              name="visibility"
              value="great"
              checked={visibility === 'great'}
              onChange={handleChange}
            />
            great
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="good"
              checked={visibility === 'good'}
              onChange={handleChange}
            />
            good
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="ok"
              checked={visibility === 'ok'}
              onChange={handleChange}
            />
            ok
          </label>

          <label>
            <input
              type="radio"
              name="visibility"
              value="poor"
              checked={visibility === 'poor'}
              onChange={handleChange}
            />
            poor
          </label>
        </div>

        <div>
          weather:
          <label>
            <input
              type="radio"
              name="weather"
              value="sunny"
              checked={weather === 'sunny'}
              onChange={handleChange}
            />
            sunny
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="rainy"
              checked={weather === 'rainy'}
              onChange={handleChange}
            />
            rainy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="cloudy"
              checked={weather === 'cloudy'}
              onChange={handleChange}
            />
            cloudy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="stormy"
              checked={weather === 'stormy'}
              onChange={handleChange}
            />
            stormy
          </label>

          <label>
            <input
              type="radio"
              name="weather"
              value="windy"
              checked={weather === 'windy'}
              onChange={handleChange}
            />
            windy
          </label>
        </div>


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
      <Form setFlightDiaries={setFlightDiaries} />
      <Flights flightDiaries={flightDiaries} />
    </>
  )
}


export default App
