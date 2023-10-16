function handleLoai() {
  const contentDiv = document.getElementById('content');
          contentDiv.innerHTML='';
  // Gọi API và lấy dữ liệu
  fetch('http://localhost:8080/allloai')
    .then(response => response.json())
    .then(data => {
      // Lấy phần tử div content
      const contentDiv = document.getElementById('content');

      // Tạo nút "Thêm"
      const addButton = document.createElement('button');
      addButton.textContent = 'Thêm';
      addButton.addEventListener('click', () => {
      addModal.style.display = 'block';
      const submitAdd = document.getElementById('submitAdd');
      submitAdd.addEventListener('click', () => {
      const addLoaiInput = document.getElementById('addLoai');
      const tenLoai = addLoaiInput.value;
      const contentDiv = document.getElementById('content');
          contentDiv.innerHTML='';
          addLoai(tenLoai);

      addModal.style.display = 'none';
});
      });
      contentDiv.appendChild(addButton);

      // Tạo bảng HTML
      const table = document.createElement('table');
      table.classList.add('table');

      // Tạo tiêu đề của bảng
      const thead = document.createElement('thead');
      const headerRow = document.createElement('tr');
      const headers = ['ID', 'Tên', 'Sửa', 'Xóa'];
      headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Tạo nội dung của bảng
      const tbody = document.createElement('tbody');
      data.forEach((item, index) => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('th');
        cell1.setAttribute('scope', 'row');
        cell1.textContent = (index + 1).toString();
        const cell2 = document.createElement('td');
        cell2.textContent = item.tenLoai;
        const cell3 = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.addEventListener('click', () => {
          const editModal = document.getElementById('editModal');
          editModal.style.display = 'block';
          // Lấy trường ID và Loại từ dữ liệu hiện tại
          const editId = document.getElementById('editId');
          const editLoai = document.getElementById('editLoai');
          editId.value = item.loai;
          editLoai.value = item.tenLoai;
          
          
        });
        cell3.appendChild(editButton);
        const cell4 = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.addEventListener('click', () => {
          const deleteId = item.loai;
          const deleteModal = document.getElementById('deleteModal');
          deleteModal.style.display = 'block';
          const confirmDeleteButton = document.getElementById('confirmDeleteButton');
          confirmDeleteButton.addEventListener('click', () => {
          const contentDiv = document.getElementById('content');
          contentDiv.innerHTML='';
          deleteLoai(deleteId);
          const deleteModal = document.getElementById('deleteModal');
          deleteModal.style.display = 'none';
          
          });

        });
        cell4.appendChild(deleteButton);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      // Đặt bảng vào phần tử div content
      contentDiv.appendChild(table);
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi lấy dữ liệu từ API:', error);
    });
}

// Bắt sự kiện click nút "Hủy" trên modal xác nhận xóa
const cancelDeleteButton = document.getElementById('cancelDeleteButton');
cancelDeleteButton.addEventListener('click', () => {
  const deleteModal = document.getElementById('deleteModal');
  deleteModal.style.display = 'none';
});


const closeEditModalButton = document.getElementById('closeEditModal');
closeEditModalButton.addEventListener('click', () => {
  const editModal = document.getElementById('editModal');
  editModal.style.display = 'none';
});
function deleteLoai(id) {
  // Gửi yêu cầu DELETE API
  fetch(`http://localhost:8080/deleteLoai/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(result => {
    // Xử lý kết quả sau khi cập nhật thành công (thay thế alert bằng thông báo thành công)
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML='';
    handleLoai();
    // Có thể thêm mã JavaScript để làm mới trang hoặc làm mọi thứ khác bạn muốn.
  })
  .catch(error => {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML='';
    alert("Lỗi");
    handleLoai();
  });
}

function updateLoai(id, tenLoai) {
  // Tạo dữ liệu cần gửi lên API
  const data = {
    tenLoai: tenLoai,
  };

  // Gửi yêu cầu PUT API
  fetch(`http://localhost:8080/updateLoai/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      // Xử lý kết quả sau khi cập nhật thành công (thay thế alert bằng thông báo thành công)
      alert('Cập nhật thành công');
      handleLoai();
      // Có thể thêm mã JavaScript để làm mới trang hoặc làm mọi thứ khác bạn muốn.
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
      handleLoai();
    });
}

const confirmUpdate = document.getElementById('completeEdit')
          confirmUpdate.addEventListener('click',()=> {
          updateLoai(editId.value, editLoai.value);
          const editModal = document.getElementById('editModal');
          editModal.style.display = 'none';
          const contentDiv = document.getElementById('content');
          contentDiv.innerHTML='';
});

const closeAddModal = document.getElementById('closeAddModal');
closeAddModal.addEventListener('click', () => {
  addModal.style.display = 'none';
});

// Thêm dữ liệu từ modal Thêm
function addLoai(tenLoai){
  const data={
    tenLoai: tenLoai
  };
  fetch(`http://localhost:8080/addLoai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      handleLoai();
      // Có thể thêm mã JavaScript để làm mới trang hoặc làm mọi thứ khác bạn muốn.
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi cập nhật dữ liệu:', error);
      handleLoai();
    });

}