import React from "react";
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";
import { CatchPresenter } from '../features/catch/CatchPresenter';
import { AuthenticatedRoute, NonAuthenticatedRoute } from "../common/conditionalRoutes";
import AuthIsLoaded from "../common/AuthIsLoaded";
import { ProfilePresenter } from "../features/profile/ProfilePresenter";
import { NavBarPresenter } from "../features/navbar/NavBarPresenter";
import { BattlePresenter } from "../features/battle/BattlePresenter";
import { HomePresenter } from "../features/home/HomePresenter";
import { LoginPresenter } from "../features/login/LoginPresenter";
import { SignupPresenter } from "../features/signup/SignupPresenter";
import { InfoView } from "../features/info/InfoView";

const App = () => {
    return (
        <AuthIsLoaded>
            <Router>
                <NavBarPresenter/>
                <Switch>
                    <NonAuthenticatedRoute path='/login'>
                        <LoginPresenter />
                    </NonAuthenticatedRoute>
                    <NonAuthenticatedRoute path='/signup'>
                        <SignupPresenter />
                    </NonAuthenticatedRoute>
                    <AuthenticatedRoute path='/info'>
                        <InfoView/>
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path='/profile'>
                        <ProfilePresenter/>
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path='/battle'>
                        <BattlePresenter/>
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path='/catch'>
                        <CatchPresenter/>
                    </AuthenticatedRoute>
                    <AuthenticatedRoute path="/">
                        <HomePresenter />
                    </AuthenticatedRoute>
                </Switch>
            </Router>
        </AuthIsLoaded>
    )
};

export default App;