import React from 'react'
import axios from 'axios'


const Habit = ({habit, toggleRefreshFlag, setOpenedHabit}) => {

  const deleteHabit = async (id) => {
    try{
      const response = await axios.post('http://localhost:5000/habits/delete', {
        habitId: id
      })
      console.log(response.data);
      toggleRefreshFlag();
    }
    catch(error){
      console.error(error);
    }
  }
  return (
    <div className='habit-wrapper'>
        <button className='habit' onClick={()=>setOpenedHabit(habit)}>
            {habit.name}
        </button>
        <button className='delete-button' onClick={()=>{deleteHabit(habit._id)}}>
            Delete
        </button>
    </div>
  )
}

export default Habit