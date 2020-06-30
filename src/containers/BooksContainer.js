import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Book from '../components/Book/Book';
import noResult from '../assets/no-result.png';

class BooksContainer extends React.Component {
  componentDidMount() {
    const { callBooks, match } = this.props;
    callBooks(match.params.id || 1);
  }

  render() {
    const { data, match, loader } = this.props;
    return (
      data &&
        <React.Fragment>
          <Row style={{ margin: '10px 0px 10px 0px' }}>
            Page:
            <strong>{data.books.length !== 0 ? match.params.id || 1 : '--'}</strong>
          </Row>
          <Row style={{ opacity: loader ? '0.3' : '1' }}>
            {data && data.books.map((e, i) => (
              <Book item={e} key={i} />
            ))}
            {data && data.books.length === 0 &&
              <Col lg="12" style={{ margin: '15px 0' }} className="text-center">
                <img src={noResult} alt="No result found..." style={{ maxWidth: '400px', width: '100%' }} />
              </Col>
            }
          </Row>
        </React.Fragment>
    );
  }
}

BooksContainer.propTypes = {
  data: PropTypes.object,
  match: PropTypes.any,
  callBooks: PropTypes.func,
  loader: PropTypes.bool,
};

export default BooksContainer;
