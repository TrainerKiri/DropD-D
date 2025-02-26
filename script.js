let atendimentos = {
    realizados: new Set(),
    agendados: new Set(),
    cancelados: new Set()
};

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function salvarAtendimentos() {
    setCookie('atendimentos', JSON.stringify(atendimentos), 7);
}

function carregarAtendimentos() {
    const atendimentosCookie = getCookie('atendimentos');
    if (atendimentosCookie) {
        atendimentos = JSON.parse(atendimentosCookie);
    }
}

function formatarLista(lista) {
    return lista.map(protocolo => `• ${protocolo}`).join('<br>') || 'Nenhum';
}

function atualizarLista() {
    const listaDiv = document.getElementById('listaAtendimentos');
    const realizados = formatarLista(Array.from(atendimentos.realizados));
    const agendados = formatarLista(Array.from(atendimentos.agendados));
    const cancelados = formatarLista(Array.from(atendimentos.cancelados));

    const realizadosSemAgendamento = formatarLista(Array.from(atendimentos.realizados).filter(protocolo => 
        !atendimentos.agendados.has(protocolo)
    ));

    listaDiv.innerHTML = `
        <h3>Atendimentos Realizados:</h3>${realizados}
        <h3>Atendimentos Agendados:</h3>${agendados}
        <h3>Atendimentos Cancelados:</h3>${cancelados}
        <h3>Atendimentos Realizados sem Agendamento:</h3>${realizadosSemAgendamento}
    `;
}

function adicionarAtendimento(tipo, protocolo) {
    const protocolos = protocolo.split('/').map(p => p.trim());
    protocolos.forEach(p => {
        if (tipo === 'realizado') {
            atendimentos.realizados.add(p);
        } else if (tipo === 'agendado') {
            atendimentos.agendados.add(p);
        } else if (tipo === 'cancelado') {
            atendimentos.cancelados.add(p);
        }
    });
    salvarAtendimentos();
    atualizarLista();
}

function mostrarNotificacao(mensagem) {
    const notificacaoDiv = document.getElementById('notificacao');
    notificacaoDiv.innerText = mensagem;
    notificacaoDiv.style.opacity = '1';
    setTimeout(() => {
        notificacaoDiv.style.opacity = '0';
    }, 3000);
}

function verificarCancelado(protocolo) {
    let mensagens = [];
    let status = [];
    if (atendimentos.cancelados.has(protocolo)) {
        status.push('cancelado');
    }
    if (atendimentos.realizados.has(protocolo)) {
        status.push('realizado');
    }
    if (atendimentos.agendados.has(protocolo)) {
        status.push('agendado');
    }
    if (status.length > 0) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} está ${status.join(' e ')}.`);
    }
    if (atendimentos.realizados.has(protocolo) && !atendimentos.agendados.has(protocolo)) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} foi realizado sem agendamento.`);
    }
    if (status.length === 0) {
        mensagens.push(`O atendimento com o protocolo ${protocolo} não foi encontrado.`);
    }
    mostrarNotificacao(mensagens.join(' '));
}

document.getElementById('adicionarRealizado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloRealizado').value;
    if (protocolo) {
        adicionarAtendimento('realizado', protocolo);
        mostrarNotificacao(`Atendimento realizado adicionado: ${protocolo}`);
        document.getElementById('protocoloRealizado').value = '';
    }
});

document.getElementById('adicionarAgendado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloAgendado').value;
    if (protocolo) {
        adicionarAtendimento('agendado', protocolo);
        mostrarNotificacao(`Atendimento agendado adicionado: ${protocolo}`);
        document.getElementById('protocoloAgendado').value = '';
    }
});

document.getElementById('adicionarCancelado').addEventListener('click', () => {
    const protocolo = document.getElementById('protocoloCancelado').value;
    if (protocolo) {
        adicionarAtendimento('cancelado', protocolo);
        mostrarNotificacao(`Atendimento cancelado adicionado: ${protocolo}`);
        document.getElementById('protocoloCancelado').value = '';
    }
});

document.getElementById('verificar').addEventListener('click', () => {
    const protocolo = document.getElementById('protocolo').value;
    verificarCancelado(protocolo);
});

document.getElementById('limpar').addEventListener('click', () => {
    atendimentos = {
        realizados: new Set(),
        agendados: new Set(),
        cancelados: new Set()
    };
    salvarAtendimentos();
    atualizarLista();
    mostrarNotificacao('Todos os atendimentos foram limpos.');
});

document.getElementById('listar').addEventListener('click', atualizarLista);

carregarAtendimentos();
atualizarLista();
