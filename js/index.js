var userName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userPhone = document.getElementById("userPhone");
var userAge = document.getElementById("userAge");
var userPassword = document.getElementById("userPassword");
var userRepassword = document.getElementById("userRepassword");

var myHttp = new XMLHttpRequest();
var allData = [];

myHttp.open("GET", "https://www.themealdb.com/api/json/v1/1/search.php?s=");

myHttp.send();
myHttp.addEventListener("readystatechange", function () {
  if (myHttp.readyState === 4 && myHttp.status == 200) {
    allData = JSON.parse(myHttp.response);
    // console.log(allData);
    displayData(allData.meals);
  }
});

function displayData(Meals) {
  var cartoona = "";

  for (let i = 0; i < Meals.length; i++) {
    cartoona += `    <div class="col-md-3" onclick="showDetails('${Meals[i].idMeal}')">
    
    <div class="image"><img src="${Meals[i].strMealThumb}" class="w-100" alt="">
    
    
        <div class="food-title w-100 h-100 d-flex align-items-center"><h3 class="ps-2">${Meals[i].strMeal}</h3></div>
    
    </div>
    
</div> `;
  }
  const element = document.querySelector("#home-content");
  if (element) {
    element.innerHTML = cartoona;
  }
}

function showDetails(id) {
  console.log(id);

  Details(id);
}

async function Details(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayDetails(dataResponse.meals, "#home-content");
}

function displayDetails(meals, docID) {
  var cartoona = "";
  var tagsContainer = "";
  var recpContainer = "";
  console.log(meals);
  if (meals[0].strTags) {
    let tagsArray = meals[0].strTags.split(",").map((tag) => tag.trim());
    for (let index = 0; index < tagsArray.length; index++) {
      tagsContainer += `
        <span class='alert alert-danger m-2 p-1'>${tagsArray[index]}</span>
        `;
    }
  }
  for (let index = 1; index <= 20; index++) {
    const element = `strMeasure${index}`;
    console.log(element);
    if (meals[0][element] !== " " && meals[0][element] !== "") {
      recpContainer += `
        <span class=' alert alert-info m-2 p-1'>${meals[0][element]}</span>
        `;
    } else {
      break;
    }
  }
  for (let i = 0; i < meals.length; i++) {
    cartoona = ` <div class="col-md-4 mt-5">
    <img src="${meals[i].strMealThumb}" class="w-100 custom-img" alt="" />
    <h2 class="text-white">${meals[i].strMeal}</h2>
  </div>

  <div class="col-md-8 text-white mt-5 pb-5">
    <h2>Instructions</h2>
    <p>
      ${meals[i].strInstructions}
    </p>

    <span><h3>Area : ${meals[i].strArea}</h3></span>
    <span><h3>Category : ${meals[i].strCategory}</h3></span>
    <h3><span>Recipes :</span> </h3>

    <div class='d-flex gap-3 flex-wrap'>${recpContainer}</div>
   
    <h3>Tags :</h3>
    <div class='d-flex gap-3 flex-wrap'>${tagsContainer}</div>

    
    <a href="${meals[i].strSource}" target="_blank" class="btn btn-success">Source</a>
    <a href="${meals[i].strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
    


  </div>`;
  }

  document.querySelector(docID).innerHTML = cartoona;
}

let sideBoxLeft = $(".sideBox-content").innerWidth(); //always the same width 214.1239

$(".sideIcon i").click(function () {
  let sideBoxOffset = $(".sideBox").offset().left; // display the distance from left 0 , 214.1239, -214.1239

  if (sideBoxOffset == 0) {
    closeSlider();
  } else {
    openSlider();
  }
});

function openSlider() {
  document
    .querySelector(".sideIcon i")
    .classList.replace("fa-align-justify", "fa-x");

  $(".sideBox").animate({ left: 0 }, 500);

  $(".side-title a").each(function (index) {
    $(this).animate({ top: 0, opacity: 1 }, 500 * index);
  });
}

function closeSlider() {
  document
    .querySelector(".sideIcon i")
    .classList.replace("fa-x", "fa-align-justify");

  $(".sideBox").animate({ left: -sideBoxLeft }, 500);

  $(".side-title a").each(function (index) {
    $(this).animate({ top: "50px", opacity: 0 }, 100 * index);
  });
}

closeSlider();
let validUsername = false;
let validUseremail = false;
let validUserphone = false;
let validUserage = false;
let validPassword = false;
let validRepassword = false;
function validateUserName() {
  var regex = /^[a-z]{3,10}$/;

  if (regex.test(userName.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7

    document.getElementById("nameError").classList.replace("d-block", "d-none");

    validUsername = true;
    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validUsername = false;
    document.getElementById("nameError").classList.replace("d-none", "d-block");
    return false;
  }
}

function validateUserEmail() {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (regex.test(userEmail.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7

    document
      .getElementById("EmailError")
      .classList.replace("d-block", "d-none");

    validUseremail = true;

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validUseremail = false;
    document
      .getElementById("EmailError")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function validateUserPhone() {
  var regex = /^(?:\+20|0)?1[0-9]{9}$/;

  if (regex.test(userPhone.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7

    document
      .getElementById("phoneError")
      .classList.replace("d-block", "d-none");

    validUserphone = true;

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validUserphone = false;
    document
      .getElementById("phoneError")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function validateUserAge() {
  var regex = /^(?:[1-9]|[1-9][0-9]|100)$/; //from(1-100)

  if (regex.test(userAge.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7

    document.getElementById("ageError").classList.replace("d-block", "d-none");

    validUserage = true;

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validUserage = false;

    document.getElementById("ageError").classList.replace("d-none", "d-block");
    return false;
  }
}

function validateUserPassword() {
  var regex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/; //from(1-100)

  if (regex.test(userPassword.value)) {
    //7ayegy hna b3d ma ye3ady 3la el else w ye8ayar w ye5aleh sa7

    document.getElementById("passError").classList.replace("d-block", "d-none");

    validPassword = true;

    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validPassword = false;

    document.getElementById("passError").classList.replace("d-none", "d-block");
    return false;
  }
}

function validateUserRepassword(input) {
  if (input == userPassword.value) {
    document
      .getElementById("RepassError")
      .classList.replace("d-block", "d-none");

    validRepassword = true;
    return true;
  } else {
    // hwa kda kda 7ayegy hna el awl abl ma yro7 el true 3shan m4 match mn awl letter akid lazm ykml ktaba
    validRepassword = false;

    document
      .getElementById("RepassError")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function watchFlagsAndUpdateButton() {
  setInterval(function () {
    const isButtonDisabled = !(
      validUsername &&
      validUseremail &&
      validUserphone &&
      validUserage &&
      validPassword &&
      validRepassword
    );
    const btnElement = document.querySelector("#Btn");
    if (btnElement) {
      if (isButtonDisabled) {
        btnElement.setAttribute("disabled", true);
      } else {
        btnElement.removeAttribute("disabled");
      }
    }
  }, 100); // Adjust the interval as needed
}

// Call the function to start the watcher
watchFlagsAndUpdateButton();

async function searchWord(word) {
  $(".loading-search ").show();
  $(".loader ").show();

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`
  );

  let dataResponse = await response.json();

  $(".loading-search").fadeOut(500);
  $(".loader").fadeOut(500);

  if (dataResponse.meals) {
    displaySearchData(dataResponse.meals);
  } else {
    displaySearchData([]);
  }
}

async function searchLetter(letter) {
  $(".loading-search ").show();
  $(".loader ").show();

  if (letter == "") {
    letter = "a";
  }

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
  );

  let dataResponse = await response.json();

  $(".loading-search").fadeOut(500);
  $(".loader").fadeOut(500);

  if (dataResponse.meals) {
    displaySearchData(dataResponse.meals);
  } else {
    displaySearchData([]);
  }
}

function displaySearchData(Meals) {
  var cartoona = "";

  for (let i = 0; i < Meals.length; i++) {
    cartoona += `  <div class="col-md-3" onclick="showSearchDetails('${Meals[i].idMeal}')" >
      
      <div class="image"><img src="${Meals[i].strMealThumb}" class="w-100" alt="">
      
      
          <div class="food-title w-100 h-100 d-flex align-items-center"><h3 class="ps-2">${Meals[i].strMeal}</h3></div>
      
      </div>
      
  </div> `;
  }

  document.querySelector("#search-content").innerHTML = cartoona;
}

$(document).ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
    });
  });
});

$(".search-content").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-search").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});

//   $(document).ready(function () {
//     $(".loader").fadeOut(600, function () {
//       $(".loading-contact").fadeOut(1000, function () {
//         $("body").css("overflow", "auto");
//       });
//     });
//   });

//////////////////////////////////////////////////////////////////////////////

function showSearchDetails(id) {
  console.log(id);

  SearchDetails(id);
}

async function SearchDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayDetails(dataResponse.meals, "#search-content");
}

/////////////////////////////////////////////////////////////

function showCategoryDetails(id) {
  console.log(id);

  CategoryDetails(id);
}

async function CategoryDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayDetails(dataResponse.meals, "#categories-content");
}

/////////////////////////////////////////////////////////////////

function showAreaDetails(id) {
  console.log(id);

  AreaDetails(id);
}

async function AreaDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayDetails(dataResponse.meals, "#area-content");
}

/////////////////////////////////////////////////////////////////

function showIngDetails(id) {
  console.log(id);

  IngDetails(id);
}

async function IngDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayDetails(dataResponse.meals, "#ingredients-content");
}

/////////////////////////////////////////////////////////////////
