import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const Search = ({ callBooks, history }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      history.push('/');
      callBooks(1, e.target[0].value);
    }}
  >
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Search field"
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          type="submit"
        >
          Search
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </form>
);

Search.propTypes = {
  history: PropTypes.any,
  callBooks: PropTypes.func,
};

export default Search;
