import React, { useState, useContext } from "react";
// import "../../styles/user.css";
// import { Vehicles } from "../component/vehicles.js";
import { Context } from "../store/appContext";

export const User = () => {
	const { store, actions } = useContext(Context);


  return (
    <div className="container">
      <form>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="inputEmail3"
              onChange={(e) => {
                actions.setUserMail(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputUser" className="col-sm-2 col-form-label">
            User
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputUser"
              onChange={(e) => {
				actions.setUserUser(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              onChange={(e) => {
                actions.setUserPassword(e.target.value);
              }}
            />
          </div>
        </div>
		<a
          className="btn btn-light mx-2"
          onClick={async () => {
            const response = await fetch(
				"https://3000-4geeksacade-flaskresthe-ykzyeg9yxkh.ws-eu43.gitpod.io/user_login",
				{
				  method: "POST",
				  body: JSON.stringify(store.userData),
				  headers: {
					  "access-control-allow-origin":	"*",
					  "Content-Type": "application/json"
				  }
				}
			  );
            const confirmation = await response.json();
			if (confirmation.Respuesta.User){
				actions.setLogin(confirmation.Respuesta)
				console.log(confirmation,"yes");
			}
			else{
				alert("Log in was not possible, try with more accurate data :)");
				console.log(confirmation);
			}            
          }}
        >
          Log in
        </a>
        <a
          className="btn btn-light"
          onClick={async () => {
            const response = await fetch(
              "https://3000-4geeksacade-flaskresthe-ykzyeg9yxkh.ws-eu43.gitpod.io/user",
              {
                method: "POST",
                body: JSON.stringify(store.userData),
                headers: {
					"access-control-allow-origin":	"*",
                	"Content-Type": "application/json"
                }
              }
            );
            const confirmation = await response.json();
            alert(confirmation.Respuesta);
          }}
        >
          New user
        </a>
        <a
          className="btn btn-light mx-2"
          onClick={async () => {
            const response = await fetch(
              "https://3000-4geeksacade-flaskresthe-ykzyeg9yxkh.ws-eu43.gitpod.io/user",
              {
                method: "DELETE",
                body: JSON.stringify(store.userData),
                headers: {
					"access-control-allow-origin":	"*",
                	"Content-Type": "application/json"
                }
              }
            );
            const confirmation = await response.json();
            alert(confirmation.Respuesta);
          }}
        >
          Delete user
        </a>
      </form>
    </div>
  );
};
