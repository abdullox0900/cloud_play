import axios from 'axios'

const API_BASE_URL = 'http://game.cloudplay.uz:7887/api/v2.0'

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

export const getUserProfile = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`, axiosConfig)
        return response.data.result
    } catch (error) {
        console.error('Error fetching user profile:', error)
        return null
    }
}

export const getUserPicture = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}/picture`, axiosConfig)
        console.log('User picture :', response.data.result.picture)

        return response.data.result.picture
    } catch (error) {
        console.error('Error fetching user picture:', error)
        return null
    }
}

export const updateUserPicture = async (userId, pictureData) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/users/${userId}/picture`,
            { picture: pictureData },
            axiosConfig
        )
        return response.data
    } catch (error) {
        console.error('Error updating user picture:', error)
        return null
    }
}

export const updateUserProfile = async (userId, userData) => {
    try {
        // Use PATCH instead of PUT for partial updates
        // Some APIs don't support PUT for updates
        const response = await axios.patch(
            `${API_BASE_URL}/users/${userId}`,
            userData,
            axiosConfig
        )
        return {
            success: true,
            data: response.data
        }
    } catch (error) {
        console.error('Error updating user profile:', error)

        // Try alternative endpoint if the first one fails with 405 Method Not Allowed
        if (error.response && error.response.status === 405) {
            try {
                // Try POST to update endpoint as an alternative
                const altResponse = await axios.post(
                    `${API_BASE_URL}/users/${userId}/update`,
                    userData,
                    axiosConfig
                )
                return {
                    success: true,
                    data: altResponse.data
                }
            } catch (altError) {
                console.error('Error with alternative update method:', altError)
                return {
                    success: false,
                    error: altError.message
                }
            }
        }

        return {
            success: false,
            error: error.message
        }
    }
} 