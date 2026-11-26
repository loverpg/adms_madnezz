function iniciarAbas() {
document.querySelectorAll('.tab-container').forEach(container => {
    if (!container.hasAttribute('data-initialized')) {
        const uniqueId = Math.floor(Math.random() * 100000); // Gerar um ID único aleatório
        const tabs = container.querySelectorAll('.tab-buttons label');
        const contents = container.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            const tabId = `${tab.getAttribute('data-tab')}-${uniqueId}`;
            tab.setAttribute('data-tab', tabId);
        });

        contents.forEach(content => {
            const contentId = `${content.getAttribute('data-content')}-${uniqueId}`;
            content.setAttribute('data-content', contentId);
        });

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                contents.forEach(content => {
                    content.classList.remove('active');
                });
                tabs.forEach(label => {
                    label.style.borderBottom = "thick solid #292929";
                });
                container.querySelector(`.tab-content[data-content="${tab.getAttribute('data-tab')}"]`).classList.add('active');
                tab.style.borderBottom = "3px solid var(--cor-grupo)";
            });
        });
        tabs[0].click();
        container.setAttribute('data-initialized', 'true');
    }
});
  console.log("Abas iniciadas ou reiniciadas!");
}

document.addEventListener("DOMContentLoaded", iniciarAbas);

const observerMadnezz = new MutationObserver(() => {
  iniciarAbas();
});

observerMadnezz.observe(document.body, { childList: true, subtree: true });

/*CALCULO AUTOMÁRICO*/


function calcularRecursos() {

    document.querySelectorAll('.controle-recurso').forEach(recurso => {
        console.log("Recurso encontrado:", recurso.dataset.categoria);
        let disponivel = Number(recurso.dataset.inicial) || 0;
        let gasto = 0;

        recurso.querySelectorAll('.lancamento[data-valor]').forEach(item => {

            const valor = Number(item.dataset.valor) || 0;

            if (valor > 0) {
                disponivel += valor;
            } else {
                gasto += Math.abs(valor);
            }
        
        });

        const saldo = disponivel - gasto;

        recurso.querySelector('[data-total="disponivel"]').textContent = disponivel;
        recurso.querySelector('[data-total="gasto"]').textContent = gasto > 0 ? -gasto : 0;
        recurso.querySelector('[data-total="saldo"]').textContent = saldo;

    });

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', calcularRecursos);
} else {
    calcularRecursos();
}

setInterval(calcularRecursos, 1000);
