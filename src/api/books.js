export const getBooks = (page, search) => {
    const data = {
        page,
        itemsPerPage: 20,
        filters: [
            {
                type: 'all',
                values: [search || ''],
            },
        ],
    };
     // handle HTTP responses
    return fetch('http://nyx.vima.ekt.gr:3000/api/books', {
        method: 'post',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json());
};
