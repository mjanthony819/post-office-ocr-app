// Main App Logic for Post Office OCR Scanner

class AddressScanner {
    constructor() {
        this.currentImage = null;
        this.detectedLanguage = null;
        this.extractedText = null;
        this.init();
    }

    init() {
        // DOM Elements
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.uploadBtn = document.getElementById('uploadBtn');
        this.cameraBtn = document.getElementById('cameraBtn');
        this.addressForm = document.getElementById('addressForm');
        this.loadingSpinner = document.getElementById('loadingSpinner');
        this.successMessage = document.getElementById('successMessage');
        this.editBtn = document.getElementById('editBtn');
        this.newScanBtn = document.getElementById('newScanBtn');

        // Event Listeners
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        this.addressForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.editBtn.addEventListener('click', () => this.resetForm());
        this.newScanBtn.addEventListener('click', () => this.resetForm());
        this.cameraBtn.addEventListener('click', () => this.openCamera());
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadArea.style.borderColor = '#004B87';
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadArea.style.borderColor = '';
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.fileInput.files = files;
            this.handleFileSelect({ target: { files } });
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.currentImage = event.target.result;
                this.processImage();
            };
            reader.readAsDataURL(file);
        }
    }

    async openCamera() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            // For demo purposes, we'll just show a message
            alert('Camera feature requires additional UI. Using image upload for demo.');
        } catch (error) {
            console.error('Camera error:', error);
        }
    }

    async processImage() {
        this.loadingSpinner.style.display = 'block';
        
        try {
            // Initialize Tesseract OCR
            const { createWorker } = Tesseract;
            const worker = await createWorker();
            
            // Perform OCR
            const { data: { text } } = await worker.recognize(this.currentImage);
            this.extractedText = text;
            
            await worker.terminate();
            
            // Detect language
            this.detectLanguage(text);
            
            // Translate if needed
            await this.translateText();
            
            // Parse address and fill form
            this.parseAndFillForm();
            
        } catch (error) {
            console.error('OCR Error:', error);
            alert('Error processing image: ' + error.message);
        } finally {
            this.loadingSpinner.style.display = 'none';
        }
    }

    detectLanguage(text) {
        // Simple language detection based on character ranges
        const langs = {
            hindi: /[\u0900-\u097F]/g,
            telugu: /[\u0C00-\u0C7F]/g,
            gujarati: /[\u0A80-\u0AFF]/g,
            marathi: /[\u0900-\u097F]/g,
            bengali: /[\u0980-\u09FF]/g,
            tamil: /[\u0B80-\u0BFF]/g,
            kannada: /[\u0C80-\u0CFF]/g
        };
        
        let detectedLang = 'English';
        for (const [lang, regex] of Object.entries(langs)) {
            if (text.match(regex)) {
                detectedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
                break;
            }
        }
        
        this.detectedLanguage = detectedLang;
        document.getElementById('detectedLanguage').value = detectedLang;
    }

    async translateText() {
        if (this.detectedLanguage !== 'English') {
            try {
                const translated = await API.translateText(this.extractedText, this.detectedLanguage);
                this.extractedText = translated;
            } catch (error) {
                console.log('Translation skipped:', error);
                // Continue with original text if translation fails
            }
        }
    }

    parseAndFillForm() {
        const lines = this.extractedText.split('\n').filter(line => line.trim());
        
        // Simple heuristic parsing
        if (lines.length > 0) {
            // First line usually name
            document.getElementById('fullName').value = lines[0] || '';
            
            // Next lines for address
            if (lines.length > 1) {
                document.getElementById('addressLine1').value = lines[1] || '';
            }
            if (lines.length > 2) {
                document.getElementById('addressLine2').value = lines[2] || '';
            }
            
            // Try to extract PIN code (6 digits)
            const pinMatch = this.extractedText.match(/\d{6}/);
            if (pinMatch) {
                document.getElementById('pincode').value = pinMatch[0];
            }
            
            // Try to extract phone (10 digits)
            const phoneMatch = this.extractedText.match(/\b\d{10}\b/);
            if (phoneMatch) {
                document.getElementById('phone').value = phoneMatch[0];
            }
        }
        
        // Show form
        document.querySelector('.upload-area').style.display = 'none';
        document.querySelector('.button-group').style.display = 'none';
        this.addressForm.style.display = 'block';
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            addressLine1: document.getElementById('addressLine1').value,
            addressLine2: document.getElementById('addressLine2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            pincode: document.getElementById('pincode').value,
            country: document.getElementById('country').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            detectedLanguage: this.detectedLanguage
        };
        
        // Validate form
        if (!formData.fullName || !formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
            alert('Please fill in all required fields (marked with *).');
            return;
        }
        
        // Submit
        this.submitAddress(formData);
    }

    async submitAddress(data) {
        try {
            const response = await API.submitAddress(data);
            this.addressForm.style.display = 'none';
            this.successMessage.style.display = 'block';
            console.log('Address submitted successfully:', response);
        } catch (error) {
            alert('Error submitting address: ' + error.message);
        }
    }

    resetForm() {
        this.currentImage = null;
        this.detectedLanguage = null;
        this.extractedText = null;
        
        document.querySelector('.upload-area').style.display = 'block';
        document.querySelector('.button-group').style.display = 'block';
        this.addressForm.style.display = 'none';
        this.successMessage.style.display = 'none';
        
        // Clear form fields
        this.addressForm.reset();
        this.fileInput.value = '';
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AddressScanner();
});
