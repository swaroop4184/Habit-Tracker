import { useState } from 'react'
import './App.css'
import Habits from './Habits'
import WeekView from './WeekView';

function App() {
  const [openedHabit, setOpenedHabit] = useState(null);
  return (
    <div id='App'>
      {!openedHabit?
      <Habits setOpenedHabit={setOpenedHabit}/>:<WeekView openedHabit={openedHabit} setOpenedHabit={setOpenedHabit}/>}
    </div>
  )
}

export default App
