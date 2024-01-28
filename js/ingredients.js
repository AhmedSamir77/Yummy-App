async function ingredient() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayingredients(dataResponse.meals);
}

function displayingredients(meals) {
  console.log(meals);
  var cartoona = "";

  const maxDescriptionLength = 20;

  for (let i = 0; i < Math.min(20, meals.length); i++) {
    const truncatedDescription = meals[i].strDescription
      .split(" ")
      .splice(0, maxDescriptionLength)
      .join(" ");

    cartoona += `      <div class="col-md-3 text-center text-white" onclick="IngredientMeals('${meals[i].strIngredient}')">
      <i class="fa-solid fa-drumstick-bite fa-4x "></i>
      <h3>${meals[i].strIngredient}</h3>
      <p>${truncatedDescription}</p>
   
  </div>
`;
  }

  document.querySelector("#ingredients-content").innerHTML = cartoona;
}

ingredient();

async function IngredientMeals(ing) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`
  );

  let dataResponse = await response.json();

  displayIngredientsFilters(dataResponse.meals);
}

function displayIngredientsFilters(meals) {
  console.log(meals);
  var cartoona = "";

  for (let i = 0; i < meals.length; i++) {
    cartoona += `    <div class="col-md-3" onclick="showIngDetails('${meals[i].idMeal}')" > 
            
            <div class="image"><img src="${meals[i].strMealThumb}" class="w-100" alt="">
            
            
                <div class="food-title w-100 h-100 d-flex align-items-center"><h3 class="ps-2">${meals[i].strMeal}</h3></div>
            
            </div>
    
            
        </div> `;
  }

  document.querySelector("#ingredients-content").innerHTML = cartoona;
}

$(".ingredients-content").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-ing").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
