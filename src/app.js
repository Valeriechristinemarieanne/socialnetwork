import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
        };
    }

    // lifecycle methods
    componentDidMount() {
        /* TODO: we need to fetch information (first, last, profile picture) about the user from the server --> database */
        // modify "users" table to include a column for profilePic/imageUrl
        axios.get("/user").then((response) => {
            // store response from server in state
            // get to a point where you can log "this.state" and see the user's first, last, profile pic
        });
    }
    toggleModal() {
        this.setState({
            uploaderIsVisible: true,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            profilePic: newProfilePic,
        });
    }
    render() {
        console.log("this.state: ", this.state);

        return (
            <div>
                <h1>App</h1>
                {/* this is how we pass props. on the right hand side must be a variable WITH A DEFINED VALUE*/}
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.profilePic}
                    toggleModal={() => this.toggleModal()}
                />
                <p onClick={() => this.toggleModal()}>
                    click me to toggle the modal!
                </p>
                {this.state.uploaderIsVisible && (
                    <Uploader setImage={this.setImage} />
                )}
            </div>
        );
    }
}
