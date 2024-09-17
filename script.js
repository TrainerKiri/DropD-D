document.getElementById('formLoot').addEventListener('submit', function(event) {
    event.preventDefault();

    const nivel = parseInt(document.getElementById('nivel').value);
    const dificuldade = document.getElementById('dificuldade').value;
    const resultadoDado = rolarDado(dificuldade);

    document.getElementById('resultadoDado').innerText = `Resultado do dado: ${resultadoDado}`;
    
    const loot = calcularLoot(nivel, dificuldade, resultadoDado);
    document.getElementById('resultadoLoot').innerText = loot;
});

function rolarDado(dificuldade) {
    let maxValor = 0;
    if (dificuldade === 'dificil') {
        maxValor = 4;  // D4
    } else if (dificuldade === 'medio') {
        maxValor = 6;  // D6
    } else if (dificuldade === 'facil') {
        maxValor = 8;  // D8
    }

    return Math.floor(Math.random() * maxValor) + 1;
}

function calcularLoot(nivel, dificuldade, resultado) {
    let loot = '';
    
    if (dificuldade === 'dificil') {
        switch (resultado) {
            case 1:
                loot = nivel * 20 + ' ouro';
                break;
            case 2:
                loot = nivel * 40 + ' ouro';
                break;
            case 3:
                loot = 'Consumível Maior';
                break;
            case 4:
                loot = 'Item Mágico';
                break;
            default:
                loot = 'Resultado inválido';
        }
    } else if (dificuldade === 'medio') {
        switch (resultado) {
            case 1:
                loot = nivel * 10 + ' ouro';
                break;
            case 2:
                loot = nivel * 20 + ' ouro';
                break;
            case 3:
                loot = nivel * 30 + ' ouro';
                break;
            case 4:
                loot = 'Consumível Menor';
                break;
            case 5:
                loot = 'Consumível Maior';
                break;
            case 6:
                loot = 'Item Mágico';
                break;
            default:
                loot = 'Resultado invalio';
        }
    } else if (dificuldade === 'facil') {
        switch (resultado) {
            case 1:
                loot = nivel * 5 + ' ouro';
                break;
            case 2:
                loot = nivel * 10 + ' ouro';
                break;
            case 3:
                loot = nivel * 15 + ' ouro';
                break;
            case 4:
                loot = nivel * 20 + ' ouro';
                break;
            case 5:
                loot = 'Consumível Menor';
                break;
            case 6:
                loot = 'Consumível Menor';
                break;
            case 7:
                loot = 'Consumível Maior';
                break;
            case 8:
                loot = 'Item Mágico';
                break;
            default:
                loot = 'Invalida';
        }
    } else {
        loot = 'Dificuldade desconhecida.';
    }

    return loot;
}
