let productosCargados = [];

async function cargarProductos() {
    try {
        const respuesta = await fetch('../json/productos.json');
        productosCargados = await respuesta.json();
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function renderizarProductos() {
    const catalogo = document.getElementById('catalogo');
    catalogo.innerHTML = '';

    productosCargados.forEach(producto => {
        const productoHTML = `
            <div class="col product" data-id="${producto.id}">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="product-name card-title">${producto.nombre}</h5>
                        <p class="product-price card-text">$${producto.precio}</p>
                        <button class="btn btn-warning add-to-cart">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;
        catalogo.innerHTML += productoHTML;
    });
    
}

document.addEventListener("DOMContentLoaded", async () => {
    await cargarProductos();
    renderizarProductos();
});
