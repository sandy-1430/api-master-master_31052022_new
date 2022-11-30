import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
// import TiSocialFacebookCircular from "react-icons/social-facebook-circular";
import "./FaceBook.css";

export default class Facebook extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
    picture: "",
  };

  responseFacebook = (response) => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    //   validation Check POST REQUEST
    console.log(response);
  };

  componentClicked = () => console.log("clicked");

  render() {
    let fbContent;

    fbContent = (
      <FacebookLogin
        appId={process.env.REACT_APP_FACEBOOK_CLIENT_ID}
        autoLoad={false}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook}
        icon="fa-facebook"
        cssClass="btnFacebook"
      />
    );

    return <div>{fbContent}</div>;
  }
}
