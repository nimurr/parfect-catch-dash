import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Pagination, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useCreateCouponCodeMutation, useDeleteCouponCodeMutation, useEditCouponCodeMutation, useGenerateCouponCodeMutation, useGetCouponCodeQuery } from "../../redux/features/couponCode/couponCode";
import Swal from "sweetalert2";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

export default function CouponCode() {
    const page = 1;
    const limit = 10;

    const { data: couponCodes, isLoading, refetch } = useGetCouponCodeQuery({ page, limit });
    const apiList = couponCodes?.attributes || [];
    const [createCouponCode] = useCreateCouponCodeMutation();
    const [editCouponCode] = useEditCouponCodeMutation();
    const [deleteCouponCode] = useDeleteCouponCodeMutation();

    const [list, setList] = useState([]);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [mode, setMode] = useState("add"); // "add" or "edit"

    const [form] = Form.useForm();

    useEffect(() => {
        if (Array.isArray(apiList)) {
            setList(apiList.map(item => ({
                id: item.id ?? Date.now() + Math.floor(Math.random() * 1000),
                ...item
            })));
        }
    }, [apiList]);

    const handleView = (record) => {
        setSelectedItem(record);
        setIsViewModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedItem(record);
        setMode("edit"); // switch mode
        form.setFieldsValue({
            ...record,
            startDate: record.startDate ? dayjs(record.startDate) : undefined,
            expiryDate: record.expiryDate ? dayjs(record.expiryDate) : undefined,
        });
        setIsEditModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedItem(null);
        setMode("add"); // switch mode
        form.resetFields();
        setIsEditModalOpen(true);
    };

    // ONE function for both Add & Edit with API integration
    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                name: values.name,
                referralCode: values.referralCode,
                status: values.status,
                startDate: values.startDate.format("YYYY-MM-DD"),
                expiryDate: values.expiryDate.format("YYYY-MM-DD"),
                usageLimit: Number(values.usageLimit),
                gmail: values.gmail || "",
                cupidCredits: Number(values.cupidCredits || 0),
                hugCredits: Number(values.hugCredits || 0),
                kissCredits: Number(values.kissCredits || 0),
                lickCredits: Number(values.lickCredits || 0),
            };

            if (mode === "add") {
                const response = await createCouponCode(payload).unwrap();
                console.log(response)
                if (response) {
                    message.success("Add Successfully !!");
                    refetch();
                }

            } else if (mode === "edit" && selectedItem) {
                const id = selectedItem?.referralCode;

                const response = await editCouponCode({ id, data: payload }).unwrap();
                console.log(response)
                if (response) {
                    message.success("Edit Successfully !!");
                    refetch();
                }
            }

            setIsEditModalOpen(false);
            form.resetFields();
            setSelectedItem(null);
            setMode("add"); // reset to add mode after save

        } catch (err) {
            message.error(err?.data?.message);
        }
    };

    const pageSize = limit;
    const total = list.length;

    const handleDelete = async (item) => {
        console.log(item)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteCouponCode(item?.referralCode).unwrap();
                    console.log(response)
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                    refetch();
                } catch (error) {
                    console.error(error);
                    message.error(error?.data?.message);
                }
            }
        });


    };
    const [generatedItem, setGeneratedItem] = useState(null)
    const [genCodeName, setGenCodeName] = useState("")

    const [generatedCoupon] = useGenerateCouponCodeMutation();

    const handleGenerateReferralCode = async (item) => {
        try {
            const response = await generatedCoupon(genCodeName).unwrap();
            console.log(response)
            if (response) {
                message.success("Add Successfully !!");
                refetch();
                setGeneratedItem(response?.attributes)
                form.setFieldsValue({ referralCode: response?.attributes });
            }
        } catch (error) {
            console.error(error);
            message.error(error?.data?.message);
        }
    };



    return (
        <div className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-5 mb-5">
                <h2 className="text-3xl font-semibold">Coupon Code</h2>
                <button
                    className="mb-4 bg-[#2C909D] text-white py-2 px-4 rounded"
                    onClick={handleAdd}
                >
                    Add Coupon Code
                </button>
            </div>

            {/* CARD LIST */}
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-5">
                {isLoading && <p className="py-2 flex justify-between">Loading...</p>}

                {list?.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#2C909D] text-white p-3 rounded-lg"
                    >
                        <div className="flex gap-2 justify-end flex-wrap mb-3">

                            <button
                                className="py-2 px-3  bg-[#2045e9] text-white rounded"
                                onClick={() => handleEdit(item)}
                            >
                                <FaRegEdit className="text-xl" />
                            </button>

                            <button
                                className="py-2 px-2 bg-[#c90404] text-white rounded"
                                onClick={() => handleDelete(item)}
                            >
                                <MdOutlineDeleteForever className="text-2xl" />
                            </button>

                        </div>
                        <p className="py-2 flex justify-between"><strong>Name:</strong> {item.name}</p>
                        <p className="py-2 flex justify-between"><strong>Referral Code:</strong> {item.referralCode}</p>
                        <p className="py-2 flex justify-between capitalize"><strong>Status:</strong> <span className={`px-2 py-1 rounded ${item?.status === "active" ? "bg-green-500" : item?.status == "pushed" ? "bg-yellow-500" : "bg-red-500"}`}>{item?.status}</span></p>
                        <p className="py-2 flex justify-between">
                            <strong>Start Date:</strong> {item.startDate ? moment(item.startDate).format("YYYY-MM-DD") : "-"}
                        </p>
                        <p className="py-2 flex justify-between">
                            <strong>Expiry Date:</strong> {item.expiryDate ? moment(item.expiryDate).format("YYYY-MM-DD") : "-"}
                        </p>
                        <p className="py-2 flex justify-between"><strong>Usage Limit:</strong> {item.usageLimit}</p>

                        <div className="flex gap-2 flex-wrap mt-3">
                            <button
                                className="py-2 px-5 w-full bg-[#17cf79] text-white rounded"
                                onClick={() => handleView(item)}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination UI */}
            <div className="flex items-center justify-end mt-4">
                <Pagination total={total} pageSize={pageSize} />
            </div>

            {/* VIEW MODAL */}
            <Modal
                open={isViewModalOpen}
                footer={null}
                onCancel={() => setIsViewModalOpen(false)}
                title="Coupon Details"
            >
                {selectedItem && (
                    <div className="space-y-2 mt-2">
                        <p className="py-2 flex justify-between"><strong>ID:</strong> {selectedItem.id}</p>
                        <p className="py-2 flex justify-between"><strong>Name:</strong> {selectedItem.name}</p>
                        <p className="py-2 flex justify-between"><strong>Referral Code:</strong> {selectedItem.referralCode}</p>
                        <p className="py-2 flex justify-between capitalize text-white"><strong>Status:</strong> <span className={`px-2 py-1 rounded ${selectedItem?.status === "active" ? "bg-green-500" : selectedItem?.status == "pushed" ? "bg-yellow-500" : "bg-red-500"}`}>{selectedItem?.status}</span></p>
                        <p className="py-2 flex justify-between"><strong>Start Date:</strong> {moment(selectedItem.startDate).format("YYYY-MM-DD") ?? "-"}</p>
                        <p className="py-2 flex justify-between"><strong>Expiry Date:</strong> {moment(selectedItem.expiryDate).format("YYYY-MM-DD") ?? "-"}</p>
                        <p className="py-2 flex justify-between"><strong>Usage Limit:</strong> {selectedItem.usageLimit}</p>
                        <p className="py-2 flex justify-between"><strong>Gmail:</strong> {selectedItem.gmail ?? "-"}</p>
                        <p className="py-2 flex justify-between"><strong>Cupid Credits:</strong> {selectedItem.cupidCredits}</p>
                        <p className="py-2 flex justify-between"><strong>Hug Credits:</strong> {selectedItem.hugCredits}</p>
                        <p className="py-2 flex justify-between"><strong>Kiss Credits:</strong> {selectedItem.kissCredits}</p>
                        <p className="py-2 flex justify-between"><strong>Lick Credits:</strong> {selectedItem.lickCredits}</p>
                    </div>
                )}
            </Modal>

            {/* ADD / EDIT MODAL */}
            <Modal
                open={isEditModalOpen}
                onCancel={() => {
                    setIsEditModalOpen(false);
                    form.resetFields();
                    setSelectedItem(null);
                    setMode("add");
                }}
                onOk={handleSave}
                title={mode === "edit" ? "Edit Coupon" : "Add Coupon"}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter Name" />
                    </Form.Item>

                    <Form.Item name="referralCode" className="w-full" label="Referral Code" rules={[{ required: true }]}>
                        <Input placeholder="Enter Referral Code" />
                    </Form.Item>
                    {
                        mode === "add" && (
                            <div className="flex items-center justify-between mb-2">
                                <input onChange={(event) => setGenCodeName(event.target.value)} className="w-full px-4 py-1 text-[16px] border border-[#eee] text-[#0a0a0a] rounded-lg" placeholder="Generate Referral Code" type="text" />
                                <button type="button" onClick={handleGenerateReferralCode} className="bg-[#309ead] py-1 px-5 ml-2 rounded text-white">Generate</button>
                            </div>
                        )
                    }

                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select
                            options={[
                                { value: "active", label: "Active" },
                                { value: "pushed", label: "Pushed" },
                                { value: "expired", label: "Expired" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item name="expiryDate" label="Expiry Date" rules={[{ required: true }]}>
                        <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item name="usageLimit" label="Usage Limit" rules={[{ required: true }]}>
                        <Input placeholder="Enter Usage Limit" type="number" />
                    </Form.Item>

                    <Form.Item name="gmail" label="Gmail">
                        <Input placeholder="Enter Gmail" />
                    </Form.Item>

                    <Form.Item name="cupidCredits" label="Cupid Credits">
                        <Input placeholder="Enter Cupid Credits" type="number" />
                    </Form.Item>

                    <Form.Item name="hugCredits" label="Hug Credits">
                        <Input placeholder="Enter Hug Credits" type="number" />
                    </Form.Item>

                    <Form.Item name="kissCredits" label="Kiss Credits">
                        <Input placeholder="Enter Kiss Credits" type="number" />
                    </Form.Item>

                    <Form.Item name="lickCredits" label="Lick Credits">
                        <Input placeholder="Enter Lick Credits" type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

