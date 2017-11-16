import React from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Radium from "radium";
import Redux from "react-redux";

//resolve the user load router
const PriRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => (
            auth.user ? (
                <Component {...props} />
            ) : (
                <Redirect to={{
                    pathname: "/login",
                    state: { from: props.location }
                }}
                />
            )
        )}
    />
);

//index page of user
const UserPage = ({ match }) => (
    <Route
        path={`${match.url}/:userId`}
        component={AccessArticles}
    />
);

//edit articles
const ArticleEditing = ({ match }) => (
    <Route
        path={`${match.url}/:articleId`}
        component={PostArticle}
    />
);

//check articles
const ArticleDetail = ({ match }) => (
    <Route
        path={`${match.url}/:articleId`}
        component={AccessArticle}
    />
);

//server redirect & 404
const ServerRedirect = ({ match }) => {
    let url = window.location.search;
    let result = url.substring(1) ? 
        (<Redirect to={{
            pathname: url.substring(1),
            state: { from: "/" }
        }}
        />) : <NoMatch />
    return result;
};

// get state.login
const mapStateToProps = state => (
    { login: state.login }
);


class App extends React.Component {
    componentDidMount() {
        let loading = document.getElementById("loading");
        loading.style.display = "none";
    }

    render() {
        return (
            <Radium.StyleRoot>
                <BrowserRouter>
                    <div className="container">
                        <Header />
                        <FlashTips />
                        <Switch>
                            <Route
                                exact
                                path="/index"
                                component={Index}
                            />
                            <Route
                                path="/login"
                                component={Login}
                            />
                            <Route
                                path="/loginOut"
                                component={Login}
                            />
                            <Route
                                path="/register"
                                component={Register}
                            />
                            <Route
                                path="/user"
                                component={UserPage}
                            />
                            <Route
                                path="/article"
                                component={ArticleDetail}
                            />
                            <PriRoute
                                path="/edit/article"
                                component={ArticleEditing}
                                auth={this.props.login}
                            />
                            <PriRoute
                                path="/personal/index"
                                component={ArticleEditing}
                                auth={this.props.login}
                            />
                            <PriRoute
                                path="/articlePost"
                                component={ArticlePost}
                                auth={this.props.login}
                            />
                            <Route
                                path="/"
                                component={ServerRedirect}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </Radium.StyleRoot>
        );
    }
}

export default Redux.connect(mapStateToProps)(App);
