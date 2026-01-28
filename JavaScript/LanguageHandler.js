function changeLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    const elements = document.querySelectorAll('[data-nl]');
    elements.forEach(el => {
        el.textContent = lang === 'nl' ? el.getAttribute('data-nl') : el.getAttribute('data-en');
    });
    document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
    const activeBtn = document.getElementById(`lang-${lang}`);
    if (activeBtn) activeBtn.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang') || 'nl';
    changeLanguage(savedLang);
});