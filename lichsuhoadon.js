fetch('http://localhost:8080/allhoadon')
  .then(res => res.json())
  .then(data => {
    data.forEach(element => {
      renderLS(element);
    });
  });

const tableLichSu = document.querySelector("#table-ls-body");
const renderLS = (item) => {
  const output = `<tr data-id = '${item.hoaDonId}'>
    <td>${item.hoaDonId}</td>
    <td>${item.thucDonId}</td>
    <td>${item.banId}</td>
    <td>${item.soLuong}</td>
    <td>${item.thanhTien}</td>
    <td>${item.userId}</td>
    <td>${item.createAt}</td>
    <td>${item.updateAt}</td>
  </tr>`;
  tableLichSu.insertAdjacentHTML("beforeend", output);
}

const resultByUser = document.querySelector("#btn-search");

resultByUser.addEventListener('click', (e) => {
  e.preventDefault();
  const userIdInput = document.getElementById("userId");
  const userIdValue = userIdInput.value;
  fetch(`http://localhost:8080/hoadonbyuser/${userIdValue}`)
    .then(res => res.json())
    .then(data => {
      const tableLichSuBody = document.querySelector("#table-ls-body");
      tableLichSuBody.innerHTML = '';
      data.forEach(element => {
        renderLS(element);
      });
    });
});
