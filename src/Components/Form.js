import React from "react";
import PropTypes from "prop-types";
import Big from 'big.js';
const BN = require("bn.js");

export default function Form() {
  const { v4: uuidv4 } = require('uuid');

  const mint =async(name,url,description) =>{
    await window.contract.nft_mint(
      {
        token_id: `${window.accountId}-${uuidv4()}`,
        metadata: {
          title: name,
          description: description,
          media:
            url,
        },
        receiver_id: window.accountId,
      },
      300000000000000, // attached GAS (optional)
      new BN(Big(1).times(10 ** 24).toFixed())
    ); 

  }


/*   useEffect(() => {
    const checkmsg = async () => {
      if (window.accountId !== "") {
        const usermessage = await window.contract.get_message({
          account_id: window.accountId
        });
  
        setMessage(usermessage);
      }
    };
    checkmsg();
  }, []);
   */
  function random() { // min and max included 
    return Math.floor(Math.random() * (500 - 1 + 1) + 1)
  }
  function pokemon(id){
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(function(data){
      let nombre = data.name;
      let url = data.sprites.other.dream_world.front_default;
      let description = "pokemon height is "+  data.height + " pokemon weight is " + data.weight + " pokemon experience is" + data.base_experience
      if(nombre && url && description)
      {
        mint(nombre,url,description);
      }
    });
  }
  const submit = async (e) => {
    e.preventDefault()
    pokemon(random())
   };
  return (
    <><form>
      <center>
        <p>Mint Your Self A Pokemon!</p>

        <div className="card">
          <div className="card__inner">
            <div className="card__header">
              <span className="card__stage">Basic</span>
              <span className="card__name">Pokemon</span>
              <div className="card__hp">
                <span className="card__hp__text">HP</span>
                <span className="card__hp__value">90</span>
              </div>
            </div>
            <img
              className="card__image"
              src="https://c.tenor.com/4IcoROepmvEAAAAC/pokemon-master-ball.gif"
              alt="Generic Pokemon Image Placeholder" />
            <div className="card__type">Catch Pokemon</div>
          </div>
        </div>
        <button onClick={submit}>Mint</button>
      </center>
      
    </form></>
  );
}

Form.propTypes = {
  currentUser: PropTypes.shape({
    accountId: PropTypes.string.isRequired,
  }),
};
