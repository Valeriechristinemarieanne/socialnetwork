import React from "react";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Kitty",
        };
    }
    handleChange(e) {
        this.setState({
            name: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <input></input>
                <input></input>
                <input></input>
                <input></input>
                <button></button>
            </div>
        );
    }
}
