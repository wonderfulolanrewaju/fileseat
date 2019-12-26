import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import '../assets/css/SharingForm.css';
import {CloudUpload} from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import { 
  Typography, InputLabel, 
  makeStyles, Select, 
  Button, 
  FormControl, 
  MenuItem , Grid
} from '@material-ui/core'; 
import DropMessage from './DropMessage';

const SharingForm = ()=> {
    const handleSubmit = (values)=> {
      console.log(values)
      axios.post('http://localhost:3001/api/v1/file/new', values, {
        headers: {"Accept": "multipart/form-data"}
      })
      .then (response=> console.log(response))
    }  

    return ( 
            <div className='row'>
              <div className='col-12'>
              <Formik 
            onSubmit={handleSubmit}
            initialValues = {{
              receipientEmail : '', message: '',
              senderEmail : '', files:  []
            }}      
            >
              {
                (
                  {
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting, setFieldValue
                }
                )=> (              
                  <Form className='SharingForm' onSubmit={handleSubmit} >
                    <Typography variat='h2' className='text-center form-header' component='h2'>TRANSFER FILES</Typography>
                    <div className='form-group'>
                      <label htmlFor='receipientEmail' className='labels'>Send files to this email:</label>
                      <Field type='email' className='Form-Input' name='receipientEmail' id='receipientEmail'/>
                    </div>
                    <div  className='form-group'>
                      <label htmlFor='senderEmail'>Your email:</label>
                      <Field type='email' className='Form-Input' name='senderEmail' id='senderEmail' />
                    </div>
                    <div  className='form-group'>
                      <label htmlFor='message'>Message:</label>
                      <Field name='message' className='Message-Input form-control' row='7' id='message' component='textarea'/>
                    </div>
                    {/* <Dropzone>
                      <div className='form-group '>
                          <label className='Upload-Div' htmlFor='file'> 
                            <input type='file' style={{display:'none'}} id='file' name='file' onChange={(event) => {
                                setFieldValue('file', event.currentTarget.files[0])
                              }} multiple />
                            <div className='text-center'>
                            <CloudUpload >
                            </CloudUpload><p>Drag and drop here or browse files</p></div>
                          </label>
                      </div>
                    </Dropzone>             */}
                    <Dropzone multiple onDrop={(acceptedFiles)=>{
                      // Do nothing if files is not yet dropped
                      if(acceptedFiles.length===0) {return null}
                      // send files values to formik state if it exists
                      setFieldValue('files', values.files.concat(acceptedFiles))
                    }}>
                        {
                          ({isDragActive, isDragReject}) => {
                           if(isDragActive ){
                              return 'This file is allowed'
                            }  else if (isDragReject){
                              return 'This file extension is not allowed'
                            } else if (files.values.length===0) {
                              return 'Drag and drop files here or click to browse files'
                            }
                            return values.files.map((file, i) =>
                            <DropMessage file={file} key = {i} /> )
                          }
                        }
                    </Dropzone>
                    <button type='submit' onClick={handleSubmit} className='Transfer-Button col'>Transfer</button>
                  </Form>
                
                )
              }
            </Formik>
              </div>
            </div>
    )
}


export default SharingForm;