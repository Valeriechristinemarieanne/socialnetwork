import React from "react";
import axios from "./axios";
import FriendButton from "./friendbutton";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                console.log("response: ", response);
                console.log("response.data: ", response.data);

                if (response.data.ownProfile) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: response.data[0].first,
                        last: response.data[0].last,
                        url: response.data[0].url,
                        bio: response.data[0].bio,
                        id: response.data[0].id,
                    });
                }
            });
    }

    render() {
        return (
            <div className="otherprofile">
                <img className="otherprofilepic" src={this.state.url} />
                <div className="otherprofiletext">
                    <h2>
                        {this.state.first} {this.state.last}
                    </h2>
                    <p>
                        <strong>About: </strong>
                        {this.state.bio}
                    </p>
                    <div>
                        <FriendButton id={this.state.id} />
                    </div>
                </div>
            </div>
        );
    }
}
