"use strict";

function getOption() {
  provencie.sort();
  provencie.forEach((item) => {
    const option = createElement("option", "option", item);
    $("#region").appendChild(option);
  });
}

getOption();

async function selectRegion(select = "Toshkent") {
  const response = await fetch(
    `https://islomapi.uz/api/present/day?region=${select}`
  );
  const result = await response.json();

  renderData(result);
}

selectRegion();

$("#region").addEventListener("change", (e) => {
  $("#city").innerHTML = e.target.value;

  switch (e.target.value.toLowerCase()) {
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
  }
});

function renderData(result) {
  const {
    times: { asr, hufton, peshin, quyosh, shom_iftor, tong_saharlik },
  } = result;
  $a(".fs-1")[0].textContent = tong_saharlik;
  $a(".fs-1")[1].textContent = quyosh;
  $a(".fs-1")[2].textContent = peshin;
  $a(".fs-1")[3].textContent = asr;
  $a(".fs-1")[4].textContent = shom_iftor;
  $a(".fs-1")[5].textContent = hufton;
}


const now = new Date()

$('#time').textContent=now;