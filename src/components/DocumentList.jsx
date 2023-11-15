import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';


function DocumentList() {
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [docu, setDocu] = useState([]);
  const [update, setUpdate] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null); 

  const documentCollection = collection(db, 'document');

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedDocument(null); 
  };

  const createDoc = async () => {
    await addDoc(documentCollection, { title: newTitle, description: newDescription });
    handleClose(); 
  };

  const deleteDocument = async (id) => {
    const datadoc = doc(db, 'document', id);
    try {
      await deleteDoc(datadoc);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const updateTitle = async () => {
    if (selectedDocument) {
      const datadoc = doc(db, 'document', selectedDocument.id);
      await updateDoc(datadoc, { title: update });
      handleClose();
    }
  };

  // const handleEdit = (document) => {
  //   setUpdate(document.title);
  //   setSelectedDocument(document);
  //   handleShow();
  // };

  useEffect(() => {
    const getDocuments = async () => {
      const data = await getDocs(documentCollection);
      setDocu(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getDocuments();
  }, [documentCollection]);

  return (
   <div className='main-container '>
      <div className="app-container">
        <div className="form-container">
          <Button className="action-button" onClick={handleShow}>
            Add Document
          </Button>
        </div>
  
        <div className="document-list">
          {docu.map((document) => (
            <div key={document.id} style={{width:'400px'}} className="document-card ms-5 bg-dark shadow mb-3">
              <Link style={{textDecoration:'none'}} to={`/document/${document.id}`}><h2 className="document-title" style={{color:'white'}}>Title:<span className='title-span'> {document.title}</span></h2></Link>
              {/* <p className="document-description">Description: {document.description}</p> */}
              <div className="button-container">
                <button className="btn btn-danger delete" onClick={() => deleteDocument(document.id)}>
                <i class="fa-regular fa-trash-can fa-bounce fa-xl"></i>
                </button>
                {/* <button className="btn btn-primary ms-2" onClick={() => handleEdit(document)}>
                  Edit
                </button> */}
              </div>
            </div>
          ))}
        </div>
  
        <Modal className='JW' show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedDocument ? 'Edit Document' : 'Add Document'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label style={{fontWeight:'bold'}}>Title</Form.Label>
                
              </Form.Group>
              <TextField className='w-100' value={selectedDocument ? update : newTitle}
                  onChange={(e) => (selectedDocument ? setUpdate(e.target.value) : setNewTitle(e.target.value))} style={{fontWeight:'bold'}} id="outlined-basic" label="Enter Title" variant="outlined" />
  
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button style={{color:'white'}} className='bg-danger' variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={selectedDocument ? updateTitle : createDoc}>
              {selectedDocument ? 'Update' : 'Add'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
   </div>
  );
}

export default DocumentList;
