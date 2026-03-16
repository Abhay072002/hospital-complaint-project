import React, { useEffect, useState } from 'react'
import api from "../../axios/instance";
import { Badge, Button, Container, Table } from 'react-bootstrap';
import CreateStaffModal from '../components/CreateStaffModal';

const StaffManagement = () => {
    const [staff,setStaff] = useState([]);
    const [loading,setLoading] = useState(true)
    const [createStaff, setCreateStaff] = useState(false);

    const fetchStaff = async () =>{
        try {
            const res = await api.get("/admin/staff");
            setStaff(res.data.staff);
        } catch (error) {
            console.log(error);
            
        }finally{
            setLoading(false);
        }
    }
    useEffect(() => {
      fetchStaff()
    }, []);
  return (
    <div style={{ backgroundColor: "#f0f4f8", minHeight: "80vh" }}>
        <Container>
            <div className=' d-flex justify-content-between py-3'>
                <h2>Staff Management</h2>
                <Button className='btn-lg' onClick={() =>setCreateStaff(true)}>Add Staff</Button>
            </div>
            <Table hover responsive bordered>
                <thead className=' table-dark'>
                    <tr>
                        <th>Full Name</th>
                        <th>employee Id</th>
                        <th>Department</th>
                        <th>Shift</th>
                        <th>Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((staff)=>(
                        <tr key={staff._id}>
                            <td>{staff.fullName}</td>
                             <td>{staff.employeeId}</td>
                             <td>{staff.department}</td>
                             <td>
                                <Badge bg={
                                    staff.shift === "Morning" ? "warning"
                                    :staff.shift === "Evening"? "primary" : "secondary"
                                }>
                                    {staff.shift}
                                </Badge>
                            </td>
                            <td>
                                <Badge bg={
                                    staff.isActive ? "success" : "danger"
                                }>
                                    {staff.isActive ? "Active" :"inactive"}
                                </Badge>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateStaffModal
            show={createStaff} onHide={()=>setCreateStaff(false)} onSuccess={fetchStaff}/>
        </Container>
    </div>
  )
}

export default StaffManagement