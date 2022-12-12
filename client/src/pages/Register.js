import React,{useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const submitHandler = async(values) => {
        try {
          setLoading(true)
          await axios.post('http://localhost:8080/register', values)
          message.success('Registration is Successfull')
          setLoading(false)
          navigate('/login')
        } catch (error) {
          setLoading(false)
          message.error('invalid credientials');
        }
    }

    useEffect(() => {
      if(localStorage.getItem('user')){
        navigate("/")
      }
    }, [navigate])

  return (
    <>
      <div className='container-fluid'>
      <div className="jumbobox">
          <div className='container'>
            <h3>
               <div className='register_page'>
                {loading && <Spinner />}
                  <Form layout='vertical' onFinish={submitHandler}>
                    <h3 className='text-warning'>Register Form</h3>
                    <Form.Item label="Name" name="name">
                       <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input type='email'/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                      <Input type='password'/>
                    </Form.Item>
                <div className='d-flex justify-content-between'>
                    <Link to='/login' className='text-white'>Already Register? Click Here to login</Link>
                <button type='submit' className='btn btn-warning' >Register</button>
               </div>
                  </Form>
            </div>
            </h3>
          </div>
        </div>      
      </div> 
          </>
  )
}

export default Register