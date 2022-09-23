import React from "react";

export const mockUseCallback = () => {
  jest.spyOn(React, "useCallback").mockImplementation((fn) => fn);
};

let useEffectCleanups: any[];

export const mockUseEffect = () => {
  useEffectCleanups = [];
  jest.spyOn(React, "useEffect").mockImplementation((fn) => {
    const cleanup = fn();
    if (cleanup) {
      useEffectCleanups.push(cleanup);
    }
  });
};

export const mockUseState = (mockValue?: any, mockSetter?: any) => {
  return (
    jest
      .spyOn(React, "useState")
      // @ts-ignore
      .mockImplementation((value: any) => {
        return [
          mockValue !== undefined ? mockValue : value,
          mockSetter !== undefined ? mockSetter : jest.fn(),
        ];
      })
  );
};

