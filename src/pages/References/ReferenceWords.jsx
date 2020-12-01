import React, { useState, useEffect } from 'react'
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";

import './datatable.scss'
import Axios from 'axios';
import Breadcrumbs from '../../components/Common/Breadcrumb';

function ReferenceWords(props) {
  const [reference, setReference] = useState('')
 const [data,setData]=useState({
  columns:[
    {
      label: "İngiliscə",
      field: "İngiliscə",
      sort: "asc",
      width: 150
    },
   {
    label: "Azərbaycanca",
    field: "Azərbaycanca",
    sort: "asc",
    width: 150
  },
 {
  label: "Səhifə",
  field: "Səhifə",
  sort: "asc",
  width: 10
},
{
  label: "İngiliscə",
  field: "İngiliscə",
  sort: "asc",
  width: 150
  },
{
 label: "Azərbaycanca",
 field: "Azərbaycanca",
 sort: "asc",
 width: 150
},
{
label: "Səhifə",
field: "Səhifə",
sort: "asc",
width: 10
}
  ],
  rows:[]
 });


 useEffect(()=>{
  let token = JSON.parse(localStorage.getItem('authUser'));
  let id = props.match.params.id;
  let name = props.match.params.name;
  setReference(name)
  Axios.get(`${process.env.REACT_APP_API_URL}/references/${id}`,{
      headers:{
        'Authorization':token&&`${token.token_type} ${token.access_token}`
      }
  }).then(res=>{
   console.log(res.data.data.words)
       let resData=res.data.data.words;
       //console.log(arrData)
       let arrData=[];
       
             for (var i = 0; i < (resData.length===1?resData.length:resData.length-1); i+=2) {
              resData.length===1?
                arrData.push(
                 {
                   id:resData[i].id,
                   ['İngiliscə']:resData[i].in_english,
                  ['Azərbaycanca']: resData[i].in_azerbaijani,
                  //['Səhifə']:resData[i].in_english
                 }  
                )  :
                arrData.push(
                  {
                    ['İngiliscə']:resData[i].in_english,
                   ['Azərbaycanca']: resData[i].in_azerbaijani,
                   //['Səhifə']:resData[i].in_english,
                   ['İngiliscə']:resData[i+1].in_english,
                   ['Azərbaycanca']: resData[i+1].in_azerbaijani,
                   //['Səhifə']:<input type='number' data-id={resData[i+1].id} onChange={()=>{}} style={{'width':'50px'}} className='form-control form-control-sm'/>
                  }  
                 )
      }
     setData({
       ...data,
       rows:arrData
     })
  }).catch()

},[])


 return (
  <React.Fragment>
  <div className="page-content">
    <div className="container-fluid">
      <Breadcrumbs title='İstinadlar' breadcrumbItem={reference} />
      <Row>
        <Col className="col-12">
          <Card>
            <CardBody>
              <MDBDataTable 
                  responsive 
                  striped 
                  bordered 
                  data={data}
                  noBottomColumns={true}
                  searching={false}
                  sortable={false}
                  paging={false}
                   />
                  
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</React.Fragment>
 )
}

export default ReferenceWords
