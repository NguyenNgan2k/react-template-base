import { useEffect } from 'react';
import { StringToInt } from '@/utils';
import Button from './Button';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { BsThreeDots } from 'react-icons/bs';

interface Props {
  nextPage: Function;
  page: number;
  size: number;
  setSize: any;
  total: number;
  isElement: boolean
}

function Paging(props: Props) {

  const {
    nextPage,
    page,
    size,
    setSize,
    total = 0,
    isElement
  } = props

  const _page = page < 1 ? 1 : page;
  const pagesCount = Math.ceil(total / size);
  const isPaginationShown = pagesCount > 0;
  const isCurrentPageFirst = _page === 1;
  const isCurrentPageLast = _page === pagesCount;

  const changePage = (number: number) => {
    if (_page === number) return;
    nextPage(number);
  };

  const onPageNumberClick = (pageNumber: number) => {
    changePage(pageNumber);
  };

  const onPreviousPageClick = () => {
    if (isCurrentPageFirst) return;
    changePage(Number(_page) - 1);
  };

  const onNextPageClick = () => {
    if (isCurrentPageLast) return;
    changePage(Number(_page) + 1);
  };

  const setLastPageAsCurrent = () => {
    if (_page > pagesCount) {
      nextPage(1);
    }
  };

  let isPageNumberOutOfRange: boolean;

  const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
    const pageNumber = index + 1;
    const isPageNumberFirst = pageNumber === 1;
    const isPageNumberLast = pageNumber === pagesCount;
    const isCurrentPageWithinTwoPageNumbers = Math.abs(pageNumber - _page) <= 1;

    if (
      isPageNumberFirst ||
      isPageNumberLast ||
      isCurrentPageWithinTwoPageNumbers
    ) {
      isPageNumberOutOfRange = false;

      return (
        <Button
          variant='normal'
          key={pageNumber}
          onClick={() => onPageNumberClick(pageNumber)}
          isActive={pageNumber === _page}
        >
          {pageNumber}
        </Button>
      );
    }

    if (!isPageNumberOutOfRange) {
      isPageNumberOutOfRange = true;
      <BsThreeDots style={{ marginLeft: '5px' }} className='h-4 w-4' />
    }

    return null;
  });

  function handleChangeRecordPerpage(e: any) {
    setSize(StringToInt(e.target.value));
    changePage(1);
  }

  useEffect(setLastPageAsCurrent, [pagesCount]);

  return (
    <div className='flex w-full justify-between items-center'>
      {isElement && (
        <select
          className="form-control"
          value={size}
          onChange={handleChangeRecordPerpage}
        >
          <option value="10">10 phần tử / trang</option>
          <option value="20">20 phần tử / trang</option>
          <option value="50">50 phần tử / trang</option>
          <option value="100">100 phần tử / trang</option>
        </select>
      )}
      {isPaginationShown && _page > 0 && (
        <div className='flex items-center gap-1'>
          <Button
            variant='normal'
            onClick={onPreviousPageClick}
            disabled={isCurrentPageFirst}
            className='flex items-center'
          >
            <MdKeyboardArrowLeft />
            <span className='ml-1'>Prev</span>
          </Button>
          {pageNumbers}
          <Button
            variant='normal'
            onClick={onNextPageClick}
            disabled={isCurrentPageLast}
            className='flex items-center'
          >
            <span className='mr-1'>Next</span>
            <MdKeyboardArrowRight />
          </Button>
        </div>
      )}
      <div className='w-[150px]'></div>
    </div>
  );
}

export default Paging;
