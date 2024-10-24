const arrayToSort = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => sortArray(data.pets))
    .catch((err) => console.log(err));
};

const sortArray = (sortData) => {
  // let arr = [];
  // sortData.forEach((item) => {
  //   arr.push(item.price);
  // });
  sortData.sort((a, b) => b.price - a.price);
  console.log(sortData);
  displayPetCards(sortData);
};

//Remove active class from all the category buttons
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const addPet = (picture) => {
  console.log(picture);
  const addPetContainer = document.getElementById("add-pet-container");
  const addDiv = document.createElement("div");
  addDiv.innerHTML = `
    <img class="rounded-2xl p-2 border" src="${picture}"/>
  `;
  console.log(addDiv);
  addPetContainer.appendChild(addDiv);
};

//Loading All Categories
const loadCategory = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
    .catch((error) => console.log(error));
};

//Loading All Pets Data
const loadPetCards = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      displayPetCards(data.pets);
      //sort
      // sortByPrice(data.pets);
    })
    .catch((error) => console.log(error));
};

//Loading Specific Category Pet API
const loadCategoryCards = (name) => {
  console.log(name);
  document.getElementById("spinner").style.display = "block";
  document.getElementById("card-container").style.display = "none";
  //API is dynamically fetching data. Also Loading functionality Added.
  setTimeout(function () {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${name}`)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${name}`);
        activeBtn.classList.add("active");
        displayPetCards(data.data);
        console.log("setTimeout er vitore.");
      })
      .catch((error) => console.log(error));
    document.getElementById("spinner").style.display = "none";
    document.getElementById("card-container").style.display = "grid";
  }, 2000);
};

const loadDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayDetails = (details) => {
  console.log(details);
  const detailContainer = document.getElementById("modal-content");
  detailContainer.innerHTML = `
        <div class="flex justify-center">
          <img src=${details.image} />
        </div>
        <h2 class="card-title text-3xl font-extrabold mt-5 mb-2">${
          details.pet_name
        }</h2>
        <div class="flex justify-between mb-5">
          <div class="text-base">
            <p class="primaryBlack"><i class="fa-solid fa-paw"></i>  Breed: ${
              details.breed === undefined ? "Unknown" : details.breed
            }</p>

            <p class="primaryBlack"><i <i class="fa-solid fa-mercury"></i>  Gender: ${
              details.gender === undefined ? "Not Mentioned" : details.gender
            }</p>
            <p class="primaryBlack"><i <i class="fa-solid fa-mercury"></i>  Vaccinated status: ${
              details.vaccinated_status === null
                ? "Not Given"
                : details.vaccinated_status
            }</p>
          </div>
          <div class="text-base">
            <p class="primaryBlack"><i class="fa-regular fa-calendar"></i>  Birth:  ${
              details.date_of_birth === undefined ||
              details.date_of_birth === null
                ? "Not Available"
                : details.date_of_birth
            }</p>
            <p class="primaryBlack"><i class="fa-solid fa-dollar-sign"></i>  Price: ${
              details.price === null ? "Inquire Price" : details.price
            }$</p>
          </div>
        </div>
        <hr>
        <p class="left mt-3 font-bold text-primaryBlack">Details Information</p>
        <p class="left mt-3 text-primaryBlack">${details.pet_details}</p>
  `;

  document.getElementById("customModal").showModal();
};
//All categories are shown trough buttons.
const displayCategory = (categories) => {
  console.log(categories);
  const btnSection = document.getElementById("btn-section");
  //Working with each category
  categories.forEach((item) => {
    console.log(item);
    //Creating button div
    const buttonContainer = document.createElement("div");
    buttonContainer.classList =
      "flex justify-center bg-transparent text-primaryBlack py-2 rounded-lg";
    buttonContainer.innerHTML = `
      <button id="btn-${item.category}" onclick="loadCategoryCards('${item.category}')" class="btn btn-lg border-2 category-btn px-12 md:px-20 py-3">
        <div>
          <img class="w-8" src="${item.category_icon}"/>
        </div>
        <div>
           <h1 class="font-bold">${item.category}</h1>
        </div>
      </button>
    `;

    //Adding this container to category section
    btnSection.appendChild(buttonContainer);
  });
};

// "status": true,
//   "message": "successfully fetched all the pets data",
//   "pets": [
//     {
//       "petId": 1,
//       "breed": "Golden Retriever",
//       "category": "Dog",
//       "date_of_birth": "2023-01-15",
//       "price": 1200,
//       "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//       "gender": "Male",
//       "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//       "vaccinated_status": "Fully",
//       "pet_name": "Sunny"
//     }

const displayPetCards = (cards) => {
  console.log(cards);
  const cardContainer = document.getElementById("card-container");
  //Only shows the category item and removes everything else.
  cardContainer.innerHTML = " ";

  //If No content is available
  if (cards.length === 0) {
    cardContainer.classList.remove("grid");
    cardContainer.style.display = "block";
    cardContainer.innerHTML = `
      <div class="text-center space-y-2">
        <div class="flex justify-center">
          <img src="./images/error.webp"/>
        </div>
        <div class="space-y-3">
          <h1 class="text-5xl font-bold text-primaryBlack">No Information Available</h1>
          <p class="text-base text-zinc-500"> Currently no best friend available. We are looking to get you a best friend as soon as possible. Don't be sad.<br>Visit us soon again. We hope we get you a best friend as quickly as possible.</p>
        </div>
      </div>
    `;
    return;
  } else {
    cardContainer.classList.add("grid");
  }
  //Making cards dynamically and  appending them to the card container.
  cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
        <div class="card bg-base-100 w-full border">
            <figure class="px-5 pt-5 h-[230px]">
                <img
                src="${card.image}"
                alt="Shoes"
                class="rounded-xl h-full w-full object-cover" />
            </figure>
            <div class="card-body">
                <h2 class="card-title font-extrabold">${card.pet_name}</h2>
                <p class="primaryBlack"><i class="fa-solid fa-paw"></i>  Breed: ${
                  card.breed === undefined ? "Unknown" : card.breed
                }</p>
                <p class="primaryBlack"><i class="fa-regular fa-calendar"></i>  Birth:  ${
                  card.date_of_birth === undefined ||
                  card.date_of_birth === null
                    ? "Not Available"
                    : card.date_of_birth
                }</p>
                <p class="primaryBlack"><i <i class="fa-solid fa-mercury"></i>  Gender: ${
                  card.gender === undefined ? "Not Mentioned" : card.gender
                }</p>
                <p class="primaryBlack mb-2"><i class="fa-solid fa-dollar-sign"></i>  Price: ${
                  card.price === null ? "Inquire Price" : card.price
                }$</p>
                <hr>
                <div class="card-actions mt-2">
                <button id="add-pet" onclick="addPet('${
                  card.image
                }')" class="btn btn-sm bg-transparent px-3"><i class="fa-solid fa-thumbs-up"></i></button>
                <button id="adopt-btn" onclick="clickToAdopt()" class="btn btn-sm bg-transparent text-btnColor px-5">Adopt</button>
                <button onclick=loadDetails('${
                  card.petId
                }') class="btn btn-sm bg-transparent text-btnColor px-5">Details</button>
                </div>
            </div>
        </div>
    `;

    cardContainer.appendChild(cardDiv);
  });
};

let count = 3;

const clickToAdopt = () => {
  document.getElementById("customModal2").showModal();
  count = 3;
  const interval = setInterval(function () {
    const timer = document.getElementById("timer");
    timer.innerText = count;
    count--;
    if (count <= 0) {
      document.getElementById("customModal2").close();
      clearInterval(interval);
    }
  }, 1000);
};

loadCategory();
loadPetCards();
loadCategoryCards();
