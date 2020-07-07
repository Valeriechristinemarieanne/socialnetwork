import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // when the user selects an image, store that image in state
    // you'll probably want to reference imageboard code here
    // store the file in FormData
    // once the file is in FormData, then we can send the file off to the server

    sillyFunctionCreateRealOne() {
        this.props.setImage("put the new profile pic url here");
    }

    render() {
        return <div>uploader</div>;
    }
}
