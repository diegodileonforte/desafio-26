const socket = io.connect()

const pantalla = document.getElementById('pantalla')
const botonChat = document.getElementById('btnChat')
botonChat.addEventListener('click', () => { validar() })

function validar() {
    const user = document.getElementById('userChat').value
    const mensaje = document.getElementById('messageChat').value
    if (mensaje === "" || user === "") {
        alert(`Compconstar todos los campos`)
    } else {
        const nuevoMensaje = {
            user: document.getElementById('userChat').value,
            mensaje: document.getElementById('messageChat').value
        }
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('messageChat').value = ""
    }
}


const date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':')


function renderMessage(data) {
    const msgs = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = msgs
}

socket.on('new-message-server', (data) => {
    renderMessage(data)
})


document.getElementById('btnForm').addEventListener('click', () => { validarForm() })

function validarForm() {
    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const thumbnail = document.getElementById('thumbnail').value
    if (title === "" || price === "" || thumbnail === "") {
        alert(`CAMPOS REQUERIDOS PARA AGREGAR PRODUCTO`)
    } else {
        const newProd = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value
        };
        socket.emit('new-producto', newProd)
        
        document.getElementById('title').value = ""
        document.getElementById('price').value = ""
        document.getElementById('thumbnail').value = ""
    }
}


const fragment = document.createDocumentFragment()
const tabla = document.getElementById('tableProd')
const template = document.getElementById('templateList').content

document.addEventListener('DOMContentLoaded', e => { fetchData() })

const fetchData = async () => {
    const res = await fetch('http://localhost:8080/api/productos')
    const data = await res.json();
    console.log(data)
    verProdHtml(data);
};

const verProdHtml = data => {
    data.forEach(producto => {

        template.getElementById('prodTitle').textContent = producto.title
        template.getElementById('prodPrice').textContent = producto.price
        template.getElementById('prodImg').setAttribute("src", producto.thumbnail)

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });
    tabla.appendChild(fragment)
};


socket.on('new-prod-server', async data => {
    const array = [] 
    array.push(await data)
    verProdHtml(array)
    
})