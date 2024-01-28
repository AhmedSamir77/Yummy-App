async function Area() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayAreas(dataResponse.meals);
}

function displayAreas(areas) {
  console.log(areas);
  var cartoona = "";

  for (let i = 0; i < areas.length; i++) {
    cartoona += `    <div class="col-md-3" onclick="AreaMeals('${areas[i].strArea}')">

      <div class="content">

          <i class="fa-solid fa-house-laptop fa-4x" style="color:#ffffff"></i>
          <h3 class="text-white">${areas[i].strArea}</h3>

      </div>

      
  </div>  `;
  }

  document.querySelector("#area-content").innerHTML = cartoona;
}

Area();

async function AreaMeals(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let dataResponse = await response.json();

  displayAreasFilters(dataResponse.meals);
}

function displayAreasFilters(areas) {
  console.log(areas);
  var cartoona = "";

  for (let i = 0; i < areas.length; i++) {
    cartoona += `    <div class="col-md-3" onclick="showAreaDetails('${areas[i].idMeal}')" > 
            
            <div class="image"><img src="${areas[i].strMealThumb}" class="w-100" alt="">
            
            
                <div class="food-title w-100 h-100 d-flex align-items-center"><h3 class="ps-2">${areas[i].strMeal}</h3></div>
            
            </div>
    
            
        </div> `;
  }

  document.querySelector("#area-content").innerHTML = cartoona;
}

$(".area-content").ready(function () {
  $(".loader").fadeOut(600, function () {
    $(".loading-area").fadeOut(500, function () {
      $("body").css("overflow", "auto");
    });
  });
});
