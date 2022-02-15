let nbr = 0;
const main_content = document.querySelector("#main");



 async function filmRequest (titleFilm, yearFilm) {
     let data;
    document.querySelector("#main").innerHTML = ""
       await fetch(`http://www.omdbapi.com/?apikey=a4a3f616&s=${titleFilm}&y=${yearFilm}`)
        .then((response) => {
             if (!response.ok) {
                 throw new Error("HTTP error " + response.status);
             }
            return response.json()})
        .then((json) => {
            data = json
        })
     return data;
}


async function rechercheFilm (titleFilm, yearFilm = null) {
    let obj = await filmRequest(titleFilm, yearFilm);

        if (obj.Response == "False") {
            document.querySelector("#main").innerHTML = `
                <div class ="d-flex justify-content-center  mt-5">
                <img src="img/404_page_not_found.jpg" alt="page not found">
                <div>
                `
        }

        obj.Search.map((film, i) => {
            showFilm(main_content, film.Title, film.Year, film.Poster,film.Type)
        })
        obj.Search.map((film, i) => showDescription(film.imdbID, i))

        document.querySelector("body").style.background ="black"

}



const showDescription = (film_id, index) => {
    fetch(`http://www.omdbapi.com/?apikey=a4a3f616&i=${film_id}`)
        .then((response) => response.json())
        .then((response) => {
            obj_desc = response
            desc = document.querySelector("#main").children
            for (let i in desc) {
                nbr++
                desc[index].lastElementChild.lastElementChild.innerHTML = ` 
                <p style="display:none" id="parag${nbr}" class="modal-content mt-2 mb-3">${obj_desc.Plot}</p>
                <button onclick='DisplayFilmDescription(document.querySelector("#parag${nbr}"),document.querySelector("#parag${nbr} + button"))'class="btn-lg btn-outline-primary">Voir plus <i class="fas fa-angle-double-down"></i></button>
                `
            }
        })

}



const showFilm = (selector, title, year, filmImage,categorie) => {

     let categorie_film;
    if (filmImage == "N/A") {
        filmImage = "img/image-not-found.png"
    }
    if(categorie =="movie"){
        categorie_film = "film"
    }
    else if(categorie == "series") {
        categorie_film = "séries"
    }

    selector.innerHTML += `      
            <div data-aos="fade-right" class="card col col-lg-3 col-sm-12 col-md-5 mt-3  text-center mr-3 mb-3" style="width: 18rem; background-color: #202020;">
              <img src="${filmImage}" class="card-img-top" alt="${title}" width="200px">
              <h3 class="card-title mt-3 font-weight-bold text-white">${title}</h3>
              <div class="card-body">
              <h5 class="text-white mb-3"><i class="fas fa-film"></i> Année: ${year} <br>
              <i class="fas fa-video"></i> La catégorie : ${categorie_film}
              </h5>
              <div>
                     <div class ="description"></div>
               </div>
              </div>
            </div>
        `
}



const DisplayFilmDescription = (selector,button) => {
    selector.setAttribute("data-aos", "zoom-out-left")
    if (selector.style.display == "none") {
        selector.style.display = "block"
        button.innerHTML = "<i class=\"fas fa-angle-double-up\"></i>"
    } else {
        selector.style.display = "none"
        button.innerText = "Voir plus"
        selector.removeAttribute("data-aos")
        selector.classList.remove("aos-init")
        selector.classList.remove("aos-animate")
    }
    AOS.init()
}


const scrolli = () => {
    AOS.init()
}

addEventListener("scroll", scrolli)

addEventListener("click", scrolli)


addEventListener("keydown", valider_enter = (e) => {
    if (e.key === "Enter" && document.querySelector("#recherche").value !== "") {
        rechercheFilm(document.querySelector("#recherche").value, document.querySelector("#year").value)
    } })


let film_name = ["Star Wars", "The Dark Knight","Pulp Fiction","Ghost in the Shell","narcos","cartel","gang","bruce","stan","mark","titanic","voyage","war","lan","king","Lord of the Rings","travel","anime","japan","tokyo","prince", "fast"]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}
let randomNumber = getRandomInt(0,film_name.length)

rechercheFilm(film_name[randomNumber]);
