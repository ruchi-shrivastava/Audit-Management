import React, { useState } from "react";
import { Table } from "reactstrap";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import FileBase64 from "react-file-base64";
import Header from "../../Common/Header";
import Dashboard from "../Dashboard/Dashboard"

// import Home from '../component/Home';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  FormText
} from "reactstrap";
import axios from "axios";

const UserView = props => {
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [base64file, setBase64File] = useState("");
  const [radioOptionYes, setRadioOptionYes] = useState(null);
  const [radioOptionNo, setRadioOptionNo] = useState(null);
  const [extOption, setExtOption] = useState("");
  const [idForUpdate, setIdForUpdate] = useState(null);
  const [page, setPage] = useState(1);

  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  // const url = "http://localhost:3000/audits/findAll";
  // React.useEffect(() => {
  //   getData();
  // }, []);


   //  passing page no line no. 49to 52
  const url = "http://localhost:3000/audits/findAll";
  React.useEffect(() => {
    getData();
  }, [page]);

  const getFiles = files => {
    console.log(files.base64);
    setBase64File(files.base64);
  };

  // const getData = () => {
  //   axios.get(url).then(res => {
  //     setData(res.data);
  //     console.log("res", res);
  //     console.log("data", data);
  //   });
  // };

  const getData = () => {
    //  passing page no line no. 66 to 70
    let payload = { 
      pageNo: page,   
      size: 6
    };

    axios.get(url,payload).then(res => {
      setData(res.data);
      console.log("res", res);
      console.log("data", data);
      console.log("payload",payload);
      
    });
  };


  const deleteTable = id => {
    let payload = {
      _id: id
    };
    console.log("_id", id);

    axios.delete("http://localhost:3000/audits/delete/" + id).then(result => {
      console.log(result);
      getData();
    });
  };

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const toggle = id => {
    setIdForUpdate(id);
    setModal(!modal);
  };
  const onSubmitForm = id => {
    setModal(!modal);
    console.log(radioOptionYes);
    console.log(radioOptionNo);
    console.log(comment);
    console.log(file);

    let payload = {
      _id: idForUpdate,
      yes: radioOptionYes,
      no: radioOptionNo,
      comments: comment,
      fileAttachment: base64file
    };
    console.log(payload);
    let options = {
      method: "PUT",
      url: "http://localhost:3000/audits/updateAudit",
      headers: {
        "content-type": "application/json"
      },
      data: payload
    };
    console.log(options);
    axios(options).then(result => {
      console.log(result);
      getData();
    });
  };

  const renderTable = () => {
    return data.map((audit, index) => {
      return (
        <tr key={index}>
          <option value="null" defaultValue>
            {audit.clause_classification}
          </option>
          <td>{audit.clause}</td>
          <td>{audit.yes}</td>
          <td>{audit.no}</td>
          <td>{audit.evidence_file_name}</td>
          <td>{audit.comments}</td>
          <td>{audit.date}</td>
          <td>
            <EditIcon onClick={() => toggle(audit._id)} />
          </td>
          <td>
            {/* <DeleteIcon onClick={deleteTable } /> */}
            <DeleteIcon
              onClick={() => {
                deleteTable(audit._id);
              }}
            />
          </td>
        </tr>
      );
    });
  };

  return (
    // <div>
    /* <Button color="primary">primary</Button>{' '} */
    /* <Button className="pull-right" color="primary">
   Add New
</Button> */
    <div>
      <Dashboard />
    <div className="form-input-table">
     
      <Table striped>
        <thead>
          <tr>
            <th>
              Clause Classification
              {/* <Label for="exampleSelect">Physical Security</Label> */}
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                // onChange={handleChange}
              />
            </th>
            <th>Requirement</th>
            <th>Yes</th>
            <th>No</th>
            <th>Evedence</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </Table>

      {/* model open */}

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update Form</ModalHeader>
        <ModalBody>
          <FormGroup>
            {/* <Label for="exampleText">Comment</Label> */}
            <Input
              type="textarea"
              name="text"
              id="exampleText"
              placeholder="Evedence"
              onChange={e => setComment(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            {/* <Label for="exampleFile">File</Label> */}
            {/* <Input type="file" name="file" id="exampleFile" onChange={(e)=>setFile(e.target.files[0])} /> */}
            <FileBase64 onDone={getFiles} />
            <FormText color="muted">Browse Evidence File</FormText>
          </FormGroup>
          <FormGroup tag="fieldset">
            <legend>Check Me</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  onClick={() => setRadioOptionYes("yes")}
                />{" "}
                Yes
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  onClick={() => setRadioOptionNo("no")}
                />{" "}
                No
              </Label>
            </FormGroup>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onSubmitForm}>
            Submit
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    {/* modal close */}

      {/* <Home /> */}
    </div>
  
  
       {/* pegination  */}

       <div style={{ display: "flex", justifyContent: "center" }}>
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" onClick={previousPage}>
              Previous
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              {page - 1}
            </a>
          </li>
          <li class="page-item active">
            <a class="page-link">
              {page} <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" href="#">
              {page + 1}
            </a>
          </li>
          <li class="page-item">
            <a class="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </div>

      {/* pagination close */}



  </div>
  );
};

export default UserView;
