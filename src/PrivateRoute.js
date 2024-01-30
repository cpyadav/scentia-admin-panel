import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, token, ...rest }) => {
    console.log(token)
    return (
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Component {...props} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    );
  };

  
export default PrivateRoute;