import { AppContext } from "../functions/AppProvider";
import React, { useContext } from "react";
import { Navigate, Route } from "react-router-dom";

interface Props {
  component: any;
  // Rest props
  [x: string]: any;
}

export function PrivateRoute(props: Props) {
  const { component: Component, ...rest } = props;

  const { currentUser } = useContext(AppContext);

  return currentUser === undefined ? (
    <div>loading</div>
  ) : currentUser !== null ? (
    <Route {...rest} />
  ) : (
    <Navigate to={{ pathname: "/login" }} state={props.location} />
  );
}
