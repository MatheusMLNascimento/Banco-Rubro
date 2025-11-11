// ========== LOGIN & CADASTRO ==========
// Validação de confirmação de senha (usada no login e cadastro)
function conferesenha() {
  const senha = document.querySelector('input[name="senha"]');
  const confirma = document.querySelector('input[name="confirma"]');
  if (senha && confirma) {
    if (confirma.value === senha.value) {
      confirma.setCustomValidity('');
    } else {
      confirma.setCustomValidity('As senhas não coincidem.');
    }
  }
}
// Alternar visibilidade da senha (usada no login e cadastro)
function toggleSenha() {
  const input1 = document.getElementById("senha");
  const input2 = document.getElementById("confirma");
  const icone = document.getElementById("iconeOlho");
  if (input1 && input2 && icone) {
    if (input2.type === "password" && input1.type === "password") {
      input2.type = "text";
      input1.type = "text";
      icone.classList.remove("fa-eye");
      icone.classList.add("fa-eye-slash");
    } else {
      input2.type = "password";
      input1.type = "password";
      icone.classList.remove("fa-eye-slash");
      icone.classList.add("fa-eye");
    }
  }
}

// ========== CADASTRO ==========
// CPF format/validation (Cadastro)
function formatCPFRaw(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (!digits) return "";
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9)
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
}
function setCaretByDigitIndex(input, digitIndex) {
  const value = input.value;
  let pos = 0;
  let counted = 0;
  while (pos < value.length && counted < digitIndex) {
    if (/\d/.test(value[pos])) counted++;
    pos++;
  }
  input.setSelectionRange(pos, pos);
}
function validateCPF(value) {
  if (!value) return false;
  const cpf = value.replace(/\D/g, "");
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  // Lista de CPFs inválidos conhecidos (sequenciais, etc)
  const invalidCpfs = [
    '12345678909', '01234567890', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999', '00000000000',
    '12345678900', '12345678988', '98765432100', '01234567891'
  ];
  if (invalidCpfs.includes(cpf)) return false;
  let sum = 0;
  let rest;
  for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;
  if ((rest === 10) || (rest === 11)) rest = 0;
  if (rest !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}
// CPF input listeners (Cadastro)
document.addEventListener('DOMContentLoaded', function () {
  const cpfInput = document.getElementById("cpf");
  if (cpfInput) {
    cpfInput.addEventListener("input", (e) => {
      const input = e.target;
      const raw = input.value;
      const selectionStart = input.selectionStart ?? raw.length;
      const digitsBeforeCursor = (raw.slice(0, selectionStart).match(/\d/g) || []).length;
      const formatted = formatCPFRaw(raw);
      input.value = formatted;
      setCaretByDigitIndex(input, digitsBeforeCursor);
    });
    cpfInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        cpfInput.value = formatCPFRaw(cpfInput.value);
      }, 0);
    });
    cpfInput.addEventListener("blur", () => {
      cpfInput.value = formatCPFRaw(cpfInput.value);
      const valid = validateCPF(cpfInput.value);
      if (!valid) {
        cpfInput.classList.add("invalid");
        cpfInput.classList.remove("valid");
        cpfInput.setCustomValidity("CPF inválido");
      } else {
        cpfInput.classList.add("valid");
        cpfInput.classList.remove("invalid");
        cpfInput.setCustomValidity("");
      }
    });
  }
});

// ========== FORMATAÇÃO AUTOMÁTICA: AGÊNCIA E CONTA CORRENTE (LOGIN) ==========

// Funções de formatação para agência e conta corrente
function formatAgencia(value) {
  const digits = value.replace(/\D/g, "").slice(0, 5);
  if (!digits) return "";
  if (digits.length <= 4) return digits;
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

function formatContaCorrente(value) {
  const digits = value.replace(/\D/g, "").slice(0, 6);
  if (!digits) return "";
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

// ========== FORMATAÇÃO AUTOMÁTICA: AGÊNCIA E CONTA CORRENTE (LOGIN) ==========
document.addEventListener('DOMContentLoaded', function () {
  // Formatar agência (5 dígitos com máscara 0000-0)
  const agenciaInput = document.getElementById("agencia");
  if (agenciaInput) {
    agenciaInput.addEventListener("input", (e) => {
      e.target.value = formatAgencia(e.target.value);
    });
    agenciaInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        agenciaInput.value = formatAgencia(agenciaInput.value);
      }, 0);
    });
  }
  // Formatar conta corrente (6 dígitos com máscara 00000-0)
  const contaInput = document.getElementById("contacorrente");
  if (contaInput) {
    contaInput.addEventListener("input", (e) => {
      e.target.value = formatContaCorrente(e.target.value);
    });
    contaInput.addEventListener("paste", (e) => {
      setTimeout(() => {
        contaInput.value = formatContaCorrente(contaInput.value);
      }, 0);
    });
  }
});



// ========== HOMEPAGE & SALDO ==========
// Carrossel slides (Homepage e Saldo)
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelector('.slides');
  const totalSlides = document.querySelectorAll('.slide').length;
  let currentIndex = 0;
  if (slides && totalSlides > 0) {
    function showSlide(index) {
      slides.style.transform = `translateX(-${index * 100}%)`;
    }
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
      });
    }
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
      });
    }
    setInterval(() => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    }, 5000); // Slides will auto-advance every 5 seconds
  }
});

// Outras funções globais podem ser adicionadas aqui


// ========== BACKEND ==========


let matriz = [];
document.addEventListener('DOMContentLoaded', function () {
  // Listener para o formulário de cadastro
  const formCadastro = document.getElementById('cadastro');
  if (formCadastro) {
    formCadastro.addEventListener('submit', function (event) {
      event.preventDefault();
      cadastro();
    });
  }
});

/* Admin Acc */
matriz.push(['0000-0', '00000-0', 'admin123', 'admin', 'admin@admin.com', '000.000.000-00', 100000.69]);

function cadastro() {
  let user = document.querySelector('input[name="username"]');
  let email = document.querySelector('input[name="Email"]');
  let cpf = document.querySelector('input[name="cpf"]');
  let senha = document.querySelector('input[name="senha"]');
  let saldo = 0;

  let contacorrente = Math.floor(100000 + Math.random() * 900000); // Gera conta corrente aleatória de 6 dígitos
  let agencia = Math.floor(10000 + Math.random() * 90000); // Gera agência aleatória de 5 dígitos

  // Carrega matriz do localStorage se existir
  if (localStorage.getItem('matriz')) {
    matriz = JSON.parse(localStorage.getItem('matriz'));
  }

  // Verifica se já existe uma combinação de agência e conta corrente na matriz
  let existe = matriz.some(item => item[0] == formatAgencia(agencia.toString()) && item[1] == formatContaCorrente(contacorrente.toString()));
  while (existe) {
    contacorrente = Math.floor(100000 + Math.random() * 900000);
    agencia = Math.floor(10000 + Math.random() * 90000);
    existe = matriz.some(item => item[0] == formatAgencia(agencia.toString()) && item[1] == formatContaCorrente(contacorrente.toString()));
  }

  // Salva já formatado
  let agenciaFormatada = formatAgencia(agencia.toString());
  let contaFormatada = formatContaCorrente(contacorrente.toString());
  let cpfFormatado = cpf ? formatCPFRaw(cpf.value) : '';

  // Validação dos campos obrigatórios
  if (!user.value || !email.value || !cpf.value || !senha.value) {
    alert('Preencha todos os campos obrigatórios!');
    return;
  }
  if (!validateCPF(cpf.value)) {
    alert('CPF inválido!');
    return;
  }

  matriz.push([agenciaFormatada, contaFormatada, senha.value, user.value, email.value, cpfFormatado, saldo]);
  localStorage.setItem('matriz', JSON.stringify(matriz));
  alert('Cadastro realizado com sucesso!\nSua agência: ' + agenciaFormatada + '\nSua conta: ' + contaFormatada);
  window.location.href = '../Login/login.html';
}

function formatarBRL(valor) {
  return Number(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function entrar(event) {
  if (event) event.preventDefault();
    // Sempre carregar a matriz do localStorage antes de tentar logar
  if (localStorage.getItem('matriz')) {
    matriz = JSON.parse(localStorage.getItem('matriz'));
  }
  let agenciaInput = document.querySelector('input[name="agencia"]');
  let contaInput = document.querySelector('input[name="contacorrente"]');
  let senhaInput = document.querySelector('input[name="senha"]');
  let encontrado = false;
  if (agenciaInput && contaInput && senhaInput) {
    // Formatar os valores digitados para garantir comparação correta
    let agenciaFormatada = formatAgencia(agenciaInput.value.replace(/\D/g, ""));
    let contaFormatada = formatContaCorrente(contaInput.value.replace(/\D/g, ""));
    for (let i = 0; i < matriz.length; i++) {
      let registro = matriz[i];
      if (
        registro[0] === agenciaFormatada &&
        registro[1] === contaFormatada &&
        registro[2] === senhaInput.value
      ) {
        encontrado = true;
        // Salva dados do usuário logado no localStorage
        localStorage.setItem('username', registro[3]);
        localStorage.setItem('agencia', registro[0]);
        localStorage.setItem('contacorrente', registro[1]);
        localStorage.setItem('email', registro[4]);
        localStorage.setItem('cpf', registro[5]);
        localStorage.setItem('senha', registro[2]);
        localStorage.setItem('saldo', registro[6] || 0);
        localStorage.setItem('userIndex', i);
        window.location.href = "../saldo/saldo.html";
        break;
      }
    }
    if (!encontrado) {
      alert("Dados incorretos. Verifique sua agência, conta ou senha.");
    }
  }
}

// Função para atualizar o saldo na página de saldo.html
function atualizarSaldoNaPagina() {
  const saldoConta = document.getElementById('saldoConta');
  // Se houver matriz salva no localStorage, carrega para manter persistência
  if (localStorage.getItem('matriz')) {
    const matrizSalva = JSON.parse(localStorage.getItem('matriz'));
    if (Array.isArray(matrizSalva)) matriz = matrizSalva;
  }
  const userIndex = parseInt(localStorage.getItem('userIndex'));
  if (saldoConta && !isNaN(userIndex)) {
    let saldo = matriz[userIndex][6] || 0;
    saldoConta.textContent = formatarBRL(saldo);
  }
}

function recarregarDados() {
  // Preenche os dados do usuário na página de saldo.html ou profile.html
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const cpf = localStorage.getItem('cpf');
  const senha = localStorage.getItem('senha');
  let agencia = localStorage.getItem('agencia');
  let contacorrente = localStorage.getItem('contacorrente');
  const elUsername = document.getElementById('username');
  const elEmail = document.getElementById('email');
  const elSenha = document.getElementById('senha');
  const elCpf = document.getElementById('cpf');
  const elAgencia = document.getElementById('agencia');
  const elContaCorrente = document.getElementById('contaCorrente');
  if (username && elUsername) elUsername.textContent = "Nome: " + username;
  if (email && elEmail) elEmail.textContent = "E-mail: " + email;
  if (senha && elSenha) elSenha.textContent = "Senha: " + senha;
  if (cpf && elCpf) elCpf.textContent = "CPF: " + cpf;
  if (agencia && elAgencia) elAgencia.textContent = "Ag.: " + formatAgencia(agencia.toString());
  if (contacorrente && elContaCorrente) elContaCorrente.textContent = "C/C.: " + formatContaCorrente(contacorrente.toString());
};


// Atualiza o saldo ao carregar a página de saldo.html
if (window.location.pathname.toLowerCase().includes('saldo/saldo.html')) {
  document.addEventListener('DOMContentLoaded', recarregarDados);
}

// Atualiza o saldo ao carregar a página de saldo.html
if (window.location.pathname.toLowerCase().includes('saldo/saldo.html')) {
  document.addEventListener('DOMContentLoaded', atualizarSaldoNaPagina);
}

if (window.location.pathname.toLowerCase().includes('profile/profile.html')) {
  document.addEventListener('DOMContentLoaded', perfil);
  document.addEventListener('DOMContentLoaded', recarregarDados);
}

function perfil() {
  if (encontrado) {
    localStorage.getItem('username');
    localStorage.getItem('agencia');
    localStorage.getItem('contacorrente');

    if (agenciaInput && contaInput && senhaInput) {
      for (i = 0; i < matriz.length; i++) {
        registro = matriz[i];
        if (
          registro[0].toString() === agenciaInput.value &&
          registro[1].toString() === contaInput.value &&
          registro[3] === user.value
        ) {
          localStorage.setItem('email', registro[4]);
          localStorage.setItem('cpf', registro[5]);
          localStorage.setItem('senha', registro[2]);
          break;
        }
      }
    }
  }
}



// ========================== MODAIS DE TRANSAÇÕES ==========================

// Função genérica para abrir modais
function abrirModal(titulo, campos, callback) {
  fecharModal();
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  const modal = document.createElement('div');
  modal.className = 'modal-content';
  const h2 = document.createElement('h2');
  h2.textContent = titulo;
  modal.appendChild(h2);
  const inputs = [];
  campos.forEach(c => {
    const label = document.createElement('label');
    label.textContent = c.label;
    const input = document.createElement('input');
    input.type = c.type || 'text';
    input.placeholder = c.placeholder || '';
    if (c.minLength) input.minLength = c.minLength;
    if (c.maxLength) input.maxLength = c.maxLength;
    if (c.min) input.min = c.min;
    if (c.max) input.max = c.max;
    modal.appendChild(label);
    modal.appendChild(input);
    inputs.push(input);
  });
  const btns = document.createElement('div');
  btns.className = 'modal-btns';
  const btn = document.createElement('button');
  btn.textContent = 'Confirmar';
  btn.onclick = function () {
    callback(inputs.map(i => i.value));
    fecharModal();
  };
  const btnClose = document.createElement('button');
  btnClose.textContent = 'Cancelar';
  btnClose.style.background = '#a94442';
  btnClose.onclick = fecharModal;
  btns.appendChild(btn);
  btns.appendChild(btnClose);
  modal.appendChild(btns);
  bg.appendChild(modal);
  document.body.appendChild(bg);
}


// Fecha o modal se já estiver aberto
function fecharModal() {
  const m = document.querySelector('.modal-bg');
  if (m) m.remove();
}

// Funções para abrir modais de Depósito, Saque, Transferência e Boleto
function abrirDeposito(e) {
  e.preventDefault();
  abrirModal('Depósito', [
    { label: 'Valor do depósito', type: 'number', placeholder: 'Ex: 100', min: 1, max: 1000000 }
  ], function ([valor]) {
    if (valor && !isNaN(valor) && Number(valor) > 0) {
      const userIndex = localStorage.getItem('userIndex');
      if (userIndex !== null) {
        matriz[userIndex][6] = (Number(matriz[userIndex][6] || 0) + Number(valor));
        salvarSaldoUsuario(userIndex);
        document.getElementById('saldoConta').textContent = formatarBRL(matriz[userIndex][6]);
        alert('Depósito realizado com sucesso!');
      }
    }
  });
}

// Função para abrir modal de saque
function abrirSaque(e) {
  e.preventDefault();
  abrirModal('Saque', [
    { label: 'Valor do saque', type: 'number', placeholder: 'Ex: 50', min: 1, max: 1000000 }
  ], function ([valor]) {
    if (valor && !isNaN(valor) && Number(valor) > 0) {
      const userIndex = localStorage.getItem('userIndex');
      if (userIndex !== null) {
        if (Number(matriz[userIndex][6] || 0) >= Number(valor)) {
          matriz[userIndex][6] = (Number(matriz[userIndex][6] || 0) - Number(valor));
          salvarSaldoUsuario(userIndex);
          document.getElementById('saldoConta').textContent = formatarBRL(matriz[userIndex][6]);
          alert('Saque realizado com sucesso!');
        } else {
          alert('Saldo insuficiente!');
        }
      }
    }
  });
}

// Função para abrir modal de transferência
function abrirTransferencia(e) {
  e.preventDefault();
  abrirModal('Transferência', [
    { label: 'Agência de destino', type: 'text', placeholder: 'Ex: 1234-5', minLength: 6, maxLength: 6 },
    { label: 'Conta de destino', type: 'text', placeholder: 'Ex: 12345-6', minLength: 7, maxLength: 7 },
    { label: 'Valor da transferência', type: 'number', placeholder: 'Ex: 200', min: 1, max: 1000000 }
  ], function ([agenciaDestino, contaDestino, valor]) {
    // Formatar agência e conta corrente
    agenciaDestino = formatAgencia((agenciaDestino || '').replace(/\D/g, ''));
    contaDestino = formatContaCorrente((contaDestino || '').replace(/\D/g, ''));
    if (
      agenciaDestino.length === 6 &&
      contaDestino.length === 7 &&
      valor && !isNaN(valor) && Number(valor) > 0
    ) {
      const userIndex = localStorage.getItem('userIndex');
      if (userIndex !== null) {
        if (Number(matriz[userIndex][6] || 0) >= Number(valor)) {
          const destinatario = matriz.find(u => u[0].toString() === agenciaDestino && u[1].toString() === contaDestino);
          if (destinatario) {
            matriz[userIndex][6] = (Number(matriz[userIndex][6] || 0) - Number(valor));
            destinatario[6] = (Number(destinatario[6] || 0) + Number(valor));
            salvarSaldoUsuario(userIndex);
            document.getElementById('saldoConta').textContent = formatarBRL(matriz[userIndex][6]);
            alert('Transferência realizada com sucesso!');
          } else {
            alert('Conta de destino não encontrada!');
          }
        } else {
          alert('Saldo insuficiente!');
        }
      }
    } else {
      alert('Preencha corretamente agência (0000-0) e conta (00000-0) de destino.');
    }
  });
  // Adiciona listeners de formatação nos inputs do modal
  setTimeout(() => {
    const modalInputs = document.querySelectorAll('.modal-content input');
    if (modalInputs[0]) {
      modalInputs[0].addEventListener('input', function(e) {
        e.target.value = formatAgencia(e.target.value);
      });
    }
    if (modalInputs[1]) {
      modalInputs[1].addEventListener('input', function(e) {
        e.target.value = formatContaCorrente(e.target.value);
      });
    }
  }, 50);
}

// Função para abrir modal de boleto
function abrirBoleto(e) {
  e.preventDefault();
  abrirModal('Boleto', [
    { label: 'Valor do boleto', type: 'number', placeholder: 'Ex: 150', min: 1, max: 1000000 }
  ], function ([valor]) {
    alert('Função de pagamento de boleto ainda não implementada. Valor informado: ' + valor);
  });
}

// Função para salvar o saldo do usuário e a matriz no localStorage
function salvarSaldoUsuario(userIndex) {
  // Atualiza o saldo no localStorage e salva o vetor matriz inteiro
  localStorage.setItem('saldo', matriz[userIndex][6]);
  localStorage.setItem('matriz', JSON.stringify(matriz));
}

// Função para sair da conta
function sair() {
  // Remove apenas os dados de sessão do usuário logado
  localStorage.removeItem('username');
  localStorage.removeItem('agencia');
  localStorage.removeItem('contacorrente');
  localStorage.removeItem('saldo');
  localStorage.removeItem('email');
  localStorage.removeItem('cpf');
  localStorage.removeItem('senha');
  // Redireciona para a homepage
  window.location.href = '../Homepage/index.html';
  encontrado = false;
}

// ================ Adiciona o listener ao botão sair na página de saldo ===================

// Adiciona o listener ao botão sair na página de saldo
if (window.location.pathname.toLowerCase().includes('saldo/saldo.html')) {
  document.addEventListener('DOMContentLoaded', function () {
    const btnSair = document.querySelector('.sair');
    if (btnSair) btnSair.addEventListener('click', sair);
  });
}

