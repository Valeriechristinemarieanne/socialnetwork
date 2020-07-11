import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            // can be removed as the values are empty
            first: "",
            last: "",
            url: "",
            bio: "",
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        // console.log("Tryin to mount here");
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then((response) => {
                // console.log("response.data[0]: ", response.data[0]);
                this.setState({
                    first: response.data[0].first,
                    last: response.data[0].last,
                    url: response.data[0].url,
                    bio: response.data[0].bio,
                });
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
                </div>
            </div>
        );
    }

    //      <Route
    //      path="/user/:id"
    //      render={props => (
    //          <OtherProfile
    //              key={props.match.url}
    //              match={props.match}
    //              history={props.history}
    //          />
    //      )}
    //  />
}
