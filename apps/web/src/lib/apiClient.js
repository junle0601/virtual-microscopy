const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8090';

async function request(method, path, body){
    const res = await fetch(`${BASE_URL}${path}`,{
        method,
        headers: { 'Content-Type': 'application/json'},
        body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json();

    if(!res.ok){
        const err = new Error(data.message || 'Request failed');
        err.status = data.code || res.status;
        err.data = data;
        throw err;
    }

    return data;
}

function collection(name){
    return {
        getFirstListItem(filter, _options){
            const params = new URLSearchParams({ filter });
            return request('GET', `/api/${name}?${params}`);
        },

        create(data, _options){
            return request('POST', `/api/${name}`, data);
        },
        update(id, data, _options){
            return request('PATCH', `/api/${name}/${id}`, data);
        },
    };
}

const pb = { collection };
export default pb;