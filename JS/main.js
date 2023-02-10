
let productos = [];

fetch("./JSON/productos.json")
    .then(Response => Response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const elegirProductos = document.querySelector("#Productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const cambiarTitulo = document.querySelector("#tituloP");
let botonesAgregar =  document.querySelectorAll(".productoBoton")
const contador = document.querySelector("#contador")

function cargarProductos(productosElegidos) {

    elegirProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
        let div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="productoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="productoDatos">
                <h2 class="productoTexto">${producto.titulo}</h2>
                <p class="productoPrecio">$ ${producto.precio}</p>
                <button class="productoBoton" id="${producto.id}">Agregar al carrito</button>
            </div>
        `;
        elegirProductos.append(div);
        actualizarBotones();
    })
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id  != "todos") {
            const prodcutoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id); 
            cambiarTitulo.innerText = prodcutoCategoria.categoria.nombre;
            const productosEleccion = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosEleccion);
        } else {
            cambiarTitulo.innerText = "Todos los Porductos";
            cargarProductos(productos);
        }
    });
})

function actualizarBotones() {
    botonesAgregar =  document.querySelectorAll(".productoBoton");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);

    })
}

let productosEnCarrito;
let contenedorproductosEnCarritoLocal = localStorage.getItem("productos-En-Carrito")

if(contenedorproductosEnCarritoLocal) {
    productosEnCarrito = JSON.parse(contenedorproductosEnCarritoLocal);
    actualizarContador()
}else{
    productosEnCarrito = [];
}



function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    };
    actualizarContador();
    Toastify({

        text: "Producto agregardo al carrito",
        
        duration: 2000
        
        }).showToast();

    localStorage.setItem("productos-En-Carrito", JSON.stringify(productosEnCarrito));
}



function actualizarContador() {
    let nuevoContador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)
    contador.innerText = nuevoContador
}