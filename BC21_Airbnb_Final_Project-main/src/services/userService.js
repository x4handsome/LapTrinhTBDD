import { httpService } from "./configURL";

export const userService = {
    layDanhSachNguoiDung: (limit) => {
        return httpService.get(`/api/users/pagination?skip=0&limit=${limit}`);
    },

    layThongTinChiTietNguoiDung: (idNguoiDung) => {
        return httpService.get(`/api/users/${idNguoiDung}`);
    },

    xoaNguoiDung: (idNguoiDung) => {
        return httpService.delete(`/api/users/${idNguoiDung}`);
    },

    taoNguoiDung: (dataForm) => {
        return httpService.post(`/api/users`, dataForm);
    },

    capNhatAnhDaiDienNguoiDung: (idNguoiDung, dataForm) => {
        return httpService.post(`/api/users/upload-avatar/${idNguoiDung}`, dataForm);
    },

    chinhSuaNguoiDung: (idNguoiDung, dataForm) => {
        return httpService.post(`/api/users/${idNguoiDung}`, dataForm);
    },
};