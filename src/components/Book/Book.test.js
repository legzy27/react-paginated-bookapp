/* eslint-disable no-undef */
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Book from './Book';

configure({ adapter: new Adapter() });

const singleBook = {
  id: 1086,
  book_author: [
    'Cory',
    'Althoff',
  ],
  book_title: 'The Self-Taught Programmer',
  book_publication_year: 2017,
  book_publication_country: 'USA',
  book_publication_city: 'New York',
  book_pages: 299,
};

describe('Book', () => {
  it('should render correctly with the expected value', () => {
    const wrapper = shallow(<Book item={singleBook} />);
    //console.log(wrapper.debug());

    expect(wrapper.find('CardTitle').text()).toBe(singleBook.book_title);
    expect(wrapper.find('CardText').text()).toBe(singleBook.book_author.join(''));
    expect(wrapper.find('.publication-year').text()).toBe(String(singleBook.book_publication_year));
    expect(wrapper.find('.publication-country').text()).toBe(String(singleBook.book_publication_country));

  });
});
