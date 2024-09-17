let listaRegistros = {
    ultimoIdGerado: 0,
    usuarios: []
};

const KEY_BD = "@usuarioestudo";

function openModal() {
    document.getElementById("modal-container").classList.add("mostrar");
}

function gravarBD() {
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros));
}

function lerBD() {
    const data = localStorage.getItem(KEY_BD);
    if (data) {
        listaRegistros = JSON.parse(data);
    }
    render();
}

function editar(index) {
    const usuario = listaRegistros.usuarios[index];
    if (usuario) {
        document.getElementById('editTextUsuario').value = usuario.textUsuario;
        document.getElementById('editNumber').value = Math.abs(usuario.number); // Ajustar valor absoluto para edição
        document.querySelector(`input[name=radio][value=${usuario.number >= 0 ? 'entrada' : 'saida'}]`).checked = true;
        document.getElementById('editDate').value = usuario.date;
        document.getElementById('indexEditando').value = index;
        document.getElementById('modal-container2').classList.add('mostrar');
    }
}

function render() {
    const tbody = document.getElementById("listaRegistrosBody");
    if (tbody) {
        tbody.innerHTML = listaRegistros.usuarios.map((usuario, index) => {
            const numero = parseFloat(usuario.number);
            const estilo = numero < 0 ? 'style="color: red;"' : 'style="color: green;"';
            const numeroFormatado = numero >= 0 ? `+R$${Math.abs(numero).toFixed(2)}` : `-R$${Math.abs(numero).toFixed(2)}`;

            return `
            <tr>
                <td>${usuario.textUsuario}</td>
                <td ${estilo}>${numeroFormatado}</td>
                <td>${usuario.date}</td>
                <td><img onclick="editar(${index})" src="../img/editar.png" alt="Editar"></td>
                <td><svg onclick="deletar(${index})" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2Z" stroke="#E83F5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7.57143 15.0713C6.97969 15.0713 6.5 14.5916 6.5 13.9999V13.9999C6.5 13.4082 6.97969 12.9285 7.57143 12.9285L20.4286 12.9285C21.0203 12.9285 21.5 13.4082 21.5 13.9999V13.9999C21.5 14.5916 21.0203 15.0713 20.4286 15.0713L7.57143 15.0713Z" fill="#E83F5B"/>
                    </svg></td>
            </tr>`;
        }).join("");

        calcular();
    }
}

function calcular() {
    let entrada = 0;
    let saida = 0;
    let total = 0;

    listaRegistros.usuarios.forEach(usuario => {
        const numero = parseFloat(usuario.number);
        if (numero >= 0) {
            entrada += numero;
        } else {
            saida += Math.abs(numero);
        }
    });

    total = entrada - saida;

    if (total < 0) {
        document.getElementById("boxred").style.backgroundColor = 'red';
        document.getElementById("total").style.color = 'white';
        document.getElementById("total2").style.color = 'white';
    } else if (total > 0) {
        document.getElementById("boxred").style.backgroundColor = 'green';
        document.getElementById("total").style.color = 'white';
        document.getElementById("total2").style.color = 'white';
    } else {
        document.getElementById("boxred").style.backgroundColor = 'white';
        document.getElementById("total").style.color = 'black';
        document.getElementById("total2").style.color = 'black';
    }

    document.getElementById("entrada").textContent = `+R$${entrada.toFixed(2)}`;
    document.getElementById("saida").textContent = `-R$${saida.toFixed(2)}`;
    document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
    document.getElementById("entrada").style.color = 'green';
    document.getElementById("saida").style.color = 'red';
}

function insertUsuario(textUsuario, number, date, valores) {
    let valor = parseFloat(number);
    valor = valores === 'entrada' ? valor : -valor;

    listaRegistros.ultimoIdGerado++;
    listaRegistros.usuarios.push({ textUsuario, number: valor, date, valores });

    limparEdicao();
    gravarBD();
    render();

    document.getElementById("modal-container").classList.remove("mostrar");
}

function salvarEdicao() {
    const index = parseInt(document.getElementById('indexEditando').value, 10);

    if (!isNaN(index)) {
        listaRegistros.usuarios[index] = {
            textUsuario: document.getElementById('editTextUsuario').value,
            number: (document.querySelector('input[name=radio]:checked').value === 'entrada' ? 
                    parseFloat(document.getElementById('editNumber').value) : 
                    -parseFloat(document.getElementById('editNumber').value)),
            valores: document.querySelector('input[name=radio]:checked').value,
            date: document.getElementById('editDate').value
        };

        limparEdicao();
        gravarBD();
        render();

        document.getElementById('modal-container2').classList.remove('mostrar');
    }
}

function deletar(index) {
    Swal.fire({
        title: "Você tem certeza?",
        text: "Não será possível reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, remover!"
    }).then((result) => {
        if (result.isConfirmed) {
            listaRegistros.usuarios.splice(index, 1);

            Swal.fire({
                title: "Removido!",
                text: "Sua transação foi removida",
                icon: "success"
            });
            gravarBD();
            render();
        }
    });
}

function limparEdicao() {
    document.getElementById("textUsuario").value = '';
    document.getElementById("number").value = '';
    document.getElementById("date").value = '';

    document.getElementById("editTextUsuario").value = "";
    document.getElementById("editNumber").value = "";
    document.querySelector('input[name=radio][value="entrada"]').checked = false;
    document.querySelector('input[name=radio][value="saida"]').checked = false;
    document.getElementById("editDate").value = "";
}

window.addEventListener('load', () => {
    lerBD();

    document.getElementById("save-modal").addEventListener("click", (e) => {
        e.preventDefault();

        const textUsuario = document.getElementById('textUsuario').value;
        const number = document.getElementById('number').value;
        const valores = document.querySelector('input[name=radio]:checked').value;
        const date = document.getElementById('date').value;

        if (textUsuario && number && date && valores) {
            insertUsuario(textUsuario, number, date, valores);
        }
    });

    document.getElementById("btnSalvarEdicao").addEventListener("click", (e) => {
        e.preventDefault();
        salvarEdicao();
    });

    document.getElementById("close-modal").addEventListener("click", () => {
        document.getElementById("modal-container").classList.remove("mostrar");
    });

    document.getElementById("close-modal2").addEventListener("click", () => {
        document.getElementById("modal-container2").classList.remove("mostrar");
    });
});

document.querySelectorAll('input[name="radio"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        const numberInput = document.getElementById('number');
        let valorAtual = parseFloat(numberInput.value) || 0; // Obter o valor atual ou 0 se vazio

        if (e.target.value === 'entrada') {
            // Se for entrada, o valor deve ser positivo
            numberInput.value = Math.abs(valorAtual);
        } else if (e.target.value === 'saida') {
            // Se for saída, o valor deve ser negativo
            numberInput.value = -Math.abs(valorAtual);
        }
    });
});
