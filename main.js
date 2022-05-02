console.time();

// DOM elemet select from DOM
const firstSlider = document.querySelector("#first .container .wrapper"),
  secSlider = document.querySelector("#sec .container .wrapper"),
  welcomeSlider = document.querySelector(".poster");

// localstorage
const cache = localStorage.getItem("cache");

//main api class
class API {
  constructor(url) {
    this.url = url;
  }
  async getData(cb) {
    try {
      let data = await fetch(this.url);
      let res = await data.json();
      cb({ msg: true, data: res });
    }
    catch (err) {
      console.log(err);
      cb({ msg: false, err: err.message });
    }
  }
}


//cacheing data
if (cache) {
  fillup(JSON.parse(cache));
}
else {
  const api = new API(`https://api.tvmaze.com/shows`);

  api.getData((res) => {
    if (res.msg) {
      localStorage.setItem('cache', JSON.stringify(res));
      fillup(res);
    }
    else {
      console.log(res.err);
    }
  })
}




// fiilup function
function fillup(data) {
  //welcome slider fillup
  welcomeSlider.querySelector("h2").innerText = data.data[Math.floor(Math.random() * data.data.length)].name;
  welcomeSlider.insertAdjacentHTML("beforeend", data.data[Math.floor(Math.random() * data.data.length)].summary);
  var trimmedString = welcomeSlider.querySelector("p").innerText.substr(0, 150);
  welcomeSlider.querySelector("p").innerText = `${trimmedString} ...`;
  welcomeSlider.querySelector(".Rate").innerText = data.data[Math.floor(Math.random() * data.data.length)].rating.average;
  welcomeSlider.style.backgroundImage = `url("${data.data[Math.floor(Math.random() * data.data.length)].image.original}")`;


  //slider one fillup 
  for (let i = 0; i < 100; i++) {
    let html = `
        <div class="elm">
         <img src=${data.data[i].image.original} alt='${data.data[i].name}' loading="lazy"/>
        </div>`;
    firstSlider.insertAdjacentHTML("beforeend", html);
    firstSlider.querySelector('.elm img').addEventListener("load", (e) => {
      e.target.style.backgroundColor = "transparent";
    })
  }
  //sec slider fillup
  for (let i = 100; i < 200; i++) {
    let html = `
        <div class="elm">
         <img src=${data.data[i].image.original} alt='${data.data[i].name}' loading="lazy"/>
        </div>`;
    secSlider.insertAdjacentHTML("beforeend", html);
    secSlider.querySelector('.elm img').addEventListener("load", (e) => {
      e.target.style.backgroundColor = "transparent";
    })
  }
}

console.timeEnd();