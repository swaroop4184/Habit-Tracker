import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DateTable = ({openedHabit}) => {
  const getLastNDays = (n) => {
    const today = new Date();
    const lastNDays = Array.from({ length: n }, (_, index) => {
      const date = new Date();
      date.setDate(today.getDate() - index);
      return date;
    });
    return lastNDays;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

//   const [statuses, setStatuses] = useState(Array(7).fill('')); // Array to store the status of each day
  const [statuses, setStatuses] = useState(null);
  const [rerenderFlag, setRerenderFlag] = useState(true);

  const toggleRerenderFlag = ()=>{
    setRerenderFlag(!rerenderFlag);
  }


  const addHabitStatus = async (date, status) =>{
    try{
        const body = {
            habitId: openedHabit._id, 
            date: date, 
            status: status
        }
        const response = await axios.post('http://localhost:5000/habits/record/add', body);
        console.log(response.data);
        toggleRerenderFlag();
    }
    catch(error){
        console.error(error);
    }
  }

  const getStatuses = async (habitId) =>{
    try{
        const response = await axios.get(`http://localhost:5000/habits/records/${habitId}`)
        const tempStatuses = {}
        console.log(response.data);
        response.data.forEach((record)=>{
            const date = new Date(record.date).toLocaleDateString();
            tempStatuses[date] = record.status;
        })
        setStatuses(tempStatuses);
    }
    catch(error){
        console.error(error);
    }
  }

  useEffect(()=>{
    getStatuses(openedHabit._id);
  }, [rerenderFlag])

  const handleStatusChange = (index, status) => {
    const newStatuses = [...statuses];
    newStatuses[index] = status;
    setStatuses(newStatuses);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'done':
        return 'green';
      case 'notDone':
        return 'red';
      case 'pending':
        return 'grey';
      default:
        return '';
    }
  };

  const lastSevenDays = getLastNDays(7);

  return (
    <div>
      <h2>{openedHabit.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lastSevenDays.map((date, index) => {
            date = date.toLocaleDateString();
            if(statuses){
                console.log(statuses.hasOwnProperty(date))
            }
            return (
            <tr key={index} 
            className={statuses && statuses.hasOwnProperty(date)?statuses[date]:''}
            >
              <td>{date}</td>
              <td>
                <button onClick={() => addHabitStatus(date, 'done')}>Done</button>
                <button onClick={() => addHabitStatus(date, 'notDone')}>Not Done</button>
                <button onClick={() => addHabitStatus(date, 'pending')}>Pending</button>
              </td>
            </tr>
          )})}
        </tbody>
      </table>
    </div>
  );
};

export default DateTable;
