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
        let mensaje = {
            author: {
                email: document.getElementById('userChat').value,
                nombre: document.getElementById('userName').value,
                apellido: document.getElementById('userLastName').value,
                edad: document.getElementById('userAge').value,
                alias: document.getElementById('userAlias').value,
                avatar: document.getElementById('userAvatar').value
            },
            text: document.getElementById('messageChat').value,
        }
        socket.emit('new-message', mensaje);
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
        <img src="${elem.author.avatar}" alt="avatar" style="width:8%"/>
        <strong style="color:blue">${elem.author.email}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.text}</i></div>`)
    }).join(' ');
    document.getElementById('pantalla').innerHTML = msgs
}

socket.on('new-message-server', (data) => {
    renderMessage(data)
})

const schemaAuthor = new normalizr.schema.Entity('author', {}, { idAttribute: 'id' });
    const schemaMensaje = new normalizr.schema.Entity('mensaje', {
        author: schemaAuthor
    }, { idAttribute: '_id' })
    const schemaMensajes = new normalizr.schema.Entity('mensajes', {
        mensajes: [schemaMensaje]
    }, { idAttribute: 'id' })

    const msgDesnormalized = normalizr.denormalize(msgNormalized.result, schemaMensajes, msgNormalized.entities)

    const msgDesnormalizedLength = JSON.stringify(msgDesnormalized).length

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