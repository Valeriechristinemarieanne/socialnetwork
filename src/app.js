import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherProfile";
import { BrowserRouter, Route } from "react-router-dom";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            uploaderIsVisible: false,
            first: "",
            last: "",
            url: "",
            bio: "",
        };
    }

    // lifecycle methods
    componentDidMount() {
        axios.get("/user").then((response) => {
            // console.log("response: ", response);
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
                bio: response.data[0].bio,
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
        // console.log("newurl: ", newurl);

        this.setState({
            url: newurl,
        });
        console.log("this.state:", this.state);
    }

    setBio(newbio) {
        this.setState({
            bio: newbio,
        });
    }

    render() {
        // console.log("this.state: ", this.state);

        return (
            <div className="loggedincontainer">
                <div className="header">
                    <img className="logo" src="/my-logo.png" />
                    {/* <h1>App</h1> */}
                    {/* this is how we pass props. on the right hand side must be a variable WITH A DEFINED VALUE*/}
                    <ProfilePic
                        url={this.state.url}
                        toggleModal={() => this.toggleModal()}
                        setImage={() => this.setImage()}
                    />
                </div>
                {/* <h1>This is my APP component</h1> */}
                <BrowserRouter>
                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.url}
                                    toggleModal={() => this.toggleModal()}
                                    setImage={() => this.setImage()}
                                    bio={this.state.bio}
                                    setBio={(newbio) => this.setBio(newbio)}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader setImage={(newurl) => this.setImage(newurl)} />
                )}
            </div>
        );
    }
}
