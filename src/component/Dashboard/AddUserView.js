import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Axios from "axios";
import {withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from '../Dashboard/Dashboard';


const AddUserView = props => {
  const [classification, setClassification] = useState("");
  const [requirement, setRequirement] = useState("");

  // const onChangeFunction = event => {
  //   SetClassification(event.target.value);
  //   console.log(event.target.value);
  // };

  //   React.useEffect(() => {
  //       getData();
  //   },[]);

  
  const onSubmit = event => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER
    });

    let payload = {
      clause_classification: classification,
      clause: requirement
    };
    console.log(classification);
    console.log(requirement);
    // props.history.push('/user')

    Axios.post("http://localhost:3000/audits/create", payload).then(res => {
      console.log(res);
      //   getData();
    });
  };

  return (
    <div>
    <Dashboard />
    <div className="col-md-12 form-input" style={{marginTop:"5px"}}>
      <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container">
          <Card className="text-center">
            <Card.Header>Add New</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                  <Col sm={12}>
                    <Form.Control
                      type="text"
                      placeholder="Classification"
                      onChange={event => setClassification(event.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                  <Col sm={12}>
                    <Form.Control
                      type="text"
                      placeholder="Requirement"
                      onChange={e => setRequirement(e.target.value)}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm={{ span: 4, offset: 4 }}>
                    <Button type="submit" onClick={onSubmit}>
                      Add New
                    </Button>
                    <ToastContainer />
                  </Col>
                </Form.Group>
              </Form>
              {/* <Card.Title>Special title treatment</Card.Title>
      <Card.Text>
        With supporting text below as a natural lead-in to additional content.
      </Card.Text> */}
            </Card.Body>
            {/* <Card.Footer className="text-muted">2 days ago</Card.Footer> */}
          </Card>
        </div>
      </div>
    </div>
    </div>
  );
};

export default withRouter(AddUserView);
