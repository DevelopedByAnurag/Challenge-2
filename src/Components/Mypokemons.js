

import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Logo from "../assets/logo-white.svg";
import { Link } from "react-router-dom";

export default function Mypokemons({ onSubmit }) {
   const [pokemons,setpokemon] = useState(null);
       useEffect(() => {
    const checkmsg = async () => {
      if (window.accountId !== "") {
        const usermessage = await window.contract.nft_tokens_for_owner        ({
          account_id: window.accountId
        });
  
        setpokemon(usermessage.map((i)=>{return i.metadata}));
      }
    };
    checkmsg();
  }, []);
  return (
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
    <><br/><Link to="/"><button >Home</button></Link></>
      <><h1>My Pokemon Deck</h1><section className="deck">
        {pokemons && pokemons.map((items,index)=>{
           return(<> <div className="card-area" key={index}>
           <div className="card" >
               <div className="card__inner">
                   <div className="card__header">
                       <span className="card__stage">
                           Basic
                       </span>
                       <span className="card__name">
                       {items.title}
                       </span>
                       <div className="card__hp">
                           <span className="card__hp__text">HP</span>
                           <span className="card__hp__value">90</span>
                       </div>
                   </div>
                   <img className="card__image" src={items.media}alt="Generic Pokemon Image Placeholder" />
                   <div className="card__type">{items.description}</div>

               </div>
           </div>

           <div className="buttons">
               <a disabled className="button update" href="#">Send Not Active</a>
               <a disabled  className="button delete" href="#">Trash Not Active</a>
           </div>
       </div></>)
        })}
          
          
      </section></>
</main>
  );
}

Mypokemons.propTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired
  })
};
