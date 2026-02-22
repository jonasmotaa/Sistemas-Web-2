const SERVER_URL = 'http://localhost:8080';


const API_ROUTES = {
  events: '/events',
  sales: '/sales',
  users: '/api/users',
  updateSaleStatus: '/sales/status', 
};


const api = async <T>(endpointKey: keyof typeof API_ROUTES, options: RequestInit = {}): Promise<T> => {
    const url = `${SERVER_URL}${API_ROUTES[endpointKey]}`;

    const config: RequestInit = {
        ...options,
        headers: {
        'Content-Type': 'application/json',
        ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            const errorBody = await response.text();
            console.error("Backend error:", errorBody);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const text = await response.text();
        
        try {
            return JSON.parse(text) as T;
        } catch (e) {
            return text as unknown as T;
        }

    } catch (error) {
        console.error(`Failed to fetch from endpoint: ${endpointKey}`, error);
        throw error;
    }
};

export default api;