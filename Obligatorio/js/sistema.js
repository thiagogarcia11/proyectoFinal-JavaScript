class Sistema {
  constructor() {
    this.censistas = [
      new Censista(1, "Carlos Machado", "cmachado", "Obligatorio1"),
      new Censista(2, "Lionel Messi", "lmessi", "Obligatorio1"),
      new Censista(3, "Ema Noir", "enoir", "Obligatorio1"),
    ];
    this.censos = [
      new Censo(1, "Juan Carlos", 45, "46972011", "5", "1", 1, false),
      new Censo(2, "Mara Trindade", 2, "67344849", "1", "2", 2, true),
      new Censo(3, "Horacio Gimenez", 84, "27864100", "14", "1", 3, true),
      new Censo(4, "Diego Alonso", 23, "37855513", "12", "2", 2, false),
      new Censo(5, "Matias Rey", 21, "42236318", "15", "2", 1, false),
      new Censo(6, "Julia Perez", 20, "34277590", "17", "3", 3, true),
      new Censo(7, "Andrea Costa", 41, "77575690", "1", "4", 1, true),
      new Censo(8, "Andres Acosta", 39, "71716597", "2", "4", 2, true),
      new Censo(9, "Sofia Silva", 28, "48333461", "2", "4", 3, true),
      new Censo(10, "Regina Beder", 37, "45444699", "3", "1", 1, false),
      new Censo(11, "Olivia Montes", 11, "67891676", "4", "1", 2, false),
      new Censo(12, "Valentina de Oca", 12, "32206753", "5", "3", 2, false),
      new Censo(13, "Mateo Rodriguez", 8, "39397797", "19", "2", 3, false),
      new Censo(14, "Armando Casas", 91, "41346378", "18", "2", 2, false),
      new Censo(15, "Esteban Quito", 79, "42603296", "5", "1", 1, true),
      new Censo(16, "Juan Reverdito", 38, "88540361", "1", "3", 1, true),
      new Censo(17, "Jorge Draxler", 42, "92303046", "14", "2", 3, false),
      new Censo(18, "Chito Vera", 26, "19488421", "12", "4", 3, false),
      new Censo(19, "Mario Casas", 86, "14417982", "15", "4", 3, true),
      new Censo(20, "Elias Andaluz", 23, "3671505", "15", "4", 1, false),
      new Censo(21, "Maria Trindade", 16, "60679267", "17", "1", 1, true),
      new Censo(22, "Victoria Garcia", 18, "71386380", "1", "1", 2, false),
      new Censo(23, "Matias Flores", 21, "5838494", "2", "2", 2, false),
      new Censo(24, "Victor Libonatti", 55, "10269755", "2", "3", 3, true),
      new Censo(25, "Gloria Rodriguez", 76, "83042201", "3", "3", 3, true),
      new Censo(26, "Miriam Gonzales", 82, "64111590", "4", "3", 1, false),
      new Censo(27, "Daniel Perez", 64, "10690693", "5", "1", 1, true),
      new Censo(28, "Bruno Valverde", 14, "30608230", "19", "1", 2, true),
      new Censo(29, "Jose Perez", 51, "35999674", "18", "2", 2, false),
      new Censo(30, "Miguel Angel Ruso", 11, "32378908", "5", "2", 3, false),
    ];
    this.departamentos = [
      new Departamento(1, "Artigas"),
      new Departamento(2, "Canelones"),
      new Departamento(3, "Cerro Largo"),
      new Departamento(4, "Colonia"),
      new Departamento(5, "Durazno"),
      new Departamento(6, "Flores"),
      new Departamento(7, "Florida"),
      new Departamento(8, "Lavalleja"),
      new Departamento(9, "Maldonado"),
      new Departamento(10, "Montevideo"),
      new Departamento(11, "Paysandú"),
      new Departamento(12, "Río Negro"),
      new Departamento(13, "Rivera"),
      new Departamento(14, "Rocha"),
      new Departamento(15, "Salto"),
      new Departamento(16, "San José"),
      new Departamento(17, "Soriano"),
      new Departamento(18, "Tacuarembó"),
      new Departamento(19, "Treinta y Tres"),
    ];
  }
  agregarCensista(censista) {
    this.censistas.push(censista);
  }

  agregarCenso(censo) {
    this.censos.push(censo);
  }
  //Devuelve true si en el array existe un elemento que cumpla una condicion
  buscarElementoSiExiste(arrayElementos, propiedad, busqueda) {
    let existe = false;
    for (let elemento of arrayElementos) {
      if (elemento[propiedad] === busqueda) {
        existe = true;
        break;
      }
    }
    return existe;
  }

  //Devuelve el elemento del array que cumpla con una condicion
  traerElemento(arrayElementos, propiedad, busqueda) {
    let objeto = null;
    for (let elemento of arrayElementos) {
      if (elemento[propiedad] === busqueda) {
        objeto = elemento;
        break;
      }
    }

    return objeto;
  }
  //Devuelve la posición del primer elemento que cumpla con una condicion
  buscarPosicionEnArray(array, propiedad, busqueda) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][propiedad] === busqueda) {
        return i;
      }
    }
  }

  //Modificamos un censo
  modificarCenso(id, censo) {
    let posicionEncontrada = this.buscarPosicionEnArray(this.censos, "id", id);
    this.censos[posicionEncontrada] = censo;
  }

  //Devuelve un array con los elementos que cumplen con una condición
  buscarElementosPorCondicion(array, propiedad, busqueda) {
    let nuevoArray = [];
    for (let elemento of array) {
      if (elemento[propiedad] === busqueda) {
        nuevoArray.push(elemento);
      }
    }
    return nuevoArray;
  }

  //Devuelve un array con los elementos que no cumplen con una condición
  buscarElementosQueNoCumplenCondicion(array, propiedad, busqueda) {
    let nuevoArray = [];
    for (let elemento of array) {
      if (elemento[propiedad] !== busqueda) {
        nuevoArray.push(elemento);
      }
    }
    return nuevoArray;
  }

  //Devuelve un array con los elementos que cumplen dos condiciones la misma vez
  buscarElementosPorDobleCondicion(
    array,
    propiedad1,
    busqueda1,
    propiedad2,
    busqueda2
  ) {
    let nuevoArray = [];
    for (let elemento of array) {
      if (
        elemento[propiedad1] === busqueda1 &&
        elemento[propiedad2] === busqueda2
      ) {
        nuevoArray.push(elemento);
      }
    }
    return nuevoArray;
  }

  //Devuelve el array de departamento

  obtenerArrayDepartamentos() {
    return this.departamentos;
  }

  //Devuelve el array de censos
  obtenerArrayCensos() {
    return this.censos;
  }
  //Devuelve la cantidad de mayores de edad del departamento elegido, que ya estén censados
  contarMayoresPorDepartamento(departamento) {
    let nuevoArray = [];
    for (let censo of this.censos) {
      if (
        censo.departamento === departamento &&
        censo.edad >= 18 &&
        censo.censado === true
      ) {
        nuevoArray.push(censo);
      }
    }
    return nuevoArray.length;
  }

  //Devuelve la cantidad de menores de edad del departamento elegido, que ya estén censados
  contarMenoresPorDepartamento(departamento) {
    let nuevoArray = [];
    for (let censo of this.censos) {
      if (
        censo.departamento === departamento &&
        censo.edad < 18 &&
        censo.censado === true
      ) {
        nuevoArray.push(censo);
      }
    }
    return nuevoArray.length;
  }
  idAleatorio() {
    return Math.round(Math.random() * (this.censistas.length - 1) + 1);
  }

  //Elimina un censo
  eliminarCenso(id) {
    let PosicionEncontrada = this.buscarPosicionEnArray(this.censos, "id", id);
    this.censos.splice(PosicionEncontrada, 1);
  }

  validarContrasena(contrasena) {
    //Creo las variables a usar en la validación final
    let contrasenaValida = false;
    let tieneNumero = false;
    let tieneMinuscula = false;
    let tieneMayuscula = false;
    //Primero valido si tiene 5 o más caracteres, si no los tiene ya no tiene sentido seguir mirando lo demás (además lo hago sin iterar nada)
    if (contrasena.length >= 5) {
      //Recorro la contraseña, letra por letra
      for (let i = 0; i < contrasena.length; i++) {
        let letra = contrasena.charAt(i);
        //Busco si tiene una minúscula
        if (isNaN(Number(letra))) {
          if (letra === letra.toLowerCase()) {
            tieneMinuscula = true;
          }
          //Busco si tiene una mayúscula
          if (letra === letra.toUpperCase()) {
            tieneMayuscula = true;
          }
        } else {
          tieneNumero = true;
        }
      }
      //Si tiene un número, una minúscula y una mayúscula, es válida (ya habíamos visto la cantidad de caracteres)
      if (tieneNumero && tieneMinuscula && tieneMayuscula)
        contrasenaValida = true;
    }

    return contrasenaValida;
  }

  //Valida CI
  validarCI(ci) {
    let valida = false;
    ci = this.eliminarCaracter(ci, ".");
    ci = this.eliminarCaracter(ci, "-");
    if (ci.length === 7) {
      ci = "0" + ci;
    }

    let multiplicador = "2987634";

    let digitoVerificar = ci.charAt(ci.length - 1);
    let acumulador = 0;

    for (let i = 0; i < ci.length - 1; i++) {
      acumulador += Number(ci.charAt(i)) * Number(multiplicador.charAt(i));
    }
    let digitoVerificador = (10 - (acumulador % 10)) % 10;

    if (digitoVerificador === Number(digitoVerificar)) {
      valida = true;
    }
    return valida;
  }

  //Elimina un caracter de un texto
  eliminarCaracter(texto, letra) {
    let textoSustituido = "";
    for (let i = 0; i < texto.length; i++) {
      if (texto.charAt(i) !== letra) {
        textoSustituido += texto.charAt(i);
      }
    }
    return textoSustituido;
  }

  //Valida que el nombre solo contenga Letras y espacios
  validarNombre(nombre) {
    let nombreValido = true;
    for (let i = 0; i < nombre.length; i++) {
      let letra = nombre.charCodeAt(i);
      //65 a 90 Mayusculas
      //97 a 122 Minusculas
      //32 espacio
      if (
        (letra < 65 && letra !== 32) ||
        (letra > 90 && letra < 97) ||
        letra > 122
      ) {
        nombreValido = false;
        break;
      }
    }
    return nombreValido;
  }
}
