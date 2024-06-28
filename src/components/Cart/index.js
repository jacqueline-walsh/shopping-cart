import React, { useState, useEffect } from 'react';
import { CartState } from '../../context/Context';
import '../style.css';
import { ListGroup, Button, Col, Row, Form, Image } from 'react-bootstrap';
import Rating from '../Rating';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0),
    );
  }, [cart]);

  return (
    <div className="cart">
      <div className="productContainer">
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid round="true" />
                </Col>
                <Col md={2}>{prod.name}</Col>
                <Col md={2}>€{prod.price}</Col>
                <Col md={2}>
                  <Rating rating={prod.ratings} />
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) => {
                      dispatch({
                        type: 'CHANGE_CART_QTY',
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      });
                    }}
                  >
                    {[...Array(prod.inStock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      dispatch({
                        type: 'REMOVE_FROM_CART',
                        payload: prod,
                      });
                    }}
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}>Total €{total}</span>
        <Button
          type="button"
          style={{ marginBottom: 10 }}
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </Button>
        <Link to="/">
          <Button type="button" style={{ width: '100%' }}>
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
