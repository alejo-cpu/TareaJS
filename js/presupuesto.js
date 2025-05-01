function calcularPresupuesto() {
  let producto = parseFloat(document.querySelector("#producto").value);
  let plazo = Number(document.getElementById("plazo").value);
  let extras = document.querySelectorAll(".extra:checked");

  let extrasTotal = 0;
  extras.forEach((extra) => (extrasTotal += parseFloat(extra.value)));

  let subtotal = producto + extrasTotal;

  if (plazo < 0) {
    plazo = 0;
  }

  let descuento = Math.min(plazo * 0.01, 0.2);

  let total = subtotal * (1 - descuento);

  document.getElementById("total").textContent = `$${total.toFixed(2)}`;
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", calcularPresupuesto);
});
document
  .querySelectorAll("#producto, input[type=checkbox]")
  .forEach((input) => {
    input.addEventListener("change", calcularPresupuesto);
  });
calcularPresupuesto();

//VALIDACION DE FORMULARIO
const datosForm = document.getElementById("datosForm");
const inputs = document.querySelectorAll("#datosForm input");
const datos = {
  nombre: false,
  apellido: false,
  telefono: false,
  email: false,
};

const expresiones = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{1,15}$/,
  apellido: /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{1,40}$/,
  telefono: /^\d{1,9}$/,
  email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

function validarFormulario(e) {
  switch (e.target.name) {
    case "nombre":
      validarCampos(expresiones.nombre, e.target, e.target.name);
      break;

    case "apellido":
      validarCampos(expresiones.apellido, e.target, e.target.name);
      break;

    case "telefono":
      validarCampos(expresiones.telefono, e.target, e.target.name);
      break;

    case "email":
      validarCampos(expresiones.email, e.target, e.target.name);
      break;
  }
}

function validarCampos(expresion, input, campo) {
  if (expresion.test(input.value)) {
    document.getElementById(campo).classList.add("campoCorrecto");
    document.getElementById(campo).classList.remove("campoIncorrecto");
    datos[campo] = true;
  } else {
    document.getElementById(campo).classList.add("campoIncorrecto");
    document.getElementById(campo).classList.remove("campoCorrecto");
    datos[campo] = false;
  }
}

inputs.forEach((input) => {
  input.addEventListener("keyup", validarFormulario);
  input.addEventListener("blur", validarFormulario);
});

const condiciones = document.getElementById("condiciones");

datosForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (
    datos.nombre &&
    datos.apellido &&
    datos.telefono &&
    datos.email &&
    condiciones.checked
  ) {
    document.querySelectorAll(".campos").forEach((campo) => {
      campo.classList.remove("campoCorrecto");
    });
    datosForm.reset();
    alert("Datos Enviados");
  }
});
