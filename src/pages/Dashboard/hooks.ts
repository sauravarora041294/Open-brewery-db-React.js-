import { useCallback, useEffect, useState } from "react";
import { getDashboardData } from "../../apis/dashboard";
import { IDashboard } from "../../interfaces/dashboard";

export const useDashboardData = (page: number) => {
    const [paginatedData, setPaginatedData] = useState<IDashboard[]>([]);
    const [editData, setEditData] = useState<IDashboard|null>(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        getDashboardData(page)
        .then(res => setPaginatedData(res))
        .catch(error => console.log(error));
    }, [page]);

    const onEdit = (id: string) => {
        const itemToEdit = paginatedData.find((item: IDashboard) => item.id === id);
        setEditData(itemToEdit ? {...itemToEdit}: null);
        setIsEdit(true);
    };

    const onAdd = (addData: IDashboard) => {
        const updatedPaginatedData: IDashboard[] = [addData, ...paginatedData]
        setPaginatedData(updatedPaginatedData);
    }

    const handleEdit = (_editData: IDashboard) => {
        const updatedPaginatedData = paginatedData.map((item: IDashboard) => {
            if(_editData.id === item.id){
                return {
                    name: _editData.name,
                    brewery_type: _editData?.brewery_type,
                    city: _editData.city,
                    country: _editData.country,
                    id:_editData.id,
                    rating: _editData.rating
                }
            } else {
                return item;
            }
        });
        setPaginatedData(updatedPaginatedData);
        setIsEdit(false);
    }

    return {paginatedData, onEdit, onAdd, editData, isEdit, handleEdit}
}

export const usePagination = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handlePageChange = useCallback((next: number) => {
        setCurrentPage(prev => prev + next);
    }, [currentPage]);

    return {currentPage, handlePageChange}
}