function handleThucDon() {
  // Sử dụng fetch để tải dữ liệu từ API
  fetch('http://localhost:8080/allloai')
    .then(response => response.json())
    .then(data => {
      // Tạo một phần tử <div>
      const divElement = document.createElement('div');

      // Tạo nút "Thêm"
      const addButton = document.createElement('button');
      addButton.textContent = 'Thêm';
      addButton.addEventListener('click', function () {
        const loaiMon2 = document.getElementById("loaiMon1");
        loaiMon2.innerHTML='';
        showAddModal(data);
      });

      // Thêm nút "Thêm" vào phần tử <div>
      divElement.appendChild(addButton);

      // Tạo một phần tử <select>
      const selectElement = document.createElement('select');

      // Đặt ID cho phần tử <select>
      selectElement.id = 'selectElement';

      // Duyệt qua dữ liệu từ API và tạo các <option> tương ứng
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.loai;
        option.text = item.tenLoai;
        selectElement.appendChild(option);
      });

      // Thêm sự kiện lắng nghe cho sự kiện "change" trên phần tử <select>
      selectElement.addEventListener('change', function () {
        const selectedValue = selectElement.value;
        renderThucDon(selectedValue, divElement); // Gọi hàm renderThucDon để hiển thị dữ liệu
      });

      // Thêm phần tử <select> vào phần tử <div>
      divElement.appendChild(selectElement);

      // Thêm phần tử <div> vào vị trí mong muốn trong trang web (ví dụ: phần tử có ID là 'container')
      const containerElement = document.querySelector(".content");
      containerElement.appendChild(divElement);
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi tải dữ liệu từ API: ', error);
    });
}

// Hàm để hiển thị modal khi nhấn nút "Thêm"
// Hàm để hiển thị modal khi nhấn nút "Thêm"
function showAddModal(data) {
  const addModal = document.getElementById("addModal2");
  addModal.style.display = "block";
  let newData = '';
  // Định nghĩa hàm xử lý sự kiện
  function handleSaveClick() {
    const tenMon = document.getElementById("tenMon1").value;
    const images = document.getElementById("images1").value;
    const donGia = document.getElementById("donGia1").value;
    const loaiMon = document.getElementById("loaiMon1").value;
    newData={
      tenMon: tenMon,
      images: images,
      donGia: donGia,
      loaiId: loaiMon
    }
    // Địa chỉ URL của API bạn muốn gửi yêu cầu POST đến
const apiUrl = 'http://localhost:8080/newThucDon'; // Thay đổi URL tương ứng

// Thiết lập các tùy chọn cho yêu cầu fetch và truyền dữ liệu trực tiếp
fetch(apiUrl, {
  method: 'POST', // Phương thức POST
  headers: {
    'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
  },
  body: JSON.stringify(newData), // Chuyển đổi đối tượng trực tiếp thành chuỗi JSON và gán cho body
})
  .then((response) => {
    if (response.ok) {
      // Yêu cầu POST thành công
      return response.json();
    } else {
      // Xử lý lỗi khi yêu cầu không thành công
      throw new Error('Failed to create new item');
    }
  })
  .then((data) => {
    // Xử lý dữ liệu trả về sau khi tạo mới thành công
    console.log('Created item:', data);
  })
  .catch((error) => {
    // Xử lý lỗi
    console.error('Error:', error);
  });

    const loaiMon2 = document.getElementById("loaiMon1");
    loaiMon2.innerHTML='';
    // Sau khi bạn có các giá trị từ modal, bạn có thể gửi chúng đến API để thêm mới.
    // Bạn có thể sử dụng fetch() để thực hiện điều này.
    // Sau khi hoàn thành thêm mới, bạn có thể làm mới dữ liệu bằng cách gọi lại hàm handleThucDon() hoặc làm theo cách khác.

    // Đóng modal sau khi lưu
    addModal.style.display = "none";

    // Gỡ bỏ sự kiện lắng nghe sau khi xử lý
    saveAddButton.removeEventListener("click", handleSaveClick);
  }

  // Đặt sự kiện lắng nghe cho nút "Lưu" trong modal
  const saveAddButton = document.getElementById("saveAddButton");
  saveAddButton.addEventListener("click", handleSaveClick);

  // Đặt sự kiện lắng nghe cho nút đóng modal
  const closeAddModal = document.getElementById("closeAddModal2");
  closeAddModal.addEventListener("click", function () {
    addModal.style.display = "none";

    // Gỡ bỏ sự kiện lắng nghe khi đóng modal
    saveAddButton.removeEventListener("click", handleSaveClick);
  });

  // Tạo phần tử <select> cho modal và điền các tùy chọn từ API
  const loaiMon = document.getElementById("loaiMon1");
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.loai;
    option.text = item.tenLoai;
    loaiMon.appendChild(option);
  });
}






function renderThucDon(id, divElement) {
  fetch(`http://localhost:8080/loaibyid?loaiId=${id}`)
    .then(response => response.json())
    .then(data => {
      // Tạo bảng với các yếu tố <table>, <thead>, và <tbody>
      const tableElement = document.createElement('table');
      tableElement.classList.add('table'); // Thêm lớp 'table' cho bảng

      // Tạo phần đầu (thead) của bảng
      const thead = tableElement.createTHead();
      const headerRow = thead.insertRow();
      const headers = ['#', 'Tên Món', 'Ảnh', 'Đơn Giá', 'Sửa', 'Xóa'];

      headers.forEach(headerText => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = headerText;
        headerRow.appendChild(th);
      });

      // Tạo phần thân (tbody) của bảng
      const tbody = tableElement.createTBody();
      
      // Duyệt qua dữ liệu từ API và tạo các hàng trong bảng
      data.thucDonList.forEach((thucDon, index) => {
        const row = tbody.insertRow();
        const rowData = [index + 1, thucDon.tenMon, thucDon.images, thucDon.donGia, 'Sửa', 'Xóa'];

        rowData.forEach((cellData, cellIndex) => {
          const cell = document.createElement("td");
          if (typeof cellData === "string" && cellData.startsWith("http")) {
            // Nếu dữ liệu là một URL, tạo một phần tử <img> cho ảnh
            const img = document.createElement("img");
            img.src = cellData;
            cell.appendChild(img);
          } else if (cellData === 'Sửa' || cellData === 'Xóa') {
            // Nếu dữ liệu là "Sửa" hoặc "Xóa", tạo nút và thêm sự kiện lắng nghe
            const button = document.createElement("button");
            button.textContent = cellData;
            button.addEventListener("click", () => {
              if (cellData === 'Sửa') {
                // Xử lý khi nút "Sửa" được nhấn
                handleEdit(thucDon, id);
              } else if (cellData === 'Xóa') {
                // Xử lý khi nút "Xóa" được nhấn
                handleDelete(thucDon);
              }
            });
            cell.appendChild(button);
          } else {
            cell.textContent = cellData;
          }
          row.appendChild(cell);
        });
      });

      // Xóa bảng cũ (nếu có) và thêm bảng mới vào phần tử <div>
      const existingTable = divElement.querySelector('table');
      if (existingTable) {
        existingTable.remove();
      }
      divElement.appendChild(tableElement);
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi tải dữ liệu từ API: ', error);
    });
}

// Hàm xử lý khi nút "Sửa" được nhấn
// Hàm xử lý khi nút "Sửa" được nhấn
function handleEdit(thucDon, id) {
  // Khai báo biến buildData
  let buildData = null;

  // Lấy modal và các phần tử liên quan
  const modal = document.getElementById("myModal");
  const tenMonInput = document.getElementById("tenMon");
  const imagesInput = document.getElementById("images");
  const donGiaInput = document.getElementById("donGia");
  const saveButton = document.getElementById("saveButton");
  
  // Điền thông tin món ăn vào form
  tenMonInput.value = thucDon.tenMon;
  imagesInput.value = thucDon.images;
  donGiaInput.value = thucDon.donGia;
  
  // Hiển thị modal
  modal.style.display = "block";
  
  // Sự kiện khi người dùng nhấn nút "Lưu"
  function handleSaveClick(e) {
    e.preventDefault();
    // Lấy giá trị đã chỉnh sửa từ form và tạo một bản sao của buildData
    buildData = {
      donGia: donGiaInput.value,
    };
  
    // Gỡ bỏ sự kiện lắng nghe khi sửa thành công
  
    fetch(`http://localhost:8080/updateThucDon/${thucDon.thucDonId}/${id}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // const containerElement = document.querySelector(".content");
      // containerElement.innerHTML='';
      // const existingTable = divElement.querySelector('table');
      // existingTable.innerHTML='';
      // // Gọi lại handleThucDon hoặc làm mới dữ liệu khác
      // handleThucDon();
      // // Gọi lại renderThucDon để làm mới dữ liệu
      // renderThucDon(selectedValue, divElement);
    })
    .catch(error => {
      console.log("error: " + error);
    });
  
    // Loại bỏ sự kiện "click" sau khi đã xử lý
    saveButton.removeEventListener("click", handleSaveClick);
  
    // Đóng modal
    modal.style.display = "none";
    location.reload();
  }
  
  
  // Thêm sự kiện "click" và lắng nghe cho nút "Lưu"
  saveButton.addEventListener("click", handleSaveClick);
}



// Hàm xử lý khi nút "Xóa" được nhấn
function handleDelete(thucDon) {
  const thucDonId = thucDon.thucDonId;
  fetch(`http://localhost:8080/deleteThucDon/${thucDonId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        // Xóa thành công
        console.log(`Xóa thành công: ${thucDonId}`);
        // Sau khi xóa, bạn có thể cập nhật lại trang hoặc thực hiện các hành động cần thiết.
      } else {
        // Xóa thất bại
        console.log(`Xóa không thành công: ${thucDonId}`);
      }
    })
    .catch(error => {
      console.error('Đã xảy ra lỗi khi xóa: ', error);
    });
    location.reload();
}



// Lấy modal và nút đóng modal
const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");

// Sự kiện khi người dùng nhấn nút đóng modal
closeModal.addEventListener("click", function () {
  modal.style.display = "none"; // Ẩn modal
});

