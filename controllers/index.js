// Yêu cầu 1: Lấy thông tin từ người dùng nhập vào lưu trữ vào mangNhanVien. Hiển thị mảng nhân viên table bên dưới
var mangNhanVien = [];

// Load localStorage
layStorage();

// Reset form
document.getElementById('btnThem').addEventListener('click', function () {
    // Reset Form
    resetForm();

    //Hidden CapNhat button
    setShowButton('none','block');
})

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
    createTable(mangNhanVien);

    //Luu vao localStorage
    luuStorage();

});

function getValueById(id) {
    return document.getElementById(id).value;
}

function setValueById(id, val) {
    document.getElementById(id).value = val;
}

function createTable(mangNV) {
    var dsTheTr = '';
    for (var i = 0; i < mangNV.length; i++) {

        var nv = mangNV[i];
        dsTheTr += `
            <tr>
                <td>${nv.maNV}</td>
                <td>${nv.hoTenNV}</td>
                <td>${nv.emailNV}</td>
                <td>${nv.ngaySinh}</td>
                <td>${nv.chucVuNV}</td>
                <td>
                    <div class="d-flex btn-group">
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

    createTable(mangNhanVien);

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
        createTable(mangNhanVien);
    }
}

// Yeu cau 3: Xay dung tinh nang Edit nhan vien
function suaNhanVien(maNV) {

    //Visible CapNhat button
    setShowButton('block','none');

    for (var i = 0; i < mangNhanVien.length; i++) {
        if (mangNhanVien[i].maNV === maNV) {
            // Load thong tin nhan vien tu mangNhanVien > hien thi tren UI
            document.getElementById('msnv').value = mangNhanVien[i].maNV;
            document.getElementById('name').value = mangNhanVien[i].hoTenNV;
            document.getElementById('email').value = mangNhanVien[i].emailNV;
            document.getElementById('password').value = mangNhanVien[i].mkNV;
            document.getElementById('datepicker').value = mangNhanVien[i].ngaySinh;
            document.getElementById('chucvu').value = mangNhanVien[i].chucVuNV;
        }
    }

    //disable the input#msnv
    document.getElementById('msnv').setAttribute('disabled', 'disabled');
}

document.getElementById('btnCapNhat').addEventListener('click', function () {
    //Lay thong tin nhan vien moi tu form de cap nhat mangNhanVien

    var maNV = getValueById('msnv'); // MaNV ko dc thay doi
    var hoTenNV = getValueById('name');
    var emailNV = getValueById('email');
    var mkNV = getValueById('password');
    var ngaySinh = getValueById('datepicker');
    var chucVuNV = getValueById('chucvu');

    var nvCapNhat = new NhanVien(maNV, hoTenNV, emailNV, mkNV, ngaySinh, chucVuNV);

    for (var i = 0; i < mangNhanVien.length; i++) {
        if (mangNhanVien[i].maNV === nvCapNhat.maNV) {
            mangNhanVien[i] = nvCapNhat;
        }
    }

    //Hien thi table dssv
    createTable(mangNhanVien);

    //Luu vao localStorage
    // luuStorage();

});

// Function Reset Form to defauft value
function resetForm() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    setValueById('msnv', '');
    setValueById('name', '');
    setValueById('email', '');
    setValueById('password', '');
    setValueById('datepicker', today);
    setValueById('chucvu', 'Chọn chức vụ');

    document.getElementById('msnv').removeAttribute('disabled');

}

/** 
 * @param {btn capnhat} ds1 
 * @param {btn them} ds2 
 */
function setShowButton(ds1, ds2){
    //Hidden CapNhat button
    document.getElementById('btnCapNhat').style.display = ds1;
    document.getElementById('btnThemNV').style.display = ds2;
}

// Yeu Cau 5: Thuc hien chuc nang tim kiem nhan vien
function timKiemNhanVien(tuKhoa){
    if(tuKhoa == ""){
        // layStorage();
        createTable(mangNhanVien);
    }
    var mangNVTimKiem = [];

    //Bien doi tuKhoa thanh chu thuong 
    tuKhoa = tuKhoa.toLowerCase();

    //Lay thong tin nguoi dung nhap vao
    //Tim nhan vien trong mang co ten trung voi ten nguoi dung nhap vao ko
    //Neu trung thi push vao mangVNTimKiem

    // Dung ham search() or indexOf
    for(var i=0; i<mangNhanVien.length;i++){
        if(mangNhanVien[i].hoTenNV.toLowerCase().trim().indexOf(tuKhoa) !== -1){
            mangNVTimKiem.push(mangNhanVien[i]);
        }
    }

    // if(mangNhanVien.length <= 0) return mangNhanVien;
    
    return mangNVTimKiem;
}

document.getElementById('btnTimNV').addEventListener('click', function(){
    var tuKhoa = getValueById('searchName');

    mangTimKiemNhanVien = timKiemNhanVien(tuKhoa);

    createTable(mangTimKiemNhanVien);
     
})