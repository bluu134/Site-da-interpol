const btnAcessar  = document.getElementById('btnAcessar');
const provaDiv    = document.getElementById('provaDiv');
const audio       = document.getElementById('audioProva');
const input       = document.getElementById('resposta');
const btnResponder = document.getElementById('btnResponder');
const resultado   = document.getElementById('resultado');
const btnVideo    = document.getElementById('btnVideo');

// Clique no botão principal para acessar a prova
btnAcessar.addEventListener('click', () => {
    provaDiv.style.display = 'block';
    btnAcessar.style.display = 'none';

    // Toca o áudio
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Erro ao tocar:", err));

    setTimeout(() => {
        provaDiv.scrollIntoView({ behavior: 'smooth', block: 'start' });
        input.focus();
    }, 300);
});

// Clique em "ENVIAR RESPOSTA"
btnResponder.addEventListener('click', () => {
    const resposta = input.value.toLowerCase().trim();
    const imagemDiv = document.getElementById('imagemCerta');

    if (resposta.includes('farinha')) {
        resultado.innerHTML = `✅ PARABÉNS! Você foi aprovado na Interpol!<br>
                              <span style="font-size:18px;">O segredo era: FEIJÃO COM FARINHA</span>`;
        resultado.style.color = '#0f0';
        input.style.display = 'none';
        btnResponder.style.display = 'none';
        
        if (btnVideo) btnVideo.style.display = 'inline-block';

        imagemDiv.innerHTML = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgNv7MSVa7NzQxsD8yyVV_79B_BRg-dj_Ag&s" alt="Aprovado">';
    } else {
        resultado.innerHTML = `❌ Resposta errada... mas mesmo assim você ouviu o áudio secreto.<br>
                              O correto era: FEIJÃO COM FARINHA`;
        resultado.style.color = '#ff0';
        imagemDiv.innerHTML = '';
        
        // Toca o áudio novamente no erro se desejar
        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));
    }
});

// Atalho tecla Enter
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnResponder.click();
});

// Botão do vídeo secreto
btnVideo.addEventListener('click', () => {
    window.open('https://www.tiktok.com/@entrevistandolendas/video/7395525031113035014', '_blank');
});

