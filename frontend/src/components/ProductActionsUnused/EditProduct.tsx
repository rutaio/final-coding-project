import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';

export const EditProduct = ({ handleCancelClick, productContent }) => {
  const [image, setImage] = useState(productContent.image);
  const [title, setTitle] = useState(productContent.title);
  const [description, setDescription] = useState(productContent.description);
  const [materials, setMaterials] = useState(productContent.materials);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.put(`${API_URL}/products/${productContent._id}`, {
      image,
      title,
      description,
      materials,
    });
    window.location.reload();
  };

  return (
    <form className="edit-product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Please add a new image as a link:"
        value={image}
        required
        onChange={(event) => setImage(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Edit the title:"
        value={title}
        required
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <textarea
        placeholder="Describe how this object was used:"
        value={description}
        required
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Edit product materials:"
        value={materials}
        required
        onChange={(event) => setMaterials(event.target.value)}
      ></input>
      <button type="submit" onClick={handleCancelClick}>
        Cancel
      </button>
    </form>
  );
};
