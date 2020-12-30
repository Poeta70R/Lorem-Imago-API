const URL = "https://picsum.photos/v2/list?page=2&limit=15";
let fotografias = []; // contiene las fotografias de la aplicacion
 

// Funcion encargada de traer los datos de las fotografias
const fetchFotografias = async (url = URL) => {
    try{
        const response = await fetch(url); 
        fotografias = await response.json()
        return fotografias;
    } catch(err) {
        console.error(err); 
    }
};

const mostrarMensaje = () => {
    // mostrar un mensaje en un span
    document.querySelector("#mensaje").innerHTML = "NO HAY FOTOGRAFIAS";
    document.querySelector("#input").disabled = true;
  };

  const borrarFotografia = (id) => {
    document.getElementById(id).remove();
    fotografias = fotografias.filter((fotografia) => fotografia.id != id);    
    fotografias.length === 0 ? mostrarMensaje() : null;
};
// Se crea la columna con la informacion de las 15 fotografias
// Destructurando el parametro de la función: extraemos propiedades de fotografia
const crearNodo = ({id,download_url,author,url}) => {
    const nodo = 
        `<div class="col-md-4 col-12" id=${id}>
            <div class="card mt-5 ml-3">
            <img src=${download_url} width = "350px" height= "250px" />
                <div class="card-body">

                    <h5 class="card-title">${author}</h5>
                    
                    <p class="card-text">Foto ID : ${id}</p>
                    
                    <p class="card-text">Sitio Web : ${url}</p>

                    <button onClick="borrarFotografia(${id})" class= "btn btn-danger btn-block">Borrar</button>
                </div>
            </div>
        </div>`
        return nodo;
};

// Funcion encargada de buscar una fotografia por id
const buscarFotografia = () => {
    const { value: id } = document.querySelector("#input");
    const fotografiaBuscada = fotografias.filter(
    (fotografia) => fotografia.id === id)
    mostrar(fotografiaBuscada);   
};

//Muestra solo lo que se manda por array.
const mostrar = (array) => {
    fotografias.map((e) => {
        if (document.getElementById(e.id))
            document.getElementById(e.id).remove(); //Elimina del DOM
    });
    array.map(elemento => {
        const html = crearNodo(elemento);
        document.getElementById("api_LoremImago").insertAdjacentHTML("beforeend", html);
    });
}


// ... carga el DOM
async function start() {
    fotografias = await fetchFotografias(); // fotografias es global
    document.querySelector("#find").addEventListener("click",buscarFotografia);
    mostrar(fotografias);
};

window.onload = start();