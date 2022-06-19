'use strict';

const customersCountURI = 'http://localhost:8083/api/v1/customers/count/';
const transactionsCountURI = 'http://localhost:8087/api/v1/transactions/count/';
const accountsURI = 'http://localhost:8086/api/v1/accountLookup/';

const makeRequest = (url) => {
    return zubankApi.get(url)
        .then(({ data }) => data)
        .catch((error) => {
            console.log(error);
            return error;
        });
}

// load page data
const init = async () => {
    const statistics = await Promise.all([
        getTotalNumOfCustomers(), // returns a number
        getTotalNumOfTransactions(), // returns a number
        getAllAccounts() // returns an array (list of all accounts)
    ]);
    renderPageStatistics(statistics);
}

// get total count of customers
const getTotalNumOfCustomers = () => makeRequest(customersCountURI);

// get total count of transactions
const getTotalNumOfTransactions = () => makeRequest(transactionsCountURI);

// get total count of accounts
const getAllAccounts = () => makeRequest(accountsURI);

// display the count figures on the dashboard cards
const renderPageStatistics = (statistics) => {
    const [totalNumOfCustomers, totalNumOfTransactions, allAccounts] = statistics;
    // set cards count values
    setElementText('total-customers', totalNumOfCustomers);
    setElementText('total-transactions', totalNumOfTransactions);
    setElementText('total-accounts', allAccounts.length);
}

// set innerText of an element
const setElementText = (elemId, text) => {
    const element = document.querySelector(`#${elemId}`);
    element.innerText = `${text}`;
}

init();