import './LandingPage.css';
import Layout from '../components/layout/Layout'
import AgentSelector from '../components/agentSelector/AgentSelector';
import { Accordion, AccordionSummary, Button, Card, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookingThunk } from '../store/thunks';
import { useNavigate } from "react-router-dom";

const getDateStr = (dateObj) => {
  const year = dateObj.getFullYear();
  const month =
    dateObj.getMonth() < 10
      ? `0${dateObj.getMonth() + 1}`
      : dateObj.getMonth() + 1;
  const date =
    dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
  return `${year}-${month}-${date}`;
};

function LandingPage() {
  const [price, setPrice] = useState(1000)
  const [city, setCity] = useState("Delhi")
  const [country, setCountry] = useState("Country")
  const [countryCode, setCountryCode] = useState("IN")
  const [error, setError] = useState("")
  const [date, setDate] = useState(getDateStr(new Date()))
  const dispatch = useDispatch()
  const navigat = useNavigate()

  const handlePrice = (e) => {
    setPrice(e.target.value);
  }

  const handleCity = (e) => {
    setCity(e.target.value);
  }

  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleCountryCode = (e) => {
    setCountryCode(e.target.value)
  }

  const handleDate= (e) => {
    const dateObj = new Date(e.target.value)
    if (dateObj) {
      setDate(getDateStr(dateObj));
    }
  }

  const handleBooking = () => {
    setError("");
    dispatch(addBookingThunk({price, city, country, countryCode, date})).then(res => {
      if (res) {
        navigat("/faq")
      } else {
        setError("Failed to create booking. Please try again")
      }
    })
  }

  return (
    <Layout title={"Booking Preview"}>
      <AgentSelector/>
      <div className='landing-page-wrapper'>
        <Card elevation={3} className='booking-box'>
          <h3>Make a dummy booking to understand the flow</h3>
          <div className='input-row'>
            <div className='input-title'>Price (in $)</div>
            <TextField onChange={handlePrice} value={price} type='number'/>
          </div>
          <div className='input-row'>
            <div className='input-title'>Date</div>
            <TextField onChange={handleDate} value={date} type='date'/>
          </div>
          <div className='input-row'>
            <div className='input-title'>City Name</div>
            <TextField onChange={handleCity} value={city}/>
          </div>
          <div className='input-row'>
            <div className='input-title'>Country</div>
            <TextField onChange={handleCountry} value={country}/>
          </div>
          <div className='input-row'>
            <div className='input-title'>Country Code</div>
            <TextField onChange={handleCountryCode} value={countryCode}/>
          </div>
          <Button onClick={handleBooking} variant='contained'>Confirm Booking</Button>
          <Typography variant='error'>{error}</Typography>
        </Card>
      </div>
    </Layout>
  );
}

export default LandingPage;
