import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import BooksContainers from './containers/BooksContainer';
import Pagination from './components/Pagination';
import './App.scss';
import Search from './components/Search';
import Loader from './assets/loading-book.gif';
import { getBooksRequest, booksError } from './actions/books';

const App = (props) => {
  const {
    location,
    history,
    getBooksRequest: callApi,
    books,
  } = props;

  return (
    <div className="App">
      {books.loader &&
      <div className="loader">
        <img alt="Loading..." src={Loader} width="110px" />
      </div>
      }
      <Route
        exact
        path={location.pathname !== '/' ? '/page/:id' : '/'}
        render={routeProps => (
          <Container>
            <Row>
              <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
                <Search
                  // updateInputValue={this.updateInputValue}
                  callBooks={callApi}
                  history={history}
                />
              </Col>
              <Col xs="12" lg="6" style={{ margin: '15px 0' }}>
                {books.data && books.data.books &&
                <Pagination
                  totalRecords={books.data.count}
                  pageLimit={books.itemsPerPage}
                  search={books.search}
                  callBooks={callApi}
                  currentPage={Number(routeProps.match.params.id) || 1}
                  history={history}
                  location={location}
                />
                }
              </Col>
            </Row>
            <BooksContainers
              {...routeProps}
              data={books.data}
              callBooks={callApi}
              loader={books.loader}
            />
          </Container>
        )}
      />
    </div>
  );
};

App.propTypes = {
  location: PropTypes.any,
  history: PropTypes.any,
  books: PropTypes.any,
  getBooksRequest: PropTypes.any,
};

export default connect(({ books }) => ({ books }), {
  getBooksRequest,
  booksError,
})(withRouter(props => <App {...props} />));
