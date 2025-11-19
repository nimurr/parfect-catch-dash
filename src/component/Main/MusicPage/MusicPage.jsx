import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useAddMusicMutation, useGetAllMusicQuery, useDeleteMusicMutation } from '../../../redux/features/music/music';
import { imageBaseUrl } from '../../../config/imageBaseUrl';
import imageApi from '../../../redux/baseApi/imageApi';

const MusicPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [musicFile, setMusicFile] = useState(null);
    const [form] = Form.useForm();

    const [page, setPage] = useState(1); // Current page
    const [pageSize, setPageSize] = useState(10); // Page size
    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    const { data } = useGetAllMusicQuery({ page, limit: pageSize });
    const initialData = data?.data?.attributes?.results || [];
    const totalRecords = data?.data?.attributes?.totalResults || 0; // Total records for pagination

    const [musicData, setMusicData] = useState(initialData);

    const [addMusic] = useAddMusicMutation();
    const [deleteMusic] = useDeleteMusicMutation(); // Hook for delete mutation

    // Sync fetched data into local state
    useEffect(() => {
        if (initialData.length) {
            setMusicData(initialData);
        }
    }, [initialData]);

    // Filter musicData based on searchQuery
    useEffect(() => {
        if (searchQuery) {
            const filteredData = initialData.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTitle.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setMusicData(filteredData);
        } else {
            setMusicData(initialData); // Reset to initial data if search is cleared
        }
    }, [searchQuery, initialData]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) =>
                typeof image === 'string' ? (
                    <img src={imageApi + image} alt="cover" className="w-12 h-12 rounded-md" />
                ) : (
                    <span>No Image</span>
                ),
        },
        {
            title: 'Title & SubTitle',
            dataIndex: 'name',
            key: 'title',
            render: (_, text) => <div className='max-w-96'>
                <span className='font-semibold'>{text?.name}</span>
                <p>{text?.subTitle.length > 100 ? text?.subTitle.slice(0, 100) + ' ....' : text?.subTitle}</p>
            </div>,
        },
        {
            title: 'Music File',
            dataIndex: 'music',
            key: 'music',
            render: (music) =>
                music ? (
                    <audio className='min-w-60' controls src={imageBaseUrl + (typeof music === 'string' ? music : '')} style={{ width: '100px' }} />
                ) : (
                    'N/A'
                ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => showDetails(record)}>
                        View
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const showDetails = (record) => {
        setSelectedMusic(record);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedMusic(null);
    };

    const handleAddMusic = () => {
        setIsAddModalOpen(true);
    };

    const handleAddSubmit = async () => {
        const formValues = form.getFieldsValue();

        if (!imageFile || !musicFile) {
            return alert('Please upload both image and music files.');
        }

        const formData = new FormData();
        formData.append('name', formValues.name || " ");
        formData.append('subTitle', formValues.subTitle || '');
        formData.append('image', imageFile);
        formData.append('music', musicFile);

        try {
            const res = await addMusic(formData).unwrap();

            if (res?.code === 201) {
                // Add to table immediately
                const newItem = {
                    key: Date.now(),
                    title: formValues.title,
                    subTitle: formValues.subTitle,
                    image: URL.createObjectURL(imageFile),
                    music: URL.createObjectURL(musicFile),
                };

                setMusicData((prev) => [newItem, ...prev]);

                setIsAddModalOpen(false);
                form.resetFields();
                setImageFile(null);
                setMusicFile(null);
                message.success(res?.message);
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to add music.');
        }
    };

    const handleDelete = (record) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this music?',
            content: `This action cannot be undone.`,
            onOk: () => deleteMusicItem(record),
        });
    };

    const deleteMusicItem = async (record) => {
        try {
            // Pass the correct ID here
            const res = await deleteMusic(record.id).unwrap();
            console.log(res)

            if (res?.code === 200) {
                // Remove the item locally
                setMusicData((prevData) => prevData.filter((item) => item.id !== record.id));
                message.success('Music deleted successfully');
            } else {
                message.error('Failed to delete music.');
            }
        } catch (error) {
            console.error(error);
            message.error('Failed to delete music.');
        }
    };

    // Pagination change handler
    const handleTableChange = (pagination) => {
        setPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    return (
        <div className="p-6 bg-white rounded-md my-10">
            <div className="flex justify-between items-center flex-wrap mb-4">
                <h2 className="text-xl font-semibold">Music Library</h2>

                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="border border-gray-300 rounded-md px-2 min-w-[250px] py-2 mr-2"
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                    />
                    <button
                        className="bg-[#309ead] py-2 px-8 rounded-lg text-white text-xl"
                        onClick={handleAddMusic}
                    >
                        + Add Music
                    </button>
                </div>
            </div>

            <div className='w-full overflow-x-auto'>
                <Table
                    className='min-w-[1000px]'
                    columns={columns}
                    dataSource={musicData}
                    pagination={{
                        current: page,
                        pageSize: pageSize,
                        total: totalRecords,
                        onChange: (page, pageSize) => handleTableChange({ current: page, pageSize }),
                    }}
                />
            </div>

            {/* View Details Modal */}
            <Modal title="Music Details" open={isModalOpen} onCancel={handleCancel} footer={null}>
                {selectedMusic && (
                    <div className="space-y-2">
                        <img src={imageBaseUrl + selectedMusic.image} alt="cover" className="w-20 h-20 rounded" />
                        <p>
                            <strong>Title:</strong> {selectedMusic.name}
                        </p>
                        <p>
                            <strong>SubTitle:</strong> {selectedMusic.subTitle}
                        </p>
                        <p>
                            <strong>Music:</strong>{' '}
                            <audio controls src={imageBaseUrl + selectedMusic.music} style={{ width: '100%' }} />
                        </p>
                    </div>
                )}
            </Modal>

            {/* Add Music Modal */}
            <Modal
                title="Add Music"
                open={isAddModalOpen}
                onCancel={() => setIsAddModalOpen(false)}
                footer={null}
            >
                <Form layout="vertical" form={form} onFinish={handleAddSubmit}>
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Enter title" />
                    </Form.Item>

                    <Form.Item name="subTitle" label="SubTitle">
                        <Input placeholder="Enter subtitle" />
                    </Form.Item>

                    <Form.Item label="Image" required>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files[0])}
                        />
                    </Form.Item> 

                    <Form.Item label="Music" required>
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={(e) => setMusicFile(e.target.files[0])}
                        />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="mt-2">
                        Add
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default MusicPage;