#!/usr/bin/env node
import QRCode from 'qrcode';
import { mkdirSync, writeFileSync } from 'node:fs';
mkdirSync('public/images/shop', { recursive: true });
const opts = { type: 'svg', errorCorrectionLevel: 'M', margin: 1 };
const url = 'https://growthcred.co.za';
writeFileSync('public/images/shop/qr-growthcred.svg', await QRCode.toString(url, { ...opts, color: { dark: '#14141c', light: '#00000000' } }));
writeFileSync('public/images/shop/qr-growthcred-cream.svg', await QRCode.toString(url, { ...opts, color: { dark: '#e8e0d0', light: '#00000000' } }));
console.log('shop QR SVGs written for', url);
