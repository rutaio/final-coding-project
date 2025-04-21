import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/global';

export const SubmitProduct = () => {
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await axios.post(API_URL, {
      image,
      title,
      description,
      materials,
    });
    window.location.reload();
  };

  return (
    <form className="submit-product-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Please add an image as a link"
        value={image}
        required
        onChange={(event) => setImage(event.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Product name"
        required
        onChange={(event) => setTitle(event.target.value)}
      ></input>
      <textarea
        type="text"
        placeholder="Product description"
        required
        onChange={(event) => setDescription(event.target.description)}
      ></textarea>
      <input
        type="text"
        placeholder="What is it made of?"
        value={materials}
        required
        onChange={(event) => setMaterials(event.target.value)}
      ></input>
      <button type="submit">Submit this Product</button>
    </form>
  );
};
