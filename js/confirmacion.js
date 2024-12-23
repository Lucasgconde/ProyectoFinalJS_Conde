document.addEventListener("DOMContentLoaded", function () {
    function generarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let codigo = '';
        for (let i = 0; i < 20; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }

    const orderIdElement = document.getElementById("order-id");
    if (orderIdElement) {
        orderIdElement.textContent = generarCodigo();
    }
});
