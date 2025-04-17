import React from 'react'
import { HomeOutlined , NumberOutlined } from '@ant-design/icons';
import { Form, Input, } from 'antd'
const AddressForm = () => {
    const [addressFormData , setAddressFormData] = useState({
        houseNumber : "",
        streetName : "",
        city : "",
        state : "",
        pinCode : ""
    })
    
    const handleOnAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressFormData(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    return (
        <>
            <Form layout="vertical" style={{ maxWidth: 600, marginBottom: 24 }}>
            {/* House No. / Flat No. */}
                <Form.Item
                    label={<Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>House / Flat No.</Text>}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                    size="large"
                    placeholder="Enter House or Flat Number"
                    name="houseNumber"
                    value={addressFormData.houseNumber}
                    onChange={handleOnAddressChange}
                    prefix={<HomeOutlined style={{ fontSize: '1.2rem' }} />}
                    style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                    />
                </Form.Item>

                {/* Street Name / Locality */}
                <Form.Item
                    label={<Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>Street Name / Locality</Text>}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                    size="large"
                    placeholder="Enter Street Name or Locality"
                    name="streetName"
                    value={addressFormData.streetName}
                    onChange={handleOnAddressChange}
                    prefix={<HomeOutlined style={{ fontSize: '1.2rem' }} />}
                    style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                    />
                </Form.Item>

                {/* City */}
                <Form.Item
                    label={<Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>City</Text>}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                    size="large"
                    placeholder="Enter City"
                    name="city"
                    value={addressFormData.city}
                    onChange={handleOnAddressChange}
                    style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                    />
                </Form.Item>

                {/* State */}
                <Form.Item
                    label={<Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>State</Text>}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                    size="large"
                    placeholder="Enter State"
                    name="state"
                    value={addressFormData.state}
                    onChange={handleOnAddressChange}
                    style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                    />
                </Form.Item>

                {/* Pin Code */}
                <Form.Item
                    label={<Text style={{ fontSize: '1.5rem', fontWeight: '600' }}>Pin Code</Text>}
                    style={{ marginBottom: 16 }}
                >
                    <Input
                    size="large"
                    placeholder="Enter Pin Code"
                    name="pinCode"
                    value={addressFormData.pinCode}
                    onChange={handleOnAddressChange}
                    prefix={<NumberOutlined style={{ fontSize: '1.2rem' }} />}
                    style={{ fontSize: '1.2rem', padding: '12px 16px' }}
                    />
                </Form.Item>
            </Form>
        </>
    )
}

export default AddressForm