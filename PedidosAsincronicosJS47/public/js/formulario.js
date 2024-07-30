

window.onload = () => {
  const titleInput = document.querySelector("#title")
  const ratingInput = document.querySelector("#rating")
  const awardsInput = document.querySelector("#awards")
  const relDateInput = document.querySelector("#release_date")
  const lengthInput = document.querySelector("#length")
  const genreInput = document.querySelector("#genreName")
  const genreIdInput = document.querySelector("#genreId")
  const form = document.querySelector(".formulario")
  const path = window.location.pathname
  const parts = path.split("/")
  const id = parts[2]



  fetch(`http://localhost:3031/api/movies/${id}`)
    .then((response) => {
      return response.json()
    })
    .then((peliculas) => {
      const movie = peliculas.data
      titleInput.value = movie.title
      ratingInput.value = movie.rating
      awardsInput.value = movie.awards
      relDateInput.value = movie.release_date.split('T', 1)[0]
      lengthInput.value = movie.length
      genreInput.value = movie.genre.name
    });



  const editBtn = document.querySelector("#editButton")
  const deleteBtn = document.querySelector("#deleteButton")




  editBtn.addEventListener("click", (e) => {
    e.preventDefault()

    const data = {
      title: titleInput.value,
      rating: ratingInput.value,
      awards: awardsInput.value,
      release_date: relDateInput.value,
      length: lengthInput.value,
      genre_id: genreIdInput.value
    }
    console.log(JSON.stringify(data));

    const url = `http://localhost:3031/api/movies/update/${id}`

    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: "PUT",
      body: JSON.stringify(data)
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      })
      window.location.href = `http://localhost:3031/formulario/${id}`
  })
}

