// User API functions

const API_URL = 'http://game.cloudplay.uz:7887'
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

/**
 * Check if a username is available
 * @param {string} username - The username to check
 * @returns {Promise<boolean>} - True if username is available, false if taken
 */
export const checkUsernameAvailability = async (username) => {
    try {
        const response = await fetch(
            `${API_URL}/memberregistration/username?username=${username}`,
            fetchConfig
        )
        const data = await response.text()
        return data === 'true'
    } catch (error) {
        console.error('Error checking username:', error)
        throw new Error('Failed to check username availability')
    }
}

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.password - Password
 * @returns {Promise<Object>} - User data with token
 */
export const registerUser = async (userData) => {
    try {
        // Noyob SmartCardUID yaratish
        const uniqueId = Date.now().toString() + Math.random().toString(36).substring(2, 7)

        // Create user object with required fields
        const userDataToSend = {
            username: userData.username,
            password: userData.password,
            userGroupId: 5,
            email: `${userData.username}@example.com`, // Noyob email yaratish
            isNegativeBalanceAllowed: true,
            isPersonalInfoRequested: true,
            enableDate: "2025-06-30T15:27:33.976Z",
            disabledDate: "2025-06-30T15:27:33.976Z",
            firstName: "",
            lastName: "",
            birthDate: "2025-06-30T15:27:33.976Z",
            address: "",
            city: "",
            country: "",
            postCode: "",
            phone: "",
            mobilePhone: "",
            sex: 0,
            isDeleted: false,
            isDisabled: false,
            smartCardUid: uniqueId, // Noyob SmartCardUID
            identification: uniqueId // Noyob identifikator
        }

        console.log('Registering user:', userData.username)

        // Register user
        const response = await fetch(
            `${API_URL}/api/v2.0/users`,
            {
                ...fetchConfig,
                method: 'POST',
                body: JSON.stringify(userDataToSend)
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Registration failed: ${errorText}`)
        }

        // Parse response to get user ID
        const registrationData = await response.json()
        console.log('Registration response:', registrationData)

        // Get user ID from response (result.id)
        const userId = registrationData?.result?.id || 0
        console.log('User ID from registration:', userId)

        // After registration, login to get token
        const loginResult = await loginUser({
            username: userData.username,
            password: userData.password
        })

        // Add userId to loginResult
        loginResult.userId = userId

        // Update localStorage with userId
        const userData2 = JSON.parse(localStorage.getItem('userData') || '{}')
        userData2.userId = userId
        localStorage.setItem('userData', JSON.stringify(userData2))

        return loginResult
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.username - Username
 * @param {string} credentials.password - Password
 * @returns {Promise<Object>} - User data with token
 */
export const loginUser = async (credentials) => {
    try {
        console.log('Logging in user:', credentials.username)

        // Get access token
        const response = await fetch(
            `${API_URL}/api/user/v2.0/auth/accesstoken?Username=${encodeURIComponent(credentials.username)}&Password=${encodeURIComponent(credentials.password)}`,
            fetchConfig
        )

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Login failed: ${errorText}`)
        }

        const data = await response.json()
        console.log('Login response:', data)

        if (data.isError) {
            throw new Error(`Login failed: ${data.message || 'Unknown error'}`)
        }

        // Get user ID if possible
        let userId = 0
        try {
            // Try to extract userId from JWT token
            const token = data.result.token
            const tokenParts = token.split('.')
            if (tokenParts.length === 3) {
                const payload = JSON.parse(atob(tokenParts[1]))
                userId = payload.nameid || 0
            }
        } catch (e) {
            console.error('Error extracting userId from token:', e)
        }

        // Store token and user data
        const userInfo = {
            username: credentials.username,
            token: data.result.token,
            refreshToken: data.result.refreshToken,
            userId: userId,
            isLoggedIn: true
        }

        // Save to localStorage
        localStorage.setItem('userData', JSON.stringify(userInfo))

        return userInfo
    } catch (error) {
        console.error('Login error:', error)
        throw error
    }
}

/**
 * Logout user
 */
export const logoutUser = () => {
    localStorage.removeItem('userData')
}

/**
 * Get current user data from localStorage
 * @returns {Object|null} - User data or null if not logged in
 */
export const getCurrentUser = () => {
    const userData = localStorage.getItem('userData')
    if (!userData) return null

    const parsedData = JSON.parse(userData)

    // Ensure userId exists
    if (!parsedData.userId) {
        parsedData.userId = 0
    }

    return parsedData
}

/**
 * Check if user is authenticated
 * @returns {boolean} - True if user is authenticated
 */
export const isAuthenticated = () => {
    const user = getCurrentUser()
    return !!user && !!user.token
} 