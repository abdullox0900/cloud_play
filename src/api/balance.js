/**
 * API functions for user balance operations
 */
import axios from 'axios'

const API_BASE_URL = 'http://game.cloudplay.uz:7887/api'

// Get credentials for Basic Auth
const credentials = {
    username: 'cloudplay',
    password: 'Cloudplay321$'
}

// Base64 encode credentials for Basic Auth
const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`)

// Axios configuration with authentication
const axiosConfig = {
    headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/json'
    }
}

/**
 * Fetches the user's balance information
 * @param {string|number} userId - The ID of the user
 * @returns {Promise<number>} - The user's balance
 */
export const getUserBalance = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/balance`, axiosConfig)
        console.log('Balance data:', response.data)
        return response.data.result.balance
    } catch (error) {
        console.error('Error fetching user balance:', error)
        return 0 // Return 0 as default balance in case of error
    }
} 