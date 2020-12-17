import React, {memo, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './ItemsList.sass';
import { useDispatch, useSelector } from 'react-redux';
import {changePage, logout, update} from '../../actions';
import { HOUR } from '../../constants';

const ItemsList = (props) => {
  const dispatch = useDispatch();
  const { appState, page } = useSelector((state) => state);

  const slicedFlights = props.flights.slice(page * 20, 20 * (page + 1));
  const pages = Math.ceil(props.flights.length / 20) || 1;

  const isDisabled = appState === 'loading' || appState === 'loading';

  useEffect(() => {
    if (page > pages-1) {
      dispatch(changePage(pages-1))
    }
  }, [pages, page, dispatch])


  const paginationConfig = {
    pageCount: pages,
    disabled: isDisabled,
    onPageChange: (data) => {
      if (!isDisabled && data.selected !== page) {
        dispatch(changePage(data.selected))
      }
    },
    initialPage: 0,
    forcePage: page,
    pageRangeDisplayed: 5,
    marginPagesDisplayed: 2,
    containerClassName: 'pagination justify-content-center mt-3',
    breakClassName: 'page-item',
    breakLinkClassName: 'page-link',
    pageClassName: 'page-item',
    pageLinkClassName: 'page-link',
    activeClassName: 'page-item active',
    previousClassName: 'page-item',
    nextClassName: 'page-item',
    previousLinkClassName: 'page-link',
    nextLinkClassName: 'page-link',
  };

  const onClickLogout = () => {
    dispatch(logout())
  }

  const onClickUpdate = () => {
    dispatch(update());
  };

  const flights = slicedFlights.map((flight) => {
    const time = new Date();
    time.setSeconds(flight.time - 6.5 * HOUR);
    return (
      <tr key={flight.id}>
        <td>{flight.id}</td>
        <td>{flight.airport}</td>
        <td>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' CST'}</td>
        <td>{flight.arriving}</td>
        <td>{flight.departing}</td>
      </tr>
    );
  });
  return (
    <>
      <div className='col mt-4'>
          <Button disabled={isDisabled} onClick={onClickUpdate} className='float-left mb-3'>
            Update
          </Button>
          <Button disabled={isDisabled} onClick={onClickLogout} className='float-right mb-3'>
            Logout
          </Button>
        <Table className="text-sm-center" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>AIRPORT</th>
              <th>TIME</th>
              <th>ARRIVING</th>
              <th>DEPARTING</th>
            </tr>
          </thead>
          <tbody>{flights}</tbody>
        </Table>
      </div>
      <ReactPaginate {...paginationConfig} />
    </>
  );
};

export default memo(ItemsList);
