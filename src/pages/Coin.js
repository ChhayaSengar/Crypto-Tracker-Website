
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Common/Header";
import Loader from "../components/Loader";
import { coinObject } from "../functions/coinObject";
import List from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import { getCoinPrices } from "../functions/getCoinPrices";
import { getedCoinData } from "../functions/getedCoinData";
import { convertDate } from "../functions/convertDate";
import SelectDays from "../components/Coin/SelectDays";
import { settingChartData } from "../functions/settingChartData";
import PriceToggle from "../components/Coin/PriceToggle";
import CoinChart from '../components/Coin/CoinChart';



const CoinPage = () => {
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [coinData, setCoinData] = useState();
  const [days, setDays] = useState(60);
  const [chartData, setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');
  
  useEffect(() =>{
   if(id) {
    getData()
   }
 }, [id]);
  
  async function getData() {
    const data = await getedCoinData(id);
    if(data){
      coinObject(setCoinData, data);
      
      const prices = await getCoinPrices(id, days, priceType)
      if(prices.length > 0){
        console.log("WOHOOOOOO");
        settingChartData(setChartData, prices);
         setIsLoading(false); 
      }
    }
  }

  const handleDaysChange =  async (event) => {
    setIsLoading(true); 
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, priceType)
      if(prices.length > 0){
        console.log("HOOOOOO");
        settingChartData(setChartData, prices);
         setIsLoading(false); 

         setChartData({
          labels:prices.map((price) => convertDate(price[0])),
          datasets: [
            {
              data:prices.map((price) => price[1]),
              borderColor: "#3a80e9",
              borderWidth : 2,
              fill: true,
              tension: 0.25,
              backgroundColor: "rgba(58, 128, 233, 0.1)",
              pointRadius: 0,
            },
          ],
         });
      }
  };

 

  const handledPriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType)
    if(prices.length > 0){
      console.log("HOOOOOO");
      settingChartData(setChartData, prices);
       setIsLoading(false); 
    } 
  };
  
  
  return (
    <div>

     <Header />
      {
      isLoading ? (
       <Loader />
       ) : (
         <> 
          <div className="grey-wrapper" style= {{padding: "0rem 1rem"}}>
             <List  coin={coinData} />
          </div>
           
           <div className="grey-wrapper">
            <SelectDays days={days} handleDaysChange={handleDaysChange }/>
            
            <PriceToggle 
            priceType={priceType} 
            handledPriceTypeChange={handledPriceTypeChange}

            />
            
            <CoinChart chartData={chartData}  priceType={priceType} />
            
              
            {/* <LineChart chartData={chartData}  priceType={priceType} />
            */}
          </div>
           
           <CoinInfo name={coinData.name} desc={coinData.desc}/>
          </>
          )
       
       }
    </div>
  )
}

export default CoinPage;
