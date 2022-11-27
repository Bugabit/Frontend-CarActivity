import React, { useState } from "react";
import Tablero from "./Components/Tablero";
import axios from "axios";
import "./App.css";

function keyCapture({key}) {
  const url = "http://localhost:8080/move";
  if (["a", "w", "s", "d"].includes(key)) {
    axios.post(url, { key: key }).then(({ data }) => {
      const { posX, posY, vidas } = data;
      moveCar(posX, posY);
      checkCar(vidas);
    });
  }
}

window.addEventListener("keydown", keyCapture);

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
    vidasHtml.innerText = "ENHORABUENA CHAMPION";
    window.removeEventListener("keydown", keyCapture);
  } else if (vidas <= 0) {
    vidasHtml.innerText = "CAGASTE";
    window.removeEventListener("keydown", keyCapture);
  } else {
    vidasHtml.innerText = `Vidas restantes: ${vidas}`;
  }
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
