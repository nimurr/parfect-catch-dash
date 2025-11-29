import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Pagination, message } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useCreateCouponCodeMutation, useGetCouponCodeQuery } from "../../redux/features/couponCode/couponCode";

export default function CouponCode() {
    const page = 1;
    const limit = 10;

    const { data: couponCodes, isLoading , refetch } = useGetCouponCodeQuery({ page, limit });
    const apiList = couponCodes?.attributes || [];
    const [createCouponCode] = useCreateCouponCodeMutation();

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
                console.log(payload)
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
                {isLoading && <p>Loading...</p>}

                {list.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#2C909D] text-white p-3 rounded-lg"
                    >
                        <p className="py-2 flex justify-between"><strong>Name:</strong> {item.name}</p>
                        <p className="py-2 flex justify-between"><strong>Referral Code:</strong> {item.referralCode}</p>
                        <p className="py-2 flex justify-between"><strong>Status:</strong> {item.status}</p>
                        <p className="py-2 flex justify-between">
                            <strong>Start Date:</strong> {item.startDate ? moment(item.startDate).format("YYYY-MM-DD") : "-"}
                        </p>
                        <p className="py-2 flex justify-between">
                            <strong>Expiry Date:</strong> {item.expiryDate ? moment(item.expiryDate).format("YYYY-MM-DD") : "-"}
                        </p>
                        <p className="py-2 flex justify-between"><strong>Usage Limit:</strong> {item.usageLimit}</p>

                        <div className="flex gap-2 mt-3">
                            <button
                                className="py-2 px-5 w-full bg-[#2c9d68] text-white rounded"
                                onClick={() => handleView(item)}
                            >
                                View
                            </button>

                            <button
                                className="py-2 px-5 w-full bg-[#0428c9] text-white rounded"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
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
                        <p><strong>ID:</strong> {selectedItem.id}</p>
                        <p><strong>Name:</strong> {selectedItem.name}</p>
                        <p><strong>Referral Code:</strong> {selectedItem.referralCode}</p>
                        <p><strong>Status:</strong> {selectedItem.status}</p>
                        <p><strong>Start Date:</strong> {selectedItem.startDate ?? "-"}</p>
                        <p><strong>Expiry Date:</strong> {selectedItem.expiryDate ?? "-"}</p>
                        <p><strong>Usage Limit:</strong> {selectedItem.usageLimit}</p>
                        <p><strong>Gmail:</strong> {selectedItem.gmail ?? "-"}</p>
                        <p><strong>Cupid Credits:</strong> {selectedItem.cupidCredits}</p>
                        <p><strong>Hug Credits:</strong> {selectedItem.hugCredits}</p>
                        <p><strong>Kiss Credits:</strong> {selectedItem.kissCredits}</p>
                        <p><strong>Lick Credits:</strong> {selectedItem.lickCredits}</p>
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
                        <Input />
                    </Form.Item>

                    <Form.Item name="referralCode" label="Referral Code" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

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
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="gmail" label="Gmail">
                        <Input />
                    </Form.Item>

                    <Form.Item name="cupidCredits" label="Cupid Credits">
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="hugCredits" label="Hug Credits">
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="kissCredits" label="Kiss Credits">
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item name="lickCredits" label="Lick Credits">
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

