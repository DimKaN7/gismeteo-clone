import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';

import './App.css';

import Header from '../Header/Header';
import WeatherView from '../WeatherView/WeatherView';
import {getNeededData} from '../../services/tools';
import {notificationsTexts} from '../../services/labels';
import {getInfo} from '../../services/weatherService';
import Footer from '../Footer/Footer';
import Loader from '../Loader/Loader';

import {
    setLang, setCity, setLoading, 
    setWeather, setWidth, setSelectedTab,
} from '../../actions/actions';

function App(props) {
  const apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
  const apiKey = 'abac1141b934536baef9782b2a0e7327';

  const {
    lang,
    city, setCity,
    loading, setLoading,
    setWeather,
    setWidth,
    selectedTab, setSelectedTab,
  } = props;
  
  const [height, setHeight] = useState(0);
  const [showNot, setShowNot] = useState(false);
  const [not, setNot] = useState('');
  const [online, toogleOnline] = useState(navigator.onLine);

  const scroll = useRef(null);

  const cityTitle = `${city.split(' ')
                              .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                              .reduce((sum, val) => sum + ' ' + val)}`

  const updateWidth = () => {
    const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const windowHeight = typeof window !== "undefined" ? window.outerHeight : 0;
    setWidth(windowWidth);
    setHeight(windowHeight);
  }
  const updateOnline = () => {
    toogleOnline(navigator.onLine);
  }
  const updateCity = (newCity=undefined, lat=undefined, lon=undefined) => {
    const resolve = (json) => {
      if (!newCity) newCity = json.city.name;
      setCity(newCity);
      setWeather(getNeededData(json));
      setLoading(false);
      localStorage.setItem('city', newCity);
    }
    const reject = () => {
      setNot('notFound');
      setShowNot(true);
      setLoading(false);
      setCity(city);
      localStorage.setItem('city', city);
    }
    const timeout = setTimeout(() => {
      if (online) {
          const requset = lat
                            ? `${apiBase}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
                            : `${apiBase}q=${newCity}&units=metric&lang=${lang}&appid=${apiKey}`;
          getInfo(requset, resolve, reject);
      }
    }, 500);
    setSelectedTab(0);
    scroll.current.scrollLeft = 0;
    return () => clearTimeout(timeout);
  }

  const onLocationClick = () => {
    const onLocationSuccess = (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      updateCity(undefined, lat, lon);
    }
    const onLocationError = () => {
      setNot('locationDenied');
      setShowNot(true);
      updateCity(city);
    }
    if (online) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
    }
  }

  useEffect(() => {
    updateWidth();
    window.addEventListener('resize', updateWidth);
    window.addEventListener('load', updateOnline);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);

    return () => {
        window.removeEventListener('resize', updateWidth);
        window.addEventListener('load', updateOnline);
        window.addEventListener('online', updateOnline);
        window.addEventListener('offline', updateOnline);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
        setShowNot(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [showNot]);

  useEffect(() => {
    if (online) {
        updateCity(city);
        setNot('connRestore');
    }
    else setNot('noConn');
    setShowNot(true);
  }, [online]);

  return (
    <div className='app-main-container'>
      {
        loading &&
        <>
          <div className='loader-wrapper'></div>
          <Loader />
        </>
      }
      {
        showNot && 
        <div className='not-wrapper'>
            {notificationsTexts[not][lang]}
        </div>
      }
      <Header onLocationClick={onLocationClick} 
              updateCity={updateCity} />
      <h1>{cityTitle}</h1>
      <WeatherView scroll={scroll}
                    selectedTab={selectedTab} />
      <Footer height={height} />
    </div>
  );
}

const mapStateToProps = ({lang, city, loading, weather, width, selectedTab}) => {
  return {
    lang,
    city,
    loading,
    weather,
    width,
    selectedTab,
  }
}

const mapDispatchToProps = {
  setLang,
  setCity,
  setLoading,
  setWeather,
  setWidth,
  setSelectedTab,
}

export default connect(mapStateToProps, mapDispatchToProps)(App);