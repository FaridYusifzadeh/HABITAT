import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, Container, Button } from "reactstrap";
import {Table, Thead, Tbody, Tr, Th, Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import Axios from "axios";
import SelectBox from "../../components/SelectBox/SelectBox";
import Input from '../../components/Input/Input.jsx'
import { Link } from "react-router-dom";
import Pencil from '../../assets/images/icons/pencil.svg'


const ResponsiveTables=() => {
   const [state, setstate] = useState({
       loaded:false,
       data:[]
   })

   const [categroies, setCategories] = useState({
    loaded:false,
    data:[]
   })

   const [query, setQuery] = useState({
      title:'',
      category_id:'',
      status:'',
      chapter:''
   })

   const Status=[
       {id:0,name:'Tərcümə olunmayıb'},
       {id:1,name:'Tərcümə olunub'},
       {id:2,name:'Təsdiqlənib'},
   ]


   const onChangeHandler = (e) => {

      setQuery({
          ...query,
          [e.target.name]:e.target.value
      })

   }

   useEffect(()=>{
    let token=JSON.parse(localStorage.getItem('authUser'))
        
      Axios.get(`${process.env.REACT_APP_API_URL}/words`,{
          headers:{
            'Authorization':token&&`${token.token_type}${token.access_token}`
          }
      })
      .then(res=>{
          setstate({
              loaded:true,
              data:res.data.data
          })
      })

      Axios.get(`${process.env.REACT_APP_API_URL}/categories`,{
        headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
        }
    })
    .then(res=>{
        setCategories({
            loaded:true,
            data:res.data.data
        })
    })
   },[])

   useEffect(()=>{

       let newQuery='';
     Object.keys(query).forEach((key)=>{
         if(query[key]!==''){
            newQuery+=`filter[${key}]=${query[key]}&`
         }
     })

     let token=JSON.parse(localStorage.getItem('authUser'))
     Axios.get(`${process.env.REACT_APP_API_URL}/words?${newQuery}`,{
        headers:{
          'Authorization':token&&`${token.token_type}${token.access_token}`
        }
    })
    .then(res=>{
        setstate({
            loaded:true,
            data:res.data.data
        })
    })
     
   },[query])

      console.log(query)

        return (
            <React.Fragment>
                <div className="page-content">
                    <div className="container-fluid">
                        <Breadcrumbs title="Tables" breadcrumbItem="Responsive Tables" />
                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                    <div className='d-flex'>
                                      <Container>
                                         <Row>
                                          <Col lg={12}>
                                          <div className="app-search d-none d-lg-block">
                                          <div className="position-relative d-flex flex-row-reverse">
                                          <input style={{'backgroundColor':'#2E3548','borderRadius':'0.25rem'}} type="text" name='title' onChange={onChangeHandler} className="form-control" placeholder='Axtar...' />
                                          <span><img src={require('../../assets/images/icons/search.svg')} alt=''/></span>
                                        </div>
                                          </div>
                                          </Col>
                                         </Row>
                                         <Row>
                                         <Col lg={4} >
                                         <SelectBox className='form-control-md'
                                            name='category_id'
                                            option={categroies.loaded&&categroies.data}
                                            onChange={onChangeHandler}
                                         />
                                         </Col>
                                         <Col lg={4}>
                                         <SelectBox className='form-control-md'
                                            name='status'
                                            option={Status}
                                            onChange={onChangeHandler}
                                         />
                                         </Col>
                                         <Col lg={4}>
                                         <Input className='mr-1n form-control-md'
                                           name='chapter'
                                           onChange={onChangeHandler}
                                         />
                                         </Col>
                                         </Row>
                                      </Container>
                                    </div>
                                        <div className="table-rep-plugin">
                                            <div className="table-responsive mb-0" data-pattern="priority-columns">
                                                <Table id="tech-companies-1" className="table table-striped table-bordered">
                                                    <Thead>
                                                        <Tr>
                                                            <Th data-priority="1">Term</Th>
                                                            <Th data-priority="3">Tərcümə</Th>
                                                            <Th data-priority="1">İstinad</Th>
                                                            <Th data-priority="3">Fəsil Close</Th>
                                                            <Th data-priority="3">Status</Th>
                                                            <Th data-priority="6">Ətraflı</Th>
                                                            <Th data-priority="6">Düzəliş et</Th>
                                                        </Tr>
                                                    </Thead>
                                                    <Tbody>
                                                    {
                                                        state.loaded&&
                                                        state.data.map(x=>{
                                                            return(
                                                                <Tr key={x.id}>
                                                                <Th>{x.in_english}</Th>
                                                                <Td>{x.in_azerbaijani}</Td>
                                                                <Td>
                                                                    {x.reference?.author},
                                                                    {x.reference?.title},
                                                                    {x.reference?.year}
                                                                </Td>
                                                                <Td>{x.chapter}</Td>
                                                                <Td>{
                                                                    x.status===0?'Tərcümə olunmayıb':
                                                                    x.status===1?'Tərcümə olunub':
                                                                    x.status===2?'Təstiqlənib':null
                                                                }</Td>
                                                                <Td>
                                                                    <Link style={{'color':'#ffffff'}} to={`/word-profile/${x.id}`}>
                                                                     <Button className='btn btn-sm btn-rounded w-75' color='primary'>Ətraflı</Button>
                                                                    </Link>
                                                                </Td>
                                                                <Td>
                                                                <Link className='d-flex align-self-center  align-items-center'  to='/#'><img  src={Pencil}/></Link>
                                                                </Td>
                                                              </Tr>
                                                            )
                                                        })
                                                    }

                                                    </Tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }

export default ResponsiveTables;
