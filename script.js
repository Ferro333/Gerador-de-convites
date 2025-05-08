document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('invitationForm');
    const preview = document.getElementById('invitationPreview');
    const downloadBtn = document.getElementById('downloadBtn');
    let coverImageData = '';

    // Preview da imagem de capa
    const coverInput = document.getElementById('coverImage');
    if (coverInput) {
        coverInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(evt) {
                    coverImageData = evt.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                coverImageData = '';
            }
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Dados do formulário
        const eventName = form.eventName.value;
        const eventStart = form.eventStart.value;
        const eventEnd = form.eventEnd.value;
        const eventType = form.eventType.value;
        const eventLocation = form.eventLocation.value;
        const eventDescription = form.eventDescription.value;
        const mainColor = form.mainColor.value;
        const theme = form.theme.value;
        const style = form.style.value;
        const contactName = form.contactName.value;
        const contactEmail = form.contactEmail.value;
        const contactPhone = form.contactPhone.value;

        // Formatação de datas
        const startDate = eventStart ? new Date(eventStart).toLocaleDateString('pt-BR') : '';
        const endDate = eventEnd ? new Date(eventEnd).toLocaleDateString('pt-BR') : '';

        // Ícone do tema
        const themeIcons = {
            aniversario: 'https://img.icons8.com/color/96/party-balloons.png',
            infantil: 'https://img.icons8.com/color/96/birthday-cake.png',
            formatura: 'https://img.icons8.com/color/96/graduation-cap.png',
            casamento: 'https://img.icons8.com/color/96/wedding.png',
            'cha-bebe': 'https://img.icons8.com/color/96/baby-bottle.png',
            'cha-panela': 'https://img.icons8.com/color/96/teapot.png',
            carnaval: 'https://img.icons8.com/color/96/confetti.png',
            pascoa: 'https://img.icons8.com/color/96/easter-egg.png',
            'sao-joao': 'https://img.icons8.com/color/96/firework-rocket.png',
            halloween: 'https://img.icons8.com/color/96/halloween.png',
            natal: 'https://img.icons8.com/color/96/christmas-star.png',
            outro: 'https://img.icons8.com/color/96/question-mark.png',
        };

        // Monta o HTML do preview
        preview.innerHTML = `
            <div class="convite-preview-box ${style}" style="--main-color: ${mainColor};">
                ${coverImageData ? `<div class="convite-capa"><img src="${coverImageData}" alt="Capa do evento"></div>` : ''}
                <div class="convite-theme-icon"><img src="${themeIcons[theme]}" alt="Tema"></div>
                <h2 class="convite-title">${eventName || 'Seu Evento'}</h2>
                <div class="convite-info">
                    <span><i class="fa-regular fa-calendar"></i> ${startDate}${endDate ? ' a ' + endDate : ''}</span>
                    <span><i class="fa-solid fa-location-dot"></i> ${eventLocation || (eventType === 'Online' ? 'Online' : 'Local a definir')}</span>
                    <span><i class="fa-solid fa-user"></i> ${contactName}</span>
                </div>
                <div class="convite-desc">${eventDescription ? eventDescription : ''}</div>
                <div class="convite-footer">
                    <span>${contactEmail ? `<i class='fa-solid fa-envelope'></i> ${contactEmail}` : ''}</span>
                    <span>${contactPhone ? `<i class='fa-solid fa-phone'></i> ${contactPhone}` : ''}</span>
                </div>
            </div>
        `;
        preview.classList.remove('hidden');
        if (downloadBtn) downloadBtn.style.display = 'block';
    });

    // Download do convite como imagem
    if (downloadBtn) {
        downloadBtn.addEventListener('click', async () => {
            const conviteBox = preview.querySelector('.convite-preview-box');
            if (!conviteBox) return;
            downloadBtn.classList.add('loading');
            try {
                const canvas = await html2canvas(conviteBox, { backgroundColor: null, scale: 2 });
                const image = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.download = 'convite.png';
                link.href = image;
                link.click();
            } catch (err) {
                alert('Erro ao gerar a imagem do convite.');
            }
            downloadBtn.classList.remove('loading');
        });
    }
}); 