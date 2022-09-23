/**
 * @jest-environment jsdom
 */

import React from "react";
import { getDashboardData } from "../apis/dashboard";
import { useDashboardData, usePagination } from "../pages/Dashboard/hooks"
import { mockUseCallback, mockUseEffect, mockUseState } from "../__mocks__/GenericReactMocks";
import { mockPagedData } from "./data";

describe("Dashboard hooks", () => {
    test("useDashboardData should return proper data", () => {
        const setState = jest.fn();
        mockUseState([], setState);
        mockUseEffect();
        mockUseCallback();

        const {paginatedData, onEdit, onAdd, editData, isEdit, handleEdit} = useDashboardData(1);
        expect(paginatedData).toEqual([]);
        onEdit("123");
        expect(setState).toBeCalledTimes(2);
        expect(isEdit).toBeTruthy();
        handleEdit(mockPagedData[0]);
        expect(setState).toBeCalledTimes(4);
        onAdd(mockPagedData[0]);
        expect(setState).toBeCalledTimes(5);
    });

    test("usePagination should return proper data", () => {
        const setState = jest.fn();
        mockUseState(1, setState);
        mockUseCallback();
        const {currentPage, handlePageChange} = usePagination();
        expect(currentPage).toEqual(1);
        handlePageChange(1);
        expect(setState).toHaveBeenCalledTimes(1);
        handlePageChange(-1);
        expect(setState).toHaveBeenCalledTimes(2);
    })
})