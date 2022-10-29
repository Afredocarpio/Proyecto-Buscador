//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//contenedor de resultado
const resultado = document.querySelector('#resultado');

//mostrar el año actual
const max = new Date().getFullYear();
const min = max - 10;

//objeto de datosBusqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

//Eventos
document.addEventListener('DOMContentLoaded', () =>{
    
    // muestra los autos al cargar
    mostrarAuto(autos);

    //llena la opcion de años
    llenarSelect();

    
});

//eventos para los select de busqueda
marca.addEventListener('change', (e) =>{
    datosBusqueda.marca = e.target.value;

    filtrarAutos();

});

year.addEventListener('change', (e) =>{
    datosBusqueda.year = parseInt(e.target.value); // pasar de num a str
    filtrarAutos();
});

minimo.addEventListener('change', (e) =>{
    datosBusqueda.minimo = e.target.value;
    filtrarAutos();
});

maximo.addEventListener('change', (e) =>{
    datosBusqueda.maximo = e.target.value;
    filtrarAutos();
});

puertas.addEventListener('change', (e) =>{
    datosBusqueda.puertas = parseInt( e.target.value );
    filtrarAutos();
});

transmision.addEventListener('change', (e) =>{
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
});

color.addEventListener('change', (e) =>{
    datosBusqueda.color = e.target.value;
    filtrarAutos();
});



//Funciones
function mostrarAuto(autos) {
    limpiarHTML();// elimina el html previo y luego empieza a iterar

    //iteramos sobre el objeto
    autos.forEach( auto => {
        
        // destructuring para evitar el .x cosa en el muestreo  de la parte inferior
        const {marca, modelo, year, precio, puertas, color, transmision} = auto; 
        
        //creamos el elemento html
        const autoHTML = document.createElement('P');
        

        autoHTML.textContent = `
            ${marca} ${modelo} - Año ( ${year} )- Precio: ${precio} - Puertas: ${puertas} - ${color} - ${transmision}
            
        `;

        //mostramos el elemento en el html
        // no borra el contenido previo por eso hay que limpiar el html
        resultado.appendChild(autoHTML);

    });
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


function llenarSelect() {
    // el for corre hacia atras 10 años
    for(let i = max; i > min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        year.appendChild(option);

        //el codigo muestra las fechas en el html
    }
}

// funcion que filtra en base a ala busqueda
function filtrarAutos(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter(filtrarTransmision).filter(filtrarColor)// funcion de alto nivel

    

    if (resultado.length){
        mostrarAuto(resultado);
    }else {
        noResultado();
    }
}

function noResultado(){
    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados, intente con otros terminos de busqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    // mantiene la referencia de los valores originales
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === year;
    }
    // mantiene la referencia de los valores originales
    return auto;
}

function filtrarMinimo(auto){
    const {minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    // mantiene la referencia de los valores originales
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if( transmision) {
        return auto.transmision === transmision;
    }
    // mantiene la referencia de los valores originales
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if( color) {
        return auto.color === color;
    }
    // mantiene la referencia de los valores originales
    return auto;
}

