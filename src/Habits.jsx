import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Habit from './Habit';
import AddHabit from './AddHabit';

const Habits = ({setOpenedHabit}) => {
    const [habits, setHabits] = useState([]);
    const [refreshFlag, setRefreshFlag] = useState(true);

    const toggleRefreshFlag = ()=>{
        setRefreshFlag(!refreshFlag);
    }
    const getHabits = async () =>{
        try {
        const response = await axios('http://localhost:5000/habits/all');
        setHabits(response.data);
        console.log(response.data);
        }
        catch(error){
            console.error(error);
        }
    }
    useEffect(()=>{
        getHabits();
    }, [refreshFlag])
    return (
        <div className='habits-box'>
            <AddHabit toggleRefreshFlag={toggleRefreshFlag}/>
            {habits.map((habit)=>
                <Habit 
                    key={habit._id} 
                    habit={habit} 
                    toggleRefreshFlag={toggleRefreshFlag}
                    setOpenedHabit={setOpenedHabit}
                />)}
        </div>
    )
}

export default Habits