import React, { useState } from "react";
import Button from "../styled-components/button"
import Input from "../styled-components/input"
import Form from "../styled-components/form"
import Spinner from "../../common/Spinner"
import LoadingOverlay from 'react-loading-overlay';
import { Link } from "react-router-dom";
import { Formik } from 'formik';


type LoginProps = {
    onLogIn: (email: string, password: string) => void,
    loading: boolean,   // if we are currently trying to login
    error?: string      // message for last error, undefined if no error exist
}

export const LoginView = (props: LoginProps) => {
    interface Values {
        email: string;
        password: string;
    }    

    return (

    <div className="container">
        <div className="container col-sm-4 align-items-center">
            <LoadingOverlay
                active={props.loading}
                spinner={<Spinner />}
                fadeSpeed={200}
                styles={{
                    overlay: (base: any) => ({
                        ...base,
                        background: "rgba(255, 255, 255, 0.6)",
                        borderRadius: "10px",
                    })
                }}
            >
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                
                onSubmit={(values: Values) => {
                    props.onLogIn(values.email, values.password)
                  }}
            >{(formik) => (
                <Form className="container col-sm-12 mb-3" onSubmit={formik.handleSubmit}>
                    <div className="container col-sm-12 mt-3 pt-3" >
                        <h2>Welcome back!</h2>

                        <Input className="form-control mb-3 mt-3" id="email" name="email" placeholder="example@example.com" type="email" {...formik.getFieldProps('email')} />
                        <Input className="form-control mb-3" type="password" id="password" name="password" placeholder="password" {...formik.getFieldProps('password')} />
                        {props.error && (<p>{props.error}</p>)}
                    </div>
                    <div className="container col-sm-12 mb-3 pb-3">

                        <Button className="mb-3" type="submit">Log in</Button>
                        Don't have an account?
                        <Link to="/signup">
                            <Button >Sign up here!</Button>
                        </Link>
                    </div>
                </Form>
            )}
            </Formik>
            </LoadingOverlay>
        </div>
    </div>

    )
}