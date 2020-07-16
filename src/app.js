import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import OtherProfile from "./otherProfile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";

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

    componentDidMount() {
        axios.get("/user").then((response) => {
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
        });
    }
    toggleModal() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newurl) {
        this.setState({
            url: newurl,
        });
    }

    setBio(newbio) {
        this.setState({
            bio: newbio,
        });
    }

    render() {
        return (
            <div className="loggedincontainer">
                <BrowserRouter>
                    <div className="header">
                        <img className="logo" src="/my-logo.png" />
                        <h3>
                            {" "}
                            <a href="/logout">Logout</a>{" "}
                            <Link to="/">My Profile</Link>{" "}
                            <Link to="/users">Find People</Link>{" "}
                            <Link to="/friends">Friends</Link>
                        </h3>
                        <div className="profilepicanduploader">
                            {this.state.uploaderIsVisible && (
                                <Uploader
                                    className="uploader"
                                    setImage={(newurl) => this.setImage(newurl)}
                                />
                            )}
                            <ProfilePic
                                url={this.state.url}
                                toggleModal={() => this.toggleModal()}
                                setImage={() => this.setImage()}
                            />
                        </div>
                    </div>
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
                        <Route
                            path="/user/:id"
                            render={(props) => (
                                <OtherProfile
                                    key={props.match.url}
                                    match={props.match}
                                    history={props.history}
                                />
                            )}
                        />
                        <Route path="/friends" render={() => <Friends />} />
                        <Route
                            path="/users"
                            render={(props) => <FindPeople />}
                        />
                    </div>
                    <div className="footer">
                        <h6>
                            {" "}
                            <a href="/logout">Logout</a>{" "}
                            <Link to="/">My Profile</Link>{" "}
                            <Link to="/users">Find People</Link>
                        </h6>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
