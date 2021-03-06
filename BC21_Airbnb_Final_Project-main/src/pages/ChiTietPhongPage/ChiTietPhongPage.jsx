import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
    bookRoom,
    getRoomDetail,
    resetBookingStatus,
} from "../../redux/phongSlice";
import { getDanhSachDanhGiaPhong } from "../../redux/danhGiaSlice";
import moment from "moment";
// import { FaStar, FaMedal, FaAirbnb, FaBed } from "react-icons/fa";
// import { BsTranslate } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faStar, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { convertLocaleString } from "../../utils/stringFormatUtils";
import RoomFeatureList from "./RoomFeature/RoomFeatureList";
import RangeDatePicker from "./RangeDatePicker/RangeDatePicker";
import Bed from "../../assets/img/room-convenience/bed.png";
import CommentContainer from "./Comment/CommentContainer";
import CommentModal from "./Comment/CommentModal";
import ModalDirect from "./ModalDirect";
import ChooseCustomer from "../../components/ChooseCustomer/ChooseCustomer";
import { animateScroll as scroll, scroller, Element } from "react-scroll";
export default function ChiTietPhongPage() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { accessToken } = useSelector((state) => state.authSlice);
    const { thongTinChiTietPhong } = useSelector((state) => state.phongSlice);
    const { danhSachDanhGia } = useSelector((state) => state.danhGiaSlice);
    const { isBookedSuccess } = useSelector((state) => state.phongSlice);
    const [roomFeatures, setRoomFeatures] = useState({});
    const { id } = useParams();
    const [isModalCommentOpen, setIsModalCommentOpen] = useState(false);
    const [isModalDirectOpen, setIsModalDirectOpen] = useState(false);

    const [customerQuantity, setCustomerQuantity] = useState(0);
    const [daysOfBooking, setDaysOfBooking] = useState(0);
    const [bookingTime, setBookingTime] = useState({
        checkIn: "",
        checkOut: "",
    });
    const modalDetailLogin = {
        title: "Vui l??ng ????ng nh???p ????? ?????t v??",
        message: "????? ?????t v?? c???n ????ng nh???p t??i kho???n",
        actions: [
            { type: "normal", path: "/", name: "Quay v??? trang ch???" },
            {
                type: "primary",
                path: "/login",
                redirect: location.pathname,
                name: "????ng nh???p",
            },
        ],
    };
    const modalDetailSuccessBooking = {
        title: "?????t v?? th??nh c??ng",
        message: "Ch??c b???n c?? m???t k?? ngh??? tuy???t v???i.",
        actions: [
            { type: "normal", path: "/", name: "Quay v??? trang ch???" },
            { type: "primary", path: "/user", name: "Xem v?? v???a ?????t" },
        ],
    };
    const [modalDirectDetail, setModalDirectDetail] =
        useState(modalDetailLogin);
    const [ableToBook, setAbleToBook] = useState(false);
    useEffect(() => {
        dispatch(getRoomDetail(id));
        dispatch(getDanhSachDanhGiaPhong(id));
    }, []);
    useEffect(() => {
        const features = {
            cableTV: thongTinChiTietPhong?.cableTV,
            dryer: thongTinChiTietPhong?.dryer,
            elevator: thongTinChiTietPhong?.elevator,
            gym: thongTinChiTietPhong?.gym,
            heating: thongTinChiTietPhong?.heating,
            hotTub: thongTinChiTietPhong?.hotTub,
            indoorFireplace: thongTinChiTietPhong?.indoorFireplace,
            kitchen: thongTinChiTietPhong?.kitchen,
            pool: thongTinChiTietPhong?.pool,
            wifi: thongTinChiTietPhong?.wifi,
        };
        setRoomFeatures({ ...features });
    }, [thongTinChiTietPhong]);

    const onDatePickerChange = (key, data) => {
        setBookingTime({
            checkIn: moment(data[0]).format(),
            checkOut: moment(data[1]).format(),
        });
    };
    useEffect(() => {
        const temp =
            moment(bookingTime.checkOut).diff(bookingTime.checkIn, "days") + 1;
        if (temp) setDaysOfBooking(temp);
        console.log(bookingTime);
    }, [bookingTime]);

    useEffect(() => {
        if (
            bookingTime.checkIn == "Invalid date" ||
            bookingTime.checkOut == "Invalid date" ||
            customerQuantity == 0
        )
            setAbleToBook(false);
        else setAbleToBook(true);
    }, [customerQuantity, bookingTime]);
    useEffect(() => {
        if (!accessToken) {
            setModalDirectDetail(modalDetailLogin);
            setIsModalDirectOpen(true);
        }
    }, [accessToken]);
    useEffect(() => {
        if (isBookedSuccess) {
            setModalDirectDetail(modalDetailSuccessBooking);
            setIsModalDirectOpen(true);
        }
    }, [isBookedSuccess]);
    useEffect(() => {
        return () => {
            dispatch(resetBookingStatus());
        };
    }, []);
    const handleBooking = () => {
        const bookingData = {
            roomId: id,
            ...bookingTime,
        };
        // console.log(bookingData);
        dispatch(bookRoom(bookingData));
    };
    const handleChooseCustomer = (totalCustomers, customerList) => {
        setCustomerQuantity(totalCustomers);
        console.log(totalCustomers, customerList);
    };
    const renderBedRoom = () => {
        const components = [];
        for (let i = 0; i < thongTinChiTietPhong.bedRoom; i++)
            components.push(<img src={Bed} className="w-[30px] h-[30px]" />);
        return components;
    };
    const toggleModal = () => {
        setIsModalCommentOpen(!isModalCommentOpen);
    };
    const countTotalCost = () => {
        return daysOfBooking * thongTinChiTietPhong.price;
    };
    const scrollTo = (element) => {
        scroller.scrollTo(element, {
            duration: 1500,
            delay: 0,
            smooth: "easeInOutQuart",
            offset: -100,
        });
    };
    document.title = `${thongTinChiTietPhong.name} - Airbnb`;
    return (
        <div>
            <ModalDirect
                isModalOpen={isModalDirectOpen}
                modalDetail={modalDirectDetail}
            />
            <CommentModal
                isModalOpen={isModalCommentOpen}
                toggleModal={toggleModal}
            />
            <div className="container mx-auto py-10 px-2 ">
                <div>
                    {/* Room header */}
                    <div>
                        <h1 className=" font-bold text-3xl flex gap-2 items-center">
                            <span> {thongTinChiTietPhong.name}</span>
                        </h1>
                        <div className="flex gap-2 items-center text-lg">
                            <span className="flex gap-2 items-center">
                                <FontAwesomeIcon className="" icon={faStar} />
                                <span className=" font-semibold">4.83</span>
                            </span>
                            <span className="text-slate-500">.</span>
                            <span
                                className="flex gap-2 items-center"
                                onClick={() => {
                                    scrollTo("commentContainer");
                                }}
                            >
                                <FontAwesomeIcon className="" icon={faMedal} />
                                <span className=" underline  font-semibold cursor-pointer">
                                    {danhSachDanhGia.length} ????nh gi??
                                </span>
                            </span>
                            <span className="text-slate-500">.</span>
                            <Link to="/search/">
                                <span className="underline text-black font-semibold">
                                    <span>
                                        {thongTinChiTietPhong?.locationId?.name}{" "}
                                        -{" "}
                                        {
                                            thongTinChiTietPhong?.locationId
                                                ?.province
                                        }
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </div>
                    {/* Room image */}
                    <div className=" h-96 my-5 grid grid-cols-2 gap-5">
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="h-full w-full rounded-3xl"
                        />
                        <img
                            src={thongTinChiTietPhong.image}
                            alt=""
                            className="h-full w-full rounded-3xl"
                        />
                    </div>
                    {/* Room Info */}
                    <div className="flex w-full gap-[100px] pt-5">
                        <div className="w-[70%]">
                            {/* Room owner */}
                            <div className="flex justify-between items-center py-5 border-b-[2px] border-slate-200">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        C??n h??? {thongTinChiTietPhong.name} . Ch???
                                        nh??: XYZ
                                    </h2>
                                    <p className="flex gap-2">
                                        <span>
                                            {thongTinChiTietPhong.guests} kh??ch
                                        </span>
                                        <span className="text-slate-500">
                                            .
                                        </span>

                                        <span>
                                            {thongTinChiTietPhong.bedRoom} ph??ng
                                            ng???
                                        </span>
                                        <span className="text-slate-500">
                                            .
                                        </span>

                                        <span>
                                            {thongTinChiTietPhong.bath} ph??ng
                                            t???m
                                        </span>
                                    </p>
                                </div>
                                <div className="cursor-pointer relative">
                                    <img
                                        src={thongTinChiTietPhong.image}
                                        alt=""
                                        className="rounded-full w-[70px] h-[70px]"
                                    />
                                    <span className="absolute -right-1 -bottom-[10px] bg-white w-[40px] h-[40px] flex justify-center items-center rounded-full border-[1px] border-slate-400 text-xl text-yellow-500">
                                        <FontAwesomeIcon
                                            className=""
                                            icon={faMedal}
                                        />
                                    </span>
                                </div>
                            </div>

                            {/* hardcode Chu nha sieu cap */}
                            <div className="py-5 border-b-[2px] border-slate-200">
                                <div className="flex gap-5 items-center">
                                    <div className=" text-xl">
                                        <FontAwesomeIcon
                                            className=""
                                            icon={faMedal}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg mb-0">
                                            XYZ l?? Ch??? nh?? si??u c???p
                                        </h4>
                                        <span className=" text-gray-500">
                                            Ch??? nh?? si??u c???p l?? nh???ng ch??? nh?? c??
                                            kinh nghi???m, ???????c ????nh gi?? cao v?? l??
                                            nh???ng ng?????i cam k???t mang l???i qu??ng
                                            th???i gian ??? tuy???t v???i cho kh??ch.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Bed*/}
                            <div className="py-5 border-b-[2px] border-slate-200">
                                <h4 className="text-2xl font-semibold mb-0">
                                    N??i b???n s??? ngh??? ng??i
                                </h4>
                                <div className="mt-5 grid grid-cols-4">
                                    <div className="p-10 border-slate-300 border rounded-md inline-block text-lg">
                                        <div className=" flex gap-5 justify-center">
                                            {renderBedRoom()}
                                        </div>
                                        <span className=" block mt-2 font-semibold text-center">
                                            {thongTinChiTietPhong.bedRoom} ph??ng
                                            ng???
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* Description */}
                            <div className="py-5 border-b-[2px] border-slate-200">
                                <div className="py-3 px-5 border-[1px] border-slate-700 flex items-center justify-between text-lg rounded cursor-pointer">
                                    <span>D???ch sang ti???ng vi???t</span>
                                    <span>
                                        <FontAwesomeIcon
                                            className=""
                                            icon={faLanguage}
                                        />
                                    </span>
                                </div>
                                <p className="text-lg mt-5 mb-0">
                                    {thongTinChiTietPhong.description}
                                </p>
                            </div>
                            {/* Room Features */}
                            <div className="py-5 border-b-[2px] border-slate-200">
                                <h2 className="text-2xl font-semibold">
                                    N??i n??y c?? nh???ng g?? cho b???n
                                </h2>
                                <div>
                                    <RoomFeatureList
                                        featureList={roomFeatures}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Booking */}
                        <div className="w-[30%] relative">
                            <div className="border border-slate-300 rounded-md p-5 shadow sticky top-1">
                                <div className="flex justify-between items-center">
                                    <span className="flex gap-2 items-center">
                                        <span className="font-semibold text-xl">
                                            ??{" "}
                                            {convertLocaleString(
                                                thongTinChiTietPhong.price
                                            )}
                                        </span>
                                        <span>/ ????m</span>
                                    </span>
                                    <span className="flex gap-2 items-center">
                                        <FontAwesomeIcon
                                            className=""
                                            icon={faMedal}
                                        />
                                        <span
                                            className=" underline  font-semibold cursor-pointer text-slate-500"
                                            onClick={() => {
                                                scrollTo("commentContainer");
                                            }}
                                        >
                                            {danhSachDanhGia.length} ????nh gi??
                                        </span>
                                    </span>
                                </div>

                                <div className="my-5 border border-slate-300 rounded-md">
                                    <div className="w-full flex relative pt-3 pb-8">
                                        <div className="w-[1px] bg-slate-300 absolute top-0 left-1/2 h-full z-10"></div>
                                        <div className="w-1/2 cursor-pointer pl-4">
                                            <span className="font-semibold">
                                                Nh???n ph??ng
                                            </span>
                                        </div>
                                        <div className="w-1/2 cursor-pointer pl-4">
                                            <span className="font-semibold">
                                                Tr??? ph??ng
                                            </span>
                                        </div>
                                        <div className="absolute bottom-0 w-full">
                                            <RangeDatePicker
                                                onChange={onDatePickerChange}
                                            ></RangeDatePicker>
                                        </div>
                                    </div>
                                    <div className="w-full p-4 border-t cursor-pointer">
                                        <div>
                                            <ChooseCustomer
                                                limit={
                                                    thongTinChiTietPhong?.guests
                                                }
                                                handleChooseCustomer={
                                                    handleChooseCustomer
                                                }
                                            ></ChooseCustomer>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={`${
                                        !ableToBook
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 "
                                    } text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out`}
                                    // className="bg-gradient-to-r from-rose-500 via-rose-600 to-rose-500 text-center text-white font-semibold text-lg block py-2 w-full rounded-md hover:bg-gradient-to-l  duration-300 ease-in-out"
                                    onClick={handleBooking}
                                    disabled={!ableToBook}
                                >
                                    ?????t Ph??ng
                                </button>
                                <div className="mt-2">
                                    <p className="text-gray-700 text-center">
                                        B???n v???n ch??a b??? tr??? ti???n
                                    </p>
                                    <div className="flex justify-between text-lg text-gray-500">
                                        <span className="underline">
                                            <span>
                                                ??{" "}
                                                {convertLocaleString(
                                                    thongTinChiTietPhong.price
                                                )}{" "}
                                                x {daysOfBooking} ????m
                                            </span>
                                        </span>
                                        <span> ?? {countTotalCost()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Comment */}
                    <div className="comment py-5">
                        <h2 className="text-2xl font-semibold">
                            <span>
                                <span>C?? </span>
                                {danhSachDanhGia.length}
                                <span> ????nh gi??</span>
                            </span>
                        </h2>
                        <div className="">
                            <Element name="commentContainer" className="py-10">
                                {<CommentContainer toggleModal={toggleModal} />}
                            </Element>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
