import React from 'react';
import {
  Route as ReactDomRoute,
  RouteProps as ReactDomRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDomRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  component: Component,
  isPrivate = false,
  ...rest
}) => {
  const { token } = useAuth();
  const isSigned = !!token;
  console.log(token);
  console.log(isSigned);
  return (
    <ReactDomRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate !== isSigned) {
          return (
            <Redirect
              to={{
                pathname: isPrivate ? '/login' : '/',
                state: { from: location },
              }}
            />
          );
        }

        return <Component />;
      }}
    />
  );
};

export default Route;
