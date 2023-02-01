import React, { Component } from 'react'
import ChiTietNguoiDung from './ChiTietNguoiDung'
import FormDangKy from './FormDangKy'

export default class QLND extends Component {
    render() {
        return (
            <div className='container-fluid border border-info rounded'>
                <FormDangKy/>
                <ChiTietNguoiDung/>
            </div>
        )
    }
}
