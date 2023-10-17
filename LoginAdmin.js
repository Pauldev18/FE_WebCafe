const loginAdmin = document.querySelector("#loginaction");
loginAdmin.addEventListener('click', (e)=>{
  e.preventDefault();
  const tk = document.querySelector("#user").value;
  const mk = document.querySelector("#pass").value;
  e.preventDefault();
  fetch('http://localhost:8080/loginadmin', {
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
    window.location.href = "admin.html";
  })
  .catch(error=>{
    alert("Tài khoản hoặc mật khẩu không chính xác");
  });
})