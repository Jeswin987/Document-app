import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, updateDoc,getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';
import './Document.css'

function Document() {
  const [content, setContent] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const documentRef = doc(db, 'document', id);
    
    const loadDocument = async () => {
      try {
        const documentSnap = await getDoc(documentRef);
        if (documentSnap.exists()) {
          const data = documentSnap.data();
          setContent(data.description || '');
        }
      } catch (error) {
        console.error('Error loading document:', error);
      }
    };

    loadDocument();
  }, [id]);

  const handleQuillChange = (value) => {
    setContent(value);
  };

  const handleUpdate = async () => {
    const textdoc = doc(db, 'document', id);
    await updateDoc(textdoc, { description: content });
  };

  return (
    <div >
      <ReactQuill
        value={content}
        onChange={handleQuillChange}
        theme='snow'
        className='mt-3 d-felx jistify-content-center align-items-center'
        modules={{
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
           
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'list',
          'bullet',
          'link',
          'image',
        ]}
      />
      <Button style={{marginLeft:'600px'}} className='mt-2 bg-dark' variant="contained" color="primary" onClick={handleUpdate}>
        Save
      </Button>
    </div>
  );
}

export default Document;
