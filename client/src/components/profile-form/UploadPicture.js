import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { uploadPicture } from '../../actions/profile';
import { Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

const NAME_OF_UPLOAD_PRESET = 'insta-clone';
const YOUR_CLOUDINARY_ID = 'dtnzg6l1i';

const UploadPicture = ({ uploadPicture}) => {
  const [formData, setFormData] = useState({
    picture: '',
  });
  const { picture } = formData;
  //upload image to cloud
  async function uploadImage(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
      {
        method: 'POST',
        body: data,
      }
    );
    const img = await res.json();
    console.log(img);
    return img.secure_url;
  }

  const [image, setImage] = useState(false);
  const onImageChange = async (e) => {
    const [file] = e.target.files;
    if (!file) return;
    setImage(true);
    const uploadedUrl = await uploadImage(file);
    setFormData({ ...formData, picture: uploadedUrl });
    setImage(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    uploadPicture(formData);
  };

  return (
    <Form className="form" onSubmit={(e) => onSubmit(e)}>
      <Form.Control
        type="file"
        name="image"
        onChange={onImageChange}
        disabled={image}
      />

      <input
        type="submit"
        disabled={image}
        className="btn btn-primary my-1"
      />
    </Form>
  );
};


UploadPicture.propTypes = {
  uploadPicture: PropTypes.func.isRequired,
};

export default connect(null, { uploadPicture })(withRouter(UploadPicture));
