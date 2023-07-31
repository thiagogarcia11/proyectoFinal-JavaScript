window.addEventListener("load", inicio);

function inicio() {
  //FUNCIONALIDADES GENERALES

  //Al cargar la página por primera vez el botón validar censos no se ve
  document.querySelector("#btnValidarCenso").style.display = "none";

  //Cargo los departamentos en los selects
  cargarDepartamentos("#slcDepartamentoRegistrarCenso");
  cargarDepartamentos("#slcDepartamentoRegistrarCensoInvitado");
  cargarDepartamentos("#slcDepartamentoInforme");

  //oculto el nav, los botones y las secciones al cargar la página
  ocultarSecciones();
  ocultarBotones();
  document.querySelector("#navPrincipal").style.display = "none";

  //Al cargar la página por primera vez, solo se ve la sección del lobby
  document.querySelector("#seccionLobby").style.display = "block";

  //Deshabilito el botón de eliminar censo
  document.querySelector("#btnEliminarCensoInvitado").style.display = "none";

  //Le damos funcionalidad a los botones del Nav
  let botones = document.querySelectorAll(".btnSeccion");

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", mostrarSeccionDesdeNav);
  }

  //Le damos funcionalidad al botón salir
  document.querySelector("#menuSalir").addEventListener("click", salir);

  //FUNCIONALIDADES SECCIONES

  //Lobby-censista
  document
    .querySelector("#btnLobbyCensista")
    .addEventListener("click", mostrarLobbyCensista);
  //lobby-invitado
  document
    .querySelector("#btnLobbyInvitado")
    .addEventListener("click", mostrarLobbyInvitado);

  //Login
  document
    .querySelector("#btnLoginCensista")
    .addEventListener("click", loginCensista);

  //Registro de usuario
  document
    .querySelector("#btnRegistrarCensista")
    .addEventListener("click", registrarUsuario);

  //Volver al lobby
  document
    .querySelector("#btnVolverAlLobby")
    .addEventListener("click", volverAlLobby);

  //Registrar Censo
  document
    .querySelector("#btnRegistrarCenso")
    .addEventListener("click", procesarCensoCensista);

  //Buscar censos
  document
    .querySelector("#btnBuscarCenso")
    .addEventListener("click", buscarCenso);

  //Validar Censos
  document
    .querySelector("#btnValidarCenso")
    .addEventListener("click", procesarCensoCensista);

  //Reasignar Censos
  document
    .querySelector("#btnReasignarCenso")
    .addEventListener("click", reasignarCenso);

  //Informes Censista
  document
    .querySelector("#btnInformesDepartamentos")
    .addEventListener("click", informesDepartamentos);

  //INVITADO

  //Buscar censos
  document
    .querySelector("#btnBuscarCensoInvitado")
    .addEventListener("click", buscarCensoInvitado);
  //Registrar censo
  document
    .querySelector("#btnRegistrarCensoInvitado")
    .addEventListener("click", procesarCensoInvitado);

  //Eliminar censo
  document
    .querySelector("#btnBuscarCensoAEliminarInvitado")
    .addEventListener("click", buscarCensoAEliminar);

  document
    .querySelector("#btnEliminarCensoInvitado")
    .addEventListener("click", eliminarCensoInvitado);
}

// GENERALES
let sistema = new Sistema();

function ocultarSecciones() {
  let secciones = document.querySelectorAll(".seccion");
  for (let i = 0; i < secciones.length; i++) {
    secciones[i].style.display = "none";
  }
}
function ocultarBotones() {
  let botonesOcultar = document.querySelectorAll(".btnSeccion");
  for (let i = 0; i < botonesOcultar.length; i++) {
    botonesOcultar[i].style.display = "none";
  }
}

//Funcionalidad que muestra las secciones desde los botones del Nav
function mostrarSeccionDesdeNav() {
  ocultarSecciones();
  let idBtn = this.getAttribute("id");
  let idSeccion = idBtn.charAt(3).toLowerCase() + idBtn.substring(4);
  document.querySelector("#" + idSeccion).style.display = "block";
  //Según qué botón se apreta, le da funcionalidad
  if (idBtn === "btnSeccionIngresoCenso") {
    formatearSeccionIngresoCenso();
  }
  if (idBtn === "btnSeccionReasignacionCensista") {
    cargarSelectsReasignacion();
  }
  if (idBtn === "btnSeccionBuscadorDeCensos") {
    document.querySelector("#txtCedulaBuscador").value = "";
    document.querySelector("#pMensajeBuscarCenso").innerHTML = "";
  }
  if (idBtn === "btnSeccionEstadisticaCensista") {
    cargarInformesCensos();
  }
  if (idBtn === "btnSeccionEstadisticaInvitado") {
    cargarTablaInvitado();
  }
  if (idBtn === "btnSeccionBuscadorDeCensosInvitado") {
    document.querySelector("#txtCedulaBuscadorInvitado").value = "";
    document.querySelector("#pMensajeBuscarCensoInvitado").innerHTML = "";
  }
  if (idBtn === "btnSeccionEliminarCensoInvitado") {
    document.querySelector("#txtCedulaEliminarCensoInvitado").value = "";
    document.querySelector("#btnEliminarCensoInvitado").style.display = "none";
    document.querySelector("#pMensajeEliminarCensoInvitado").innerHTML = "";
  }
}

//Muestra las secciones que le pasamos por parametros (en una array)
function mostrarSeccionesPorBoton(array) {
  ocultarSecciones();
  for (seccion of array) {
    document.querySelector(seccion).style.display = "block";
  }
}

//Muestra los botones de cierto tipo
function mostrarBotones(tipo) {
  ocultarBotones();
  let botonesMostrar = document.querySelectorAll("." + tipo);
  for (let i = 0; i < botonesMostrar.length; i++) {
    botonesMostrar[i].style.display = "block";
  }
}
//Funcionalidades del botón salir
function salir() {
  ocultarSecciones();
  document.querySelector("#seccionLobby").style.display = "block";
  document.querySelector("#pMensajeLoginCensista").innerHTML = "";
  usuarioLogeado = null;
  document.querySelector("#navPrincipal").style.display = "none";
  document.querySelector("#nombreUsuarioLogeado").style.display = "none";
}

let usuarioLogeado = {};

function hacerLogin(usuarioDB) {
  //Guardo el usuario en la variable global
  usuarioLogeado = usuarioDB;
  //Muestro el nav con los botones de Censista
  document.querySelector("#navPrincipal").style.display = "block";
  mostrarBotones("censista");
  //Oculto Secciones
  ocultarSecciones();
  //Muestro el nombre del usuario en el Nav
  document.querySelector("#nombreUsuarioLogeado").innerHTML =
    "Bienvenido " + usuarioLogeado.nombre;
  document.querySelector("#nombreUsuarioLogeado").style.display = "block";
  //Resteo los campos del Login
  document.querySelector("#txtUsuarioIngreso").value = "";
  document.querySelector("#txtContrasenaIngreso").value = "";
}

//Muestra un mensaje en un párrafo por su id
function mostrarMensaje(iDparrafo, texto) {
  document.querySelector(`#${iDparrafo}`).innerHTML = texto;
}
//Carga los departamentos
function cargarDepartamentos(parrafo) {
  document.querySelector(
    parrafo
  ).innerHTML = `<option value="-1">Seleccione un departamento...</option>`;
  for (let departamento of sistema.departamentos) {
    document.querySelector(
      parrafo
    ).innerHTML += `<option value="${departamento.id}">${departamento.nombre}</option>`;
  }
}

function censoRecuperadoCensista(censo) {
  //Modificamos la sección para que cumpla con la nueva función
  document.querySelector("#hRegistrarCenso").innerHTML = "Validación de censos";
  document.querySelector("#pBienvenidaRegistrarCenso").innerHTML =
    "Verifique los datos precargados por la persona";

  //Recuperamos los datos del censo y los mostramos por pantalla
  //Precarga los datos del censo que recuperamos
  document.querySelector("#txtNombreRegistrarCenso").value = censo.nombre;
  document.querySelector("#txtEdadRegistrarCenso").value = censo.edad;
  document.querySelector("#txtCedulaRegistrarCenso").value = censo.cedula;
  document.querySelector("#slcDepartamentoRegistrarCenso").value =
    censo.departamento;
  document.querySelector("#slcOcupacionRegistrarCenso").value = censo.ocupacion;
  //bloqueamos para que no  se pueda modificar la CI
  document
    .querySelector("#txtCedulaRegistrarCenso")
    .setAttribute("disabled", "disabled");

  //Escondemos el botón de registrar censo
  document.querySelector("#btnRegistrarCenso").style.display = "none";

  //Mostramos el botón de validar
  document.querySelector("#btnValidarCenso").style.display = "inline-block";
  //Mostramos la pantalla
  mostrarSeccionesPorBoton(["#seccionIngresoCenso"]);
}

function censoRecuperadoInvitado(censo) {
  //Recuperamos los datos del censo y los mostramos por pantalla
  //Precarga los datos del censo que recuperamos
  document.querySelector("#txtNombreRegistrarCensoInvitado").value =
    censo.nombre;
  document.querySelector("#txtEdadRegistrarCensoInvitado").value = censo.edad;
  document.querySelector("#txtCedulaRegistrarCensoInvitado").value =
    censo.cedula;
  document.querySelector("#slcDepartamentoRegistrarCensoInvitado").value =
    censo.departamento;
  document.querySelector("#slcOcupacionRegistrarCensoInvitado").value =
    censo.ocupacion;
  //bloqueamos para que no  se pueda modificar la CI
  document
    .querySelector("#txtCedulaRegistrarCensoInvitado")
    .setAttribute("disabled", "disabled");
  //Mostramos la pantalla
  mostrarSeccionesPorBoton(["#seccionRegistroInvitado"]);
}

//Resetea los campos del formulario de censos
function resetearCamposCensista() {
  document.querySelector("#txtNombreRegistrarCenso").value = "";
  document.querySelector("#txtEdadRegistrarCenso").value = "";
  document.querySelector("#txtCedulaRegistrarCenso").value = "";
  document.querySelector("#slcDepartamentoRegistrarCenso").value = -1;
  document.querySelector("#slcOcupacionRegistrarCenso").value = -1;
  document.querySelector("#pMensajeRegistrarCenso").innerHTML = "";
}

function resetearCamposInvitado(borroCI) {
  document.querySelector("#txtNombreRegistrarCensoInvitado").value = "";
  document.querySelector("#txtEdadRegistrarCensoInvitado").value = "";
  if (borroCI) {
    document.querySelector("#txtCedulaRegistrarCensoInvitado").value = "";
  }
  document.querySelector("#slcDepartamentoRegistrarCensoInvitado").value = -1;
  document.querySelector("#slcOcupacionRegistrarCensoInvitado").value = -1;
  document.querySelector("#pMensajeRegistrarCensoInvitado").innerHTML = "";
}
function formatearSeccionIngresoCenso() {
  //Reseteo los campos
  resetearCamposCensista();
  //Desbloqueo el campo Cédula
  document
    .querySelector("#txtCedulaRegistrarCenso")
    .removeAttribute("disabled");
  mostrarMensaje("pMensajeRegistrarCenso", "");
  //Modificamos la sección para que cumpla con la nueva función
  document.querySelector("#hRegistrarCenso").innerHTML =
    "Ingreso de persona Censada";
  document.querySelector("#pBienvenidaRegistrarCenso").innerHTML =
    "Ingresa los datos de la persona censada";
  //Escondemos el botón de registrar censo
  document.querySelector("#btnRegistrarCenso").style.display = "inline-block";
  //Mostramos el botón de validar
  document.querySelector("#btnValidarCenso").style.display = "none";
}

function cargarSelectsReasignacion() {
  //Select de censos
  document.querySelector(
    "#slcCensosReasignarCenso"
  ).innerHTML = `<option value="-1">Seleccione una persona...</option>`;
  let arrayCensosDelCensista = sistema.buscarElementosPorCondicion(
    sistema.censos,
    "idCensista",
    usuarioLogeado.id
  );
  for (let censo of arrayCensosDelCensista) {
    document.querySelector(
      "#slcCensosReasignarCenso"
    ).innerHTML += `<option value="${censo.id}">${censo.nombre} (CI: ${censo.cedula})</option>`;
  }

  //Select de censistas
  document.querySelector(
    "#slcCensistasReasignarCenso"
  ).innerHTML = `<option value="-1">Seleccione una persona...</option>`;
  let arrayCensistas = sistema.buscarElementosQueNoCumplenCondicion(
    sistema.censistas,
    "id",
    usuarioLogeado.id
  );

  for (let censista of arrayCensistas) {
    document.querySelector(
      "#slcCensistasReasignarCenso"
    ).innerHTML += `<option value="${censista.id}">${censista.nombre} (ID: ${censista.id})</option>`;
  }
}
//SECCIONES

//Lobby
function mostrarLobbyCensista() {
  mostrarSeccionesPorBoton(["#seccionLogin", "#seccionRegistro"]);
}

function mostrarLobbyInvitado() {
  document.querySelector("#navPrincipal").style.display = "block";
  mostrarBotones("invitado");
  ocultarSecciones();
  mostrarSeccionesPorBoton(["#seccionBuscadorDeCensosInvitado"]);
}

function loginCensista() {
  let usuario = document
    .querySelector("#txtUsuarioIngreso")
    .value.toLowerCase();
  let contrasena = document.querySelector("#txtContrasenaIngreso").value;

  //Verifico si los campos están completos
  if (usuario === "" || contrasena === "") {
    mostrarMensaje(
      "pMensajeLoginCensista",
      "Por favor, verifique que haya llenado todos los campos"
    );
  } else {
    //Verifico que exista un usuario con ese usuario
    let usuarioDB = sistema.traerElemento(
      sistema.censistas,
      "usuario",
      usuario
    );
    //Si no hay usuario
    if (usuarioDB === null) {
      mostrarMensaje("pMensajeLoginCensista", "Nombre de usuario inexistente");
    }
    //Si la contraseña del usuario encontrado no coincide con la ingresada
    else if (usuarioDB.contrasena !== contrasena) {
      mostrarMensaje("pMensajeLoginCensista", "Contraseña incorrecta");
    }
    //Si pasa todas las validaciones anteriores logueo perfectamente
    else {
      hacerLogin(usuarioDB);
      //Resteo los campos
      document.querySelector("#txtUsuarioIngreso").vale = "";
      document.querySelector("#txtContrasenaIngreso").value = "";
      mostrarMensaje("pMensajeLoginCensista", "");

      //Muestro la seccion de registrar censo
      mostrarSeccionesPorBoton(["#seccionIngresoCenso"]);
    }
  }
}

//Numerador de los censistas
let idCensistas = 4;

function registrarUsuario() {
  //Tomo los datos del HTML
  let nombre = document.querySelector("#txtNombreCrearCuenta").value;
  let usuario = document.querySelector("#txtUsuarioRegistroCensista").value;
  usuario = usuario.toLowerCase();
  let contrasena = document.querySelector(
    "#txtContrasenaRegistroCensista"
  ).value;
  //Primero reviso que los campos no estén vacíos
  if (nombre == "" || usuario == "" || contrasena == "") {
    mostrarMensaje(
      "pMensajeCrearCuentaCensista",
      "Por favor, verifique que haya llenado todos los campos"
    );
  } else {
    //Reviso si existe en mis censistas, un cesista registrado con el mismo nombre de usuario
    let existe = sistema.buscarElementoSiExiste(
      sistema.censistas,
      "usuario",
      usuario
    );
    //Si existe doy un mensaje de error
    if (existe) {
      mostrarMensaje(
        "pMensajeCrearCuentaCensista",
        "Nombre de usuario ya existente en el sistema, por favor ingrese otro"
      );
    } else {
      //Reviso que la contraseña sea válida
      let contrasenaOk = sistema.validarContrasena(contrasena);
      //Si la contraseña es inválida doy mensaje de error

      if (contrasenaOk == false) {
        mostrarMensaje(
          "pMensajeCrearCuentaCensista",
          "Por favor introduzca una contraseña de al menos 5 caracteres, con al menos una mayúscula, una minúscula y un número"
        );
      } else {
        //Si la contraseña es válida
        //Si no existe registro el usuario y muestro un mensaje de registro exitoso
        //Creo el censista
        let nuevoCensista = new Censista(
          idCensistas,
          nombre,
          usuario,
          contrasena
        );
        //Lo agrego al array
        sistema.agregarCensista(nuevoCensista);

        //Sumo 1 al ID de censistas
        idCensistas++;

        alert("Censista registrado con éxito");

        //Reseteo los inputs
        document.querySelector("#txtNombreCrearCuenta").value = "";
        document.querySelector("#txtUsuarioRegistroCensista").value = "";
        document.querySelector("#txtContrasenaRegistroCensista").value = "";
        mostrarMensaje("pMensajeCrearCuentaCensista", "");
      }
    }
  }
}

//Vuelve al lobby desde las secciones de login y creacion de usuario
function volverAlLobby() {
  mostrarSeccionesPorBoton(["#seccionLobby"]);
  //Reseteo los imputs
  document.querySelector("#txtUsuarioIngreso").value = "";
  document.querySelector("#txtContrasenaIngreso").value = "";
  document.querySelector("#txtNombreCrearCuenta").value = "";
  document.querySelector("#txtUsuarioRegistroCensista").value = "";
  document.querySelector("#txtContrasenaRegistroCensista").value = "";
  document.querySelector("#pMensajeCrearCuentaCensista").innerHTML = "";
  document.querySelector("#pMensajeLoginCensista").innerHTML = "";
}

//Numerador de censos
let idCenso = 31;

//Procesa censos desde la pantalla de censista
function procesarCensoCensista() {
  //Reinicio el párrafo por si lo usé anteriormente
  document.querySelector("#pMensajeRegistrarCenso").innerHTML = "";
  //Tomo el id del botón que se utilizó
  let idBtn = this.getAttribute("id");
  //Tomo los datos del HTML
  let nombre = document.querySelector("#txtNombreRegistrarCenso").value;
  let edad = Number(document.querySelector("#txtEdadRegistrarCenso").value);
  let cedula = document.querySelector("#txtCedulaRegistrarCenso").value;
  let departamento = document.querySelector(
    "#slcDepartamentoRegistrarCenso"
  ).value;
  let ocupacion = document.querySelector("#slcOcupacionRegistrarCenso").value;

  //Valido que ningún dato esté vacío
  if (
    nombre === "" ||
    isNaN(edad) ||
    cedula === "" ||
    departamento === "-1" ||
    ocupacion === "-1"
  ) {
    mostrarMensaje(
      "pMensajeRegistrarCenso",
      "Por favor verifique que haya llenado todos los campos y a su vez que la edad y la cédula sean solo números"
    );
  } else {
    //Valimos el nombre
    let nombreOk = sistema.validarNombre(nombre);

    if (!nombreOk) {
      mostrarMensaje(
        "pMensajeRegistrarCenso",
        "Por favor verifique que el nombre contenga solo letras(sin tildes) y espacios"
      );
    } else {
      //Verifico que la edad sea un número entre 0 y 130
      if (isNaN(edad) || edad < 0 || edad > 130) {
        mostrarMensaje(
          "pMensajeRegistrarCenso",
          "Por favor verifique que la edad sea un número entre 0 y 130"
        );
      } else {
        //Valido la CI
        let cedulaOk = sistema.validarCI(cedula);
        if (!cedulaOk) {
          mostrarMensaje(
            "pMensajeRegistrarCenso",
            "Por favor ingrese una cédula válida"
          );
        } else {
          //Valido que la cédula no esté usada en un censo
          let cedulaExiste = sistema.buscarElementoSiExiste(
            sistema.censos,
            "cedula",
            cedula
          );

          //Esta validacion solo se hace si entramos a registrar un nuevo censo
          if (cedulaExiste && idBtn === "btnRegistrarCenso") {
            mostrarMensaje(
              "pMensajeRegistrarCenso",
              "Esta cédula ya fue censada"
            );
          } else {
            //cambia la funcionalidad según el botón que utilizamos

            //Cuando es un nuevo registro...

            if (idBtn === "btnRegistrarCenso") {
              //Si todo está OK creo el censo y lo registro
              let censo = new Censo(
                idCenso,
                nombre,
                edad,
                cedula,
                departamento,
                ocupacion,
                usuarioLogeado.id,
                true
              );
              sistema.agregarCenso(censo);
              alert("Censo registrado con Éxito!");
              idCenso++;

              //Limpiar campos
              resetearCamposCensista();
            }
            //Si lo hago desde el botón de modificar censo...
            else if (idBtn === "btnValidarCenso") {
              //Traigo el elemento que quiero modificar
              let elementoAModificar = sistema.traerElemento(
                sistema.censos,
                "cedula",
                cedula
              );
              //Seteo los campos del elemento nuevo
              let censo = new Censo(
                elementoAModificar.id,
                nombre,
                edad,
                cedula,
                departamento,
                ocupacion,
                usuarioLogeado.id,
                true
              );
              //modifico el censo y muestro un mensaje exitoso
              sistema.modificarCenso(elementoAModificar.id, censo);
              alert("Censo Validado con éxito");
              //Limpiar campos
              document.querySelector("#txtCedulaBuscador");
              resetearCamposCensista();
              mostrarSeccionesPorBoton(["#seccionBuscadorDeCensos"]);
            }
          }
        }
      }
    }
  }
}

//Busca un censo y muestra sus datos
function buscarCenso() {
  let cedula = document.querySelector("#txtCedulaBuscador").value;

  //Valido la CI
  let cedulaOk = sistema.validarCI(cedula);
  if (!cedulaOk || cedula === "") {
    mostrarMensaje(
      "pMensajeBuscarCenso",
      "Por favor ingrese una cédula válida"
    );
  } else {
    //Valido que la cédula esté usada en un censo
    let cedulaExiste = sistema.buscarElementoSiExiste(
      sistema.censos,
      "cedula",
      cedula
    );
    //Si no hay censo con esta CI muestro un error
    if (!cedulaExiste) {
      mostrarMensaje(
        "pMensajeBuscarCenso",
        "La cédula utilizada no tiene datos precargados"
      );
    } else {
      //Recupero el censo con esta CI
      let censo = sistema.traerElemento(sistema.censos, "cedula", cedula);

      //Si el censo está validado mostramos un error
      if (censo.censado === true) {
        mostrarMensaje(
          "pMensajeBuscarCenso",
          "El censo de esta persona ya fué validado"
        );
      } else {
        //Valido que el censo esté asignado al censista logeado
        if (usuarioLogeado.id !== censo.idCensista) {
          mostrarMensaje(
            "pMensajeBuscarCenso",
            "Este censo no pertenece a este censista"
          );
        } else {
          //Recupero y muestro los datos del censo
          censoRecuperadoCensista(censo);
        }
      }
    }
  }
}
function reasignarCenso() {
  //Tomo los datos del HTML
  let censo = Number(document.querySelector("#slcCensosReasignarCenso").value);
  let censista = Number(
    document.querySelector("#slcCensistasReasignarCenso").value
  );

  //Valido que haya seleccionado algo
  if (censo === -1 || censista === -1) {
    mostrarMensaje(
      "pMensajeReasignarCenso",
      "Por favor, seleccione una persona a asignar y un censista"
    );
  } else {
    //Reasigno el censo

    //Busco el censo que quiero cambiar
    let censoACambiar = sistema.traerElemento(sistema.censos, "id", censo);

    //Le cambio la propiedad de idCensista
    censoACambiar.idCensista = censista;

    //Lo sustituyo en el array
    sistema.modificarCenso(censoACambiar.id, censoACambiar);
    //Muestro un mensaje satisfactorio
    alert("Censo reasignado correctamente");

    //Resteo y vuelvo a cargar los selects
    cargarSelectsReasignacion();
  }
}

//Carga la pantalla de informes de censos
function cargarInformesCensos() {
  //1- Muestro en el párrafo los censados que están validados
  let censadosValidados = sistema.buscarElementosPorCondicion(
    sistema.censos,
    "censado",
    true
  );
  mostrarMensaje(
    "pInformeTotalCensados",
    `Total de censados: ${censadosValidados.length}`
  );

  //2-Muestro la cantidad de personas censadas por departamento

  //Limpio los datos
  document.querySelector("#tblInformeCensadosPorDepartamento").innerHTML = "";

  //Obtengo los departamentos del sistema
  let departamentos = sistema.obtenerArrayDepartamentos();

  //Busco todos los censados en true por departamento y los muestro en la tabla
  for (let departamento of departamentos) {
    //Primero busco el array que cumpla ambas condiciones
    let censadosPorDeptoArray = sistema.buscarElementosPorDobleCondicion(
      sistema.censos,
      "departamento",
      `${departamento.id}`,
      "censado",
      true
    );
    //Solo tomo la longitud, que es lo que necesito mostrar
    let censadosPorDepto = censadosPorDeptoArray.length;
    //Lo muestro en la tabla
    document.querySelector(
      "#tblInformeCensadosPorDepartamento"
    ).innerHTML += `<tr>
            <td>${departamento.nombre}</td>
            <td>${censadosPorDepto}</td>
            </tr> `;
  }
  //3-Muestro el porcentaje de personas pendientes de validar sus datos respecto al total de personas.
  censadosValidados;
  let censosTotal = sistema.obtenerArrayCensos();
  mostrarMensaje(
    "pInformePendientesDeValidar",
    `Porcentaje de censados sin validar : ${Math.round(
      ((censosTotal.length - censadosValidados.length) / censosTotal.length) *
        100
    )}%`
  );
}

//Carga la seccion de informes por departamento de la pantalla de informes de censista
function informesDepartamentos() {
  let departamento = document.querySelector("#slcDepartamentoInforme").value;
  if (departamento === "-1") {
    mostrarMensaje(
      "informeCensadosPorDepartamentoYEdad",
      "Por favor elige un departamento"
    );
  } else {
    //Cuento mayores
    let mayoresDeEdad = sistema.contarMayoresPorDepartamento(departamento);
    //Busco el total de censos
    let totalCensos = sistema.buscarElementosPorDobleCondicion(
      sistema.censos,
      "departamento",
      departamento,
      "censado",
      true
    ).length;
    let menoresDeEdad = sistema.contarMenoresPorDepartamento(departamento);
    let porcentajeMayores = 0;
    let porcentajeMenores = 0;
    if (totalCensos > 0) {
      porcentajeMayores = Math.round((mayoresDeEdad / totalCensos) * 100);
      porcentajeMenores = Math.round((menoresDeEdad / totalCensos) * 100);
    }

    mostrarMensaje(
      "informeCensadosPorDepartamentoYEdad",
      `Total de censos: ${totalCensos}<br> Menores de edad: ${menoresDeEdad}  - ${porcentajeMenores}%
    <br> Mayores de edad: ${mayoresDeEdad}  - ${porcentajeMayores}
    %`
    );
  }
}

//INVITADO

//Variable utilizada para controlar si se recuperó o no, un censo ya existente o si es uno nuevo
let censoRecuperado = false;

function buscarCensoInvitado() {
  let cedula = document.querySelector("#txtCedulaBuscadorInvitado").value;

  //Valido la CI
  let cedulaOk = sistema.validarCI(cedula);
  if (!cedulaOk || cedula === "") {
    mostrarMensaje(
      "pMensajeBuscarCensoInvitado",
      "Por favor ingrese una cédula válida"
    );
  } else {
    //Valido que la cédula esté usada en un censo
    let cedulaExiste = sistema.buscarElementoSiExiste(
      sistema.censos,
      "cedula",
      cedula
    );
    //Si no hay censo con esta CI  le permito crear un censo
    if (!cedulaExiste) {
      mostrarSeccionesPorBoton(["#seccionRegistroInvitado"]);
      //Le habilito la posiblidad de modificar el campo de la cédula (por si volvió a entrar)
      document
        .querySelector("#txtCedulaRegistrarCensoInvitado")
        .removeAttribute("disabled");
      censoRecuperado = false;
      document.querySelector("#txtCedulaRegistrarCensoInvitado").value = cedula;
      //Limpio los campos
      resetearCamposInvitado(false);
    } else {
      //Recupero el censo con esta CI
      let censo = sistema.traerElemento(sistema.censos, "cedula", cedula);

      //Si el censo está validado mostramos un error
      if (censo.censado === true) {
        mostrarMensaje(
          "pMensajeBuscarCensoInvitado",
          "Tu censo ya fué validado"
        );
      } else {
        {
          //Recupero y muestro los datos del censo
          censoRecuperadoInvitado(censo);
          censoRecuperado = true;
        }
      }
    }
  }
}

//Procesa censos desde las pantallas del invitado
function procesarCensoInvitado() {
  //Tomo los datos del HTML
  let nombre = document.querySelector("#txtNombreRegistrarCensoInvitado").value;
  let edad = Number(
    document.querySelector("#txtEdadRegistrarCensoInvitado").value
  );
  let cedula = document.querySelector("#txtCedulaRegistrarCensoInvitado").value;
  let departamento = document.querySelector(
    "#slcDepartamentoRegistrarCensoInvitado"
  ).value;
  let ocupacion = document.querySelector(
    "#slcOcupacionRegistrarCensoInvitado"
  ).value;

  //Valido que ningún dato esté vacío
  if (
    nombre === "" ||
    isNaN(edad) ||
    cedula === "" ||
    departamento === "-1" ||
    ocupacion === "-1"
  ) {
    mostrarMensaje(
      "pMensajeRegistrarCensoInvitado",
      "Por favor verifique que haya llenado todos los campos y a su vez que la edad y la cédula sean solo números"
    );
  } else {
    //Validamos el nombre
    let nombreOk = sistema.validarNombre(nombre);

    if (!nombreOk) {
      mostrarMensaje(
        "pMensajeRegistrarCensoInvitado",
        "Por favor verifique que el nombre contenga solo letras(sin tildes) y espacios"
      );
    } else {
      //Verifico que la edad sea un número entre 0 y 130
      if (isNaN(edad) || edad < 0 || edad > 130) {
        mostrarMensaje(
          "pMensajeRegistrarCensoInvitado",
          "Por favor verifique que la edad sea un número entre 0 y 130"
        );
      } else {
        //Valido la CI
        let cedulaOk = sistema.validarCI(cedula);
        if (!cedulaOk) {
          mostrarMensaje(
            "pMensajeRegistrarCensoInvitado",
            "Por favor ingrese una cédula válida"
          );
        } else {
          //Valido que la cédula no esté usada en un censo
          let cedulaExiste = sistema.buscarElementoSiExiste(
            sistema.censos,
            "cedula",
            cedula
          );
          if (cedulaExiste && censoRecuperado === false) {
            mostrarMensaje(
              "pMensajeRegistrarCensoInvitado",
              "Esta cédula ya fue censada"
            );
          } else {
            //cambia la funcionalidad según si se recuperaron o no los datos

            //Si todo está OK creo el censo y

            if (censoRecuperado === false) {
              let censo = new Censo(
                idCenso,
                nombre,
                edad,
                cedula,
                departamento,
                ocupacion,
                sistema.idAleatorio(),
                false
              );
              //Cuando es un nuevo registro...
              sistema.agregarCenso(censo);
              alert("Censo registrado con Éxito!");
              idCenso++;

              mostrarMensaje("pMensajeRegistrarCenso", "");
            }
            //Si el censo fué recuperado...
            else {
              //Traigo el elemento que quiero modificar
              let elementoAModificar = sistema.traerElemento(
                sistema.censos,
                "cedula",
                cedula
              );
              //Seteo los campos del elemento nuevo
              let censo = new Censo(
                elementoAModificar.id,
                nombre,
                edad,
                cedula,
                departamento,
                ocupacion,
                sistema.idAleatorio(),
                false
              );
              //modifico el censo y muestro un mensaje exitoso
              sistema.modificarCenso(elementoAModificar.id, censo);
              alert("Censo Registrado con éxito");
            }
            //Limpiar campos
            resetearCamposInvitado(true);
            //Desbloqueo el campo Cédula
            document
              .querySelector("#txtCedulaRegistrarCensoInvitado")
              .removeAttribute("disabled");
          }
        }
      }
    }
  }
}

//Variable utilizada para controlar si se encontró un censo para eliminar y pasar de una función (la que recupera) a otra (la que borra)
let censoAEliminar = null;

//Recupera un censo para ser borrado en la función anterior
function buscarCensoAEliminar() {
  //Tomo los datos del HTML
  let cedula = document.querySelector("#txtCedulaEliminarCensoInvitado").value;
  //Valido la CI
  let cedulaOk = sistema.validarCI(cedula);
  if (!cedulaOk || cedula === "") {
    mostrarMensaje(
      "pMensajeEliminarCensoInvitado",
      "Por favor ingrese una cédula válida"
    );
  } else {
    //Si no existe un censo con esa CI doy un error
    let existe = sistema.buscarElementoSiExiste(
      sistema.censos,
      "cedula",
      cedula
    );
    if (!existe) {
      mostrarMensaje(
        "pMensajeEliminarCensoInvitado",
        "No existe un censo con esa cédula"
      );
    } else {
      //Recupero el censo
      let censoRecuperado = sistema.traerElemento(
        sistema.censos,
        "cedula",
        cedula
      );
      if (censoRecuperado.censado === true) {
        //Si el censo ya está confirmado doy un error
        mostrarMensaje(
          "pMensajeEliminarCensoInvitado",
          "No se puede eliminar este censo porque ya fué verificado"
        );
      }
      //Si el censo no está confirmado muestro un mensaje y habilito el botón de eliminar censo
      else
        mostrarMensaje(
          "pMensajeEliminarCensoInvitado",
          "Los datos de esta persona se pueden eliminar <br> Está seguro que desea eliminarlos?"
        );
      censoAEliminar = censoRecuperado;
      document.querySelector("#btnEliminarCensoInvitado").style.display =
        "inline-block";
    }
  }
}

//Elimina un censo recuperado en la función anterior
function eliminarCensoInvitado() {
  //Pido una confirmación para eliminar
  let confirmacion = confirm("Eliminar datos?");
  //Si confirma: elimino el censo, muestro un mensaje y reinicio la variable, el input y el botón
  if (confirmacion) {
    sistema.eliminarCenso(censoAEliminar.id);
    alert(
      `Se han eliminado correctamente los datos de la CI: ${censoAEliminar.cedula}`
    );
    mostrarMensaje("pMensajeEliminarCensoInvitado", "");
    document.querySelector("#btnEliminarCensoInvitado").style.display = "none";
    censoAEliminar = null;
    document.querySelector("#txtCedulaEliminarCensoInvitado").value = "";
  }
}

//Carga la tabla con la información estadística para el invitado
function cargarTablaInvitado() {
  //Limpio los datos
  document.querySelector("#tblInformeCensadosInvitado").innerHTML = "";

  //Obtengo los departamentos del sistema
  let departamentos = sistema.obtenerArrayDepartamentos();

  //Obtengo la cantidad de censos en total que tenemos
  let totalCensos = sistema.obtenerArrayCensos().length;

  //Busco todos los datos necesarios por departamento y los muestro en la tabla
  for (let departamento of departamentos) {
    //Primero busco las personas de este departamento que estudian
    let estudian = sistema.buscarElementosPorDobleCondicion(
      sistema.censos,
      "departamento",
      `${departamento.id}`,
      "ocupacion",
      "3"
    ).length;

    //Luego busco las personas de este departamento que no estudian

    let noEstudian = sistema.buscarElementosPorDobleCondicion(
      sistema.censos,
      "departamento",
      `${departamento.id}`,
      "ocupacion",
      "4"
    ).length;

    //La suma de los que estudian y los que no estudian es la cantidad de personas que no trabajan
    let noTrabajan = estudian + noEstudian;

    //Busco el total de personas censadas de este departamento
    let totalPorDepartamento = sistema.buscarElementosPorCondicion(
      sistema.censos,
      "departamento",
      `${departamento.id}`
    ).length;

    //La cantidad de persona que trabajan, son el total de departamento menos las que no trabajan
    let trabajan = totalPorDepartamento - noTrabajan;

    //Saco el porcentaje de personas censadas por departamento, con respecto al total del país
    let porcentajeCensadosDelTotal = (
      (totalPorDepartamento / totalCensos) *
      100
    ).toFixed(2);

    //Muestro todos los datos calculados en la tabla
    document.querySelector("#tblInformeCensadosInvitado").innerHTML += `<tr>
            <td>${departamento.nombre}</td>
            <td>${estudian}</td>
            <td>${noTrabajan}</td>
            <td>${trabajan}</td>
            <td>${porcentajeCensadosDelTotal}%</td>
            </tr> `;
  }
}
