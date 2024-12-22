import { jwtDecode } from 'jwt-decode';

export default function decodeToken(token) {
    try {
        if (!token) {
            throw new Error('No token provided');
        }
        if (token.split('.').length !== 3) {
            throw new Error('Invalid token format');
        }
        return JSON.parse(atob(token.split('.')[1])); // Decode payload
    } catch (error) {
        console.error(`Failed to decode token: '${error.message}'`);
        return null;
    }
}

// export default decodeToken;
// export function isTokenExpired(token) {
//     const decoded = decodeToken(token);
//     if (!decoded || !decoded.exp) return true; // Invalid or missing expiration
//     const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
//     return decoded.exp < currentTime; // Check if expired
// }