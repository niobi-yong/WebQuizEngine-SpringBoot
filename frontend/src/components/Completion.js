import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import CompletionService from '../services/CompletionService';
import CompletionFeed from './CompletionFeed';

const FetchCompletion = () => {
  const[ completion, setCompletion ] = useState([]);
  const[ activePage, setActivePage ] = useState(0);
  const[ itemsCountPerPage, setItemsCountPerPage ] = useState(0);
  const[ totalItemsCount, setTotalItemsCount ] = useState(0);

  useEffect(() => {
    CompletionService
      .getAll(activePage)
      .then(initialCompletion => {
          setCompletion(initialCompletion.content);
          setItemsCountPerPage(initialCompletion.size);
          setTotalItemsCount(initialCompletion.totalElements);
      })
  }, [activePage]);

  const completionData = completion.map((completed, id) => {
    return (
      <CompletionFeed
        key={id}
        id={completed.id}
        timestamp={completed.completedAt}
      />
    )

  });

  const handlePageNumber = (pageNumber) => {
    setActivePage(pageNumber - 1);
  }

  return (
    <div>
      {completionData}

      <div className="d-flex justify-content-center">
        <Pagination
         hideNavigation
         activePage={activePage}
         itemsCountPerPage={itemsCountPerPage}
         totalItemsCount={totalItemsCount}
         pageRangeDisplayed={10}
         itemClass='page-item'
         linkClass='btn btn-light'
         onChange={handlePageNumber}
         />
       </div>
    </div>
  );
};

export default FetchCompletion;
