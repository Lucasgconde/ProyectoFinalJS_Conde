function showNotification(message, type = 'bg-danger') {
    // Crear el elemento de notificación si no existe
    let notification = document.querySelector('.toast-notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.className = 'toast-notification toast align-items-center text-white border-0 position-fixed top-0 end-0 p-3';
        notification.style.zIndex = 1050;
        notification.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;
        document.body.appendChild(notification);
    }

    // Cambiar tipo (color) de notificación
    notification.className = `toast-notification toast align-items-center text-white border-0 position-fixed top-0 end-0 p-3 ${type}`;

    // Inicializar y mostrar el toast de Bootstrap
    const toast = new bootstrap.Toast(notification);
    toast.show();

    // Remover la notificación después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Ejemplo de uso al enviar el formulario
const form = document.querySelector('#formulario-compra');
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Evitar el envío del formulario

    // Validar el formulario
    const isValid = validateInput();

    if (!isValid) {
        showNotification('Por favor, corrige los errores antes de continuar.', 'bg-danger');
    } else {
        // Confirmar que todos los datos son correctos antes de redirigir
        const allValid = validateDetails();
        if (allValid) {
            showNotification('¡Formulario enviado con éxito!', 'bg-success');
            setTimeout(() => {
                window.location.href = "confirmacion.html";
            }, 3000);
        } else {
            showNotification('Por favor, corrige los errores específicos antes de continuar.', 'bg-danger');
        }
    }
});

// Validación avanzada
function validateInput() {
    let isValid = true;

    const inputs = document.querySelectorAll('#formulario-compra input');
    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.classList.add('is-invalid');
            input.nextElementSibling.textContent = 'Este campo no puede estar vacío.';
        } else {
            input.classList.remove('is-invalid');
            input.nextElementSibling.textContent = '';
        }
    });

    return isValid;
}


// Validación de detalles específicos (como longitud de teléfono y correos válidos)
function validateDetails() {
    let isValid = true;

    // Validar número de teléfono
    const telefono = document.querySelector('input[name="telefono"]');
    const telefonoRegex = /^[0-9]{7,15}$/;
    if (!telefonoRegex.test(telefono.value.trim())) {
        isValid = false;
        telefono.classList.add('is-invalid');
        telefono.nextElementSibling.textContent = 'El número de teléfono debe contener entre 7 y 15 dígitos.';
    } else {
        telefono.classList.remove('is-invalid');
        telefono.nextElementSibling.textContent = '';
    }

    // Validar correos electrónicos
    const email = document.querySelector('input[name="email"]');
    const repiteEmail = document.querySelector('input[name="repiteEmail"]');
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (!emailRegex.test(email.value.trim())) {
        isValid = false;
        email.classList.add('is-invalid');
        email.nextElementSibling.textContent = 'Por favor, ingresa un correo electrónico válido.';
    } else {
        email.classList.remove('is-invalid');
        email.nextElementSibling.textContent = '';
    }

    if (email.value.trim() !== repiteEmail.value.trim()) {
        isValid = false;
        repiteEmail.classList.add('is-invalid');
        repiteEmail.nextElementSibling.textContent = 'Los correos electrónicos no coinciden.';
    } else {
        repiteEmail.classList.remove('is-invalid');
        repiteEmail.nextElementSibling.textContent = '';
    }

    return isValid;
}

