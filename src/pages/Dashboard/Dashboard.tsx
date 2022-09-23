import { ReactElement } from 'react';
import Pagination from '../../components/Table/Pagination/Pagination';
import Table from '../../components/Table/Table';
import Form from './Form/Form';
import './Dashboard.scss';
import { useDashboardData, usePagination } from './hooks';
import { DashboardTableColumns } from './constants';
import { IDashboard } from '../../interfaces/dashboard';

const Dashboard = (): ReactElement => {
  const {currentPage, handlePageChange} = usePagination();
  const {paginatedData, onEdit, onAdd, editData, isEdit, handleEdit} = useDashboardData(currentPage);

  return (
    <div className="MainSection">
      <h2>Open Brewery DataBase</h2>
      <div className="TableSection">
          <div className="TableWrapper">
            <Table tableData={paginatedData} columns={DashboardTableColumns} onEdit={(id: string) => onEdit(id)}>
                  <>
                  {paginatedData.map((tableItem: IDashboard) => {
                    return (<tr key={`tableRow-${tableItem.id}`} >
                    <td>{tableItem.name}</td>
                    <td>{tableItem.brewery_type}</td>
                    <td>{tableItem.city}</td>
                    <td>{tableItem.country}</td>
                    <td>{tableItem.rating ?? "0"}</td>
                    <td>
                        <button onClick={() => onEdit(tableItem.id)}>Edit</button>
                    </td>
                </tr>)
                })}
                </>
            </Table>
            <Pagination currentPage={currentPage} handlePageChange={handlePageChange} />
          </div>
          <div className="FormWrapper">
            <Form data={editData} onAdd={onAdd} isEdit={isEdit} handleEdit={handleEdit}/>
          </div>
      </div>
    </div>
  );
}

export default Dashboard;
