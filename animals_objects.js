"use strict";

window.addEventListener("DOMContentLoaded", start);

// creating an empty array
const allAnimals = [];

// creating a prototype fro the array
const Animal = {
  name: "",
  type: "unknown",
  desc: "",
  age: 0,
};

function start() {
  console.log("ready");

  loadJSON();
}

function loadJSON() {
  fetch("animals.json")
    .then((response) => response.json())
    .then((jsonData) => {
      // when loaded, prepare objects
      prepareObjects(jsonData);
    });
}

function prepareObjects(jsonData) {
  // for each object in the array
  jsonData.forEach((jsonObject) => {
    // creating an object from the Animal-prototype
    const animal = Object.create(Animal);
    // adding the values from the JSON-array to the properties in the animal-object
    animal.name = jsonObject.fullname.substring(0, jsonObject.fullname.indexOf(" "));
    animal.desc = jsonObject.fullname.split(" ")[2];
    animal.type = jsonObject.fullname.split(" ")[3];
    animal.age = jsonObject.age;

    // adding the animal-objects to the empty allAnimals-array
    allAnimals.push(animal);
  });

  displayList();
}

function displayList() {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  allAnimals.forEach(displayAnimal);
}

function displayAnimal(animal) {
  // create clone
  const clone = document.querySelector("template#animal").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=name]").textContent = animal.name;
  clone.querySelector("[data-field=desc]").textContent = animal.desc;
  clone.querySelector("[data-field=type]").textContent = animal.type;
  clone.querySelector("[data-field=age]").textContent = animal.age;

  // append clone to list
  document.querySelector("#list tbody").appendChild(clone);
}
