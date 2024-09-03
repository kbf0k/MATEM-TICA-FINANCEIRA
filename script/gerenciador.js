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

function openAlert() {
    alert("TEM CERTEZA DISSO?")
}

// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO// CADASTRAR TRANSAÇÃO

var listaRegistros = {
    ultimoIdGerado: 0,
    usuarios: [
        { textUsuario: "Casa", number: "12122", date: "2024-09-02" },
        { textUsuario: "Trabalho", number: "2122", date: "2024-09-03" },
        { textUsuario: "Financeiro", number: "32122", date: "2024-09-04" }
    ]
}

function render() {
    const tbody = document.getElementById("listaRegistrosBody")
    if (tbody) {
        tbody.innerHTML = listaRegistros.usuarios.map(usuarios => {
            return `
            <tr>
                <td>${usuarios.textUsuario}</td>
                <td>R$${usuarios.number}</td>
                <td>${usuarios.date}</td>
                <td><img onclick="openModal2()" src="../img/editar.png" alt=""></td>
                <td><svg onclick="openAlert()" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2Z" stroke="#E83F5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.57143 15.0713C6.97969 15.0713 6.5 14.5916 6.5 13.9999V13.9999C6.5 13.4082 6.97969 12.9285 7.57143 12.9285L20.4286 12.9285C21.0203 12.9285 21.5 13.4082 21.5 13.9999V13.9999C21.5 14.5916 21.0203 15.0713 20.4286 15.0713L7.57143 15.0713Z" fill="#E83F5B"/>
</svg>
                </tr>`

        }).join('')
    }
}

function insertUsuario(textUsuario, number, date) {
    listaRegistros.ultimoIdGerado++;
    listaRegistros.usuarios.push({ textUsuario, number, date });
}

function submeter(e) {
    e.preventDefault()
    const data = {
        textUsuario: document.getElementById('textUsuario').value,
        number: document.getElementById('number').value,
        date: document.getElementById('date').value,
    };
    insertUsuario(data.textUsuario, data.number, data.date);
    render();
    document.getElementById('modal-container').classList.remove('mostrar');
}


window.addEventListener('load', () => {
    render()
    document.getElementById('modal-container').addEventListener('submit', submeter)
})