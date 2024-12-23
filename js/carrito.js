document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".cart-body").addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const itemId = event.target.getAttribute("data-id");
            eliminarDelCarrito(itemId);
        }
    });

    function eliminarDelCarrito(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        updateCartUI();
        showNotification("Producto eliminado del carrito", "error");
    }

    const updateCartUI = () => {
        cartBody.innerHTML = "";

        if (cartItems.length === 0) {
            cartBody.innerHTML = "<p>Tu carrito está vacío.</p>";
            return;
        }

        const cartList = document.createElement("ul");
        cartList.style.listStyle = "none";
        cartList.style.padding = "0";

        let total = 0;

        cartItems.forEach((item) => {
            total += item.precio * item.quantity;

            const listItem = document.createElement("li");
            listItem.style.marginBottom = "10px";
            listItem.innerHTML = `
                <strong>${item.nombre}</strong><br><span>Cantidad: ${item.quantity}X</span> $${(item.precio * item.quantity).toLocaleString()}
                <button style="margin-top: 5px;" class="btn btn-sm btn-danger remove-item" data-id="${item.id}">Eliminar</button>
            `;
            cartList.appendChild(listItem);
        });

        cartBody.appendChild(cartList);

        const totalElement = document.createElement("p");
        totalElement.style.fontWeight = "bold";
        totalElement.style.marginTop = "10px";
        totalElement.innerHTML = `TOTAL: $${total.toLocaleString()}`;
        cartBody.appendChild(totalElement);

        const vaciarCarritoBtn = document.createElement("button");
        vaciarCarritoBtn.textContent = "Vaciar Carrito";
        vaciarCarritoBtn.classList.add("btn", "btn-secondary", "w-100", "mt-3");
        vaciarCarritoBtn.addEventListener("click", vaciarCarrito);

        cartBody.appendChild(vaciarCarritoBtn);
    };

    const showNotification = (message = "Producto agregado al carrito", type = "success") => {
        notification.textContent = message;
        notification.classList.remove("success", "error");
        notification.classList.add(type);
        notification.classList.add("show");
        setTimeout(() => {
            notification.classList.remove("show");
        }, 2000);
    };

    const addToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            if (existingItem.quantity >= product.stock) {
                showNotification(`No hay más stock disponible para "${product.nombre}".`, "error");
                return;
            }
            existingItem.quantity += 1;
        } else {
            if (product.stock < 1) {
                showNotification(`No hay stock disponible para "${product.nombre}".`, "error");
                return;
            }
            cartItems.push({ ...product, quantity: 1 });
        }

        updateCartUI();
        showNotification(`"${product.nombre}" se agregó al carrito.`, "success");
    };

    const vaciarCarrito = () => {
        cartItems = [];
        updateCartUI();
        showNotification("El carrito ha sido vaciado.", "error");
    };

    const catalogo = document.getElementById("catalogo");
    const cart = document.getElementById("cart");
    const cartToggle = document.getElementById("cart-toggle");
    const closeCart = document.getElementById("close-cart");
    const cartBody = document.querySelector(".cart-body");
    const notification = document.getElementById("notification");
    let cartItems = [];
    let productos = [];

    const cargarProductosDesdeJSON = async () => {
        try {
            const response = await fetch("../json/productos.json");
            if (!response.ok) throw new Error("No se pudo cargar el archivo JSON.");
            productos = await response.json();
            renderizarProductos();
        } catch (error) {
            console.error("Error al cargar productos:", error);
        }
    };

    const renderizarProductos = () => {
        catalogo.innerHTML = "";
        productos.forEach((producto) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product");
            productCard.setAttribute("data-id", producto.id);

            productCard.innerHTML = `
                <div class="card">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="product-name">${producto.nombre}</h5>
                        <p class="product-price">$${producto.precio}</p>
                        <button class="add-to-cart btn btn-warning" ${
                            producto.stock === 0 ? "disabled" : ""
                        }>Agregar al carrito</button>
                    </div>
                </div>
            `;

            catalogo.appendChild(productCard);
        });
    };

    cartToggle.addEventListener("click", () => {
        cart.style.right = "0";
    });

    closeCart.addEventListener("click", () => {
        cart.style.right = "-300px";
    });

    catalogo.addEventListener("click", (e) => {
        if (e.target.classList.contains("add-to-cart")) {
            const productElement = e.target.closest(".product");
            const productId = productElement.getAttribute("data-id");
            const product = productos.find((p) => p.id === productId);

            if (product) {
                addToCart(product);
            }
        }
    });

    const finalizarCompraLink = document.querySelector(".cart-footer a");
    if (finalizarCompraLink) {
        finalizarCompraLink.addEventListener("click", (e) => {
            if (!cartItems || cartItems.length === 0) {
                e.preventDefault();
                showNotification("El carrito está vacío. Agrega productos antes de continuar.", "error");
            }
        });
    }

    cargarProductosDesdeJSON();
});
