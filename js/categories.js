async function Category() {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  let dataResponse = await response.json();
  console.log(dataResponse);
  displayCategories(dataResponse.categories);
}

function displayCategories(categories) {
  console.log(categories);
  var cartoona = "";

  const maxDescriptionLength = 20;
  for (let i = 0; i < categories.length; i++) {
    const truncatedDescription = categories[i].strCategoryDescription
      .split(" ")
      .splice(0, maxDescriptionLength)
      .join(" ");

    cartoona += `    <div class="col-md-3" onclick="CategoryMeals('${categories[i].strCategory}')" > 
        
        <div class="image"><img src="${categories[i].strCategoryThumb}" class="w-100" alt="">
        
        
            <div class="food-title w-100 h-100 d-flex flex-column text-center align-items-center"><h3 class="ps-2">${categories[i].strCategory}</h3>  <p>${truncatedDescription}</p></div>

          
        
        </div>

        
    </div> `;
  }

  document.querySelector("#categories-content").innerHTML = cartoona;
}

Category();

async function CategoryMeals(Categ) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${Categ}`
  );

  let dataResponse = await response.json();

  displayCategoriesFilters(dataResponse.meals);
}

function displayCategoriesFilters(categories) {
  console.log(categories);
  var cartoona = "";

  for (let i = 0; i < categories.length; i++) {
    cartoona += `    <div class="col-md-3" onclick="showCategoryDetails('${categories[i].idMeal}')" > 
          
          <div class="image"><img src="${categories[i].strMealThumb}" class="w-100" alt="">
          
          
              <div class="food-title w-100 h-100 d-flex align-items-center"><h3 class="ps-2">${categories[i].strMeal}</h3></div>
          
          </div>
  
          
      </div> `;
  }

  document.querySelector("#categories-content").innerHTML = cartoona;
}




$('.categories-content').ready(function () {
    $(".loader").fadeOut(600, function () {
      $(".loading-category").fadeOut(500, function () {
        $("body").css("overflow", "auto");
      });
    });
  });