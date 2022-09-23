import { DASHBOARD_ITEMS_PER_PAGE } from "../constants";

export const getDashboardData = (page: number) => {
    return fetch(
        `https://api.openbrewerydb.org/breweries?page=${page}&per_page=${DASHBOARD_ITEMS_PER_PAGE}`,
      ).then(res => res.json());
}
