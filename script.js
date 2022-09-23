"use strict";

function getOption() {
  provencie.sort();
  provencie.forEach((item) => {
    const option = createElement("option", "option", item);
    $("#region").appendChild(option);
  });
}

getOption();

// request api

async function selectRegion(select = "Toshkent") {
  const today = await fetch(
    `https://islomapi.uz/api/present/day?region=${select}`
  );
  const result = await today.json();

  const week = await fetch(
    `https://islomapi.uz/api/present/week?region=${select}`
  );
  const weekResult = await week.json();

  const month = await fetch(
    `https://islomapi.uz/api/monthly?region=${select}&month=${
      new Date().getMonth() + 1
    }`
  );

  const monthResult = await month.json();

  console.log(result);
  console.log(weekResult);
  console.log(monthResult);

  localStorage.setItem("data", JSON.stringify(result));
  localStorage.setItem("week", JSON.stringify(weekResult));
  localStorage.setItem("month", JSON.stringify(monthResult));

  renderData();
}

// time
const now = new Date();

$("#time").textContent = now;

$("#region").addEventListener("change", (e) => {
  e.preventDefault();

  localStorage.setItem("city", e.target.value);
  const city = localStorage.getItem("city").toLocaleLowerCase();

  switch (city) {
    case "andijon":
      selectRegion("andijon");

      break;
    case "buxoro":
      selectRegion("buxoro");
      break;
    case "farg'ona":
      selectRegion("qo'qon");
      break;
    case "jizzax":
      selectRegion("jizzax");
      break;
    case "namangan":
      selectRegion("namangan");
      break;
    case "navoiy":
      selectRegion("navoiy");
      break;
    case "qashqadaryo":
      selectRegion("qarshi");
      break;
    case "samarqand":
      selectRegion("samarqand");
      break;
    case "sirdaryo":
      selectRegion("guliston");
      break;
    case "surxondaryo":
      selectRegion("termiz");
      break;
    case "toshkent":
      selectRegion("toshkent");
      break;
    case "xorazm":
      selectRegion("urganch");
      break;
    case "qoraqalpog'iston":
      selectRegion("nukus");
      break;
  }
});

// render function

function renderData() {
  const result = JSON.parse(localStorage.getItem("data"));
  const week = JSON.parse(localStorage.getItem("week"));
  const month = JSON.parse(localStorage.getItem("month"));

  const {
    region,
    times: { asr, hufton, peshin, quyosh, shom_iftor, tong_saharlik },
  } = result;

  $("#city").textContent = region;

  $a(".fs-1")[0].textContent = tong_saharlik;
  $a(".fs-1")[1].textContent = quyosh;
  $a(".fs-1")[2].textContent = peshin;
  $a(".fs-1")[3].textContent = asr;
  $a(".fs-1")[4].textContent = shom_iftor;
  $a(".fs-1")[5].textContent = hufton;

  // render week

  week.forEach((item) => {
    const tr = createElement(
      "tr",
      "item",
      ` <td>${item.region}</td>  <td>${item.date.substring(0, 10)}</td> <td>${
        item.weekday
      }</td> <td>${item.times.tong_saharlik}</td>  <td>${
        item.times.quyosh
      }</td> <td>${item.times.peshin}</td>    <td>${
        item.times.asr
      }</td>   <td>${item.times.shom_iftor}</td>   <td>${item.times.hufton}</td>`
    );

    $("#week").appendChild(tr);
  });

  const copySortMonth = month.map((item) => {
    return {
      region: item.region,
      month: item.month,
      weekday: item.weekday,
      tong_saharlik: item.times.tong_saharlik,
      quyosh: item.times.quyosh,
      peshin: item.times.peshin,
      asr: item.times.asr,
      shom_iftor: item.times.shom_iftor,
      hufton: item.times.hufton,
      date: item.date,
    };
  });

  copySortMonth.forEach((item) => {
    const tr2 = createElement(
      "tr",
      "item2",
      ` <td>${item.region}</td> <td>${item.month}</td> <td>${item.date.substring( 0,10 )}</td> 
      <td>${item.weekday} </td><td>${item.tong_saharlik}</td>  <td>${
        item.quyosh
      }</td> <td>${item.peshin}</td> <td>${item.asr}</td>   <td>${
        item.shom_iftor
      }</td>   <td>${item.hufton}</td> `
    );

    $("#month").appendChild(tr2);
  });
}
renderData();

$("#flexSwitchCheckReverse").addEventListener("click", () => {
  if ($("#flexSwitchCheckReverse").checked) {
    $(".container").style.backgroundColor = "black";
    $(".container").style.transition = "All 2s ease";
    $(".body").style.backgroundColor = "black";
    $(".div_first").classList.add("black");
    $(".title_second").style.color = "white";
    $(".title_third").style.color = "white";
  } else {
    $(".container").style.backgroundColor = "white";
    $(".container").style.transition = "All 2s ease";
    $(".div_first").classList.remove("black");
    $(".div_first").style.backgroundColor = "white";
    $(".title_second").style.color = "black";
    $(".title_third").style.color = "black";
  }
});
