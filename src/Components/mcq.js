window.onload = function () {
  refer(0);
};

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";

  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
    document.getElementById("nextBtn").href =
      "file:///C:/Users/sharm/OneDrive/Desktop/Project/test-submit.html";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }

  fixStepIndicator(n);
}

function nextPrev(n) {
  var x = document.getElementsByClassName("tab");

  x[currentTab].style.display = "none";

  currentTab = currentTab + n;

  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();

    return false;
  }

  showTab(currentTab);
}

function refer(n) {
  var x = document.getElementsByClassName("tab");

  x[currentTab].style.display = "none";

  currentTab = n;

  if (currentTab >= x.length) {
    document.getElementById("regForm").submit();

    return false;
  }

  showTab(currentTab);
}
