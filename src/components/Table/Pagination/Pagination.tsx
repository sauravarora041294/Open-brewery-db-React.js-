import { FC, ReactElement } from "react";
import './Pagination.scss';

interface Props {
    currentPage: number;
    handlePageChange: (counter: number) => void;
}

const Pagination: FC<Props> = ({currentPage, handlePageChange}): ReactElement => {
    return <div className="PaginationSection">
        <button className="PaginateButton" disabled={currentPage === 1} onClick={() => handlePageChange(-1)}>Previous</button>
        <span>{currentPage}</span>
        <button className="PaginateButton" onClick={() => handlePageChange(1)}>Next</button>
    </div>
}

export default Pagination;