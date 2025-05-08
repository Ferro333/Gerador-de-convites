document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('invitationForm');
    const preview = document.getElementById('invitationPreview');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const eventName = document.getElementById('eventName').value;
        const eventDate = new Date(document.getElementById('eventDate').value);
        const eventLocation = document.getElementById('eventLocation').value;
        const hostName = document.getElementById('hostName').value;
        const guestName = document.getElementById('guestName').value;
        const theme = document.getElementById('theme').value;

        // Format date
        const formattedDate = eventDate.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Update preview
        document.getElementById('previewEventName').textContent = eventName;
        document.getElementById('previewDate').textContent = formattedDate;
        document.getElementById('previewLocation').textContent = `Local: ${eventLocation}`;
        document.getElementById('previewHost').textContent = `Anfitrião: ${hostName}`;
        document.getElementById('previewGuest').textContent = `Convidado: ${guestName}`;

        // Apply theme
        preview.className = `invitation-preview theme-${theme}`;

        // Show preview
        preview.classList.remove('hidden');
    });

    downloadBtn.addEventListener('click', async () => {
        try {
            const previewContent = document.querySelector('.preview-content');
            
            // Configure html2canvas options
            const options = {
                scale: 2, // Higher quality
                backgroundColor: null,
                logging: false,
                useCORS: true
            };

            // Capture the preview content
            const canvas = await html2canvas(previewContent, options);
            
            // Convert to image
            const image = canvas.toDataURL('image/png', 1.0);
            
            // Create and trigger download
            const link = document.createElement('a');
            link.download = `convite-${new Date().getTime()}.png`;
            link.href = image;
            link.click();
        } catch (error) {
            console.error('Erro ao gerar o convite:', error);
            alert('Ocorreu um erro ao gerar o convite. Por favor, tente novamente.');
        }
    });
}); 