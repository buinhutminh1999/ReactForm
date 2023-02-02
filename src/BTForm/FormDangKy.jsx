import React, { Component } from 'react'
import { connect } from 'react-redux'
class FormDangKy extends Component {

  state = {
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
  }

  onChangeForm = (event) => {
    let { value, name } = event.target
    let mess = ''
    let flag = 'none';
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (name == 'email' && !reg.test(value) && !value == '') {
      mess = `${name} không hợp lệ`
      flag = 'block'
    }

    if (value == '') {
      mess = `${name} không được để trống`
      flag = 'block'
    }

    if(name == 'maLoaiND' && value == 0){
      flag = 'block'
      mess = `Vui lòng chọn ${name}`
      console.log('test loại nd')
    }

    for (const key in this.state.error) {
      if (!this.state.error[key] == '') {
        flag = 'block';
      }
    }

    this.setState({
      value: { ...this.state.value, [name]: value },
      error: { ...this.state.error, [name]: mess },
      dBlockorNone: flag
    }, () => { console.log(this.state.error) })
  }

  handleOnSubmit = (event) => {

    event.preventDefault();
    let obj = { ...this.state.error };
    let dBlockorNone = 'none';
    let flag = true;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    for (const key in this.state.value) {
      if (this.state.value[key] == '' || this.state.value[key] === 'Chọn loại người dùng') {
        obj = { ...obj, [key]: `${key} không được để trống` }
        dBlockorNone = 'block'
        flag = false;
      }
    }

    if (!this.state.error.email == '') {
      dBlockorNone = 'block'
      flag = false;
    }

    if (flag) {
      this.props.dispatch({
        type: 'THEM_ND',
        obj: this.state.value
      })
    }

    this.setState({
      error: obj,
      dBlockorNone
    }, () => { console.log(this.state.error) })
  }


//   static getDerivedStateFromProps (newProps, currentState) {
//     if (newProps.xemChiTiet.taiKhoan !== currentState.value.taiKhoan) {
  
//       return { ...currentState, value: newProps.xemChiTiet }
//     }
//     return currentState.value
   
//   }

  componentWillReceiveProps(props){
    this.setState({
      value: props.xemChiTiet
    })
  }

  updateHandleInput = (event) => {
    event.preventDefault();
    let flag = true;
    let dBlockorNone = 'none';
    for (const key in this.state.error) {
     if(!this.state.error[key] == ''){
      flag = false
    
     }

    }
    if(flag){
      this.props.dispatch({
        type: 'CAP_NHAT_VALUE',
        updateVal: this.state.value
      })
    }


   }

  render() {
    let { taiKhoan,
      hoTen,
      matKhau,
      email,
      sdt,
      maLoaiND } = this.state.value
    return (
      <div className="form-Reg">
        <p className='bg-primary fs-5'>Form Đăng Ký</p>
        <form >
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <input type="text" name="taiKhoan" value={taiKhoan} onChange={this.onChangeForm} className="form-control" placeholder="Tài khoản" />
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.taiKhoan}
                </div>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <input type="text" name="hoTen" value={hoTen} onChange={this.onChangeForm} className="form-control" placeholder="Họ tên" />
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.hoTen}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <input type="password" name="matKhau" value={matKhau} onChange={this.onChangeForm} className="form-control" placeholder="mật khẩu" />
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.matKhau}
                </div>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <input type="text" name='email' value={email} onChange={this.onChangeForm} className="form-control" placeholder="email" />
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.email}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <input type="text" name="sdt" value={sdt} onChange={this.onChangeForm} className="form-control" placeholder="số điện thoại" />
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.sdt}
                </div>
              </div>

            </div>
            <div className="col-6">
              <div className="form-group">
                <select className="custom-select" name='maLoaiND' value={maLoaiND} onChange={this.onChangeForm}>
                  <option value='0'>Chọn loại người dùng</option>
                  <option value="Khách hàng">Khách hàng</option>
                  <option value="Doanh nghiệp">Doanh nghiệp</option>
                </select>
                <div className="invalid-feedback" style={{ display: this.state.dBlockorNone }}>
                  {this.state.error.maLoaiND}
                </div>
              </div>
            </div>
          </div>
          {this.props.statusAddorUpdate ? <button className='btn btn-secondary' onClick={this.handleOnSubmit}>Thêm người dùng</button> : <button className='btn btn-secondary' onClick={this.updateHandleInput}>Cập nhật</button>}
        </form>
      </div>
    )
  }
}

const mapStatetoProps = (rootReducer) => {
  return {
    xemChiTiet: rootReducer.LTBTQLND.xemChiTiet,
    statusAddorUpdate: rootReducer.LTBTQLND.statusAddorUpdate
  }
}

export default connect(mapStatetoProps)(FormDangKy)