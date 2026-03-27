const btnAcessar  = document.getElementById('btnAcessar');
const provaDiv    = document.getElementById('provaDiv');
const audio       = document.getElementById('audioProva');
const input       = document.getElementById('resposta');
const btnResponder = document.getElementById('btnResponder');
const resultado   = document.getElementById('resultado');
const btnVideo    = document.getElementById('btnVideo');     // ← ESSA LINHA ESTAVA FALTANDO

// Clique no botão principal
btnAcessar.addEventListener('click', () => {                  // ← corrigido o nome
    provaDiv.style.display = 'block';
    btnAcessar.style.display = 'none';

    audio.currentTime = 0;
    audio.play();

    // Scroll suave até o topo da prova + pequeno delay pro input focar
    setTimeout(() => {
        provaDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
        });
        
        input.focus();
    }, 300);
});

// Clique em "ENVIAR RESPOSTA"
btnResponder.addEventListener('click', () => {
    const resposta = input.value.toLowerCase().trim();

    audio.currentTime = 0;
    audio.play();

    const imagemDiv = document.getElementById('imagemCerta');

    if (resposta.includes('farinha')) {
        resultado.innerHTML = `✅ PARABÉNS! Você foi aprovado na Interpol!<br>
                              <span style="font-size:18px;">O segredo era: FEIJÃO COM FARINHA</span>`;
        resultado.style.color = '#0f0';

        // Esconde input e botão de responder
        input.style.display = 'none';
        btnResponder.style.display = 'none';
        
        // Mostra botão do vídeo (só funciona se o botão existir no HTML)
        if (btnVideo) {
            btnVideo.style.display = 'inline-block';
        }

        // Mostra a imagem
        imagemDiv.innerHTML = '<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIgNv7MSVa7NzQxsD8yyVV_79B_BRg-dj_Ag&s" alt="Aprovado">';
    } else {
        resultado.innerHTML = `❌ Resposta errada... mas mesmo assim você ouviu o áudio secreto.<br>
                              O correto era: FEIJÃO COM FARINHA`;
        resultado.style.color = '#ff0';

        imagemDiv.innerHTML = '';
    }
});

// Permite apertar Enter no input
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') btnResponder.click();
});
btnVideo.addEventListener('click', () => {
    window.open('https://www.tiktok.com/@entrevistandolendas/video/7395525031113035014', '_blank');
    // ou window.location.href = '...' se quiser na mesma aba
});