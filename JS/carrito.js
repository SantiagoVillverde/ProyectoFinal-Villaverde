let contenedorproductosEnCarrito = localStorage.getItem("productos-En-Carrito");
contenedorproductosEnCarrito = JSON.parse(contenedorproductosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoComprado = document.querySelector("#carritoComprado");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoBotones = document.querySelector("#carritoBotones");
let eliminar = document.querySelectorAll("eliminarProducto");
const vaciar = document.querySelector("#vaciarCarrito");
const comprar = document.querySelector("#comprarCarrito");
const total = document.querySelector("#total");

function cargarProductosCarrito() {
    if (contenedorproductosEnCarrito && contenedorproductosEnCarrito.length > 0) {
    
        contenedorCarritoVacio.classList.add("ocultar");
        contenedorCarritoProductos.classList.remove("ocultar");
        contenedorCarritoBotones.classList.remove("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
    
        contenedorCarritoProductos.innerHTML = "";
    
        contenedorproductosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
                            <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.titulo}">
                            <div class="productoNombreCarrito">
                                <small>Nombre:</small>
                                <h4>${producto.titulo}</h4>
                            </div>
                            <div class="productoCantidadCarrito">
                                <small>Cantidad:</small>
                                <h4>${producto.cantidad}</h4>
                            </div>
                            <div class="productoPrecioCarrito">
                                <small>Precio:</small>
                                <h4>$${producto.precio}</h4>
                            </div>
                            <div class="productoSubtotal">
                                <small>Subtotal</small>
                                <h4>$${producto.precio * producto.cantidad}</h4>
                            </div>
                            <button class="eliminarProducto" id="${producto.id}"><i class="bi bi-trash3"></i></button>
        `;
            contenedorCarritoProductos.append(div)
        })
        
    
    }else {
        contenedorCarritoVacio.classList.remove("ocultar");
        contenedorCarritoProductos.classList.add("ocultar");
        contenedorCarritoBotones.classList.add("ocultar");
        contenedorCarritoComprado.classList.add("ocultar");
    };
    actualizarBotonEliminar();
    calcularTotal();
}

cargarProductosCarrito()

actualizarBotonEliminar()

function actualizarBotonEliminar() {
    botonesEliminar =  document.querySelectorAll(".eliminarProducto");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);

    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = contenedorproductosEnCarrito.findIndex(producto => producto.id === idBoton);
    contenedorproductosEnCarrito.splice(index, 1);
    cargarProductosCarrito()

    localStorage.setItem("productos-En-Carrito", JSON.stringify(contenedorproductosEnCarrito))

}

vaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    contenedorproductosEnCarrito.length = 0;
    localStorage.setItem("productos-En-Carrito", JSON.stringify(contenedorproductosEnCarrito))
    cargarProductosCarrito()
    Toastify({

        text: "Carrito vaciado",
        
        duration: 3000
        
        }).showToast();
}

function calcularTotal() {
    total.innerText = "$ " + contenedorproductosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0 )
}

comprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    contenedorproductosEnCarrito.length = 0;
    localStorage.setItem("productos-En-Carrito", JSON.stringify(contenedorproductosEnCarrito));
    contenedorCarritoVacio.classList.add("ocultar");
    contenedorCarritoProductos.classList.add("ocultar");
    contenedorCarritoBotones.classList.add("ocultar");
    contenedorCarritoComprado.classList.remove("ocultar");
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada con exito',
        text: 'Muchas gracias por tu compra!',
        footer: '<a href="">Why do I have this issue?</a>'
    })
}