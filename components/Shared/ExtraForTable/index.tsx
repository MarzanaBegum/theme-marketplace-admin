import { PaginationComponent } from "react-data-table-component/dist/src/DataTable/types";

const paginationComponent: PaginationComponent = ({
    currentPage,
    rowCount,
    rowsPerPage,
    onChangePage,
}) => {
    return (
        <div className="flex text-[#9AA5B5]  items-center justify-end gap-5 text-xs py-10">
            <div
                onClick={() =>
                    currentPage > 1 && onChangePage(currentPage - 1, rowCount)
                }
                className="bg-[#7266FC] text-[#fff] cursor-pointer p-[2px_8px] rounded-[3px]"
            >
                Previous
            </div>

            <div className="flex gap-2">
                {currentPage === Math.ceil(rowCount / rowsPerPage) && (
                    <div
                        onClick={() => onChangePage(currentPage - 2, rowCount)}
                        className="  cursor-pointer text-[#9AA5B5]  p-[2px_8px] rounded-[3px]"
                    >
                        {currentPage - 2}
                    </div>
                )}
                {currentPage != 1 && (
                    <div
                        onClick={() => onChangePage(currentPage - 1, rowCount)}
                        className="  cursor-pointer text-[#9AA5B5]  p-[2px_8px] rounded-[3px]"
                    >
                        {currentPage - 1}
                    </div>
                )}
                <div
                    onClick={() => onChangePage(currentPage, rowCount)}
                    className="bg-[#7266FC]  cursor-pointer text-[#fff] p-[2px_8px] rounded-[3px]"
                >
                    {currentPage}
                </div>

                {currentPage != Math.ceil(rowCount / rowsPerPage) && (
                    <div
                        onClick={() => onChangePage(currentPage + 1, rowCount)}
                        className=" text-[#9AA5B5]  cursor-pointer  p-[2px_8px] rounded-[3px]"
                    >
                        {currentPage + 1}
                    </div>
                )}
                {currentPage == 1 && (
                    <div
                        onClick={() => onChangePage(currentPage + 2, rowCount)}
                        className=" text-[#9AA5B5] cursor-pointer  p-[2px_8px] rounded-[3px]"
                    >
                        {currentPage + 2}
                    </div>
                )}
            </div>
            <div
                onClick={() => onChangePage(currentPage + 1, rowCount)}
                className="bg-[#7266FC] text-[#fff] cursor-pointer p-[2px_8px] rounded-[3px]"
            >
                Next
            </div>
        </div>
    );
};
