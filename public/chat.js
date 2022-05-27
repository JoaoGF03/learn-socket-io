// eslint-disable-next-line no-undef
const socket = io();

const urlSearch = new URLSearchParams(window.location.search);
const username = urlSearch.get('username');
const room = urlSearch.get('select_room');

const usernameDiv = document.getElementById('username');
usernameDiv.innerHTML = `Olá ${username} - Você está na sala ${room}`;

// quando o usuário entra na tela de chat (chat.html) esses eventos são disparados
// provável que deve ser usado no 'useEffect'
socket.emit('select_room', { username, room }, response => {
  response.map(message => {
    createMessage(message);
  });
});

document.getElementById('message_input').addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    const message = e.target.value;

    // enviar mensagem para o servidor, será escutado no 'websocket.ts' linha 42
    socket.emit('send_message', { username, room, message });

    e.target.value = '';
  }
});

// esse evento fica escutando o servidor e quando recebe uma nova mensagem ele é disparado
// está sendo disparado dentro de 'websocket.js' linha 52
socket.on('receive_message', data => {
  createMessage(data);
});

function createMessage({ username, message, createdAt }) {
  const messageDiv = document.getElementById('messages');

  messageDiv.innerHTML += `
    <div class="new_message">
    <label class="form-label">
      <strong>${username}</strong>
      <span>${message} - ${new Date(createdAt).toLocaleDateString()}</span>
    </label>
    </div>
  `;
}

document.getElementById('logout').addEventListener('click', e => {
  e.preventDefault();

  window.location.href = 'index.html';
});
