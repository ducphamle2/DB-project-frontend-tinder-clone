/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import { View, ScrollView, SafeAreaView, Alert } from "react-native";
import { DrawerActions, NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { Content, Container } from "native-base";
import images from "../assets/image_source/Images";
import LoginAction from "../redux/actions/LoginAction";
import stateUtil from "../utils/StateUtil";
import BackGroundImage from "../assets/background/BackGroundImage";
import StringUtil from "../utils/StringUtils";
import ImageProfile from "../render_component/ImageProfile";
import styles from "../assets/styles/sideBarStyle";
import PopupLogout from "../render_component/PopupLogout";
import IconSidebar from "../render_component/IconSideBar";
import DataAsync from "../utils/DataAsync";
import { myLoginConstant } from "../utils/Constants";
import UserInfoAction from "../redux/actions/UserInfoAction";
import socketUtil from '../startSocketIO';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConfirm: false
    }; //is used to check if the logout popup choice, if true then a popup will show up.

    this.reRenderSomething = this.props.navigation.addListener('willFocus', () => {
      //Put your code here you want to rerender, in my case i want to rerender the data 
      //im fetching from firebase and display the changes
      // solution from: https://github.com/react-navigation/react-navigation/issues/922

      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.reRenderSomething;
  }

  getProfile() {
    const { navigate } = this.props.navigation;
    const { email } = this.props;
    navigate("Profile", this.props.navigation);
  }

  getFeedback() {
    const { navigate } = this.props.navigation;
    navigate("Feedback");
  }

  getSettings() {
    const { navigate } = this.props.navigation;
    navigate("PasswordChanger");
  }

  setupPictures() {
    const { navigate } = this.props.navigation;
    navigate("SetupPictures");
  }

  /*
    how to run logout: Because we have Main.js which listens to the isLoginSuccess state
    if isLoginSuccess = true => at Home scene, if not then it will move to the Login scene
    So in order to logout, we just need to set isLoginSuccess to false, and other information to null to reset the app.
  */
  logout() {
    const { email } = this.props;
    console.log("email logout: ========", email);
    this.setState({ isConfirm: true });
  }

  handleConfirm() {
    const { dispatch } = this.props;
    console.log("Confirm logout !!!!!!!!!!!!");
    DataAsync.removeData(myLoginConstant.REMEMBER_USERNAME);
    DataAsync.removeData(myLoginConstant.REMEMBER_EMAIL);
    DataAsync.removeData(myLoginConstant.REMEMBER_ACCOUNT);
    DataAsync.removeData(myLoginConstant.TOKEN);
    DataAsync.removeData(myLoginConstant.REMEMBER_ID);
    dispatch(LoginAction.clearLoginState());
  }

  handleCancelConfirm() {
    console.log("Cancel confirm");
    this.setState({ isConfirm: false }); // change to false will close the popup
  }

  componentWillMount() {
    const { id } = this.props;
    const payload = {
      age: "",
      gender: "",
      phoneNumber: "",
      city: ""
    };
    this.props.dispatch(UserInfoAction.updateUserInfo(payload));
  }

  render() {
    console.log('render in sidebar')
    const { email, username } = this.props;
    const { container, sbInfo, userInfoNav } = styles;
    const { isConfirm } = this.state;
    return (
      <SafeAreaView style={container}>
        <ScrollView>
          <BackGroundImage url={images.sidebarImage}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <View />
              <View style={userInfoNav}>
                {!StringUtil.isEmpty(email) ? (
                  <ImageProfile
                  url={StringUtil.isEmpty(this.props.image[0].uri) ? null : this.props.image[0].uri.url}
                    content={
                      !StringUtil.isEmpty(username) ? username : "Duc Pham"
                    }
                    navigation={this.props.navigation}
                  />
                ) : null}
              </View>
            </View>
            <PopupLogout
              isConfirm={isConfirm}
              confirm={this.handleConfirm.bind(this)}
              cancelConfirm={this.handleCancelConfirm.bind(this)}
              message={"Are you sure you want to quit ?"}
              nameBtnTop={"Sign out"}
              nameBtnBot={"Cancel"}
            />
            <Container style={sbInfo}>
              <Content>
                {/* <TouchableOpacity onPress={this.getProfile.bind(this)}> */}
                <IconSidebar
                  source={images.userIcon}
                  onPress={this.getProfile.bind(this)}
                  content={"User information"}
                />
                {/* </TouchableOpacity> */}
                {/* onPress={this.navigateToScreen('SetUp')}  */}
                <IconSidebar
                  source={images.lock}
                  onPress={this.getSettings.bind(this)}
                  content={"Change password"}
                />
                {/* onPress={this.navigateToScreen('HelpAndFeadBack')}  */}
                <IconSidebar
                  source={images.helpIcon}
                  onPress={this.getFeedback.bind(this)}
                  content={"Help & feedbacks"}
                />
                <IconSidebar
                  source={images.camera}
                  onPress={this.setupPictures.bind(this)}
                  content={"Setup pictures"}
                />
                <IconSidebar
                  source={images.logoutIcon}
                  onPress={this.logout.bind(this)}
                  content={"Sign out"}
                />
              </Content>
            </Container>
          </BackGroundImage>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// these two variables will become SideBar's states
export default connect(state => ({
  isLoginSuccess: state.LoginReducer.isLoginSuccess,
  email: state.LoginReducer.email,
  username: state.LoginReducer.username,
  image: state.UserInfoReducer.image,
  id: state.LoginReducer.id,
  socket: state.LoginReducer.socket
}))(SideBar);
