import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard/Dashboard';
import Table from '../components/Table/Table';
import {shallow} from "enzyme";
import Pagination from '../components/Table/Pagination/Pagination';
import Form from '../pages/Dashboard/Form/Form';
import { mockPagedData } from './data';
import { DashboardTableColumns } from '../pages/Dashboard/constants';

describe("Dashboard page", () => {
  test('renders page heading', () => {
    render(<Dashboard />);
    const header = screen.getByText(/Open Brewery DataBase/i);
    expect(header).toBeInTheDocument();
  });

  test("it should render dashboard component", () => {
    expect(shallow(<Dashboard />)).toMatchSnapshot();
    });

    test("it should render blank table component", () => {
      expect(shallow(<Table columns={DashboardTableColumns} tableData={[]} onEdit={jest.fn()} children={<></>} />)).toMatchSnapshot();
    })

    test("it should render table component with Data", () => {
      expect(shallow(<Table columns={DashboardTableColumns} tableData={mockPagedData} onEdit={jest.fn()} children={<></>} />)).toMatchSnapshot();
    })

    test("it should render pagination component", () => {
      expect(shallow(<Pagination currentPage={1} handlePageChange={jest.fn()}/>)).toMatchSnapshot();
    })

    test("it should render form component", () => {
      expect(shallow(<Form data={mockPagedData} handleEdit={jest.fn()} onAdd={jest.fn()} isEdit={true} />)).toMatchSnapshot();
    })
});
