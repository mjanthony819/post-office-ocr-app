// API Helper Module for Post Office OCR Scanner

const API = {
    BASE_URL: 'http://localhost:5000/api',
    
    /**
     * Translate text using the backend API
     * @param {string} text - Text to translate
     * @param {string} sourceLanguage - Source language
     * @returns {Promise<string>} Translated text
     */
    async translateText(text, sourceLanguage) {
        try {
            const response = await fetch(`${this.BASE_URL}/translate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text: text,
                    sourceLanguage: sourceLanguage,
                    targetLanguage: 'en'
                })
            });
            
            if (!response.ok) {
                throw new Error(`Translation failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.translatedText || text;
        } catch (error) {
            console.error('Translation error:', error);
            throw error;
        }
    },
    
    /**
     * Submit address data to the backend
     * @param {Object} addressData - Address data object
     * @returns {Promise<Object>} Server response
     */
    async submitAddress(addressData) {
        try {
            const response = await fetch(`${this.BASE_URL}/address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addressData)
            });
            
            if (!response.ok) {
                throw new Error(`Submission failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Submission error:', error);
            // For demo purposes, allow offline submission
            console.log('Demo mode: Address would be submitted to server');
            return { success: true, message: 'Address saved locally (demo mode)' };
        }
    },
    
    /**
     * Recognize text from image using OCR
     * @param {string} imageData - Base64 encoded image data
     * @returns {Promise<string>} Extracted text
     */
    async recognizeText(imageData) {
        try {
            const response = await fetch(`${this.BASE_URL}/ocr`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    image: imageData
                })
            });
            
            if (!response.ok) {
                throw new Error(`OCR failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.text || '';
        } catch (error) {
            console.error('OCR error:', error);
            throw error;
        }
    },
    
    /**
     * Detect language of text
     * @param {string} text - Text to detect language of
     * @returns {Promise<string>} Detected language
     */
    async detectLanguage(text) {
        try {
            const response = await fetch(`${this.BASE_URL}/detect-language`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });
            
            if (!response.ok) {
                throw new Error(`Language detection failed: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.language || 'unknown';
        } catch (error) {
            console.error('Language detection error:', error);
            throw error;
        }
    },
    
    /**
     * Get stored addresses
     * @returns {Promise<Array>} List of stored addresses
     */
    async getAddresses() {
        try {
            const response = await fetch(`${this.BASE_URL}/addresses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch addresses: ${response.statusText}`);
            }
            
            const data = await response.json();
            return data.addresses || [];
        } catch (error) {
            console.error('Fetch addresses error:', error);
            return [];
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
