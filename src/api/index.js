import useSWR from 'swr'

const API_URL = 'http://game.cloudplay.uz:7887/api'
const credentials = {
    username: 'cloudplay',
    password: 'Cloudplay321$'
}

// Base64 encode credentials for Basic Auth
const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)

// Fetch configuration with authentication
const fetchConfig = {
    headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json'
    }
}

// Fetcher function for useSWR
const fetcher = async (url) => {
    console.log('Fetching:', url)
    try {
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.error('API error:', response.status, response.statusText)
            throw new Error('API request failed')
        }
        const data = await response.json()
        console.log('API response data:', data)
        return data
    } catch (error) {
        console.error('Fetch error:', error)
        throw error
    }
}

// Image fetcher function - special handling for image data
const imageFetcher = async (url) => {
    console.log('Fetching image:', url)
    try {
        const response = await fetch(url, fetchConfig)
        if (!response.ok) {
            console.error('API image error:', response.status, response.statusText)
            throw new Error('API image request failed')
        }
        const data = await response.json()
        console.log('Image data received')
        return data
    } catch (error) {
        console.error('Image fetch error:', error)
        throw error
    }
}

// Get all games
export const useGames = () => {
    const { data, error, isLoading } = useSWR(`${API_URL}/apps`, fetcher)

    console.log('Raw API data:', data)

    return {
        // Properly handle the API response structure
        games: data?.result || (Array.isArray(data) ? data : []),
        isLoading,
        isError: error
    }
}

// Get a specific game by ID
export const useGame = (id) => {
    const { data, error, isLoading } = useSWR(id ? `${API_URL}/apps/${id}` : null, fetcher)

    return {
        game: data?.result || data,
        isLoading,
        isError: error
    }
}

// Get game image by ID
export const useGameImage = (id) => {
    const { data, error, isLoading } = useSWR(
        id ? `${API_URL}/apps/${id}/image` : null,
        imageFetcher,
        {
            revalidateOnFocus: false,
            revalidateIfStale: false
        }
    )

    // Extract image data from response, handling different possible formats
    const extractImageData = (data) => {
        if (!data) return null
        if (typeof data === 'string') return data
        if (data.result) return data.result
        if (data.image) return data.image
        return data
    }

    return {
        imageData: extractImageData(data),
        isLoading,
        isError: error
    }
} 