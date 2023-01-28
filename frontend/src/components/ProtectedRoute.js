import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ loggedIn, component: Component, ...props }) {
  // console.log("ProtectedRoute", loggedIn)
  return (
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
    </Route>
  );
}

export default ProtectedRoute;
