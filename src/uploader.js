import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleClick(e) {
        e.preventDefault();
        var formData = new FormData();

        formData.append("file", this.file);

        axios
            .post("/upload", formData)
            .then((response) => {
                this.props.setImage(response.data);
            })
            .catch(function (err) {
                console.log("err in POST/upload:", err);
            });
    }

    handleChange(e) {
        this.file = e.target.files[0];
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
