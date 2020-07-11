import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FindPeople() {
    const [id, setId] = useState();
    const [first, setFirst] = useState("Funky");
    const [last, setLast] = useState("Chicken");
    const [user, setUser] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        console.log(`"${first}" has been rendered!`);
        console.log(`"${last}" has been rendered!`);
        axios.get(`api/users/:id`).then(({ data }) => {
            console.log("data from users: ", data);
            setUsers(data);
        });

        // cleanup function - this runs BEFORE every re-render of our component
        // acts as componentWillUnmount
        return () => {
            console.log(`about to replace ${users} with a new value`);
        };
    }, [user]);

    return (
        <div>
            <h1>Find People</h1>

            {users.map((user) => (
                <div className="mappedusers" key={user.id}>
                    <img className="mappedusersimg" src={user.url} />
                    <h4>
                        {user.first}
                        {""}
                        {user.last}
                    </h4>
                </div>
            ))}

            {/* ... */}
        </div>
    );
}
