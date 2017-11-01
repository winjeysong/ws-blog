import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const propTypes = {
    article: PropTypes.object.isRequired,
    isList: PropTypes.bool.isRequired
};

function Article({ article, isList }) {
    const articleClassName = classNames("article-content", { "list-mode": isList === false });

    return (
        <div className="article">
            <h3 className="article-title">{article.title}</h3>
            <div className={articleClassName}>
                <div dangerouslySetInnerHTML={{ _html: article.content }} />
            </div>
        </div>
    );
}

Article.propTypes = propTypes;

export default Article;
