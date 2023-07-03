import React, {useState, useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { ToastContainer, toast} from "react-toastify";


const CRUD = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const[name, setName] = useState('')
    const[age, setAge] = useState('')
    const[isActive, setIsActive] = useState(0)


    const[editID, setEditId] = useState('')
    const[editName, setEditName] = useState('')
    const[editAge, setEditAge] = useState('')
    const[editIsActive, setEditIsActive] = useState(0)

    const empdata = [
        {
            id : 1,
            name: 'Junxian',
            age: 25,
            isActive: 1
        },
        {
            id : 2,
            name: 'Hawaii',
            age: 21,
            isActive: 1
        },
        {
            id : 3,
            name: 'WX',
            age: 20,
            isActive: 0
        }
    ]
    const [data, setData]  = useState([]); 




    const getData = () =>  {
        axios.get('https://localhost:7141/api/Employee')
        .then((result) => {
            setData(result.data)
        })
        .catch((error) => {
            console.log(error)
        })




    }


    useState(()=> {
        getData();
    },[])

    const handleEdit = (id) =>{
            //alert(id);
            handleShow();

    
    
    
    }

    const handleUpdate = () => {

    }

    const handleSave = () => {
        const url = 'https://localhost:7141/api/Employee';
        const data = {
            "name" : name,
            "age" : age,
            "isActive" : isActive
        }
        
        axios.post(url, data)
        .then((result) => {
            getData();
            clear();
            toast.success('Employee has been added');

        })

    }

    const clear = () => {
        setName('');
        setAge('');
        setIsActive(0);

        setEditName('');
        setEditAge('');
        setEditIsActive(0);
        setEditId('');
    }

    const handleDelete= (id) =>{
        if(window.confirm("Are you sure to delete this employee")  == true){
            alert(id);

        }
    }


    const handleActiveChange= (e) => {
        if(e.target.checked){
            setIsActive(1);
        } else{
            setIsActive(0);
        }

    }


    const handleEditActiveChange= (e) => {
        if(e.target.checked){
            setEditIsActive(1);
        } else{
            setEditIsActive(0);
        }

    }




    return(
        <Fragment>

            <ToastContainer/>


                <Container>
             
                <Row>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value) } />
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Age" value={age}  onChange={(e) => setAge(e.target.value) } />
                    </Col>
                    <Col>
                    <input type="checkbox" checked={isActive ===1 ? true : false} onChange={(e) => handleActiveChange(e)  }    value = {isActive}  />
                    <label>IsActive</label>
                    </Col>  


                    <Col>
                        <button className="btn btn-primary">Submit</button>
                    </Col>
                    
                     </Row>
                </Container>


<br>
</br>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>IsActive</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                        data.map((item,index) => {
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.age}</td>
                                <td>{item.isActive}</td>
                                <td colSpan={2}>
                                    <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>Edit</button>
                                    <button className="btn btn-danger"  onClick={() => handleDelete(item.id)}>Delete</button>

                                </td>
                                </tr>
                            )
                        })
                        :
                        'Loading...'
                    }
   
           
                </tbody>
                </Table>




                                <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Modify / Update  Employee</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                                        <Row>




                                        <Col>
                    <input type="text" className="form-control" placeholder="Enter Name" value={editName} onChange={(e) => setEditName(e.target.value) } />
                    </Col>
                    <Col>
                    <input type="text" className="form-control" placeholder="Enter Age" value={editAge}  onChange={(e) => setEditAge(e.target.value) } />
                    </Col>
                    <Col>
                    <input type="checkbox" checked={editIsActive ===1 ? true : false} onChange={(e) => handleActiveChange(e)  }    value = {setEditIsActive}  />
                    <label>IsActive</label>
                    </Col>  


                    <Col>
                        <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
                    </Col>
                    


                                    </Row>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>




        </Fragment>
    )
}

export default CRUD;