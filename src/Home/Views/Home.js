import { useEffect, useLayoutEffect, useState } from 'react';
import './Home.css';
import lottie from "lottie-web";
import animationData from '../../assets/loader.json';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


function Home() {
    const [flightSchedule, setFlightSchedule] = useState([
        // {
        //     'id': 1,
        //     'flightname': 'FlyJinnah-401',
        //     'deptcity': 'Khi',
        //     'depttime': '2023-05-11',
        //     'arrivalcity': 'Isl',
        //     'arrivaltime': '2023-05-11',
        //     'status': 'hold'
        // },
        // {
        //     'id': 2,
        //     'flightname': 'FlyJinnah-401',
        //     'deptcity': 'Khi',
        //     'depttime': '2023-05-11',
        //     'arrivalcity': 'Isl',
        //     'arrivaltime': '2023-05-11',
        //     'status': 'hold'
        // },
        // {
        //     'id': 3,
        //     'flightname': 'FlyJinnah-401',
        //     'deptcity': 'Khi',
        //     'depttime': '2023-05-11',
        //     'arrivalcity': 'Isl',
        //     'arrivaltime': '2023-05-11',
        //     'status': 'hold'
        // },
    ]);
    const [sessionZ, setSessionZ] = useState(1);
    const [showInsertModal, setShowInsertModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [checkedRows, setCheckedRows] = useState([]);
    const [deleteEnable, setDeleteEnable] = useState(false);
    const [editEnable, setEditEnable] = useState(false);

    const [formValues, setFormValues] = useState({
        'flightName': "",
        'departureCity': "",
        'departureTime': "",
        'arrivalCity': "",
        'arrivalTime': ""
    });

    useLayoutEffect(() => {
        if (checkedRows.length === 1) {
            setEditEnable(true);
            setDeleteEnable(true);
        }
        if (checkedRows.length === 0 || checkedRows.length > 1) {
            setEditEnable(false);
            setDeleteEnable(false);
        }
    }, [checkedRows])
    useEffect(() => {
        const container = document.getElementById("lottie-container");
        const animation = lottie.loadAnimation({
            container: container,
            animationData: animationData,
            loop: true,
            autoplay: true,
        });
        const timeoutId = setTimeout(() => {
            setIsDataLoaded(true);
            if (animation) {
                animation.stop();
                animation.destroy();
            }
        }, 20000);
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3310/flight");
                const data = await response.json();
                const modifiedData = data.map((obj) => {
                    return {
                        ...obj,
                        arrivaltime: obj.arrivaltime.substring(0, 10),
                        depttime: obj.depttime.substring(0, 10),
                    };
                });
                setFlightSchedule(modifiedData);
                setIsDataLoaded(true);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
        return () => {
            clearTimeout(timeoutId);
            if (animation) {
                animation.stop();
                animation.destroy();
            }
        };
    }, [sessionZ]);

    const handleCheckboxChange = (event, flightId) => {
        if (event.target.checked) {
            setCheckedRows([...checkedRows, flightId]);
        } else {
            setCheckedRows(checkedRows.filter(id => id !== flightId));
        }

    }
    function FlightScheduleTable({ schedules }) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Flight ID</th>
                        <th>Flight Name</th>
                        <th>Departure City</th>
                        <th>Departure Time</th>
                        <th>Arrival City</th>
                        <th>Arrival Time</th>
                        <th>Status</th>
                        <th>Check</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map(schedule => (
                        <tr key={schedule.flightId} onClick={() => {

                        }}>
                            <td>{schedule.id}</td>
                            <td>{schedule.flightname}</td>
                            <td>{schedule.deptcity}</td>
                            <td>{schedule.depttime}</td>
                            <td>{schedule.arrivalcity}</td>
                            <td>{schedule.arrivaltime}</td>
                            <td>{schedule.status}</td>
                            <td>
                                <input type="checkbox" checked={checkedRows.includes(schedule.id)} onChange={(event) => handleCheckboxChange(event, schedule.id)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
    return (
        <div className='container-h'>
            {isDataLoaded === true ?
                <>
                    {
                        showInsertModal === true ?
                            <Modal show={showInsertModal} onHide={() => { setShowInsertModal(false); }}>
                                <Modal.Header>
                                    <Modal.Title>Insert Flight Schedule</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='d-flex justify-content-center'>
                                    <Form>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Form.Group controlId="formFlightName">
                                                            <Form.Label>Flight Name</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter flight name" value={formValues.flightName} onChange={(event) => { setFormValues({ ...formValues, 'flightName': event.target.value }) }} />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Form.Group controlId="formDepartureCity">
                                                            <Form.Label>Departure City</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter departure city" value={formValues.departureCity} onChange={(event) => { setFormValues({ ...formValues, 'departureCity': event.target.value }) }} />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Form.Group controlId="formDepartureTime">
                                                            <Form.Label>Departure Time</Form.Label>
                                                            <Form.Control type="date" value={formValues.departureTime} onChange={(event) => { setFormValues({ ...formValues, 'departureTime': event.target.value }) }} />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Form.Group controlId="formArrivalCity">
                                                            <Form.Label>Arrival City</Form.Label>
                                                            <Form.Control type="text" placeholder="Enter arrival city" value={formValues.arrivalCity} onChange={(event) => { setFormValues({ ...formValues, 'arrivalCity': event.target.value }) }} />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Form.Group controlId="formArrivalTime">
                                                            <Form.Label>Arrival Time</Form.Label>
                                                            <Form.Control type="date" value={formValues.arrivalTime} onChange={(event) => { setFormValues({ ...formValues, 'arrivalTime': event.target.value }) }} />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button className='fbc' variant="secondary" onClick={() => { setShowInsertModal(false); }} style={{ backgroundColor: 'red', color: 'white' }}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={async () => {
                                        await axios.post(`http://localhost:3300/flight`, {
                                            fn: formValues.flightName,
                                            da: formValues.departureCity,
                                            aa: formValues.arrivalCity,
                                            dd: formValues.departureTime,
                                            at: formValues.arrivalTime,
                                            st: "hold"
                                        });
                                        setFlightSchedule([
                                            ...flightSchedule,
                                            {
                                                'id': 4,
                                                'flightname': formValues.flightName,
                                                'deptcity': formValues.departureCity,
                                                'depttime': formValues.departureTime,
                                                'arrivalcity': formValues.arrivalCity,
                                                'arrivaltime': formValues.arrivalTime,
                                                'status': 'hold'
                                            }
                                        ]);
                                        setShowInsertModal(false);
                                        setSessionZ(sessionZ + 1);
                                    }} style={{ backgroundColor: 'green', color: 'white' }}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal> :
                            showDeleteModal === true ?
                                <Modal show={showDeleteModal} onHide={() => { setShowDeleteModal(false); }}>
                                    <Modal.Header>
                                        <Modal.Title>Delete Flight Schedule</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='d-flex justify-content-center'>
                                        <p>Delete Flight Schedules of Ids: {checkedRows.join(', ')}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button className='fbc' variant="secondary" onClick={() => { setShowDeleteModal(false); }} style={{ backgroundColor: 'grey', color: 'white' }}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={async () => {
                                            await axios.delete(`http://localhost:3300/flight/${checkedRows[0]}`);
                                            setFlightSchedule(flightSchedule.filter(obj => !checkedRows.includes(obj.id)));
                                            setShowDeleteModal(false);
                                            setSessionZ(sessionZ + 1);
                                            setCheckedRows([]);
                                        }} style={{ backgroundColor: 'red', color: 'white' }}>
                                            Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal> :
                                showEditModal === true ?
                                    <Modal show={showEditModal} onHide={() => { setShowEditModal(false); }}>
                                        <Modal.Header>
                                            <Modal.Title>Edit Flight Schedule</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body className='d-flex justify-content-center'>
                                            <Form>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="formFlightName">
                                                                    <Form.Label>Flight Name</Form.Label>
                                                                    <Form.Control type="text" placeholder={formValues.flightName} value={formValues.flightName} onChange={(event) => { setFormValues({ ...formValues, 'flightName': event.target.value }) }} />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="formDepartureCity">
                                                                    <Form.Label>Departure City</Form.Label>
                                                                    <Form.Control type="text" placeholder={formValues.departureCity} value={formValues.departureCity} onChange={(event) => { setFormValues({ ...formValues, 'departureCity': event.target.value }) }} />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="formDepartureTime">
                                                                    <Form.Label>Departure Time</Form.Label>
                                                                    <Form.Control type="date" value={formValues.departureTime} onChange={(event) => { setFormValues({ ...formValues, 'departureTime': event.target.value }) }} />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="formArrivalCity">
                                                                    <Form.Label>Arrival City</Form.Label>
                                                                    <Form.Control type="text" placeholder={formValues.arrivalCity} value={formValues.arrivalCity} onChange={(event) => { setFormValues({ ...formValues, 'arrivalCity': event.target.value }) }} />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <Form.Group controlId="formArrivalTime">
                                                                    <Form.Label>Arrival Time</Form.Label>
                                                                    <Form.Control type="date" value={formValues.arrivalTime} onChange={(event) => { setFormValues({ ...formValues, 'arrivalTime': event.target.value }) }} />
                                                                </Form.Group>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button className='fbc' variant="secondary" onClick={() => {
                                                setShowEditModal(false); setFormValues({
                                                    'flightName': '',
                                                    'departureCity': '',
                                                    'departureTime': '',
                                                    'arrivalCity': '',
                                                    'arrivalTime': '',
                                                });
                                            }} style={{ backgroundColor: 'red', color: 'white' }}>
                                                Close
                                            </Button>
                                            <Button variant="primary" onClick={() => {
                                                setFlightSchedule(flightSchedule.map(item => {
                                                    if (item.id === checkedRows[0]) {
                                                        return {
                                                            ...item,
                                                            'flightname': formValues.flightName,
                                                            'deptcity': formValues.departureCity,
                                                            'depttime': formValues.departureTime,
                                                            'arrivalcity': formValues.arrivalCity,
                                                            'arrivaltime': formValues.arrivalTime,
                                                        }
                                                    }
                                                    else {
                                                        return item;
                                                    }
                                                }))
                                                setShowEditModal(false);
                                                setSessionZ(sessionZ + 1);
                                                setFormValues({
                                                    'flightName': '',
                                                    'departureCity': '',
                                                    'departureTime': '',
                                                    'arrivalCity': '',
                                                    'arrivalTime': '',
                                                });
                                            }} style={{ backgroundColor: 'green', color: 'white' }}>
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal> :
                                    <div className='body-h'>
                                        <div style={{ flexDirection: 'row', marginBottom: 20, marginTop: 40, display: 'flex', justifyContent: 'space-between', width: '30%' }}>
                                            <button style={{ backgroundColor: 'rgb(40, 224, 40)' }} onClick={() => { setShowInsertModal(true); }}>Insert</button>
                                            <button style={{ backgroundColor: editEnable === true ? 'blue' : 'grey' }} onClick={() => {
                                                if (editEnable === true) {
                                                    setFormValues({
                                                        'flightName': flightSchedule.find(item => item.id === checkedRows[0]).flightname,
                                                        'departureCity': flightSchedule.find(item => item.id === checkedRows[0]).deptcity,
                                                        'departureTime': flightSchedule.find(item => item.id === checkedRows[0]).depttime,
                                                        'arrivalCity': flightSchedule.find(item => item.id === checkedRows[0]).arrivalcity,
                                                        'arrivalTime': flightSchedule.find(item => item.id === checkedRows[0]).arrivaltime,
                                                    });
                                                    setShowEditModal(true);
                                                }
                                            }}>Edit</button>
                                            <button style={{ backgroundColor: deleteEnable === true ? 'red' : 'grey' }} onClick={() => { if (deleteEnable === true) { setShowDeleteModal(true); } }}>Delete</button>
                                        </div>
                                        <FlightScheduleTable schedules={flightSchedule} />
                                    </div>
                    }
                </> :
                <div id="lottie-container" />
            }
        </div>
    );
}

export default Home;