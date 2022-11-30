import { React, useEffect } from "react";

let currentTab = 0;
let x, prev, next, form, submit;

export function nextPrev(n) {
  x[currentTab].style.display = "none";

  currentTab = currentTab + n;

  showTab(currentTab);
}

export function refer(n) {
  x[currentTab].style.display = "none";

  currentTab = n;

  showTab(currentTab);
}

function showTab(n) {
  x[n].style.display = "block";

  if (n == 0) {
    prev.style.display = "none";
  } else {
    prev.style.display = "inline";
  }
  if (n == x.length - 1) {
    next.style.display = "none";
    if (submit) {
      submit.style.display = "inline";
    }
  }
  if (n < x.length - 1) {
    next.style.display = "inline";

    if (submit) {
      submit.style.display = "none";
    }
  }

  fixStepIndicator(n);
}

function fixStepIndicator(n) {
  let i;
  const x = document.querySelectorAll(".step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }

  x[n].className += " active";
}
export function QuizLoad() {
  // useEffect(() => {

  return setTimeout(() => {
    x = document.getElementsByClassName("tab");
    prev = document.getElementById("prevBtn");
    submit = document.getElementById("submitbtn");
    next = document.getElementById("nextBtn");
    form = document.getElementById("regForm");
    refer(0);

    showTab(currentTab);
  }, 1000);
  // claer set time out
  // }, []);
}
