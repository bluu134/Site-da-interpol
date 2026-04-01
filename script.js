const btnAcessar = document.getElementById('btnAcessar');
const provaDiv = document.getElementById('provaDiv');
const audio = document.getElementById('audioProva');
const input = document.getElementById('resposta');
const btnResponder = document.getElementById('btnResponder');
const resultado = document.getElementById('resultado');
const btnVideo = document.getElementById('btnVideo');
const btnOuvirAudio = document.getElementById('btnOuvirAudio');

// 1. Acessar a prova
btnAcessar.addEventListener('click', () => {
    provaDiv.style.display = 'block';
    btnAcessar.style.display = 'none';
    setTimeout(() => {
        provaDiv.scrollIntoView({ behavior: 'smooth' });
        input.focus();
    }, 300);
});

// 2. Verificar Resposta
btnResponder.addEventListener('click', () => {
    const resposta = input.value.toLowerCase().trim();
    const imagemDiv = document.getElementById('imagemCerta');

    if (resposta.includes('farinha')) {
        resultado.innerHTML = `✅ APROVADO!<br>O segredo era: FEIJÃO COM FARINHA`;
        resultado.style.color = '#0f0';
       
        // Esconde campos de entrada
        input.style.display = 'none';
        btnResponder.style.display = 'none';
        
        // Mostra os botões de prêmio
        btnVideo.style.display = 'inline-block';
        btnOuvirAudio.style.display = 'inline-block';
        
        imagemDiv.innerHTML = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgNv7MSVa7NzQxsD8yyVV_79B_BRg-dj_Ag&s">';
    } else {
        resultado.innerHTML = `❌ Errado. Tente novamente!`;
        resultado.style.color = '#ff0';
    }
});

// 3. Lógica do Áudio com trava de segurança
btnOuvirAudio.addEventListener('click', () => {
    // Verifica se o áudio está tocando no momento
    if (!audio.paused && !audio.ended && audio.currentTime > 0) {
        alert("👮‍♂️ O áudio confidencial já está em execução. Aguarde.");
        return;
    }
    // Se estiver parado ou terminou, reinicia e toca
    audio.currentTime = 0;
    audio.play().catch(e => {
        console.log("Erro ao tocar áudio:", e);
        alert("Erro ao carregar som. Verifique o arquivo no GitHub.");
    });
});

// Botão de Vídeo
btnVideo.addEventListener('click', () => {
    window.open('https://vt.tiktok.com/ZSH1KgdBf/', '_blank');
});

// Enter para responder
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnResponder.click();
});

// ==================== NOVA FUNÇÃO: Crédito no final ====================
function adicionarCredito() {
    const credito = document.createElement('p');
    credito.id = 'creditoAutor';
    credito.innerHTML = 'feito por: <strong>Luis Henrique Hammel</strong>';
    credito.style.cssText = `
        text-align: center;
        margin-top: 30px;
        color: #888;
        font-size: 14px;
        font-style: italic;
    `;

    // Encontra o elemento que contém o texto de atenção
    const atencao = document.querySelector('p strong') || 
                    Array.from(document.querySelectorAll('p')).find(p => 
                        p.textContent.includes('Atenção') || 
                        p.textContent.includes('atenção')
                    );

    if (atencao && atencao.parentElement) {
        // Insere logo abaixo da mensagem de atenção
        atencao.parentElement.appendChild(credito);
    } else {
        // Fallback: adiciona no final da provaDiv
        provaDiv.appendChild(credito);
    }
}

// Executa quando a página carregar
window.addEventListener('load', adicionarCredito);
