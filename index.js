let loc='botosani';
let weatherdata;
let locdata;

const searchinput=document.querySelector('.searchbar input')
const searchbutton=document.createElement('button');
searchbutton.textContent='search';
searchbutton.onclick=()=>{search()}
document.querySelector('.searchbar').appendChild(searchbutton);

function search(){
    loc=searchinput.value;
    searchinput.value='';
    refreshSite();
}

async function refreshWeatherData(){
    let data= await fetch(`https://api.weatherapi.com/v1/current.json?key=aa15252858da4cd4af092646232507&q=${loc}`, {mode: 'cors'})
    let json= await data.json();
    weatherdata=json.current;
    locdata=json.location;
}

function refreshSite(){
    refreshWeatherData().then(()=>{renderWeatherData()}).catch((err)=>{console.log(err)});
}

function renderWeatherData(){
    //console.log(weatherdata);
    //console.log(locdata);
    changeWeatherPicture()
    changeWeatherPicturetogif()
    const location=document.querySelector('.location');
    const weathercode=document.querySelector('.weather');
    const higher_temp=document.querySelector('.max_temp');
    const lower_temp=document.querySelector('.min_temp');
    //const line=document.querySelector('.line'); //for temp range

    location.textContent=`${locdata.name}, ${locdata.country}`;

    weathercode.textContent=weatherdata.condition.text;
    higher_temp.textContent=`${weatherdata.temp_c}C`;

}
function changeWeatherPicture(){
    const image=document.querySelector('.content img')
    image.src=weatherdata.condition.icon;
}

async function changeWeatherPicturetogif(){
    const image=document.querySelector('img.gif')
    image.src='./loading.gif';
    const gify=await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=8hMwN9rgOzxCC9HD1mzDEeh9GVQtLdsr&s=weather ${weatherdata.condition.text}`, {mode: 'cors'})
    const json=await gify.json();
    image.src=json.data.images.original.url;
}

//so the site isnt empty at the begining
refreshSite();