const API_BASE = 'https://v2.api.noroff.dev';

export async function apiRequest(endpoint, options = {}) {
    const url = API_BASE + endpoint;

    const headers = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...headers,
            ...options.headers,
        },
    };

    const response = await fetch(url, config);

    if (response.status === 204) {
        return {};
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.errors[0].message || 'Something went wrong');
    }

    return data;
}
