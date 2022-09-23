import { FC, ReactElement, ReactNode } from "react";
import { IDashboard } from "../../interfaces/dashboard";
import { DashboardTableColumns } from "../../pages/Dashboard/constants";
import "./Table.scss";

interface Props {
    tableData: IDashboard[];
    onEdit: (id: string) => void;
    columns: string[];
    children: JSX.Element;
}

const Table: FC<Props> = ({tableData, onEdit, columns, children}): ReactElement => {
    return (
        <table className="Table">
            <thead className="TableHeader">
            <tr>
                {columns.map((columnItem: string) => <th>{columnItem}</th>)}
            </tr>
            </thead>
            <tbody className="TableBody">
                {children}
            </tbody>
        </table>
    )
}

export default Table;