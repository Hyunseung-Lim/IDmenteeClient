import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

import './login.css'

export const Logout = (props) => {

    const logout = async () => {
        axios({
          method: "POST",
          url:"https://port-0-idmenteeserver-lywdzobf1f908180.sel4.cloudtype.app/logout",
        })
        .then((response) => {
           props.removeToken()
        }).catch((error) => {
            if (error.response) {
                console.log(error.response)
                console.log(error.response.status)
                console.log(error.response.headers)
            }
        })
        navigate('/');
    }

    return(
        <>
            HI! {props.name}
            <button onClick={logout}> logout </button>
        </>
    )
}