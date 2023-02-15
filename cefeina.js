const input = document.querySelector("#input");
const button = document.querySelector("button");

const content = document.querySelector(".content");
const h2 = document.querySelector("#h2");
const clima = document.querySelector("#clima");
const img = document.querySelector("#img");
const vento = document.querySelector("#vento");

button.addEventListener("click", ()=>{
    if(input.value == ""){
        alert("Não foi informado o nome da cidade");
    }
    else{
        getDataApi();
    }
});


async function getDataApi(){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&units=metric&appid=e7a27b16e73ad2e9e094e91f2bd78b20`;

    try{
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                if(data?.cod && data.code === "404"){
                    return alert("Local não encontrado");
                }

                loadData(data);
            });
    } catch(error){
        alert( error);
    }
}

function loadData(data) {
    h2.textContent = `${data.name}, ${data.sys.country}`;
    clima.textContent = `${Math.floor(data.main.temp)}°C`;
    img.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`)
    vento.textContent = `${data.wind.speed} Km/h`;   
}

window.addEventListener("load", ()=>{
    input.value = "Brasília";
    getDataApi();
});
