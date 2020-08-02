export function getImages(context) {
    return context.keys().map(context);
}

export function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// костыль, переделать!
export function getWeatherIcon(weather) {
    let result = '';
    const hour = weather.timeLocal;
    
    if (hour < 7 || hour > 21) result += 'n';
    else result += 'd';

    const cloudness = weather.clouds.all;
    if (cloudness >= 15 && cloudness < 31) result += '_c1';
    else if (cloudness >= 31 && cloudness < 81) result += '_c2';
    else if (cloudness >= 71) result = 'c3';

    const rsCode = weather.weather[0].id;
    if (Math.trunc(rsCode/100) === 3) result += result.indexOf('c') === -1 ? '_c1_r1' : '_r1';
    else if (Math.trunc(rsCode/100) === 5) {
        if (rsCode === 500) result += result.indexOf('c') === -1 ? '_c1_r1' : '_r1';
        else if (rsCode === 501) result += result.indexOf('c') === -1 ? '_c1_r2' : '_r2';
        else if (rsCode === 511) result += result.indexOf('c') === -1 ? '_c1_rs2' : '_rs2';
        else result += result.indexOf('c') === -1 ? '_c1_r3' :  '_r3';
    }
    else if (Math.trunc(rsCode/100) === 6) {
        if (rsCode === 600 || rsCode === 620) result += result.indexOf('c') === -1 ? '_c1_s1' : '_s1';
        else if (rsCode === 615) result += result.indexOf('c') === -1 ? '_c1_rs1' : '_rs1';
        else if (rsCode === 616) result += result.indexOf('c') === -1 ? '_c1_rs2' : '_rs2';
        else if (rsCode === 601 || rsCode === 611 || rsCode === 611) result += result.indexOf('c') === -1 ? '_c1_s2' : '_s2';
        else result += result.indexOf('c') === -1 ? '_c1_s3' : '_s3';
    }

    else if (Math.trunc(rsCode/100) === 2) {
        if (hour < 8 || hour > 20) result = 'n';
        else result = 'd';

        const cloudness = weather.clouds.all;
        if (cloudness >= 15 && cloudness < 31) result += '_c1';
        else if (cloudness >= 31 && cloudness < 81) result += '_c2';
        else if (cloudness >= 71) result = 'c3';

        if (rsCode === 200 || rsCode === 230) result += '_r1_st';
        else if (rsCode === 201 || rsCode === 231) result += '_r2_st';
        else if (rsCode === 202 || rsCode === 232) result += '_r3_st';
        else if (rsCode === 210 || rsCode === 211 || rsCode === 212 || rsCode === 221) result += '_st';
    }
    
    return result;
}

export function getMaxFrequentIcon(icons) {
    let maxFreq = 1;
    let maxFreqIndex = 2;
    icons.forEach((icon, index) => {
        if (index !== 0 && index !== 1 && index !== 7) {
            let freq = 1;
            for (let i = index + 1; i < icons.length - 1; i++) {
                if (icon === icons[i]) freq += 1;
            }
            if (freq > maxFreq) {
                maxFreq = freq;
                maxFreqIndex = index;
            }
        }
    });
    return icons[maxFreqIndex];
}

export function getIcon(icons, iconName) {
    return icons.find(icon => {
        if (icon.split('/').reverse()[0].split('.')[0] === iconName) return true;
    });
}

export function getTimes(utcDifference) {
    let startTimeLocal = 0;
    let startTimeUTC = 0;
    let startDay = '';
    if (utcDifference > 0) {
        if (utcDifference === 2 || utcDifference === 3) {
            startTimeLocal = utcDifference;
            startDay = 'tomorrow';
            startTimeUTC = 0;
        }
        else {
            startTimeLocal = utcDifference % 3 === 0 ? 3 : utcDifference % 3;
            startTimeUTC = 24 + startTimeLocal - utcDifference;
            startDay = 'today';
        }
    }
    else {
        startTimeLocal = 3 - (-utcDifference) % 3;
        startTimeUTC = -utcDifference + startTimeLocal;
        startDay = 'tomorrow';
    }
    return {
        startTimeLocal: startTimeLocal,
        startTimeUTC: startTimeUTC,
        startDay: startDay,
    };
}

export function getNeededData(json) {
    // получение среза массива погоды с днями завтра-послезавтра-послепослезавтра
    const utcDifference = json.city.timezone/60/60;
    let weather = json.list;
    const times = getTimes(utcDifference);
    const dayNow = (new Date()).getDate();
    const monthNow = (new Date()).getMonth();
    const indexStart = weather.findIndex(
        w => 
            (times.startDay === 'tomorrow' 
            ? 
                (dayNow > 27 && (new Date(Date.now() + 86400000)).getMonth() === monthNow + 1)
                ? (new Date(w.dt * 1000)).getUTCDate() === 1
                : (new Date(w.dt * 1000)).getUTCDate() === dayNow + 1
            :   
                (new Date(w.dt * 1000)).getUTCDate() === dayNow
            )
            &&
            (new Date(w.dt * 1000)).getUTCHours() === times.startTimeUTC
        );
    weather = weather.slice(indexStart, indexStart + 24);
    weather.forEach((w, index) => w['timeLocal'] = (times.startTimeLocal + index * 3) % 24);
    return weather;
}

export function chunkArray(array) {
    let result = [];
    for (let i = 0; i < 8; i++) {
        let temp = [];
        for (let j = 0; j < 3; j++) temp[j] = array[i + 8 * j];
        result.push(temp);
    }
    return result;
}