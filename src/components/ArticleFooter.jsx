import React from "react";
import PropTypes from "prop-types";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";

const propTypes = {
    onDelete: PropTypes.func.isRequired,
    
};

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        };
    }


}
