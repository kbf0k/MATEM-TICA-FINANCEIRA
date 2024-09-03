function openModal() {
    const modal = document.getElementById('modal-container')
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == "modal-container" || e.target.id == "close-modal") {
            modal.classList.remove('mostrar')
        }
    })
}

function openModal2() {
    const modal = document.getElementById('modal-container2')
    modal.classList.add('mostrar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == "modal-container2" || e.target.id == "close-modal") {
            modal.classList.remove('mostrar')
        }
    })
}

var listaRegistros = {
    ultimoIdGerado: 0, 
    usuarios: [
        {textUsuario:"Casa", number: "R$52122", date:"02/09/24"},
        {textUsuario:"Trabalho", number: "R$2122", date:"03/09/24" },
        {textUsuario:"Financeiro", number: "R$32122", date:"04/09/24" }
    ]
}

function render() {
    const tbody = document.getElementById("listaRegistrosBody")
    if (tbody) {
        tbody.innerHTML = listaRegistros.usuarios.map(usuarios => {
            return `
            <tr>
                <td>${usuarios.textUsuario}</td>
                <td>${usuarios.number}</td>
                <td>${usuarios.date}</td>
                <td><img onclick="openModal2()" src="../img/editar.png" alt=""></td>
            </tr>`

        }).join('')
    }
}

function insertUsuario(textUsuario, number, date) {
    listaRegistros.ultimoIdGerado++;
    listaRegistros.usuarios.push({ textUsuario, number, date });
}

function submeter(e){
    e.preventDefault()
    const data = {
         textUsuario: document.getElementById('textUsuario').value,
         number: document.getElementById('number').value,
         date: document.getElementById('date').value,
    }
    insertUsuario(render());
    document.getElementById('modal-container').classList.remove('mostrar');
}


window.addEventListener('load', () =>{
    render()
    document.getElementById('modal-container').addEventListener('submit', submeter)
})