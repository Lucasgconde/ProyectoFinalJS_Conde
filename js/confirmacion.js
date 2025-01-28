document.addEventListener("DOMContentLoaded", () => {
    // Obtener datos del comprador desde localStorage
    const buyerName = localStorage.getItem("buyerName");
    const buyerLastName = localStorage.getItem("buyerLastName");
    const buyerAddress = localStorage.getItem("buyerAddress");
    const buyerPhone = localStorage.getItem("buyerPhone");
    const buyerEmail = localStorage.getItem("buyerEmail");

    // Insertar datos del comprador
    document.getElementById("buyer-name").textContent = buyerName || "";
    document.getElementById("buyer-lastname").textContent = buyerLastName || "";
    document.getElementById("buyer-address").textContent = buyerAddress || "";
    document.getElementById("buyer-phone").textContent = buyerPhone || "";
    document.getElementById("buyer-email").textContent = buyerEmail || "";

    // Obtener carrito desde localStorage
    const cart = JSON.parse(localStorage.getItem("cartItems")) || []; // Asegúrate de que coincida con carrito.js
    console.log("Carrito cargado:", cart);

    const productList = document.getElementById("product-list");
    const totalPriceElement = document.getElementById("total-price");
    productList.innerHTML = ""; // Limpiar contenido previo

    let totalPrice = 0;

    if (cart.length > 0) {
        cart.forEach((item) => {
            const nombre = item.nombre || "Producto desconocido";
            const cantidad = item.quantity || 1;
            const precio = item.precio || 0;
            const subtotal = precio * cantidad;

            // Crear elemento para cada producto
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <div>
                    <strong>${nombre}</strong><br>
                    Cantidad: ${cantidad}<br>
                    Precio unitario: $${precio.toLocaleString("es-AR")}<br>
                    Subtotal: $${subtotal.toLocaleString("es-AR")}
                </div>
            `;
            productList.appendChild(listItem);

            totalPrice += subtotal;
        });
    } else {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = "No hay productos en el carrito.";
        productList.appendChild(listItem);
    }

    // Mostrar precio total
    totalPriceElement.textContent = `$${totalPrice.toLocaleString("es-AR")}`;

    // Función para vaciar el carrito al presionar el botón
    const volverTiendaBtn = document.querySelector("#volver-tienda-btn");
    if (volverTiendaBtn) {
        volverTiendaBtn.addEventListener("click", () => {
            localStorage.removeItem("cartItems"); // Borra el carrito
            localStorage.setItem("compraFinalizada", "true"); // Marca que la compra fue finalizada
        });
    }
});
