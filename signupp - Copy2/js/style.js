var nxt_btn = document.querySelectorAll(".next_button");
var prev_btn = document.querySelectorAll(".previous_button");
var submit_btn = document.querySelectorAll("#submit_button");
var main_form = document.querySelectorAll(".main");
var main_signin_form = document.querySelectorAll(".main_signin");
var sign_in_submit = document.querySelector(".signin_submit_button");
var progressbar = document.querySelectorAll(".steps li");
var steps = document.querySelector(".steps");
let forumnumber = 0;

document.addEventListener('DOMContentLoaded', function() {
  const connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', Connect);
});

async function Connect() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.enable();
      const provider = window.ethereum;
      const accounts = await provider.request({ method: 'eth_accounts' });

      if (accounts.length > 0) {
        const walletAddress = accounts[0];
        console.log('Connected to MetaMask');
        console.log('Connected accounts:', accounts);
        console.log('Wallet address:', walletAddress);

        // Display the wallet address in the HTML document
        const addressElement = document.getElementById('wallet_adress');
        addressElement.value = walletAddress;
      } else {
        console.error('No accounts found');
      }
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask is not installed');
  }
}



nxt_btn.forEach(function (butn) {
  butn.addEventListener("click", function () {
    event.preventDefault(); // Add this line
    if (!validateform()) {
      return false;
    }
    forumnumber++;
    progress("color");
    update_form();
  });
});

// prev_btn.forEach(function (prev_button) {
//   prev_button.addEventListener("click", function () {
//     forumnumber--;
//     progress("nocolor");
//     update_form();
//   });
// });

submit_btn.forEach(function (submit_button) {
  submit_button.addEventListener("click", function () {
    if (!validateform()) {
      return false;
    }
    var f_name = document.querySelector("#user_name");
    var shown_name = document.querySelector("#shown_name");
    shown_name.innerHTML = f_name.value;
    forumnumber++;
    update_form();
    steps.classList.add("d-none");
  });
});

let signinnumber = 0;

// sign_in_submit.addEventListener("click", function () {
//   if (!validateformsignin()) return false;
//   signinnumber++;
//   main_signin_form.forEach(function (main) {
//     main.classList.remove("active");
//   });
//   var f_name = document.querySelector("#user_signin_name");
//   var shown_name = document.querySelector("#shown_signin_name");
//   shown_name.innerHTML = f_name.value;
//   main_signin_form[signinnumber].classList.add("active");
// });

function progress(state) {
  if (state == "color") {
    progressbar[forumnumber].classList.add("li-active");
  } else {
    progressbar[forumnumber + 1].classList.remove("li-active");
  }
}

function update_form() {
  main_form.forEach(function (main) {
    main.classList.remove("active");
  });
  main_form[forumnumber].classList.add("active");
}

function validateform() {
  validate = true;
  var validate_inputs = document.querySelectorAll(".main.active input");
  validate_inputs.forEach(function (input_valid) {
    input_valid.classList.remove("warning");
    if (input_valid.hasAttribute("require")) {
      if (input_valid.value.length == 0) {
        validate = false;
        input_valid.classList.add("warning");
      }
    }
  });
  return validate;
}

function validateformsignin() {
  validate = true;
  var validate_inputs = document.querySelectorAll(".main_signin.active input");
  validate_inputs.forEach(function (input_valid) {
    input_valid.classList.remove("warning");
    if (input_valid.hasAttribute("require")) {
      if (input_valid.value.length == 0) {
        validate = false;
        input_valid.classList.add("warning");
      }
    }
  });
  return validate;
}

var signin_toggle = document.querySelector(".sign-in-up-toggle");
var s_form = document.querySelectorAll(".s_form");
var account = document.querySelectorAll(".account");
var right_image = document.querySelectorAll(".right_img");
signin_toggle.addEventListener("click", function () {
  s_form.forEach(function (form) {
    form.classList.toggle("d-none");
  });

  account.forEach(function (acc) {
    acc.classList.toggle("d-none");
  });

  right_image.forEach(function (ri_img) {
    ri_img.classList.toggle("d-none");
  });

  if (signin_toggle.innerHTML == "Sign in") {
    signin_toggle.innerHTML = "Sign up";
  } else {
    signin_toggle.innerHTML = "Sign in";
  }
}); // JavaScript Document

// SUBMITING FUNCTION
var form = document.getElementById("form_form");

form.addEventListener("submit", function (event) {
  // auto submit form prevention
  event.preventDefault();

  //ALL THE INPUT VARIABLES

  var userName = document.getElementById("user_name");

  var lastName = document.getElementById("last_name");
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  var confirmPassword = document.getElementById("confirm_password");
  var companyName = document.getElementById("company_name");
  var companyEmail = document.getElementById("company_email");
  var phoneNumber = document.getElementById("phone_number");
  var adress = document.getElementById("adress");
  var postalCode = document.getElementById("postal_code");
  var cac = document.getElementById("cac");
  var walletAdress = document.getElementById("wallet_adress");

  var companyType = document.getElementById("company_type");
  var value = companyType.options[companyType.selectedIndex].text;

  // FETCH POST REQUEST

  fetch("https://payroll-team9.onrender.com/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify({
      firstName: userName,
      lastName: lastName,
      email: email,
      password: password,
      companyName: companyName,
      companyEmail: companyEmail,
      phoneNumber: phoneNumber,
      address: adress,
      zipCode: postalCode,
      cacNumber: cac,
      industryType: value,
      wallet: walletAdress,
    }),
  })
    .then(function (response) {
      return response.JSON;
    })
    .then(function (data) {
      console.log(data);
    });
});
