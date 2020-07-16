import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FindPeople({ id }) {
    const [usermatches, setUserMatches] = useState("");
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`/api/users/:id`).then(({ data }) => {
            setUsers(data);
        });

        return () => {};
    }, [usermatches]);

    useEffect(() => {
        if (!usermatches) {
            return;
        }

        axios
            .get(`/api/usermatches?userName=${usermatches}`)
            .then(({ data }) => {
                setUsers(data);
            });

        return () => {};
    }, [usermatches]);

    return (
        <div>
            <h1>Find People</h1>
            {!usermatches ? (
                <h4>Look who just joined us 👀</h4>
            ) : (
                <h4>Are you looking for someone in particular?</h4>
            )}

            {users.map((userprofile) => (
                <div className="mappedusers" key={userprofile.id}>
                    <img className="mappedusersimg" src={userprofile.url} />
                    <h4>
                        <Link to={`/user/${userprofile.id}`}>
                            {userprofile.first} {userprofile.last}
                        </Link>
                    </h4>
                </div>
            ))}

            <input
                autoComplete="off"
                placeholder="Name"
                onChange={(e) => setUserMatches(e.target.value)}
            />
        </div>
    );
}
