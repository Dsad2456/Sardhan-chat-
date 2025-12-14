const socket = io();
const user = localStorage.getItem("user");

socket.emit("join", user);

function send(){
  const msg = msgInput.value;
  socket.emit("send", {
    sender: user,
    message: msg
  });
  msgInput.value = "";
}

msgInput.oninput = () => {
  socket.emit("typing", user);
};

socket.on("typing", u => {
  typing.innerText = u + " typing...";
  setTimeout(()=>typing.innerText="",1000);
});

socket.on("receive", data => {
  messages.innerHTML += `<div><b>${data.sender}</b>: ${data.message}</div>`;
});
