document.addEventListener("DOMContentLoaded", () => {
    // Funciones para manejar el carrito
    const saveCartToLocalStorage = () => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        console.log("Carrito guardado:", cartItems);
    };
    
    const loadCartFromLocalStorage = () => {
        if (localStorage.getItem("compraFinalizada")) {
            localStorage.removeItem("cartItems"); // Limpia los productos
            localStorage.removeItem("compraFinalizada"); // Elimina la bandera
            cartItems = []; // Resetea el carrito en memoria
        } else {
            const savedCart = localStorage.getItem("cartItems");
            if (savedCart) {
                cartItems = JSON.parse(savedCart);
            }
        }
        updateCartUI(); // Actualiza la interfaz del carrito
    };    

    document.querySelector(".cart-body").addEventListener("click", (event) => {
        const itemId = event.target.getAttribute("data-id");

        if (event.target.classList.contains("add-quantity")) {
            modificarCantidad(itemId, 1);
        } else if (event.target.classList.contains("subtract-quantity")) {
            modificarCantidad(itemId, -1);
        }
    });

    function modificarCantidad(id, cantidad) {
        const item = cartItems.find(item => item.id === id);

        if (item) {
            const productStock = productos.find(product => product.id === id)?.stock || 0;
            if (cantidad > 0 && item.quantity >= productStock) {
                showNotification(`No hay más stock disponible para "${item.nombre}".`, "error");
                return;
            }

            item.quantity += cantidad;
            if (item.quantity <= 0) {
                cartItems = cartItems.filter(item => item.id !== id);
                showNotification("Producto eliminado del carrito", "error");
            } else {
                showNotification(`Cantidad de "${item.nombre}" actualizada.`, "success");
            }
            updateCartUI();
            saveCartToLocalStorage();
        }
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
                <strong>${item.nombre}</strong><br>
                <span>Cantidad: ${item.quantity}X</span> $${(item.precio * item.quantity).toLocaleString()}<br>
                <button class="btn btn-sm btn-success add-quantity" data-id="${item.id}" style="width: 40px; height: 40px; font-size: 16px;">+</button>
                <button class="btn btn-sm btn-dark subtract-quantity" data-id="${item.id}" style="margin-left: 5px; width: 40px; height: 40px; font-size: 16px;">-</button>
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
        saveCartToLocalStorage();
        showNotification(`"${product.nombre}" se agregó al carrito.`, "success");
    };

    const vaciarCarrito = () => {
        cartItems = [];
        localStorage.removeItem("cartItems"); // Limpia el carrito
        localStorage.setItem("compraFinalizada", "true"); // Marca la compra como finalizada
        updateCartUI();
        showNotification("El carrito ha sido vaciado.", "error");
    };    

    const catalogo = document.getElementById("catalogo");
    const cart = document.getElementById("cart");
    const cartToggle = document.getElementById("cart-toggle");
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
        if (cart.style.right === "0px") {
            cart.style.right = "-300px";
        } else {
            cart.style.right = "0px";
        }
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

    loadCartFromLocalStorage();
    cargarProductosDesdeJSON();

    // Limpiar carrito al volver de la página de confirmación
    if (window.location.pathname.includes("confirmacion.html")) {
        vaciarCarrito();
    }
});