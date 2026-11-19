export function initContactForm() {
    const setupFeedbackForm = () => {
        const form = document.getElementById('feedback-form');
        if (!form) return;

        const email = document.getElementById('feedback-email');
        const message = document.getElementById('feedback-message');
        const status = document.getElementById('feedback-status');

        const isValidText = (el) => {
            return el && el.value && /\S/.test(el.value) && el.value.trim().length >= 5;
        };

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            status.textContent = '';
            status.className = 'feedback-status';

            if (!email.checkValidity()) {
                email.reportValidity();
                return;
            }

            if (!isValidText(message)) {
                message.setCustomValidity('Por favor ingresa un texto válido de al menos 5 caracteres.');
                message.reportValidity();
                message.setCustomValidity('');
                return;
            }

            status.textContent = 'Enviando tu mensaje...';
            status.classList.add('feedback-status--success');

            try {
                const result = await emailjs.send(
                    'service_epyfgij',
                    'template_r3kp7ic',
                    {
                        user_email: email.value,
                        user_message: message.value
                    }
                );

                if (result.status === 200) {
                    status.textContent = '¡Mensaje enviado correctamente! Gracias por tu devolución.';
                    form.reset();
                    setTimeout(() => {
                        status.textContent = '';
                        status.className = 'feedback-status';
                    }, 3000);
                }
            } catch (error) {
                console.error('Error al enviar:', error);
                status.textContent = 'Error al enviar el mensaje. Intenta nuevamente.';
                status.classList.remove('feedback-status--success');
                status.classList.add('feedback-status--error');

                setTimeout(() => {
                    status.textContent = '';
                    status.className = 'feedback-status';
                }, 3000);
            }
        });
    };

    const waitForEmailJS = () => {
        if (typeof emailjs === 'undefined') {
            setTimeout(waitForEmailJS, 100);
            return;
        }
        emailjs.init('3oFNJTeVwoDDMvvM-');
        setupFeedbackForm();
    };

    waitForEmailJS();
}