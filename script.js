document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('review-form');
    const ratingInput = document.getElementById('rating');
    const stars = [...document.querySelectorAll('.star-button')];
    const toast = document.getElementById('toast');
    const fileInput = document.getElementById('photo');
    const fileName = document.getElementById('file-name');

    const showToast = (message) => {
        toast.textContent = message;
        toast.classList.add('show');
        window.setTimeout(() => toast.classList.remove('show'), 4200);
    };

    const setRating = (value) => {
        ratingInput.value = value;
        stars.forEach((star) => star.classList.toggle('active', Number(star.dataset.rating) <= value));
    };

    stars.forEach((star) => {
        star.addEventListener('click', () => setRating(Number(star.dataset.rating)));
    });

    fileInput.addEventListener('change', () => {
        const [file] = fileInput.files;
        if (file) fileName.textContent = file.name;
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (Number(ratingInput.value) === 0) {
            showToast('Elige una cantidad de estrellas para continuar.');
            return;
        }
        showToast('¡Gracias por compartir! Tu cupón KALEA10 está listo.');
        form.reset();
        setRating(0);
        fileName.textContent = 'Agrega una foto de tu casita';
    });

    document.getElementById('share-button').addEventListener('click', async () => {
        const shareData = { title: 'Villa Kalea', text: 'Mira las casitas de Villa Kalea', url: window.location.href };
        if (navigator.share) {
            await navigator.share(shareData);
            return;
        }
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(window.location.href);
            showToast('Enlace copiado para compartir Villa Kalea.');
            return;
        }
        showToast('Copia el enlace de esta página para compartir Villa Kalea.');
    });

    document.getElementById('load-more').addEventListener('click', () => {
        showToast('Muy pronto podrás descubrir todas las casitas de la villa.');
    });
});
