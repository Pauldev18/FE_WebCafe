
const loginAction = document.querySelector("#loginUser");
loginAction.addEventListener('click', (e)=>{
  const tk = document.querySelector("#user").value;
  const mk = document.querySelector("#pass").value;
  e.preventDefault();
  fetch('http://localhost:8080/login', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName: tk,
      passWord: mk
    })
  })
  .then(res => res.json())
  .then(data=>{
    console.log(data)
    localStorage.setItem("userId", data.userId);
    window.location.href = "Order.html";
  })
  .catch(error=>{
    alert("Tài khoản hoặc mật khẩu không chính xác");
  });
})