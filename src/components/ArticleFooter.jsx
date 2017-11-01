import React from "react";
import PropTypes from "prop-types";
import { DropdownButton, MenuItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Redirect } from "react-router-dom";


//location, time, readCounts, commentCounts//


const propTypes = {
    onDelete: PropTypes.func.isRequired,
    articleId: PropTypes.number.isRequired,
    currentUser: PropTypes.string.isRequired
};

class ArticleFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isRedirect: false
        };
    }

    async controlHandler(eventkey) {
        let result;
        const { articleId, onDelete, currentUser } = this.props;
        // delete article when eventkey is "2"
        if (eventkey === "2") {
            result = await onDelete({
                postId: articleId,
                userId: currentUser
            });
            if (result) {
                this.setState({
                    isRedirect: true
                });
            }
        }
    }

    render() {
        const { articleId, currentUser } = this.props;
        const showOperateBtn = currentUser ? (
            <DropdownButton
                bsStyle="Primary"
                title="操作"
                className="dropdown-btn"
                pullRight
                onSelect={(eventkey) => { this.controlHandler(eventkey); }}
            >
                <LinkContainer key="2" to={`/edit/article/${articleId}`}>
                    <MenuItem eventKey="1">编辑</MenuItem>
                </LinkContainer>
                <MenuItem divider />
                <MenuItem eventKey="2">删除</MenuItem>
            </DropdownButton>
        ) : null;

        if (this.state.isRedirect) {
            return (
                <Redirect to={{
                    pathname: "/user/index",
                    state: { from: this.props.location }
                }}
                />
            );
        }

        return (
            <div className="article-footer">
                <div className="article-time">{this.props.time}</div>
                <div className="article-read-count">阅读数：{this.props.readCounts}</div>
                <LinkContainer key="1" to={`/article/${articleId}`}>
                    <div className="article-comment-count">评论数：{this.props.commentCounts}</div>
                </LinkContainer>
                {showOperateBtn}
            </div>
        );
    }
}

ArticleFooter.propTypes = propTypes;

export default ArticleFooter;
