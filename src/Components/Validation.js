export default function validateForm(e) {
  e.preventDefault();
  const fname = document.querySelector("#firstname").value;
  const lname = document.querySelector("#lastname").value;
  const stream = document.querySelector("#streamSelect").value;
  const pass = document.querySelector("#Password").value;
  const email = document.querySelector("#email").value;
  const confirmPass = document.querySelector("#confirmPassword").value;
  const whatsappNumber = document.querySelector("#whatsappNumber").value;

  if (fname == "") {
    alert("Fill first name !!");
    return false;
  }
  if (lname == "") {
    alert("Fill Last name !!");
    return false;
  }
  if (stream == "") {
    alert("Fill Country name !!");
    return false;
  }
  if (pass == "") {
    alert("Fill City name !!");
    return false;
  }
  if (email == "") {
    alert("Fill Email !!");
    return false;
  }
  if (confirmPass == "") {
    alert("Fill address !!");
    return false;
  }
  if (whatsappNumber == "") {
    alert("Fill number !!");
    return false;
  }
  return true;
}
