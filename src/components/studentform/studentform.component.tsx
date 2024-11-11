import { useState } from 'react';
import { Form, Button, Input, Radio, Select, message, Row, Col, Typography, Space, Card } from 'antd';
import { MailOutlined, PhoneOutlined, ManOutlined, WomanOutlined, TrophyOutlined, HomeOutlined, CalendarOutlined, ReadOutlined } from '@ant-design/icons';
import { countryPhoneCodes } from '../../utils/countryphonecodes';
import './studentform.css';

const mobileNumberLength = 10;
const mobileNumberPattern = /^[0-9]+$/;
const scorePattern = /^[0-9]+$/
const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/

const { Option } = Select;

let courses = [{ id: 1, val: 'ssc', name: 'SSC' }, { id: 2, val: 'inter', name: 'Inter' }, { id: 3, val: 'ug', name: 'UG' }, { id: 4, val: 'pg', name: 'PG' }]

const DynamicForm = ({ name, disableVal, setdisableVal, onCompletionChange }: any) => {
    const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

    const [formValues, setFormValues] = useState<any>({});

    const handleSelectChange = (value: string) => {
        setSelectedLevel(value);
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]: { ...prevValues[name], level: value }
        }));
        onCompletionChange(false);
    };

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormValues((prevValues: any) => ({
            ...prevValues,
            [name]: { ...prevValues[name], [fieldName]: value }
        }));

        const allFilled = Object.values(formValues[name] || {}).every((val) => val);
        if (allFilled) {
            setdisableVal((prevState: any) => [...prevState, selectedLevel])
        }
        onCompletionChange(allFilled);
    };



    return (

        <Form.Item style={{backgroundColor : 'transparent'}}>
            <Card style={{backgroundColor : 'transparent',border: 'none'}}>
                <Form.Item label="Level of Education"
                    name={[name, 'level']} rules={[{ required: true, message: "Please choose the education level" }]}
                >
                    <Select
                        placeholder="Select Level of Education"
                        style={{ width: '49%', marginBottom: "15px", height: '43px' }}
                        onChange={handleSelectChange}
                    >
                        {courses.map(each => (
                            <Option key={each.id} disabled={disableVal.includes(each.val)} value={each.val}>
                                {each.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                {selectedLevel && (
                    <>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Institute"
                                    name={[name, 'institute']}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please enter the institute name!' }]}
                                >

                                    <Input
                                        prefix={<HomeOutlined />}
                                        style={{ height: "43px" }}
                                        className='input'
                                        placeholder="Enter institute name" maxLength={120} onChange={(e) => handleFieldChange('institute', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Year passed"
                                    name={[name, 'year']}
                                    hasFeedback
                                    rules={[{ required: true, message: 'Please enter the year passed!' }]}
                                >
                                    <Input className='input' style={{ height: "43px" }} placeholder="Enter year passed" prefix={<CalendarOutlined />} maxLength={4} onChange={(e) => handleFieldChange('institute', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    label="Board"
                                    name={[name, 'board']}
                                    style={{ paddingTop: "20px" }}
                                    hasFeedback

                                    rules={[{ required: true, message: 'Please enter the board name!' }]}
                                >
                                    <Input className='input' style={{ height: "43px" }} prefix={<ReadOutlined />} placeholder="Enter board name" maxLength={100} onChange={(e) => handleFieldChange('board', e.target.value)} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>

                                <Form.Item
                                    label="Score"
                                    name={[name, 'score']}
                                    style={{ paddingTop: "20px" }}
                                    hasFeedback

                                    rules={[
                                        { required: true, message: 'Please enter your score!' },
                                        { pattern: scorePattern, message: 'Score should be digits only' }
                                    ]}
                                >
                                    <Input className='input' style={{ height: "43px" }} prefix={<TrophyOutlined />} placeholder="Enter your score" maxLength={3} onChange={(e) => handleFieldChange('score', e.target.value)} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </>
                )}
            </Card>
        </Form.Item>

    );
};

const StudentForm = () => {
    const [disableVal, setdisableVal] = useState<any[]>([]);
    const [educationCompleted, setEducationCompleted] = useState<boolean[]>([]); //
    const [form] = Form.useForm();
    const [addnow, setaddnow] = useState(false)
    const handleAddEducation = (add: any) => {
        if (educationCompleted.length === 4) {
            message.warning('You have filled all the details')
            return
        }

        if (educationCompleted.length && !educationCompleted[educationCompleted.length - 1]) {
            message.warning('Please complete the current education details before adding a new one.');
            return;
        }
        setaddnow(true)

        add();
        setEducationCompleted([...educationCompleted, false]);
        console.log(educationCompleted.length)
    };

    const updateCompletionStatus = (index: number, isComplete: boolean) => {
        const updatedCompletion = [...educationCompleted];
        updatedCompletion[index] = isComplete;
        setEducationCompleted(updatedCompletion);
    };

    const onFinish = (values: any) => {

        const formattedValues = {
            basicInfo: {
                firstname: values.firstname,
                middlename: values.middlename,
                lastname: values.lastname,
            },
            educationDetails: values.educationDetails,
        };
        console.log(formattedValues.educationDetails)
        console.log('Form Submitted:', JSON.stringify(formattedValues));

        message.success('Details are saved successfully');
        setaddnow(false)
        form.resetFields();
        setdisableVal([])
        setEducationCompleted([]);
    };

    return (
        <div className="studentform-background-container">
            <Form form={form} onFinish={onFinish} layout="vertical" className="main-form-container">
                <Typography.Title style={{ textAlign: 'center', marginBottom: '40px' }}>
                    STUDENT REGISTRATION FORM
                </Typography.Title>

                <h1>Basic Info</h1>

                <div className='name-container'>
                    <Form.Item
                        hasFeedback
                        label="First Name"
                        name="firstname"
                        style={{ marginRight: '3px', width: '280px' }}
                        rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                        <Input className='input' maxLength={50} placeholder="Enter First Name" style={{ height: "43px" }} />
                    </Form.Item>

                    <Form.Item
                        label="Middle Name"
                        name="middlename"
                        style={{ marginRight: '3px', width: '280px' }}
                        hasFeedback
                    >
                        <Input className='input' maxLength={50} style={{ height: "43px" }} placeholder="Enter Middle Name" />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="lastname"
                        style={{ marginRight: '3px', width: '280px' }}
                        hasFeedback
                        rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                        <Input className='input' maxLength={50} style={{ height: "43px" }} placeholder="Enter Last Name" />
                    </Form.Item>
                </div>
                <div>
                    <Row gutter={18} justify="end">
                        <Col span={12}>
                            <Form.Item
                                label="Email"
                                name="email"
                                hasFeedback
                                style={{ width: '100%' }}
                                rules={[
                                    { required: true, message: 'Please enter your email' },
                                    { pattern: emailPattern, message: 'Please enter a valid @gmail address' },
                                ]}
                            >
                                <Input className='input' prefix={<MailOutlined />} style={{ height: "43px" }} placeholder="Enter Email Address" />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label="Mobile Number" required>
                                <Space.Compact style={{ width: "100%" }}>
                                    <Form.Item
                                        name="countrymobilecode"
                                        noStyle

                                        initialValue={countryPhoneCodes[0].code}
                                    >
                                        <Select
                                            style={{ width: '25%', height: "43px" }}
                                            defaultValue={countryPhoneCodes[0].flag}
                                            className='input'

                                        >
                                            {countryPhoneCodes.map((eachItem) => (
                                                <Select.Option key={eachItem.country} style={{ width: "100%" }} value={eachItem.code}>
                                                    {eachItem.code} {eachItem.country}

                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        name="mobile"
                                        hasFeedback
                                        rules={[
                                            { required: true, message: 'Please enter your mobile number' },
                                            { pattern: mobileNumberPattern, message: 'Mobile number should contain digits only' },
                                            { len: mobileNumberLength, message: 'Mobile number should be 10 digits' },
                                        ]}
                                        noStyle
                                    >
                                        <Input
                                            prefix={<PhoneOutlined />}
                                            style={{ width: '80%' }}
                                            className='input'
                                            maxLength={mobileNumberLength}
                                            placeholder="Enter Mobile Number"
                                        />
                                    </Form.Item>
                                </Space.Compact>
                            </Form.Item>
                        </Col>
                    </Row>


                    <Form.Item label="Gender" name="gender"

                        hasFeedback rules={[{ required: true, message: 'Please select your gender' }]}>
                        <Radio.Group className='input'>
                            <Radio value="male"><ManOutlined /> Male</Radio>
                            <Radio value="female"><WomanOutlined /> Female</Radio>
                        </Radio.Group>
                    </Form.Item>


                </div>


                <Form.List name="educationDetails" >
                    {(fields, { add }) => (
                        <Form.Item>
                            <Row gutter={16} justify="start">
                                <Col span={9}>

                                    <h1 >  Education Details</h1>
                                </Col>
                                <Col span={4}>
                                    <Form.Item style={{ marginTop: "10px" }} rules={[{ required: true, message: 'Add eductaion details' }]}>
                                        <Button type="primary" onClick={() => handleAddEducation(add)} style={{ marginTop: '20px', height: "38px" }}>
                                            {addnow ? 'Add more education details' : 'Add'}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                            {fields.map(({ key, name }, index) => (
                                <DynamicForm key={key} name={name} disableVal={disableVal} setdisableVal={setdisableVal} onCompletionChange={(isComplete: any) => updateCompletionStatus(index, isComplete)}
                                />
                            ))}
                        </Form.Item>
                    )}
                </Form.List>


                <Form.Item style={{ textAlign: "center", marginTop: "20px", height: "43px" }}>
                    <Button className='submitButton' htmlType="submit" style={{ width: "150px" }}>
                        Save
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default StudentForm;
