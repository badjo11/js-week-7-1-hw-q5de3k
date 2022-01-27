// Import stylesheets
import './style.css';

// Асинхронность, промисы и HTTP.  Домашняя работа

// Задание №1
// Создать программу - список покемонов.

// Пример:
// Bulbasaur
// Ivysaur
// Venusaur
// Charmander
// Charmeleon
// Charizard
// Squirtle
// … и т.п.

// При клике на имя покемона, показать рядом (в соседнем div-е) или во всплывающем
// окне информацию об этом покемоне, например:

// Имя: Charmeleon
// Тип: fire
// Рост: 11
// Вес: 190
// Изображение покемона (дополнительно)
let btnShowModal = $('.show-modal');
let btnCloseModal = $('.my-modal button');
let modal = $('.modal');
let myModal = $('.my-modal');
let h6 = $('.my-modal h6');
let p = $('.my-modal p');
function showModal() {
  modal.fadeIn(1000).css('display', 'flex');
}
function closeModal() {
  myModal.html('');
  h6.html('');
  p.html('');
  modal.fadeOut(1000);
}
btnShowModal.on('click', showModal);
btnCloseModal.on('click', closeModal);

modal.on('click', (e) => {
  if (e.target !== myModal[0] && e.target !== h6[0] && e.target !== p[0]) {
    closeModal();
  }
});
let API = 'https://pokeapi.co/api/v2/pokemon/'
let pokeName = '';
let first = $("#first")
let second = $("#second")
let third = $("#third")
let fourth = $("#fourth")
let fifth = $("#fifth")
let tempArr = [first,second, third, fourth, fifth]
let currentPage = 1
function render(API){  fetch(API)
  .then((result) => result.json())
  .then((data) => {
    $('#list').html("")
    data.results.forEach((element) => {
      $('body #list').append(`<li class="show-modal">${element.name}</li>`);
    });
    $('body ul .show-modal').click(function () {
      // pokeName = data.results
      let indexOfList = [$(this).index()];
      pokeName = data.results[indexOfList].name;
      let url1 = data.results[$(this).index()].url;
      fetch(url1)
        .then((res) => res.json())
        .then((d) => {
          myModal.append(`<button>&#10006;</button>`);
          myModal.append(h6);
          myModal.append(p);
          h6.append(`Имя: ${pokeName}`);
          p.append(`Тип: `);
          d.types.forEach((item) => {
            p.append(item.type.name + ' ');
          });
          p.append(
            `<br> Рост: ${d.height}<br>Вес: ${d.weight}<br> <img src=${d.sprites.front_shiny}>`
          );
          showModal();
        });
    });
  });
  if(currentPage < 2){
    $('#prev-p').addClass("disabled")
    $('#prev-p').click(function(){return false;});
  }
}
    
render(API)
$('#next-p').click(function(){
  tempArr.forEach(item=>{
    if(item.hasClass('active')){
      item.toggleClass('active')
    }
  })
  let i = 1
  currentPage++
  $('.lists').each(function(){
    $(this).html(`<a>${((currentPage-1) *5)+i}</a>`)
    i++
  })
})
$('#prev-p').click(function(){
  tempArr.forEach(item=>{
    if(item.hasClass('active')){
      item.toggleClass('active')
    }
  })
  let i = 1
  currentPage--
  $('.lists').each(function(){
    $(this).html(`<a>${((currentPage-1) *5)+i}</a>`)
    i++
  })
})
$('.lists').click(function(){
  let temp = $(this).index()
  let tempPage = (currentPage-1)*100 + (temp-1)*20
  // temp*=(currentPage-1)
  let tempUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${tempPage}&limit=20`
    tempArr.forEach(item=>{
    if(item.hasClass('active')){
      item.toggleClass('active')
    }
  })
  $(this).addClass('active')
  render(tempUrl)
})
console.warn('Всё работает, кроме лимита страниц')


// Указания:
// Список покемонов (первые 20 штук) получить через запрос к API:
// https://pokeapi.co/api/v2/pokemon/
// Информацию о каждом покемоне получать через запрос к API:
// https://pokeapi.co/api/v2/pokemon/{id}/
// где {id} - номер покемона
// Подсказка об используемых ключах результата
// (предположим что полученный объект у вас лежит в переменной result)
// Изображение: result.sprites.

// Имя: result.name
// Тип: массив result.types. Из каждого элемента массива можно взять только type.name
// Рост: result.height
// Вес: result.weight

// Дополнительно:
// Используя ссылку на следующую страницу в результате (ссылку на API следующих
// результатов) реализовать пагинацию (постраничный вывод) в программе, т.е.:
// На клик по ссылке “Next” делать запрос на следующие 20 штук, заменять текущий список.
// Реализовать “Previous” и “Next” - возможность возвращаться на страницу ранее

// Задание №2
// Создать страницу прогноза погоды.

// Дан API - https://goweather.herokuapp.com/weather/{city}
// {city} – название нужного города (подставить из инпута);
// Название города нужно получить из инпута, после нажатия на кнопку.
{/* <input id="city-name" type="text"> 
<button id="show">Show Weather</button> */}
let inDiv=  $('#inner-div')
$('#show').click(function(){
  // console.log($('#city-name').val())
  let input = $('#city-name').val()
  
  fetch(`https://goweather.herokuapp.com/weather/${input}`)
    .then((res) => res.json())
    .then((data) => {
      if(!data.description){
        alert('Такого города нет')
        return
      }
          inDiv.html("")
          h6.html("")
          p.html("")
      // console.log(data)
          inDiv.append(h6);
          inDiv.append(p);
          h6.append(`Город: ${input}`);
          p.append(
            `<br> Температура: ${data.temperature}<br>Ветер: ${data.wind}<br> <br>`
          );
          data.forecast.forEach((item, index) =>{
            p.append(`День ${index+1} <br> Температура: ${item.temperature}<br> Ветер: ${item.wind}<br><br>`)
          })
    })
  }
)
// При клике на кнопку, отобразите на странице температуру
// воздуха на сегодняшний день и среднюю скорость ветра.
// Также, отобразите прогноз погоды на ближайшие три дня.
// Если введенного города нет, выведите в alert соответствующее сообщение.
// Примечание! Если город не найден, API вернет пустые строчки в качестве значений свойств.

// Подсказка об используемых ключах результата:
// (предположим что полученный объект у вас лежит в переменной result)
// Температура: result.temperature
// Средняя скорость ветра: result.wind

// Прогноз погоды на ближайшие дни находится в массиве forecast.
// result.forecast

