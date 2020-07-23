export function getImages(context) {
    return context.keys().map(context);
}

export function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// костыль, переделать!
export function getWeatherIcons(weather) {
    let result = '';
    const hour = (new Date(weather.dt * 1000)).getHours();
    
    if (hour < 8 || hour > 20) result += 'n';
    else result += 'd';

    const cloudness = weather.clouds.all;
    if (cloudness >= 15 && cloudness < 31) result += '_c1';
    else if (cloudness >= 31 && cloudness < 81) result += '_c2';
    else if (cloudness >= 71) result = 'c3';

    const rsCode = weather.weather[0].id;
    if (Math.trunc(rsCode/100) === 3) result += '_r1';
    else if (Math.trunc(rsCode/100) === 5) {
        if (rsCode === 500) result += '_r1';
        else if (rsCode === 501) result += '_r2';
        else if (rsCode === 511) result += '_rs2';
        else result += '_r3';
    }
    else if (Math.trunc(rsCode/100) === 6) {
        if (rsCode === 600 || rsCode === 620) result += '_s1';
        else if (rsCode === 615) result += '_rs1';
        else if (rsCode === 616) result += '_rs2';
        else if (rsCode === 601 || rsCode === 611 || rsCode === 611) result += '_s2';
        else result += '_s3';
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