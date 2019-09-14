// Yêu cầu 1: Lấy thông tin từ người dùng nhập vào lưu trữ vào mangNhanVien. Hiển thị mảng nhân viên table bên dưới
var mangNhanVien = [];

// Load localStorage
layStorage();


document.getElementById('btnThemNV').addEventListener('click', function () {
    //Lay thong tin nhan vien
    var maNV = getValueById('msnv');
    var hoTenNV = getValueById('name');
    var emailNV = getValueById('email');
    var mkNV = getValueById('password');
    var ngaySinh = getValueById('datepicker');
    var chucVuNV = getValueById('chucvu');

    var nhanVien = new NhanVien(maNV, hoTenNV, emailNV, mkNV, ngaySinh, chucVuNV);
    // console.log(nhanVien);

    //Luu nhan vien vao mang Nhan Vien
    mangNhanVien.push(nhanVien);

    //Hien thi table dssv
    createTable();

    //Luu vao localStorage
    luuStorage();

});

function getValueById(id) {
    return document.getElementById(id).value;
}

function setValueById(id) {
    return document.getElementById(id).value;
}

function createTable() {
    var dsTheTr = '';
    for (var i = 0; i < mangNhanVien.length; i++) {

        var nv = mangNhanVien[i];
        dsTheTr += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.hoTenNV}</td>
                <td>${nv.emailNV}</td>
                <td>${nv.ngaySinh}</td>
                <td>${nv.chucVuNV}</td>
                <td>
                    <div class="d-flex">
                        <button class="btn btn-warning btnSuaNV" onclick="suaNhanVien('${nv.maNV}')" data-toggle="modal" data-target="#myModal">Edit</button>
                        <button class="btn btn-danger btnXoaNV" onclick="xoaNhanVien('${nv.maNV}')">Delete</button>
                    </div>
                </td>
            </tr>
        `
    }

    document.querySelector('#tableDanhSach').innerHTML = dsTheTr;
}

// Yêu cầu 2: Xây dựng tính năng xoá nhân viên
function xoaNhanVien(maNV) {
    // Tim kiem nhanVien trong mang dua vao maNV
    for (var i = mangNhanVien.length - 1; i >= 0; i--) {
        var nv = mangNhanVien[i];

        if (nv.maNV === maNV) {
            mangNhanVien.splice(i, 1);
        }
    }

    createTable();

    //Real
    // luuStorage();
}

// Lưu trữ dữ liệu xuống localStorage
function luuStorage() {
    // Chuyen mang du lieu(mang JSON) thanh chuoi
    var sMangNhanVien = JSON.stringify(mangNhanVien);

    //Luu xuong localStorage(la doi tuong co san cua browser)
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

// Lay du lieu tu logoStorage
function layStorage() {
    // Lay du lieu tu storage dua vao name cua storage
    if (localStorage.getItem('mangNhanVien')) { //KT storage maNhanVien co ton tai hay ko
        var sMangNhanVien = localStorage.getItem('mangNhanVien');

        // Chuyen chuoi thanh mang gan vao mangNhanVien hien tai
        mangNhanVien = JSON.parse(sMangNhanVien);

        // Goi lai tao Bang
        createTable();
    }
}

// Yeu cau 3: Xay dung tinh nang Edit nhan vien
function suaNhanVien(maNV) {
    for (var i = 0; i < mangNhanVien.length; i++) {
        if (mangNhanVien[i].maNV === maNV) {
            // Load thong tin nhan vien tu mangNhanVien > hien thi tren UI
            document.getElementById('msnv').value = mangNhanVien[i].maNV;
            document.getElementById('name').value = mangNhanVien[i].hoTenNV;
            document.getElementById('email').value= mangNhanVien[i].emailNV;
            document.getElementById('password').value = mangNhanVien[i].mkNV;
            document.getElementById('datepicker').value = mangNhanVien[i].ngaySinh;
            document.getElementById('chucvu').value = mangNhanVien[i].chucVuNV;
        }
    }
}

document.getElementById('btnCapNhat').addEventListener('click', function () {
    //Lay thong tin nhan vien moi tu form de cap nhat mangNhanVien

    var maNV = getValueById('msnv'); // MaNV ko dc thay doi
    var hoTenNV = getValueById('name');
    var emailNV = getValueById('email');
    var mkNV = getValueById('password');
    var ngaySinh = getValueById('datepicker');
    var chucVuNV = getValueById('chucvu');

    for (var i = 0; i < mangNhanVien.length; i++) {
        if (mangNhanVien[i].maNV === maNV) {
            mangNhanVien[i].hoTenNV = hoTenNV;
            mangNhanVien[i].emailNV = emailNV;
            mangNhanVien[i].mkNV = mkNV;
            mangNhanVien[i].ngaySinh = ngaySinh;
            mangNhanVien[i].chucVuNV = chucVuNV;
        }
    }

    //Hien thi table dssv
    createTable();

    //Luu vao localStorage
    // luuStorage();

});
