import React,{useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

    const submitHandler = async(values) => {
        try {
          setLoading(true)
          const {data} = await axios.post('http://localhost:8080/login', values)
          setLoading(false)
          message.success('login success')
          localStorage.setItem('user', JSON.stringify({...data.user, password:''}))
          navigate('/')
        } catch (error) {
          setLoading(false)
          message.error('something went wrong')
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
               <div className='login_page'>
                {loading && <Spinner />}
                 <Form layout='vertical' onFinish={submitHandler}>
                 <h3 className='text-warning'>Login Form</h3>
                  <Form.Item label="Email" name="email">
                    <Input type='email'/>
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input type='password'/>
                  </Form.Item>
                  <div className='d-flex justify-content-between'>
                <Link to='/register' className='text-white mr-1'>Not a user? Click Here to Register</Link>
                <button type='submit' className='btn btn-warning' >Login</button>
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

export default Login