import React, { useState } from "react";
import Tablero from "./Components/Tablero";
import axios from "axios";
import "./App.css";

const url = "http://localhost:8080/";

function moveCapture({ key }) {
  if (["a", "w", "s", "d"].includes(key)) {
    axios.post(url + "move", { key: key }).then(({ data }) => {
      const { posX, posY, vidas } = data;
      moveCar(posX, posY);
      checkCar(vidas);
    });
  }
}

function restartCapture({ key }) {
  if (key == "Enter") {
    restart();
  }
}

window.addEventListener("keydown", moveCapture);

function moveCar(posX, posY) {
  document.getElementById("car").removeAttribute("id");
  const table = document.getElementById("tablero");
  for (let i = 0, row; (row = table.rows[i]); i++) {
    for (let j = 0, col; (col = row.cells[j]); j++) {
      if (i == posY && j == posX) {
        col.setAttribute("id", "car");
      }
    }
  }
}

function checkCar(vidas) {
  const vidasHtml = document.getElementById("vidas");
  if (vidas > 10) {
    vidasHtml.innerText = "ENHORABUENA CHAMPION. Pulsa ENTER para reiniciar";
    window.removeEventListener("keydown", moveCapture);
    window.addEventListener("keydown", restartCapture);
  } else if (vidas <= 0) {
    vidasHtml.innerText = "CAGASTE. Pulsa ENTER para reiniciar";
    window.removeEventListener("keydown", moveCapture);
    window.addEventListener("keydown", restartCapture);
  } else {
    vidasHtml.innerText = `Vidas restantes: ${vidas}`;
  }
}

function restart() {
  axios.get(url + "restart");
  moveCar(5, 8);
  checkCar(10);
  window.addEventListener("keydown", moveCapture);
    window.removeEventListener("keydown", restartCapture);
}

export default function App() {
  return (
    <div className="App">
      <h2>Mapa del juego</h2>
      {/* <p>Pulsa W, A, S, D para moverte.</p> */}
      <p id="vidas">Vidas restantes: 10</p>
      <Tablero />
    </div>
  );
}
