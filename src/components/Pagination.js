import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

class Pagination extends Component {
  componentDidUpdate(prevProps) {
    const {
      history,
      location,
      currentPage,
      callBooks,
      search,
    } = this.props;
    if (history.action === 'POP' && prevProps.location.pathname !== location.pathname) {
      callBooks(currentPage, search);
    }
  }

  range = (from, to, step = 1) => {
    let i = from;
    const items = [];

    while (i <= to) {
      items.push(i);
      i += step;
    }
    return items;
  };

  fetchPageNumbers = () => {
    const {
      pageLimit,
      totalRecords,
      currentPage,
    } = this.props;

    const totalPages = Math.ceil(totalRecords / pageLimit);

    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = 7;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      let pages = this.range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */
      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      // handle: (1) < {5 6} [7] {8 9} (10)
      if (hasLeftSpill && !hasRightSpill) {
        pages = [LEFT_PAGE, ...this.range(startPage - spillOffset, startPage - 1), ...pages];
      } else if (!hasLeftSpill && hasRightSpill) {
        pages = [...pages, ...this.range(endPage + 1, endPage + spillOffset), RIGHT_PAGE];
      } else {
        pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
      }

      return [1, ...pages, totalPages];
    }
    return this.range(1, totalPages);
  };

  render() {
    const {
      callBooks,
      currentPage,
      search,
    } = this.props;

    const pages = this.fetchPageNumbers();

    return (
      <nav aria-label="Countries Pagination" className="float-lg-right">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) return (
              <li key={index} className="page-item">
                <Link
                  to={`/page/${currentPage - 1}`}
                  className="page-link"
                  aria-label="Previous"
                  onClick={() => callBooks((currentPage - 1), search)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </Link>
              </li>
            );
            if (page === RIGHT_PAGE) return (
              <li key={index} className="page-item">
                <Link
                  to={`/page/${currentPage + 1}`}
                  className="page-link"
                  aria-label="Next"
                  onClick={() => callBooks((currentPage + 1), search)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </Link>
              </li>
            );

            return (
              <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                <Link
                  className="page-link"
                  onClick={() => callBooks(page, search)}
                  to={page === 1 ? '/' : `/page/${page}`}
                >
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number,
  callBooks: PropTypes.func,
  currentPage: PropTypes.any,
  history: PropTypes.any,
  location: PropTypes.any,
  search: PropTypes.string,
};

export default Pagination;
