import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd , setUsd] = useState(0);
  const [getCoin, setGetCoin] = useState(0);
  const onChange = (event) => {
    setUsd(event.target.value);
  }
  const selectedCoin = (e) => {
    setGetCoin(e.target.value)
  }
  useEffect(()=>{
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then((response) => response.json())
    .then((json) => {  
      setCoins(json)
      setLoading(false);
    });
  },[]);
  return (
    <div>
      <h1>The coins! {loading? "": `(${coins.length})`}</h1>
      <input onChange={onChange} type="number" placeholder="Write your USD.."/> $
      <hr/>
      {loading ? <strong>Loading...</strong> :
      <select onChange={selectedCoin}>
        <option>Select Coin</option>
        {coins.map((coin,index) => (
          <option key={index} value={coin.quotes.USD.price}> 
            {coin.name} ({coin.symbol}): ${(coin.quotes.USD.price).toFixed(2)} USD
          </option>))}
      </select>
        }
        {getCoin === 0 ? null : 
          <h3>구매 가능한 Coin 갯수: {(usd / getCoin).toFixed(2)} 개</h3>
        }
    </div>
  );
}

export default App;
