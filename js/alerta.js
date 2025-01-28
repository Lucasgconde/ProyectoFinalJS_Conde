function mostrarAlerta(mensaje) {
    const alerta = document.createElement("div");
    alerta.className = "alert alert-danger fixed-top text-center mx-auto w-50 fade show";
    alerta.style.zIndex = "1050";
    alerta.style.transition = "opacity 0.5s ease-in-out";
    alerta.innerHTML = mensaje;

    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.style.opacity = "0";
        setTimeout(() => {
            alerta.remove();
        }, 500);
    }, 3000);
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    mostrarAlerta("¡Se recibió tu solicitud de cambio o devolución, esta misma será respondida a la brevedad!");
});
