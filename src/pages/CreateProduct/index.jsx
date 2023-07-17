import { Container, CreateProductForm } from './style';
import { Header } from '../../components/Header';
import { Return } from '../../components/Return';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputValue } from '../../components/InputValue';
import { IngredientsItem } from '../../components/IngredientsItem';
import UploadIcon from '../../assets/upload.svg';
import { useState } from 'react';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user.isAdmin;

  const [product, setProduct] = useState({
    image: null,
    title: '',
    categorie: '',
    price: '',
    ingredients: [],
    description: '',
    imageProductFilename: '',
  });

  const handleImageAdd = e => {
    const filename = e.target.files[0];
    setProduct(prevState => ({
      ...prevState,
      image: filename,
      imageProductFilename: filename.name,
    }));
  };

  const handleAddIngredient = () => {
    if (product.newIngredient.trim() === '') {
      return;
    }

    setProduct(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, product.newIngredient],
      newIngredient: '',
    }));
  };

  const handleRemoveIngredient = index => {
    setProduct(prevState => ({
      ...prevState,
      ingredients: prevState.ingredients.filter((_, i) => i !== index),
    }));
  };

  const handleChangeIngredient = (value, index) => {
    setProduct(prevState => {
      const newIngredients = [...prevState.ingredients];
      newIngredients[index] = value;
      return {
        ...prevState,
        ingredients: newIngredients,
      };
    });
  };

  const handleChangeInput = e => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const formatValue = productValue => {
    const valueNumber = productValue.replace(/[^0-9]/g, '');
    const decimalNumber = valueNumber.slice(-2);
    const wholeNumber = valueNumber.slice(0, -2);

    const formatedNumber = `R$ ${wholeNumber},${decimalNumber}`;

    return formatedNumber;
  };

  const handleChangeInputValue = e => {
    const newValue = e.target.value;
    const valueFormated = formatValue(newValue);

    setProduct(prevState => ({
      ...prevState,
      price: valueFormated,
    }));
  };

  const handleCreateNewProduct = async e => {
    e.preventDefault();

    if (product.ingredients.includes('')) {
      return alert('Você possui um ingrediente não adicionado, preencha ou remova o campo vazio');
    }

    if (!product.image) {
      return alert('Insira uma imagem');
    }

    const { title, categorie, price, ingredients, description } = product;

    if (!title || !categorie || !price || !ingredients.length || !description) {
      return alert('Preencha todos os campos!');
    }

    const valueNumber = price.replace(/[^0-9]/g, '');
    const valueSent = (parseInt(valueNumber) / 100).toFixed(2);

    const formData = new FormData();
    formData.append('image', product.image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', valueSent);
    formData.append('categorie', categorie);
    formData.append('ingredients', JSON.stringify(ingredients));

    await api.post('/products/create', formData);

    alert('Produto criado com sucesso');
    navigate('/');
  };

  return (
    <Container>
      <Header isAdmin={isAdmin} />
      <Return />
      <h1>Adicionar prato</h1>

      <CreateProductForm enctype={'multipart/form-data'}>
        <div className="row">
          <div className="column">
            <label htmlFor="file-upload"> Imagem do prato </label>
            <label htmlFor="file-upload" className="custom-file-upload">
              <i className="fas fa-cloud-upload-alt">
                {' '}
                <img src={UploadIcon} alt="Icone para upload de imagens" />{' '}
              </i>
              {product.imageProductFilename ? product.imageProductFilename : 'Selecione uma imagem'}
            </label>
            <input name="imageProductFilename" id="file-upload" type="file" accept="image/*" onChange={handleImageAdd} />
          </div>

          <div className="column">
            <label htmlFor="name-product" className="label">
              Nome
            </label>
            <Input
              type="text"
              placeholder="Ex.: Salada César"
              id="name-product"
              name="title"
              value={product.title}
              onChange={handleChangeInput}
            />
          </div>

          <div className="column">
            <label htmlFor="category-product" className="label">
              Categoria
            </label>
            <select
              name="categorie"
              id="category-product"
              value={product.categorie}
              onChange={handleChangeInput}
            >
              <option value="" disabled>
                Selecione
              </option>
              <option value="Refeições">Refeições</option>
              <option value="Sobremesas">Sobremesas</option>
              <option value="Bebidas">Bebidas</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="column">
            <label htmlFor="ingredients-product" className="label">
              Ingredientes
            </label>

            <div className="Ingredients">
              {product.ingredients.map((ingredient, index) => (
                <IngredientsItem
                  key={index}
                  value={ingredient}
                  onChange={e => handleChangeIngredient(e.target.value, index)}
                  onClick={() => handleRemoveIngredient(index)}
                />
              ))}
              <IngredientsItem
                isNew
                placeholder="Adicionar"
                value={product.newIngredient}
                onChange={e => setProduct(prevState => ({ ...prevState, newIngredient: e.target.value }))}
                onClick={handleAddIngredient}
              />
            </div>
          </div>

          <div className="column">
            <label htmlFor="price-product" className="label">
              Preço
            </label>
            <InputValue
              placeholder="R$ 00,00"
              id="price-product"
              type="texting"
              name="price"
              value={product.price}
              onChange={handleChangeInputValue}
            />
          </div>
        </div>

        <label htmlFor="description-product" className="label">
          Descrição
        </label>
        <textarea
          name="description"
          id="description-product"
          placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
          value={product.description}
          onChange={handleChangeInput}
        />

        <Button type="submit" title="Salvar prato" id="create" className="save" onClick={handleCreateNewProduct} />
      </CreateProductForm>

      <Footer />
    </Container>
  );
};
