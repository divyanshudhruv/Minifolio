// Dark-mode
const darkmodeBtn = document.querySelector('button[data-mode]')
const html = document.querySelector('html')

darkmodeBtn.addEventListener('click', () => {
    html.classList.toggle('dark')
})