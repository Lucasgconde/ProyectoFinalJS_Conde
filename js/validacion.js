document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#formulario-compra");
    const inputs = {
        nombre: document.querySelector("input[name='nombre']"),
        apellido: document.querySelector("input[name='apellido']"),
        telefono: document.querySelector("input[name='telefono']"),
        direccion: document.querySelector("input[name='direccion']"),
        email: document.querySelector("input[name='email']"),
        repiteEmail: document.querySelector("input[name='repiteEmail']"),
    };

    const showError = (input, message) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = message;
        input.classList.add("is-invalid");
    };

    const clearError = (input) => {
        const errorElement = input.nextElementSibling;
        errorElement.textContent = "";
        input.classList.remove("is-invalid");
    };

    const validateInput = () => {
        let isValid = true;

        // Validar nombre
        if (!/^[a-zA-ZÀ-ÿ\s]{2,40}$/.test(inputs.nombre.value.trim())) {
            showError(inputs.nombre, "El nombre debe contener solo letras y no puede estar vacío.");
            isValid = false;
        } else {
            clearError(inputs.nombre);
        }

        // Validar apellido
        if (!/^[a-zA-ZÀ-ÿ\s]{2,40}$/.test(inputs.apellido.value.trim())) {
            showError(inputs.apellido, "El apellido debe contener solo letras y no puede estar vacío.");
            isValid = false;
        } else {
            clearError(inputs.apellido);
        }

        // Validar teléfono
        if (!/^[0-9]{7,15}$/.test(inputs.telefono.value.trim())) {
            showError(inputs.telefono, "El número de teléfono debe contener entre 7 y 15 dígitos.");
            isValid = false;
        } else {
            clearError(inputs.telefono);
        }

        // Validar dirección
        if (inputs.direccion.value.trim() === "") {
            showError(inputs.direccion, "La dirección no puede estar vacía.");
            isValid = false;
        } else {
            clearError(inputs.direccion);
        }

        // Validar correo electrónico
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(inputs.email.value.trim())) {
            showError(inputs.email, "Por favor, ingresa un correo electrónico válido.");
            isValid = false;
        } else {
            clearError(inputs.email);
        }

        // Validar repetición de correo
        if (inputs.email.value.trim() !== inputs.repiteEmail.value.trim()) {
            showError(inputs.repiteEmail, "Los correos electrónicos no coinciden.");
            isValid = false;
        } else {
            clearError(inputs.repiteEmail);
        }

        return isValid;
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Evitar el envío del formulario

        if (!validateInput()) {
            showNotification("Por favor, corrige los errores antes de continuar.", "bg-danger");
        } else {
            showNotification("¡Formulario enviado con éxito!", "bg-success");
            setTimeout(() => {
                window.location.href = "confirmacion.html";
            }, 3000);
        }
    });
});
