import React from 'react'
import DateTable from './dataTable'

const WeekView = ({openedHabit, setOpenedHabit}) => {
  return (
    <div>
        <button onClick={()=>{setOpenedHabit(null)}}>All Habits</button>
        <DateTable openedHabit={openedHabit}/>
    </div>
  )
}

export default WeekView