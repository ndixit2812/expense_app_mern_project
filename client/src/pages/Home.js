import React,{useState, useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { Form, Input, message, Modal, Select, Table, DatePicker} from 'antd'
import {AreaChartOutlined, UnorderedListOutlined, EditOutlined, DeleteOutlined} from "@ant-design/icons"
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'
import Analytics from '../components/Analytics'
const { RangePicker } = DatePicker;

const Home = () => {
  const [showModal, setShowMOdal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [ allTransaction, setAllTransactions] = useState([])
  const [frequency, setFrequency] = useState('7')
  const [selectedDate, setSelectedDate] = useState([])
  const [type, setType] = useState('all')
  const [viewData, setViewData] = useState("table")
  const [editable, setEditable] = useState(null)

  // table format for data
  const columns = [
    {
      title:"Date",
      dataIndex:"date",
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
    },
    {
      title:"Amount",
      dataIndex:"amount"
    },
    {
      title:"Type",
      dataIndex:"type"
    },
    {
      title:"Category",
      dataIndex:"category"
    },
    {
      title:"Refrence",
      dataIndex:"refrence"
    },
    {
      title:"Actions",
      render: (text, record) => (
        <div>
          <EditOutlined className='text-info' 
          onClick={() =>{ 
              setEditable(record)
              setShowMOdal(true)
          }
          }/>
          <DeleteOutlined  className='mx-2 text-danger'onClick={() => handleDelete(record) }/>
        </div>
      )
    }
  ]

  // get All transaction
  const getTransaction = async() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      const res = await axios.post('/get_transaction', {userid:user._id, frequency, selectedDate, type})
      setLoading(false)
      setAllTransactions(res.data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
      message.error('fetching issue with transaction')
    }
  }

  // useEffect hook
  useEffect(() => {
    getTransaction()
  }, [frequency, selectedDate, type])

  const handleDelete = async(record) => {
    try {
      setLoading(true)
      await axios.post('/delete_transaction', {transactionId:record._id})
      setLoading(false)
      message.success('Transaction Deleted')
    } catch (error) {
      setLoading(false)
      console.log(error)
      message.error('unable to delete this record')
    }
  }

  const handleSubmit= async(values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      setLoading(true)
      if(editable){
      await axios.post('/edit_transaction', {payload:{
        ...values, 
        userid:user._id
      },
      transactionId: editable._id
    })
    setLoading(false)
    message.success('Transaction Edit Successfully')
      }else{
        await axios.post('/add_transaction', {...values, userid: user._id})
        setLoading(false)
        message.success('Transaction Added Successfully')
      }
      setShowMOdal(false)
      setEditable(null)
    } catch (error) {
      setLoading(false)
      message.error('Failed to add Transaction')
    }
  }
  return (
    <Layout>
      {loading && <Spinner />}
    <div className='filters'>
       <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(value) => setFrequency(value) }>
            <Select.Option value="7">Last 1 Week</Select.Option>
            <Select.Option value="30">Last 1 Month</Select.Option>
            <Select.Option value="365">Last 1 Year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {
            frequency === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)}/>
          }
       </div>
       <div>
          <h6>Select Type</h6>
          <Select value={type} onChange={(value) => setType(value) }>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
          {
            type === "custom" && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)}/>
          }
       </div>
       <div className='switch-icon'>
           <UnorderedListOutlined className={`mx-2 ${viewData === 'table' ? 'active-icon' : 'inactive-icon' }`} onClick={() => setViewData('table')}/>
           <AreaChartOutlined className={`mx-2 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon' }`} onClick={() => setViewData('analytics')}/>
        </div>
       <div>
        <button className='btn btn-primary' onClick={() => setShowMOdal(true)}>Add New</button>
       </div>
    </div>
    <div className='content'>
      {viewData === 'table' ? <Table columns={columns} dataSource={allTransaction}/> : <Analytics allTransaction = {allTransaction} /> }
    </div>
    <Modal title={editable ? 'Edit Transaction' : 'Add Transaction' } 
    open={showModal} 
    onCancel={() =>setShowMOdal(false)} 
    footer={false}>
      <Form 
          layout='vertical' 
          onFinish={handleSubmit} 
          initialValues={editable} 
          >
         <Form.Item label='Amount' name="amount">
          <Input type='text' />
         </Form.Item>
         <Form.Item label='Type' name="type">
          <Select>
            <Select.Option value='income'>Income</Select.Option>
            <Select.Option value='expense'>Expense</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item label='Category' name="category">
          <Select>
            <Select.Option value='salary'>Salary</Select.Option>
            <Select.Option value='tip'>Tip</Select.Option>
            <Select.Option value='project'>Project</Select.Option>
            <Select.Option value='food'>Food</Select.Option>
            <Select.Option value='movie'>Movie</Select.Option>
            <Select.Option value='bills'>Bills</Select.Option>
            <Select.Option value='fee'>Fee</Select.Option>
            <Select.Option value='medical'>Medical</Select.Option>
            <Select.Option value='tax'>Tax</Select.Option>
          </Select>
         </Form.Item>
         <Form.Item label='Date' name="date">
          <Input type='date' />
         </Form.Item>
         <Form.Item label='Refrence' name="refrence">
          <Input type='text' />
         </Form.Item>
         <Form.Item label='Description' name="description">
          <Input type='text' />
         </Form.Item>
         <div className='d-flex justify-content-end'>
          <button type="submit" className='btn btn-primary'>SAVE</button>
         </div>
      </Form>
    </Modal>
   </Layout> 
    )
}

export default Home