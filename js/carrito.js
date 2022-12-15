const prodcutosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito"))

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
const botonVaciar = document.querySelector("#carrito-acciones-vaciar")
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar")


function cargarProductosCarrito() {
    if (prodcutosEnCarrito && prodcutosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML = "";

        prodcutosEnCarrito.forEach(producto => {

            const div = document.createElement("div")
            div.classList.add("carrito-producto")
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto.cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${producto.precio * producto.cantidad}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
            `
            contenedorCarritoProductos.append(div)
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar")
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id
    const index = prodcutosEnCarrito.findIndex(producto => producto.id === idBoton)

    prodcutosEnCarrito.splice(index, 1)
    cargarProductosCarrito()
    Toastify({
        text: "Producto Eliminado",
        className: "producto-eliminado",
        style: {
            background: "linear-gradient(to right, #FE4A49, #7E2524)",
        }
    }).showToast();

    localStorage.setItem("productos-en-carrito", JSON.stringify(prodcutosEnCarrito))
}


botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    prodcutosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodcutosEnCarrito))
    cargarProductosCarrito()
    Swal.fire({
        icon: 'error',
        title: 'Productos Eliminados',
        text: 'Vuelva a Seleccionar Productos en la Tienda',
        iconHtml: '<img src="https://img.icons8.com/flat-round/64/null/cancel--v3.png"/>',
        showConfirmButton: false,
        timer: 2500
    })
}


function actualizarTotal() {
    const totalCalculado = prodcutosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}


botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    prodcutosEnCarrito.length = 0
    localStorage.setItem("productos-en-carrito", JSON.stringify(prodcutosEnCarrito))

    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
    Swal.fire({
        icon: 'success',
        title: 'Compra con Exito',
        text: 'Muchas gracias por confiar en el Vestuario del Futbol',
        showConfirmButton: false,
        timer: 2800
    })
}