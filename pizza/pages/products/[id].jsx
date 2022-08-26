import React, { useState } from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/image";
import axios from "axios";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

const Product = ({ pizza }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(pizza.prices[0]);
  const [options, setOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleSize = (idx) => {
    setPrice(price + (pizza.prices[idx] - pizza.prices[size]));
    setSize(idx);
  };

  const handleOption = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      setPrice(price + option.price);
      setOptions((prev) => [...prev, option]);
    } else {
      setPrice(price - option.price);
      setOptions(options.filter((opt) => opt._id !== option.id));
    }
  };

  const handleQuantity = (e) => {
    if (e.target.value <= 0) {
      setQuantity(1);
    } else {
      setQuantity(e.target.value);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, quantity, options, price }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} alt="" layout="fill" objectFit="contain" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/img/size.png" alt="" layout="fill" objectFit="contain" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/img/size.png" alt="" layout="fill" objectFit="contain" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/img/size.png" alt="" layout="fill" objectFit="contain" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option, idx) => {
            return (
              <div className={styles.option} key={idx}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={option.text}
                  name={option.text}
                  onChange={(e) => handleOption(e, option)}
                />
                <label htmlFor={option.text}>{option.text}</label>
              </div>
            );
          })}
        </div>
        <div className={styles.add}>
          <input
            type="number"
            defaultValue={1}
            className={styles.quantity}
            value={quantity}
            onChange={(e) => handleQuantity(e)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Product;
