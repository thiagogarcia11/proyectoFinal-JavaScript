class Censista {
  constructor(id, nombre, usuario, contrasena) {
    this.id = id;
    this.nombre = nombre;
    this.usuario = usuario;
    this.contrasena = contrasena;
  }
}

class Censo {
  constructor(
    id,
    nombreCompleto,
    edad,
    cedula,
    departamento,
    ocupacion,
    idCensista,
    censado
  ) {
    this.id = id;
    this.nombre = nombreCompleto;
    this.edad = edad;
    this.cedula = cedula;
    this.departamento = departamento;
    this.ocupacion = ocupacion;
    this.idCensista = idCensista;
    this.censado = censado;
  }
}

class Departamento {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}
