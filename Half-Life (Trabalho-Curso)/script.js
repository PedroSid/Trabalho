// Armazenamento local (para fins de exemplo)
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Função para atualizar a tabela com os usuários cadastrados
function atualizarTabela() {
    const tabela = document.querySelector('#tabelaUsuarios tbody');
    tabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    // Insere cada usuário na tabela
    usuarios.forEach((usuario, index) => {
        const linha = tabela.insertRow();
        linha.innerHTML = `
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>
                <button onclick="editarCadastro(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M160-160v-80h110l-16-14q-52-46-73-105t-21-119q0-111 66.5-197.5T400-790v84q-72 26-116 88.5T240-478q0 45 17 87.5t53 78.5l10 10v-98h80v240H160Zm400-10v-84q72-26 116-88.5T720-482q0-45-17-87.5T650-648l-10-10v98h-80v-240h240v80H690l16 14q49 49 71.5 106.5T800-482q0 111-66.5 197.5T560-170Z"/></svg></button>
                <button onclick="excluirCadastro(${index})"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M600-240v-80h160v80H600Zm0-320v-80h280v80H600Zm0 160v-80h240v80H600ZM120-640H80v-80h160v-60h160v60h160v80h-40v360q0 33-23.5 56.5T440-200H200q-33 0-56.5-23.5T120-280v-360Zm80 0v360h240v-360H200Zm0 0v360-360Z"/></svg></button>
            </td>
        `;
    });
}

// Função de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Obtém os dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;

    // Cria o novo usuário
    const novoUsuario = { nome, email };
    usuarios.push(novoUsuario);

    // Salva os dados no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpa os campos do formulário
    document.getElementById('cadastroForm').reset();

    // Atualiza a tabela
    atualizarTabela();
});

// Função para excluir um cadastro
function excluirCadastro(index) {
    usuarios.splice(index, 1); // Remove o usuário do array
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Atualiza o localStorage
    atualizarTabela(); // Atualiza a tabela
}

// Função para editar um cadastro
function editarCadastro(index) {
    const usuario = usuarios[index];
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;

    // Remove o usuário para editar (opcional)
    excluirCadastro(index);
}

// Chama a função para exibir a tabela inicial ao carregar a página
window.onload = atualizarTabela;
