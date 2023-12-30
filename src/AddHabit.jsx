import React, { useState } from "react";
import axios from "axios";

const AddHabit = ({toggleRefreshFlag}) => {
    const [habitName, setHabitName] = useState("");

    const addHabit = async (habitName) => {
        console.log(habitName);
        try{
            const response = await axios.post("http://localhost:5000/habits/add", {
                "habit": habitName
            })
            console.log(response.body);
            toggleRefreshFlag();
        }
        catch(error){
            console.log(error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        addHabit(habitName);

        setHabitName("");
    };
    return (
        <div>
        <form onSubmit={handleSubmit}>
            <div className="input">
            <h2>Habit Name:</h2>
            <input
                type="text"
                value={habitName}
                onChange={(e) => setHabitName(e.target.value)}
                required
            />
            </div>
            <br/>
            <button type="submit">Add Habit</button>
        </form>
        </div>
    );
};

export default AddHabit;
