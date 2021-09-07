interface Account {
    email: string;
    secret: string;
    issuer: string;
    original_name: string;
}

interface QRCode {
    name: string;
    base64src: string;
}