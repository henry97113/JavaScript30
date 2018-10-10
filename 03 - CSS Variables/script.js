const inputs = document.querySelectorAll('.controls input');
inputs.forEach(cur => {
    cur.addEventListener('input', function(e) {
        let value = cur.value;
        if(e.target.getAttribute('id') === 'base') {
            document.body.style.setProperty('--base', `${value}`);
        } else if (e.target.getAttribute('id') === 'blur') {
            document.body.style.setProperty('--blur', `${value}px`);
        } else if(e.target.getAttribute('id') === 'spacing') {
            document.body.style.setProperty('--padding', `${value}px`);
        }
    });
});