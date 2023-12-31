import { Container, Banner, Section } from './style';
import ImageBanner from '../../assets/image-banner.png';
import { Header } from '../../components/Header';
import { Card } from '../../components/Card';
import { Footer } from '../../components/Footer';
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Carousel } from '../../components/Carousel';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [search, setSearch] = useState('');
  const [meals, setMeals] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [drinks, setDrinks] = useState([]);

  const navigate = useNavigate();

  const handleEditProduct = id => {
    navigate(`edit/${id}`);
  };

  useEffect(() => {
    const fetchProductsSearch = async () => {
      try {
        const response = await api.get(`/products/search/?title=${search}`);

        const meals = response.data.filter(product => product.categorie === 'Refeições');
        const desserts = response.data.filter(product => product.categorie === 'Sobremesas');
        const drinks = response.data.filter(product => product.categorie === 'Bebidas');

        setMeals(meals);
        setDesserts(desserts);
        setDrinks(drinks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductsSearch();
  }, [search]);

  return (
    <Container>
      <Header onChange={e => setSearch(e.target.value)} />

      <Banner>
        <img src={ImageBanner} alt="Imagem de brownies ilustrativa do banner" />
        <div className="Texting">
          <h1>Sabores inigualáveis</h1>
          <p>Sinta o cuidado do preparo com ingredientes selecionados.</p>
        </div>
      </Banner>

      <Section>
        <h1>Refeições</h1>

        <Carousel>
          {meals.map((product, index) => (
            <Card
              key={index}
              id={product.id}
              value={product.price}
              src={`${api.defaults.baseURL}/files/${product.image}`}
              title={product.title}
              to={`/product-info/${product.id}`}
              description={product.description}
              price={product.price}
              onClick={() => handleEditProduct(product.id)}
            />
          ))}
        </Carousel>
      </Section>

      <Section>
        <h1>Sobremesas</h1>

        <Carousel>
          {desserts.map((product, index) => (
            <Card
              key={index}
              id={product.id}
              src={`${api.defaults.baseURL}/files/${product.image}`}
              title={product.title}
              to={`/product-info/${product.id}`}
              description={product.description}
              price={product.price}
              onClick={() => handleEditProduct(product.id)}
            />
          ))}
        </Carousel>
      </Section>

      <Section>
        <h1>Bebidas</h1>

        <Carousel>
          {drinks.map((product, index) => (
            <Card
              key={index}
              id={product.id}
              src={`${api.defaults.baseURL}/files/${product.image}`}
              title={product.title}
              to={`/product-info/${product.id}`}
              description={product.description}
              price={product.price}
              onClick={() => handleEditProduct(product.id)}
            />
          ))}
        </Carousel>
      </Section>

      <Footer />
    </Container>
  );
};
