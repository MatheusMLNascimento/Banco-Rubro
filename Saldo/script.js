function formatarSaldo() {
    const saldoElement = document.getElementById('saldoConta');
    const valorNumerico = parseFloat(saldoElement.textContent.replace('R$ ', ''));
    
    const formatoBR = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
    
    saldoElement.textContent = formatoBR.format(valorNumerico);
}

// Executar quando a página carregar
document.addEventListener('DOMContentLoaded', formatarSaldo);


  const slides = document.querySelector('.slides');
  const slideCount = document.querySelectorAll('.slide').length;
  let index = 0;

  document.querySelector('.next').onclick = () => {
    index = (index + 1) % slideCount;
    slides.style.transform = `translateX(${-index * 100}%)`;
  };

  document.querySelector('.prev').onclick = () => {
    index = (index - 1 + slideCount) % slideCount;
    slides.style.transform = `translateX(${-index * 100}%)`;
  };