const initialState = {
    mangNguoiDung: [
       
    ],


    xemChiTiet: {
        taiKhoan: '',
        hoTen: '',
        matKhau: '',
        email: '',
        sdt: '',
        maLoaiND: 'Chọn loại người dùng'
    },
    statusAddorUpdate: true,

    value: {
        taiKhoan: '',
        hoTen: '',
        matKhau: '',
        email: '',
        sdt: '',
        maLoaiND: 'Chọn loại người dùng'
    },
    error: {
        taiKhoan: '',
        hoTen: '',
        matKhau: '',
        email: '',
        sdt: '',
        maLoaiND: ''
    },
    dBlockorNone: 'none',
    dataReduce: []

}

export const LTBTQLND = (state = initialState, action) => {
    switch (action.type) {
        case 'THEM_ND':
            state.mangNguoiDung = [...state.mangNguoiDung, action.obj]
            state.dataReduce = [...state.mangNguoiDung]
            return { ...state }
        case 'XEM_CHI_TIET':
            state.statusAddorUpdate = false
            state.xemChiTiet = action.xemChiTiet
            return { ...state }
        case 'XOA_ND':
            let newArr = state.mangNguoiDung.filter(item => item.taiKhoan !== action.taiKhoanXoa)
            state.mangNguoiDung = newArr
            return { ...state }

        case 'CAP_NHAT_VALUE':
            let index = state.mangNguoiDung.findIndex(item => item.taiKhoan == action.updateVal.taiKhoan)

            if (index > -1) {
                state.mangNguoiDung[index] = action.updateVal
                state.mangNguoiDung = [...state.mangNguoiDung]
                return { ...state }
            }
            return state
        case 'NHAP_DU_LIEU':
            state.value = action.value
            state.error = action.error
            state.dBlockorNone = action.dBlockorNone
            return { ...state }
        case 'KIEM_TRA_SUBMIT':
            state.error = action.error
            state.dBlockorNone = action.dBlockorNone
            return { ...state }
        case 'TIM_KIEM':

            state.mangNguoiDung = action.flag

            return { ...state }
        default:
            return state
    }
}
