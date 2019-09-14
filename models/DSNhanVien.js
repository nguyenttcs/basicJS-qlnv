function DSNhanVien() {
    this.dssv = [];

    this.themNhanVien = function (nhanVien) {
        this.dssv.push(nhanVien);
    }

    this.xoaNhanVien = function (nhanVien) {
        var dssv = this.dssv;
        for (var i = 0; i < dssv.length; i++) {
            if (dssv[i].maNV === nhanVien.maNV) {
                dssv.splice(i, 1);
            }
        }
    }

    
    
}