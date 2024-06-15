//Constante que llama a la API
const URL_BASE = "https://jsonplaceholder.typicode.com/posts";
//Constantes que llaman por id elementos getPosts y postData
const searchButton = document.getElementById("getPosts");
const postData = document.getElementById("postData");

searchButton.addEventListener("click", async function () {
  console.log("Presionaste, buscando post...");
  const posts = await getPost(URL_BASE);
  posts === null ? showError() : printPost(posts);
});
// Función asincrona para obtener los datos
async function getPost(apiURL) {
  try {
    // Realiza una solicitud a la api por medio de fetch
    const apiData = await fetch(apiURL);
    console.dir(apiData);
    // Verifica la respuesta
    if (apiData.ok) {
      //Analaliza la respuesta con json
      const jsonData = await apiData.json();
      return jsonData;
    }
    // Maneja y muestra el error que ocurre durante la solicitud
    throw new Error("Ocurrió un error inesperado");
  } catch (error) {
    console.log("¡Hay un error en la petición!", error);
    return null;
  }
}
// Imprime el post en el HTML
function printPost(posts) {
  posts.forEach((post) => {
    const card = `
    <div>
        <ul>
            <h2>Title: ${post.title}</h2><hr>
            <p>${post.body}</p>
        </ul>
    </div> 
    <br>
    `;
    postData.innerHTML += card;
  });
}
// Alert de sweetAlert para que se vea más bonito.
function showError() {
  Swal.fire({
    icon: "error",
    title: "Oops... Algo salió mal",
    text: "Ocurrió un error para traer el posts!",
    footer: "",
  });
}
