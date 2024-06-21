//-------------------------------------  Eventos de Formulario ---------------------------------------
const datos = {
    nombre: ' ',
    telefono: ' ',
    email: ' ',
    mensaje: ' '
}

const nombreInput = document.querySelector('#nombre');
const telefonoInput = document.querySelector('#telefono');
const emailInput = document.querySelector('#email');
const mensajeInput = document.querySelector('#mensaje');

nombreInput.addEventListener("input", leerTexto);
telefonoInput.addEventListener("input", leerTexto);
emailInput.addEventListener("input", leerTexto);
mensajeInput.addEventListener("input", leerTexto);

function leerTexto(evento) {
    const result = sanitizeInput(escapeHTML(evento.target.value));
    //console.log(result);
    datos[evento.target.id] = result;
    //console.log(datos);
}

//-------------------------------------  Validar Formulario ---------------------------------------
const formulario = document.querySelector(".formulario");
formulario.addEventListener('submit', function(evento){
    evento.preventDefault();

    // Validar campos vacíos
    const {nombre, telefono, email, mensaje} = datos;
    if (nombre === ' ' || telefono === ' ' || email === ' ' || mensaje === ' ') {
        mostrarAlerta("Todos los campos son obligatorios", true);
        return;
    }
    
    // Reiniciar contadores
    let arroba = false;
    let punto = 0;

    // Validar email
    for (let i = 0; i < email.length; i++) {
        if (email.charAt(i) === '@') {
            arroba = true;
        }

        if (email.charAt(i) === '.') {
            punto ++;
        }
    }

    if (arroba === false || punto === 0) {
        mostrarAlerta("Email no válido", true);
        return;
    }

    // Mostrar mensaje de éxito
    mostrarAlerta("El mensaje fue enviado");
});

function mostrarAlerta(mensaje, error = null) {
    const alerta = document.createElement('P'); //creando codigo HTML, siempre en mayusculas
    alerta.textContent = mensaje //aqui imprime el mensaje
    if (error) {
        alerta.classList.add("error");
    } else {
        alerta.classList.add("enviado");
    }

    formulario.appendChild(alerta);//nos permite subirlo al documento HTML final

    setTimeout(() => {
        alerta.remove();//eliminamos el elemento HTML
    }, 1000);
}

//-------------------------------------  Smooth Scroll ---------------------------------------
scrollNav();

function scrollNav() {
    const enlace = document.querySelector('.contenido-developer a');
    enlace.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento por defecto del enlace

        const seccionScroll = event.target.attributes.href.value;
        const seccion = document.querySelector(seccionScroll);
        seccion.scrollIntoView({behavior: 'smooth'})
    });
}

/* function scrollNav() {
    const enlace = document.querySelectorAll('.navegacion_principal a[href="#scroll"], .contenido-developer a[href="#scroll"]');
    enlace.forEach(enlace =>{
        enlace.addEventListener('click', function(event){
            event.preventDefault();

            const seccionScroll = event.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: 'smooth'})
        })
    })
} */

//-------------------------------------  Funciones de validacíon ---------------------------------------

//Evitar la ejecución de scripts:
function escapeHTML(input) {
  return input.replace(/[&<>"']/g, function (match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[match];
  });
}

//Sanitización del lado del cliente:
function sanitizeInput(input) {
  return encodeURIComponent(input);
}
