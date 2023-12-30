import React from 'react'
import DateTable from './DataTable'

const WeekView = ({openedHabit, setOpenedHabit}) => {
  return (
    <div>
        <button onClick={()=>{setOpenedHabit(null)}}>All Habits</button>
        <DateTable openedHabit={openedHabit}/>
    </div>
  )
}

export default WeekView