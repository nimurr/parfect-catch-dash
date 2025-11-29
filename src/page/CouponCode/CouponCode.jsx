import React, { useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    Pagination,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useGetCouponCodeQuery } from "../../redux/features/couponCode/couponCode";

const initialData = [
    {
        id: 1,
        name: "MD. Shadat Hossain",
        referralCode: "8NUBR0SE",
        status: "active",
        startDate: "2025-11-29",
        expiryDate: "2026-02-06",
        usageLimit: 500,
        gmail: "shadathossan3500@gmail.com",
        cupidCredits: 2,
        hugCredits: 3,
        kissCredits: 10,
        lickCredits: 12,
    },
];

export default function CouponCode() {
    const page = 1;
    const limit = 10;
    const { data: couponCodes, isLoading } = useGetCouponCodeQuery({ page, limit });
    const allCouponCodes = couponCodes?.attributes || [];

    const [data, setData] = useState(initialData);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [form] = Form.useForm();

    const handleView = (record) => {
        setSelectedItem(record);
        setIsViewModalOpen(true);
    };

    const handleEdit = (record) => {
        setSelectedItem(record);
        form.setFieldsValue({
            ...record,
            startDate: dayjs(record.startDate),
            expiryDate: dayjs(record.expiryDate),
        });
        setIsEditModalOpen(true);
    };

    const handleAdd = () => {

        setSelectedItem(null);
        form.resetFields();
        setIsEditModalOpen(true);
    };

    const handleSave = () => {


        form.validateFields().then((values) => {
            const formatted = {
                ...values,
                startDate: values.startDate.format("YYYY-MM-DD"),
                expiryDate: values.expiryDate.format("YYYY-MM-DD"),
            };

            if (selectedItem) {
                setData(
                    data.map((item) =>
                        item.id === selectedItem.id ? { ...item, ...formatted } : item
                    )
                );
            } else {
                setData([...data, { id: Date.now(), ...formatted }]);
            }
            setIsEditModalOpen(false);
        });
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

            {/* Card List */}
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-5">
                {
                    isLoading && <p>Loading...</p>
                }
                {allCouponCodes.map((item) => (
                    <div
                        key={item.id}
                        className="bg-[#2C909D] text-white p-3 rounded-lg"
                    >
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Name:</strong> {item.name}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Referral Code:</strong> {item.referralCode}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Status:</strong> {item.status}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Start Date:</strong>{" "}
                            {moment(item.startDate).format("YYYY-MM-DD")}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Expiry Date:</strong>{" "}
                            {moment(item.expiryDate).format("YYYY-MM-DD")}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Usage Limit:</strong> {item.usageLimit}
                        </p>

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

            {/* Pagination */}
            <div className="flex items-center justify-end">
                <Pagination total={data.length} pageSize={5} className="mt-4" />
            </div>

            {/* View Modal */}
            <Modal
                open={isViewModalOpen}
                footer={null}
                onCancel={() => setIsViewModalOpen(false)}
            >
                {selectedItem && (
                    <div className="space-y-2 mt-5">
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Name:</strong> {selectedItem?.name}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Referral Code:</strong> {selectedItem?.referralCode}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Status:</strong> {selectedItem?.status}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Start Date:</strong>{" "}
                            {moment(selectedItem?.startDate).format("YYYY-MM-DD")}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Expiry Date:</strong>{" "}
                            {moment(selectedItem?.expiryDate).format("YYYY-MM-DD")}
                        </p>
                        <p className="py-2 flex items-center justify-between gap-2">
                            <strong>Usage Limit:</strong> {selectedItem?.usageLimit}
                        </p>
                    </div>
                )}
            </Modal>

            {/* Add / Edit Modal */}
            <Modal
                open={isEditModalOpen}
                onCancel={() => setIsEditModalOpen(false)}
                onOk={handleSave}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="referralCode"
                        label="Referral Code"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select
                            options={[
                                { value: "active" },
                                { value: "pushed" },
                                { value: "expired" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="startDate"
                        label="Start Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="expiryDate"
                        label="Expiry Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="usageLimit"
                        label="Usage Limit"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="gmail" label="Gmail">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="cupidCredits"
                        label="Cupid Credits"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="hugCredits"
                        label="Hug Credits"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="kissCredits"
                        label="Kiss Credits"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="lickCredits"
                        label="Lick Credits"
                        rules={[{ required: true }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
