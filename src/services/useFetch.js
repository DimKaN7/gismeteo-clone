import {useState, useEffect} from 'react';

// id = 2023469;

export default function useFetch(city) {
    const apiBase = 'http://api.openweathermap.org/data/2.5/forecast?';
    const apiKey = 'abac1141b934536baef9782b2a0e7327';
    const [weather, setWeather] = useState();
    const [loading, setLoading] = useState(true);

    async function fetchUrl() {
        const response = await fetch(`${apiBase}q=${city}&units=metric&lang=ru&appid=${apiKey}`);
        const json = await response.json();
        // console.log(getNeededData(json.list));
        setWeather(getNeededData(json.list));
        setLoading(false);
    }

    function getNeededData(weather) {
        // получение среза массива погоды с днями завтра-послезавтра-послепослезавтра
        const dayNow = (new Date()).getDate();
        const indexStart = weather.findIndex(
            w => 
                (new Date(w.dt * 1000)).getUTCDate() === dayNow &&
                (new Date(w.dt * 1000)).getHours() === 2 // utc 18:00 + 8 = 02:00
            );
        return weather.slice(indexStart, indexStart + 24);
    }

    useEffect(() => {
        setTimeout(() => {
            fetchUrl()
        }, 1000);
    }, []);

    return [weather, loading];
}