import React, { useState } from "react";
import Button from "../styled-components/button"
import Input from "../styled-components/input"
import Form from "../styled-components/form"
import Spinner from "../../common/Spinner"
import LoadingOverlay from 'react-loading-overlay';
import { Link } from "react-router-dom";
import { Formik, useFormik } from "formik";

type SignUpProps = {
    onSignUp: (username: string, email: string, password: string) => void,
    loading: boolean,   // if we are currently trying to sign up
    error?: string      // message for last error, undefined if no error exist
}

interface FormValues {
    username: string;
    email: string;
    password: string;
}  

export const SignupView = (props: SignUpProps) =>{
    
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
                        username: '',
                        email: '',
                        password: ''
                    }}

                    onSubmit={(values: FormValues) => {
                        props.onSignUp(values.username, values.email, values.password)
                    }}
                >{(formik) => (
                    <Form className="container p-3 mt-3" onSubmit={formik.handleSubmit}>
                        <div className="container col-sm-12 mb-3">
                            <h2>Create a new account</h2>
                            <Input className="form-control mb-3 mt-3" id="username" placeholder="username" type="text" name="username" {...formik.getFieldProps("username")} />
                            <Input className="col-sm-12 form-control mb-3" id="email" placeholder="email" type="text" name="email" {...formik.getFieldProps("email")} />
                            <Input className="form-control" id="password" placeholder="password" type="password" name="password" {...formik.getFieldProps("password")} />
                            {props.error && (<p>{props.error}</p>)}
                        </div>
                        <div className="container col-sm-12 mb-3">
                            <Button type="submit" value="Sign Up">Sign up</Button>
                            Already have an account?
                            <Link to="/login">
                                <Button >Log in instead</Button>
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