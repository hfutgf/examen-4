const table = document.querySelector('.tabel');
const tbody = document.querySelector('.tbody');

const input = document.querySelector('.input');

const select = document.querySelector('.select');

const basketSpan = document.querySelector('.basket-span');

let parseLocalStorage = localStorage.getItem('activeData');
let dataLocal = JSON.parse(parseLocalStorage) || [];

basketSpan.innerHTML = dataLocal.length;


const dataId = async (id) => {
  let parseDataLocal = localStorage.getItem('activeData');

  let dataLocal = JSON.parse(parseDataLocal) || [];

  console.log(dataLocal);
  let findElement = dataLocal.find((elem) => elem == id);


  if (findElement) {
    let indexElement = dataLocal.findIndex((elem) => findElement == elem);
    dataLocal.splice(indexElement, 1);
  } else {
    dataLocal = [...dataLocal, id]
  }

  localStorage.setItem('activeData', JSON.stringify(dataLocal));


}

///////FETCH/////////////////////////////////////////
async function getData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let storage = localStorage.setItem('token', JSON.stringify(data.data));
      console.log(data.data);
      const date = data.data;


    });
}
getData("https://pressa-exem.herokuapp.com/api-49");

const strLoc = localStorage.getItem('token');
let arrayGetLocStorage = JSON.parse(strLoc);



//RENDER PROJECT//////////////////////////////////////////////////////////
const renderData = (array) => {
  array.forEach(currency => {

    const tr = document.createElement('tr');
    tr.className = 'currency-info';
    tbody.appendChild(tr);

    const code = document.createElement('th');
    code.classname = 'code';
    code.textContent = currency.Code;
    tr.appendChild(code);


    const name = document.createElement('td');
    name.className = 'name';
    name.textContent = currency.CcyNm_UZ;
    tr.appendChild(name);


    const nameCode = document.createElement('td');
    nameCode.className = 'name-code';
    nameCode.textContent = currency.Ccy;
    tr.appendChild(nameCode);


    const sum = document.createElement('td');
    sum.className = 'sum';
    sum.textContent = currency.Rate;
    tr.appendChild(sum);


    const data = document.createElement('td');
    data.className = "data";
    data.textContent = currency.Date
    tr.appendChild(data);


    let parseLocalStorage = localStorage.getItem('activeData');
    let dataLocal = JSON.parse(parseLocalStorage) || [];
    let dataYes = dataLocal.find((element) => element == currency.id);



    const bookMarkOff = document.createElement('img');
    bookMarkOff.src = "./img/add-bookmark-icon.svg"

    if (dataYes) {
      bookMarkOff.classList.add('on')
    } else {
      bookMarkOff.classList.add('off')
    }
    bookMarkOff.setAttribute("data-id", currency.id);
    tr.appendChild(bookMarkOff);

    const bookMarkOn = document.createElement('img');
    bookMarkOn.src = "./img/bookmarkk.png"
    bookMarkOn.setAttribute("data-id", currency.id);
    if (dataYes) {
      bookMarkOn.classList.add('off')
    } else {
      bookMarkOn.classList.add('on')
    }
    tr.appendChild(bookMarkOn);


    ////////  BOOKMARK ///////////////////////////////////////////////

    bookMarkOff.addEventListener('click', (e) => {
      dataId(e.target.dataset.id)


      if (bookMarkOff.className = 'off') {
        basketSpan.textContent++
        bookMarkOff.classList.add('on');
        bookMarkOff.classList.remove('off')

        bookMarkOn.classList.add('off');
        bookMarkOn.classList.remove('on');
      }

    })


    bookMarkOn.addEventListener('click', (e) => {
      dataId(e.target.dataset.id)

      basketSpan.textContent--
      if (bookMarkOn.className = 'off') {

        bookMarkOff.classList.remove('on');
        bookMarkOff.classList.add('off')

        bookMarkOn.classList.remove('off');
        bookMarkOn.classList.add('on');

      }

    })


  })

}





//SELECT RENDER  ////// /////////////////////////////////// 
const selectRender = (array) => {
  select.addEventListener("change", (e) => {
    tbody.innerHTML = "";

    if (select.value == "small-to-big") {
      let smallToBig = array.sort((a, b) => {
        return (a.Rate - b.Rate);
      });
      renderData(smallToBig);
    } else if (select.value == "big-to-small") {
      let bigToSmall = array.sort((a, b) => {
        return (b.Rate - a.Rate);
      });
      renderData(bigToSmall);
    }
  })

}

selectRender(arrayGetLocStorage);





//INPUT SEARCH///////////////////////////////////////////
const inputRender = (array) => {
  input.addEventListener('input', (e) => {
    const newArr = [];
    tbody.textContent = "";
    array.filter(currency => {
      if (currency.Rate.includes(input.value)) {
        newArr.push(currency);
      }
    })
    renderData(newArr);
  })
}

inputRender(arrayGetLocStorage);





////////MODAL///////////////////////////////////
const mod = document.querySelector('.modal');

if (!localStorage.getItem('modal')) {
  setTimeout(e => {
    mod.classList.add('show')
  }, 10000);
}

const btnCancel = document.querySelector('.button');
btnCancel.addEventListener('click', () => {
  localStorage.setItem('modal', 1);
  mod.classList.remove('show');
})

const spiner = document.querySelector('.spiner-img');


setTimeout(function () {
  spiner.classList.add('spiner-passiv');
  renderData(arrayGetLocStorage);

}, 3000);