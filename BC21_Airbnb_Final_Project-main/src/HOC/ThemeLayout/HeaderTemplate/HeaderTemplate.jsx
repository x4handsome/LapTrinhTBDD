import { Tabs, DatePicker, Popover, Menu, message } from "antd";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {
  faBars,
  faGlobe,
  faMagnifyingGlass,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userPic from "../../../assets/img/user_pic.png";
import styled from "../css/HeaderTemplate.css";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "antd/lib/menu/MenuItem";
import {
  getDanhSachViTri,
  selectDanhSachViTri,
  setDanhSachViTri,
} from "../../../redux/viTriSlice";
import { localSearchStorageService } from "../../../services/localService";
import { dangXuat } from "../../../redux/authSlice";

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const dateFormat = "DD/MM/YYYY";

const TangSoLuong = 1;
const GiamSoLuong = -1;

export default function HeaderTemplate() {
  const { userLogin } = useSelector((state) => state.authSlice);
  console.log(userLogin);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getDanhSachViTri());
  }, []);

  let danhSachViTri = useSelector(selectDanhSachViTri);

  let DanhSachLoaitKhach = [
    {
      ten: "Người lớn",
      moTa: "Từ 13 tuổi trở lên",
    },
    {
      ten: "Trẻ em",
      moTa: "Độ tuổi 2 - 12",
    },
    {
      ten: "Em bé",
      moTa: "Dưới 2 tuổi",
    },
    {
      ten: "Thú cưng",
      moTa: "Mang theo động vật cần được phục vụ?",
    },
  ];

  let [datPhong, setDatPhong] = useState({
    idViTri: "",
    tenViTri: "",
    ngayNhanPhong: "",
    ngayTraPhong: "",
    khach: DanhSachLoaitKhach.map((khach, index) => {
      return {
        loaiKhach: khach.ten,
        soLuong: 0,
      };
    }),
  });

  const [visible, setVisible] = useState(false);

  const hide = () => {
    setVisible(false);
  };

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const renderDanhSachViTri = () => {
    return danhSachViTri.map((viTri, index) => {
      return (
        <p
          key={index}
          className="cursor-pointer hover:bg-neutral-200"
          onClick={() => {
            setDatPhong({
              ...datPhong,
              idViTri: viTri._id,
              tenViTri: viTri.name,
            });
          }}
        >
          {viTri.name} | {viTri.province}
        </p>
      );
    });
  };

  const contentViTri = (
    <div className="h-52 overflow-y-scroll">{renderDanhSachViTri()}</div>
  );

  const onChangeDatePicker = (key, dateString) => {
    let NgayNhanPhong = dateString[0];
    let NgayTraPhong = dateString[1];
    setDatPhong({
      ...datPhong,
      ngayNhanPhong: NgayNhanPhong,
      ngayTraPhong: NgayTraPhong,
    });
  };

  const ThayDoiSoLuongLoaiKhach = (loaiKhach, giaTri) => {
    let indexLoaiKhach = datPhong.khach.findIndex((item) => {
      return item.loaiKhach === loaiKhach;
    });

    if (indexLoaiKhach !== -1) {
      let capNhatSoLuongLoaiKhach = [...datPhong.khach];
      capNhatSoLuongLoaiKhach[indexLoaiKhach].soLuong += giaTri;
      if (capNhatSoLuongLoaiKhach[indexLoaiKhach].soLuong < 0) {
        capNhatSoLuongLoaiKhach[indexLoaiKhach].soLuong = 0;
      }
      setDatPhong({
        ...datPhong,
        khach: capNhatSoLuongLoaiKhach,
      });
    }
  };

  const renderLoaiKhach = () => {
    return DanhSachLoaitKhach.map((Khach, index) => {
      let soLuongLoaiKhach = () => {
        for (let key in datPhong.khach) {
          if (datPhong.khach[key].loaiKhach === Khach.ten) {
            return datPhong.khach[key].soLuong;
          }
        }
      };
      return (
        <div
          key={index}
          className="w-full mb-2 grid grid-cols-3 border-solid border-0 border-b border-b-neutral-300 pb-2"
        >
          <div className="col-span-2 flex flex-wrap align-middle">
            <p className="w-full my-auto font-bold">{Khach.ten}</p>
            <p className="w-full my-auto">{Khach.moTa}</p>
          </div>
          <div className="col-span-1 ml-3 flex justify-between items-center">
            <button
              className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
              onClick={() => {
                ThayDoiSoLuongLoaiKhach(Khach.ten, GiamSoLuong);
              }}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <p className="my-auto">{soLuongLoaiKhach()}</p>
            <button
              className="w-8 h-8 rounded-full cursor-pointer border border-neutral-300 active:shadow-lg active:bg-neutral-300"
              onClick={() => {
                ThayDoiSoLuongLoaiKhach(Khach.ten, TangSoLuong);
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      );
    });
  };

  const renderTongSoLuongKhach = datPhong.khach.reduce((total, item) => {
    return (total += item.soLuong);
  }, 0);

  const contentLoaitKhach = <div className="w-full">{renderLoaiKhach()}</div>;

  let handleLogout = () => {
    dispatch(dangXuat());
    navigate("/");
  };

  const contentMenuBar = (
    <Menu className="w-52">
      {userLogin ? (
        <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
          <Link to={`/user/${userLogin._id}`}>Tài khoản</Link>
        </MenuItem>
      ) : (
        <>
          <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
            <Link to={"/register"}>Đăng ký</Link>
          </MenuItem>
          <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
            <Link to={"/login"}>Đăng nhập</Link>
          </MenuItem>
        </>
      )}
      <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
        <Link to={"/"}>Cho thuê nhà</Link>
      </MenuItem>
      <MenuItem className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300">
        <Link to={"/"}>Tổ chức trải nghiệm</Link>
      </MenuItem>
      {userLogin ? (
        <MenuItem
          onClick={() => handleLogout()}
          className="w-full text-base border-solid border-0 border-b border-b-neutral-300 pb-2 hover:bg-neutral-300"
        >
          Đăng xuất
        </MenuItem>
      ) : (
        ""
      )}
    </Menu>
  );

  const handleSearch = () => {
    if (datPhong.idViTri.trim() !== "") {
      localSearchStorageService.setSearchInfoLocal(datPhong);
      navigate(`/search/${datPhong.idViTri}`);
    } else {
      message.error("Vui lòng chọn địa điểm bạn muốn tìm phòng");
    }
  };

  return (
    <div className="header w-full pt-5 pb-5 bg-white shadow-md">
      <div className="header-container w-11/12 mx-auto grid grid-cols-12">
        <Link to={"/"}>
          <div className="col-span-1 cursor-pointer">
            <img className="w-full" src="../img/airbnb-logo3.png" />
          </div>
        </Link>
        <div className="search-bar-container col-span-8 w-full ml-10">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Chỗ ở" key="1">
              <div className="search-bar-container">
                <div className="search-bar-inner w-full grid grid-cols-12 bg-gray-100 rounded-full border-solid border border-neutral-300">
                  <Popover
                    className="location-input-block col-span-5 h-16 rounded-full px-5 py-2 cursor-pointer"
                    content={contentViTri}
                    title="Tìm kiếm phòng theo khu vực"
                    trigger="focus"
                  >
                    <label className="location-input-name w-full font-bold pointer-events-none">
                      Địa điểm
                    </label>
                    <input
                      value={datPhong.tenViTri}
                      className="location-input w-full bg-transparent border-none focus:outline-none"
                      placeholder="Tìm kiếm phòng theo khu vực"
                    />
                  </Popover>
                  <div className="date-input-block col-span-4 h-16 bg-transparent cursor-pointer flex flex-row flex-wrap items-stretch relative">
                    <div className="date-input-item w-6/12 py-2 relative">
                      <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                        Nhận phòng
                      </span>
                    </div>
                    <div className="date-input-item w-6/12 py-2 relative">
                      <span className="date-input-name w-full absolute z-20 font-bold flex items-start justify-center pointer-events-none">
                        Trả phòng
                      </span>
                    </div>
                    <RangePicker
                      className="date-picker-container"
                      format={dateFormat}
                      onChange={onChangeDatePicker}
                    />
                  </div>
                  <div className="col-span-3 h-16 px-2 rounded-full flex justify-between cursor-pointer hover:bg-gray-200">
                    <Popover
                      overlayClassName="rounded-lg"
                      className="pl-3 py-2 w-full bg-transparent border-none"
                      content={contentLoaitKhach}
                      trigger="click"
                    >
                      <label className="w-full font-bold pointer-events-none">
                        Khách
                      </label>
                      {renderTongSoLuongKhach > 0 ? (
                        <p className="w-full text-gray-800 pointer-events-none">
                          {renderTongSoLuongKhach} khách
                        </p>
                      ) : (
                        <p className="w-full text-gray-400 pointer-events-none">
                          Chọn khách
                        </p>
                      )}
                    </Popover>
                    <button
                      className="rounded-full w-14 h-12 my-auto border-none bg-rose-500 text-white cursor-pointer z-50 active:bg-rose-700 active:shadow-lg"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      <FontAwesomeIcon
                        className="pointer-events-none"
                        icon={faMagnifyingGlass}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab="Trải nghiệm" key="2">
              Trải nghiệm
            </TabPane>
          </Tabs>
        </div>
        <div className="col-span-3 flex justify-end">
          <div>
            <button
              type="button"
              className="bg-inherit border-none cursor-pointer text-base px-4 h-10 rounded-full hover:bg-gray-100"
            >
              Trở thành chủ nhà
            </button>
          </div>
          <div className="mx-3">
            <button className="bg-inherit border-none cursor-pointer text-base w-10 h-10 rounded-full hover:bg-gray-100">
              <FontAwesomeIcon icon={faGlobe} />
            </button>
          </div>
          <div>
            <Popover
              className="w-20 h-10 rounded-full cursor-pointer flex justify-around items-center bg-white border-solid border border-neutral-300 hover:shadow-lg"
              content={<a onClick={hide}>{contentMenuBar}</a>}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <FontAwesomeIcon className="text-base" icon={faBars} />
              {userLogin ? (
                <img
                  style={{ width: 35, height: 35 }}
                  className="rounded-full"
                  src={userLogin.avatar ? userLogin.avatar : userPic}
                  alt={userLogin.avatar ? userLogin.avatar : userPic}
                />
              ) : (
                <FontAwesomeIcon className="text-3xl" icon={faCircleUser} />
              )}
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
