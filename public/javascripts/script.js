let usersEntries = [];
let userDetails = [];
window.onload = function() {
  refreshCaptcha();
};
let firstnameinput = document.getElementById("firstname").value.trim();
let lastnameinput = document.getElementById("lastname").value.trim();
let adressinput = document.getElementById("address").value.trim();
let pininput = document.getElementById("pincode").value.trim();
let maleinput = document.getElementById("male").value.trim();
let femaleinput = document.getElementById("female").value.trim();
let otherinput = document.getElementById("other").value.trim();
let emailinput = document.getElementById("emailid").value.trim();
let phoneinput = document.getElementById("phoneno").value.trim();
let countryinput = document.getElementById("Country").value.trim();
let bioinput = document.getElementById("bio").value.trim();
let dobinput = document.getElementById("dob").value.trim();
let instainput = document.getElementById("instagram").value.trim();
let fbinput = document.getElementById("facebook").value.trim();
let linkedinput = document.getElementById("linkedin").value.trim();
let twittinput = document.getElementById("twitter").value.trim();
let skypeinput = document.getElementById("skype").value.trim();
//let checkboxinput = document.getElementById("acceptTAndC").value;

const usersData = {
  firstnameinput: firstnameinput,
  lastnameinput: lastnameinput,
  adressinput: adressinput,
  pininput: pininput,
  maleinput: maleinput,
  femaleinput: femaleinput,
  otherinput: otherinput,
  emailinput: emailinput,
  phoneinput: phoneinput,
  countryinput: countryinput,
  bioinput: bioinput,
  dobinput: dobinput,
  instainput: instainput,
  fbinput: fbinput,
  linkedinput: linkedinput,
  twittinput: twittinput,
  skypeinput: skypeinput,
  //checkboxinput: checkboxinput,
  
};
function capitalizeFirstLetter(inputId) {
  var inputElement = document.getElementById(inputId);
  var inputValue = inputElement.value.trim();
  inputValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
  inputElement.value = inputValue;
}
const slidePage = document.querySelector(".slide-page");
const nextBtn = document.querySelector(".nextt");
const prevBtn = document.querySelector(".prevv");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (current < 4) {
    slidePage.style.marginLeft = `-${current * 25}%`;
    bullet[current - 1].classList.add("active");
    progressCheck[current - 1].classList.add("active");
    progressText[current - 1].classList.add("active");
    current += 1;
  }
});

prevBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (current > 1) {
    slidePage.style.marginLeft = `-${(current - 2) * 25}%`;
    bullet[current - 2].classList.remove("active");
    progressCheck[current - 2].classList.remove("active");
    progressText[current - 2].classList.remove("active");
    current -= 1;
  }
});

function showSocialHandles() {
  var addSocialHandlesBtn = document.getElementById("addSocialHandlesBtn");
  var socialHandlesDiv = document.getElementById("socialHandles");

  addSocialHandlesBtn.style.display = "none";
  socialHandlesDiv.style.display = "block";
}
 const firstname = document.getElementById("firstname")
 const lastname = document.getElementById("lastname")
  const address = document.getElementById("address")
  const pincode = document.getElementById("pincode")
  const male = document.getElementById("male")
  const female = document.getElementById("female")
  const other = document.getElementById("other")
  const emailid = document.getElementById("emailid")
  const phoneno = document.getElementById("phoneno")
  const Country = document.getElementById("Country")
  const bio = document.getElementById("bio")
  const dob = document.getElementById("dob")
  const username = document.getElementById("username")
  const password = document.getElementById("password")
  const cpassword = document.getElementById("compassword")
 
  
  function validatedob(){
    const dobval = dob.value.trim()
    if(dobval === "") {
        setErrorMsg(dob, 'address cannot be blank');
        return false;
    } else{
       setSuccessMsg(dob)
     } 
  }
 function validate(){
    const fistnameval = firstname.value.trim();
    const validNameRegex = /^[A-Za-z]+$/;
    if(fistnameval === "") {
      setErrorMsg(firstname, 'name cannot be blank');
      return false;
    }else if(!validNameRegex.test(fistnameval)){
        setErrorMsg(firstname, 'name cannot be a number')
        return false;
    } else{
      setSuccessMsg(firstname)
    }

}
function validatelastname(){
  const validNameRegex = /^[A-Za-z]+$/;
  const lastnameval = lastname.value.trim();
  if(lastnameval === "") {
    setErrorMsg(lastname, 'lastname cannot be blank');
    return false;
  }else if(!validNameRegex.test(lastnameval)){
      setErrorMsg(lastname, 'lastname cannot be a number')
      return false;
  } else{
    setSuccessMsg(lastname)
  }
}
function validateadress(){
  const addressval = address.value.trim()
  if(addressval === "") {
      setErrorMsg(address, 'address cannot be blank');
      return false;
  } else{
     setSuccessMsg(address)
     return false;
   } 
}
function validatepincode(){
  const pincodeval = pincode.value.trim();
  if(pincodeval === "") {
    setErrorMsg(pincode, 'pincode cannot be blank');
    return false;
    }else if(pincodeval.length !== 6){
         setErrorMsg(pincode, 'pincode must be of length 6')
         return false;
     } else{
       setSuccessMsg(pincode)
     }
}
function validateemail(){
  let mailFormat = /\S+@\S+\.\S+/;
  const emailidval = emailid.value.trim();
  if(emailidval === "") {
      setErrorMsg(emailid, 'email cannot be blank');
      return false;
     }else if(!emailidval.match(mailFormat)){
         setErrorMsg(emailid, 'Invalid Email address!')
         return false;
     } else{
    setSuccessMsg(emailid)
     }
}
function validatephone(){
  const phonenoval = phoneno.value.trim();
  if(phonenoval === "") {
       setErrorMsg(phoneno, 'phone number cannot be blank');
       return false;
     }else if(phonenoval.length !== 10){
         setErrorMsg(phoneno, 'phone number must be of length 10')
         return false;
     } else{
       setSuccessMsg(phoneno)
     }
}
function validatecountry(){
  const validNameRegex = /^[A-Za-z]+$/;
  const Countryval = Country.value.trim();
if(Countryval === "") {
    setErrorMsg(Country, 'Country cannot be blank');
    return false;
   }else if(!validNameRegex.test(Countryval)){
      setErrorMsg(Country, 'Country cannot be a number')
      return false;
   } else{
     setSuccessMsg(Country)
   }
  }
  function validateusername(input){
    const usernameval = input.value.trim();
    const usernameRegex = /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;
    if(usernameval === "") {
      setErrorMsg(input, 'username cannot be blank');
      return false;
    }else if(!usernameRegex.test(usernameval)){
        setErrorMsg(input, 'Invalid username.')
        return false;
    } else{
      setSuccessMsg(input)
    }

}
function validatepassword(input){
  const passval = input.value.trim();
  const usernameRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
  if(passval === "") {
    setErrorMsg(input, 'password cannot be blank');
    return false;
  }else if(!usernameRegex.test(passval)){
      setErrorMsg(input, 'Invalid password.')
      return false;
  } else{
    setSuccessMsg(input)
  }

}
function validateCpassword(input){
  const cpassinput = document.getElementById("compassword").value;
  const passinput = document.getElementById("password").value;
  if(cpassinput === "") {
    setErrorMsg(input, 'password cannot be blank');
    return false;
  }else if(passinput !== cpassinput){
      setErrorMsg(input, 'Passwords do not match. Please try again.')
      return false;
  } else{
    setSuccessMsg(input)
  }
}
function validateforgetCpassword(input){
  const cpassinput = document.getElementById("compassword").value;
  const passinput = document.getElementById("newPassword").value;
  if(cpassinput === "") {
    setErrorMsg(input, 'password cannot be blank');
  }else if(passinput !== cpassinput){
      setErrorMsg(input, 'Passwords do not match. Please try again.')
  } else{
    setSuccessMsg(input)
  }

}


  function    setErrorMsg(input, message) {
    const field = input.parentElement;
    const errorMsg = field.querySelector('small');

    field.classList.remove('success');
    field.classList.add('error');
    errorMsg.textContent = message;
}

function setSuccessMsg(input) {
    const field = input.parentElement;

    field.classList.remove('error');
    field.classList.add('success');
}
function validatecaptcha(input){
  const captchaElement = document.getElementById("captcha").textContent;
  const captchaval = input.value.trim();

  if(captchaval === "") {
    setErrorMsg(input, 'captcha cannot be blank');
    return false;
  }else if(captchaval !== captchaElement){
      setErrorMsg(input, 'Incorrect captcha. Please try again.')
      return false;
  } else{
    setSuccessMsg(input)
  }

}
function validateemailval(input){
  const emailval = input.value.trim();
  let mailFormat = /\S+@\S+\.\S+/;
  if(emailval === "") {
    setErrorMsg(input, 'email cannot be blank');
    return false;
  }else if(!emailval.match(mailFormat)){
      setErrorMsg(input, 'Invalid Email address!')
      return false;
  } else{
    setSuccessMsg(input)
  }

}
function submitform() {
  event.preventDefault();
  const userEntries = JSON.parse(localStorage.getItem("registerentry")) || [];
  const firstnameinput = document.getElementById("firstname").value.trim();
  const lastnameinput = document.getElementById("lastname").value.trim();
  const adressinput = document.getElementById("address").value.trim();
  const pininput = document.getElementById("pincode").value.trim();
  const maleinput = document.getElementById("male").checked;
  const femaleinput = document.getElementById("female").checked;
  const otherinput = document.getElementById("other").checked;
  const emailinput = document.getElementById("emailid").value.trim();
  const phoneinput = document.getElementById("phoneno").value.trim();
  const countryinput = document.getElementById("Country").value.trim();
  const bioinput = document.getElementById("bio").value.trim();
  const dobinput = document.getElementById("dob").value.trim();
  const instainput = document.getElementById("instagram").value.trim();
  const fbinput = document.getElementById("facebook").value.trim();
  const linkedinput = document.getElementById("linkedin").value.trim();
  const twittinput = document.getElementById("twitter").value.trim();
  const skypeinput = document.getElementById("skype").value.trim();
  //const checkboxinput = document.getElementById("acceptTAndC").checked;

  // if (!firstnameinput ||
  //   !lastnameinput ||
  //   !adressinput ||
  //   !pininput ||
  //   !emailinput ||
  //   !phoneinput ||
  //   !countryinput ||
  //   !bioinput ||
  //   !dobinput ||
  //   !checkboxinput) {

  //   let a = "Please fill in all fields.";
  //   document.getElementById("alert").innerHTML = a;
  //   return ;
  // }
  
  // let mailFormat = /\S+@\S+\.\S+/;
  // document.getElementById("alert").innerHTML = "";
  // if (!emailinput.match(mailFormat)) {
  //   let b = "Invalid Email address!.";
  //   document.getElementById("alert").innerHTML = b;
  //   return ;
  // }
  // const validNameRegex = /^[A-Za-z]+$/; 

  // if (!validNameRegex.test(firstnameinput)) {
  //   let ab = "Please enter a valid first name";
  //   document.getElementById("alert").innerHTML = ab;
  //   return;
  // }

  const usersData = {
    firstnameinput: firstnameinput,
    lastnameinput: lastnameinput,
    adressinput: adressinput,
    pininput: pininput,
    maleinput: maleinput,
    femaleinput: femaleinput,
    otherinput: otherinput,
    emailinput: emailinput,
    phoneinput: phoneinput,
    countryinput: countryinput,
    bioinput: bioinput,
    dobinput: dobinput,
    instainput: instainput,
    fbinput: fbinput,
    linkedinput: linkedinput,
    twittinput: twittinput,
    skypeinput: skypeinput,
   // checkboxinput: checkboxinput,
    // userinput: userinput,
    // passinput: passinput,
  };

  
 // const userEntries = JSON.parse(localStorage.getItem("registerentry")) || [];

 //storedUserEntries.push(usersData);
 userDetails.push({
  firstnameinput: firstnameinput,
    lastnameinput: lastnameinput,
    adressinput: adressinput,
    pininput: pininput,
    maleinput: maleinput,
    femaleinput: femaleinput,
    otherinput: otherinput,
    emailinput: emailinput,
    phoneinput: phoneinput,
    countryinput: countryinput,
    bioinput: bioinput,
    dobinput: dobinput,
    instainput: instainput,
    fbinput: fbinput,
    linkedinput: linkedinput,
    twittinput: twittinput,
    skypeinput: skypeinput,
   // checkboxinput: checkboxinput,
 });
// console.log('/userDetails----->', userDetails);
  //console.log("submit");

  localStorage.setItem("registerentry", JSON.stringify(userDetails));

 // window.location.replace("/username");
}
function uesersubmit() {
  event.preventDefault();
  const usersEntries = JSON.parse(localStorage.getItem("userentry")) || [];
  const registerUser = JSON.parse(localStorage.getItem("registerentry")) || [];
 const userinput = document.getElementById("username").value;
 const passinput = document.getElementById("password").value;
 const cpassinput = document.getElementById("compassword").value;

 const captchaElement = document.getElementById("captcha").textContent;
 const captchaInput = document.getElementById("captchaInput").value;
 if (!userinput ||
  !passinput ||
  !cpassinput ||
  !captchaInput
 ) {

  return ;
}

 if (passinput !== cpassinput) {

  let h = "Passwords do not match. Please try again.";
    document.getElementById("usererror").innerHTML = h;
  return;
}

if (captchaInput !== captchaElement) {
   let n = "Incorrect captcha. Please try again.";
    document.getElementById("usererror").innerHTML = n ;
   refreshCaptcha();
   return;
}
 const usersDatas = {
    userinput: userinput,
    passinput: passinput,
  }

 usersEntries.push(usersDatas);
registerUser.forEach((userObject) => {
  userObject.userinput = userinput;
  userObject.passinput = passinput;
});  
 localStorage.setItem("userDetails", JSON.stringify(registerUser));
// window.location.replace("/profile");
}
function validateLogin() {
  
  event.preventDefault();
 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const captchaInput = document.getElementById("captchaInput").value;
  const captchaElement = document.getElementById("captcha").textContent;

  if (captchaInput !== captchaElement) {
      let m = "Incorrect captcha. Please try again.";
       document.getElementById("error").innerHTML = m ;
      refreshCaptcha();
      return;
  }

  const userEntries = JSON.parse(localStorage.getItem("userDetails")) || [];

  const user = userEntries.find((user) => user.userinput === username);

  if (!user) {
      let x = "User does not exist. Please register.";
    document.getElementById("error").innerHTML = x;
      return;
  }

  if (user.passinput !== password) {
      let y = "Incorrect password. ";
    document.getElementById("error").innerHTML = y ;
      return;
  }
alert("Login successful!");
 
 // window.location.replace("http://127.0.0.1:5500/welcomepage.html");
}
function validateForgotPassword() {
  refreshCaptcha();
  event.preventDefault();
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const userEntries = JSON.parse(localStorage.getItem("userDetails")) || [];
  const userIndex = userEntries.findIndex((user) => user.emailinput === email);
  if (userIndex === -1) {
    let s = "Please enter a valid Email!";
    document.getElementById("error1").innerHTML = s;
    return;
  }
  const user = userEntries[userIndex];
  if (user.dobinput !== dob) {
    let d = "Please enter a valid Date of Birth!";
    document.getElementById("error1").innerHTML = d;
    return;
  }
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("resetPasswordForm").style.display = "block";
  document.getElementById("userIndex").value = userIndex;
}
function submitResetPassword() {
 
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("compassword").value;
  const captchaElement = document.getElementById("captcha").textContent;
  const captchaInput = document.getElementById("captchaInput").value;
  const userIndex = parseInt(document.getElementById("userIndex").value);
  if (newPassword !== confirmPassword) {
    let l = "Passwords do not match. Please try again.";
    document.getElementById("errormessage").innerHTML = l;
    return;
  }
  if (captchaInput !== captchaElement) {
    let o = "Incorrect captcha. Please try again.";
    document.getElementById("errormessage").innerHTML = o;
    refreshCaptcha();
    return;
  }
  const userEntries = JSON.parse(localStorage.getItem("userDetails")) || [];
  userEntries[userIndex].passinput = newPassword;
  localStorage.setItem("userDetails", JSON.stringify(userEntries));
  window.location.replace("http://127.0.0.1:5500/signin.html");
}
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function refreshCaptcha() {
  const captchaElement = document.getElementById("captcha");
  const captchaInput = document.getElementById("captchaInput");

  const captchaString = generateRandomString(5);

  captchaElement.textContent = captchaString;

  captchaInput.value = "";
}

refreshCaptcha();
