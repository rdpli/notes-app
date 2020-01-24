import React from "react";

import AuthUserContext from "./AuthUserContext";
import { auth } from "api/firebase";

const withAuthentication = Component =>
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: null
      };
    }

    componentDidMount() {
      if (typeof window !== "undefined") {
        auth.onAuthStateChanged(authUser => {
          authUser
            ? this.setState(() => ({ authUser }))
            : this.setState(() => ({ authUser: null }));
        });
      }
    }

    render() {
      const { authUser } = this.state;

      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export default withAuthentication;
