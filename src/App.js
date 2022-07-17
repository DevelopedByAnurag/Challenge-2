import "regenerator-runtime/runtime";
import React, { useEffect, useState } from "react";
import { login, logout } from "./utils";
import { Link } from "react-router-dom";

// Custom Components
import Form from "./Components/Form";
// assets
import Logo from "./assets/logo-white.svg";

import getConfig from "./config";
const { networkId } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [usermessage, setMessage] = useState(null);
  
  return (
    <React.Fragment>
     <main>
      <header>
        
        <img src={Logo} height="100px"/>
        <h1>Challenge #2 NFT Minter Challenge
</h1>

        {window.walletConnection.isSignedIn() ?
          <p>Currently signed in as: <code>{window.accountId}</code></p>
        :
          <p>Please login to continue.</p>
        }

      </header>
      {window.walletConnection.isSignedIn() && <><br/><Link to="/deck"><button >My deck</button></Link></>}
      {window.walletConnection.isSignedIn() &&
        <Form
         
        />
      }
  

  {window.walletConnection.isSignedIn()
          ? <button onClick={logout}>Log out</button>
          : <button onClick={login}>Log in</button>
        }
        
    </main>
    </React.Fragment>
  );
}
