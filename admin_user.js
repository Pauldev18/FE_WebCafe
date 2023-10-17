const url = 'http://localhost:8080/allusers';

const editModalForm = document.querySelector('.form-user');
let id;

fetch(url)
.then(res => res.json())
.then(data =>{
  console.log(data);
  data.forEach(user => {
    renderUsers(user);
  });
});

const tableUsers = document.querySelector("#table-user");
const renderUsers = (user) =>{
        const output = `<tr data-id = '${user.userId}'>
        <td>${user.tenNguoiDung}</td>
        <td>${user.sdt}</td>
        <td>${user.userName}</td>
        <td>${user.passWord}</td>
        <td><a class="btn btn-primary btn-sm btn-edit">Edit</a> |
          <a class="btn btn-danger btn-sm btn-del">Del</a>
        </td>
      </tr>`;
      tableUsers.insertAdjacentHTML('beforeend', output);
      const btnEdit = document.querySelector(`[data-id = '${user.userId}'] .btn-edit`);
      btnEdit.addEventListener('click', (e)=>{
        e.preventDefault();
        id = user.userId;
        $("#myEditModel").modal('show');
        editModalForm.fullname.value = user.tenNguoiDung;
        editModalForm.phone.value = user.sdt;
        editModalForm.username.value = user.userName;
        editModalForm.pass.value = user.passWord;
      });
      const btnDelete = document.querySelector(`[data-id = '${user.userId}'] .btn-del`);
      btnDelete.addEventListener('click', (e)=>{
        e.preventDefault();
        console.log(user.userId);

        fetch(`http://localhost:8080/deleteUser/${user.userId}`, {
          method: "DELETE",
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(res => {
          if (res.status === 200) {
            return res.text(); // Parse text response
          } else {
            throw new Error(`Failed to update user. Status: ${res.status}`);
          }
        })
        .then((responseText) => {
          console.log(responseText); // Log the text response
          location.reload();
        })
        .catch(error => {
          alert("Không thể xóa được vì user này đã thanh toán 1 hóa đơn trở lên")
        });




      });
}
editModalForm.addEventListener('submit', (e)=>{
  e.preventDefault();
  console.log("edit");
  fetch(`http://localhost:8080/edituser/${id}`,{
    method: "PUT",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userName:  editModalForm.username.value,
      passWord: editModalForm.pass.value,
      tenNguoiDung:  editModalForm.fullname.value,
      sdt:  editModalForm.phone.value
    })
  })
  .then(res => {
    if (res.status === 200) {
      return res.text(); // Parse text response
    } else {
      throw new Error(`Failed to update user. Status: ${res.status}`);
    }
  })
  .then((responseText) => {
    console.log(responseText); // Log the text response
    location.reload();
  })
  .catch(error => {
    console.error(error);
  });
})
