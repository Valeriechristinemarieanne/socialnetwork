import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    // console.log("props in Uploader: ", props);
    constructor(props) {
        super(props);
        this.state = {};
    }

    // when the user selects an image, store that image in state
    // you'll probably want to reference imageboard code here
    // store the file in FormData
    // once the file is in FormData, then we can send the file off to the server

    handleClick(e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append("file", this.file);

        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("response from POST/upload", response.data);
                this.props.setImage(response.data);
            })
            .catch(function (err) {
                console.log("err in POST/upload:", err);
            });
    }

    handleChange(e) {
        /* console.log("handleChange is running ");
                console.log("file: ", e.target.files[0]); */
        this.file = e.target.files[0];
        /* console.log(("this after adding file to data: ", this)); */
    }

    render() {
        return (
            <div className="uploadercontainer">
                <form>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        type="file"
                        id="file"
                        name="file"
                        accept="image/*"
                        className="inputfile"
                    />
                    <label htmlFor="file">Choose a file</label>

                    <p>
                        <button
                            onClick={(e) => this.handleClick(e)}
                            className="uploadbutton"
                        >
                            Upload
                        </button>
                    </p>
                </form>
            </div>
        );
    }
}
