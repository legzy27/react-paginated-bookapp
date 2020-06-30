import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';

const Book = ({ item }) => (
  <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
    <Card border="primary" style={{ width: '100%', height: '100%' }}>
      <Card.Body>
        <Card.Title>{item.book_title}</Card.Title>
        <Card.Text>
          {item.book_author.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </Card.Text>
        <div>
          <strong>
            Year:
          </strong>
          <span className="publication-year">{item.book_publication_year}</span>
          <span> - </span>
          <strong>
            Country:
          </strong>
          <span className="publication-country">{item.book_publication_country}</span>
        </div>
      </Card.Body>
    </Card>
  </Col>
);

Book.propTypes = {
  item: PropTypes.object,
};

export default Book;
