import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor() {
        super();
        this.state = {
            editorIsVisible: false,
            first: "",
            last: "",
            url: "",
            bio: "",
        };
    }

    // changehandler to keep to users typed draft bio in state
    handleChange(e) {
        this.setState({
            bio: e.target.value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const self = this;
        if (self.state.bio != "") {
            axios
                .post("/updatebio", { bio: self.state.bio })
                .then(function (response) {
                    // console.log("response from POST updatebio", response);
                    self.props.setBio(self.state.bio);
                    self.setState({
                        editorIsVisible: false,
                    });
                })
                .catch(function (err) {
                    console.log("err in POST Updatebio: ", err);
                });
        } else {
            this.setState({
                editorIsVisible: false,
            });
        }
    }

    // changehandler to show the bio editor
    editBio(e) {
        this.setState({
            editorIsVisible: true,
        });
    }

    // Handling three UI states
    renderBio() {
        if (this.state.editorIsVisible) {
            return (
                <div className="bioupdateinput">
                    <textarea onChange={(e) => this.handleChange(e)}></textarea>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Update
                    </button>
                </div>
            );
        } else {
        }
        if (this.props.bio) {
            return (
                <div className="biotext">
                    <p>
                        <strong>About me: </strong>
                        {this.props.bio}
                    </p>

                    <button onClick={(e) => this.editBio(e)}>Edit Bio</button>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Tell us something about yourself 💬</p>
                    <button onClick={(e) => this.editBio(e)}> Add Bio</button>
                </div>
            );
        }
    }

    render() {
        return <div>{this.renderBio()}</div>;
    }
}
