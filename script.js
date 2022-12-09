"use strict";

function handlePeopleAjaxResponse(evnt) {
  if (evnt.target.statusText !== "OK") {
    console.error(evnt.target.statusText);
    console.error(evnt.target.status);
    return;
  }
  let loadedData = evnt.target.response;
  let unorderedList = document.createElement("ul");
  for (let person of loadedData.body.list) {
    let newListItem = document.createElement("li");
    let newListItemText = document.createTextNode(person.name);
    newListItem.appendChild(newListItemText);
    newListItem.dataset.url = person.links[0].href;
    unorderedList.appendChild(newListItem);

    newListItem.addEventListener("click", () =>
      secondRequest(person.links[0].href)
    );
  }

  document.querySelector("#results").appendChild(unorderedList);
}

function makeAjaxRequest(evnt) {
  let request = new XMLHttpRequest();
  request.open("GET", "people.json");
  request.responseType = "json";
  request.send();

  request.addEventListener("load", handlePeopleAjaxResponse);

  request.addEventListener("error", function (evnt) {
    console.error(evnt);
  });
}

makeAjaxRequest();

function secondResponse(evnt) {
  if (evnt.target.statusText !== "OK") {
    console.error(evnt.target.statusText);
    console.error(evnt.target.status);
    return;
  }

  let displayTarget = evnt.target.response;
  let contentPara = document.querySelector("#location-results");
  contentPara.innerHTML = "";
  for (let art of displayTarget.body.art) {
    let para = document.createElement("p");
    let paraText = document.createTextNode(art.location.description);
    para.appendChild(paraText);
    contentPara.appendChild(para);
  }
}
function secondRequest(href) {
  let request = new XMLHttpRequest();

  request.open("GET", href);
  request.responseType = "json";
  request.send();

  request.addEventListener("load", secondResponse);

  request.addEventListener("error", function (evnt) {
    console.error(evnt);
  });
}

function posted(name) {
  let postedResult = document.querySelector("#location-results");

  console.log();

  postedResult.textContent = name;
}

function main(evnt) {
  makeAjaxRequest();

  secondResponse();
}

main();
