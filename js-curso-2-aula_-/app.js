let listaNumeroSorteado = [];
let numeroLimite = 50;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function ExibirChuteNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function mensagemInicial() {
    ExibirChuteNaTela('h1', 'Jogo do número secreto');
    ExibirChuteNaTela('p', 'Descubra o número secreto que está entre 1 e 100');
}

mensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto) {
        ExibirChuteNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`; 
        ExibirChuteNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            ExibirChuteNaTela('p', 'O número secreto é menor');
        } else {
            ExibirChuteNaTela('p', 'O número secreto é maior');
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido =  parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaNumeroSorteado.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaNumeroSorteado = [];
    }

    if (listaNumeroSorteado.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumeroSorteado.push(numeroEscolhido);
        console.log(listaNumeroSorteado);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}