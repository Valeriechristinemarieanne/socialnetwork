import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            first: "",
            last: "",
            url: "",
        };
    }

    // lifecycle methods
    componentDidMount() {
        axios.get("/user").then((response) => {
            console.log("response: ", response);
            let newurl;
            if (response.data[0].url) {
                newurl = response.data[0].url;
            } else {
                newurl = "/profiledefault.jpg";
            }
            this.setState({
                first: response.data[0].first,
                last: response.data[0].last,
                url: newurl,
            });
            // console.log("this.state: ", this.state);
        });
    }
    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newurl) {
        console.log("newurl: ", newurl);

        this.setState({
            url: newurl,
        });
        console.log("this.state:", this.state);
    }
    render() {
        // console.log("this.state: ", this.state);

        return (
            <div className="loggedincontainer">
                <h1>App</h1>
                {/* this is how we pass props. on the right hand side must be a variable WITH A DEFINED VALUE*/}

                {/* <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imageUrl={this.state.imageUrl}
                /> */}
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    profilePic={this.state.url}
                    toggleModal={() => this.toggleModal()}
                />

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={(newurl) => this.setImage(newurl)} />
                )}
            </div>
        );
    }
}
