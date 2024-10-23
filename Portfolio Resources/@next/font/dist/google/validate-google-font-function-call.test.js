"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validate_google_font_function_call_1 = require("./validate-google-font-function-call");
describe('validateFontFunctionCall errors', () => {
    test('Missing function name', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('', // default import
        undefined)).toThrowErrorMatchingInlineSnapshot(`"next/font/google has no default export"`);
    });
    test('Unknown font', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Unknown_Font', undefined)).toThrowErrorMatchingInlineSnapshot(`"Unknown font \`Unknown Font\`"`);
    });
    test('Unknown weight', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Inter', {
            weight: '123',
            subsets: ['latin'],
        })).toThrowErrorMatchingInlineSnapshot(`
        "Unknown weight \`123\` for font \`Inter\`.
        Available weights: \`100\`, \`200\`, \`300\`, \`400\`, \`500\`, \`600\`, \`700\`, \`800\`, \`900\`, \`variable\`"
      `);
    });
    test('Missing weight for non variable font', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Abel', { subsets: ['latin'] }))
            .toThrowErrorMatchingInlineSnapshot(`
        "Missing weight for font \`Abel\`.
        Available weights: \`400\`"
      `);
    });
    test('Unknown style', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Molle', {
            weight: '400',
            style: 'normal',
            subsets: ['latin'],
        })).toThrowErrorMatchingInlineSnapshot(`
        "Unknown style \`normal\` for font \`Molle\`.
        Available styles: \`italic\`"
      `);
    });
    test('Invalid display value', () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Inter', {
            display: 'Invalid',
            subsets: ['latin'],
        })).toThrowErrorMatchingInlineSnapshot(`
        "Invalid display value \`Invalid\` for font \`Inter\`.
        Available display values: \`auto\`, \`block\`, \`swap\`, \`fallback\`, \`optional\`"
      `);
    });
    test('Variable in weight array', async () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Inter', {
            weight: ['100', 'variable'],
            subsets: ['latin'],
        })).toThrowErrorMatchingInlineSnapshot(`"Unexpected \`variable\` in weight array for font \`Inter\`. You only need \`variable\`, it includes all available weights."`);
    });
    test('Invalid subset in call', async () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Inter', { subsets: ['latin', 'oops'] })).toThrowErrorMatchingInlineSnapshot(`
        "Unknown subset \`oops\` for font \`Inter\`.
        Available subsets: \`cyrillic\`, \`cyrillic-ext\`, \`greek\`, \`greek-ext\`, \`latin\`, \`latin-ext\`, \`vietnamese\`"
      `);
    });
    test('Missing subsets in config and call', async () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Inter', {}))
            .toThrowErrorMatchingInlineSnapshot(`
      "Preload is enabled but no subsets were specified for font \`Inter\`. Please specify subsets or disable preloading if your intended subset can't be preloaded.
      Available subsets: \`cyrillic\`, \`cyrillic-ext\`, \`greek\`, \`greek-ext\`, \`latin\`, \`latin-ext\`, \`vietnamese\`

      Read more: https://nextjs.org/docs/messages/google-fonts-missing-subsets"
    `);
    });
    test('Setting axes on non variable font', async () => {
        expect(() => (0, validate_google_font_function_call_1.validateGoogleFontFunctionCall)('Abel', {
            weight: '400',
            axes: [],
            subsets: ['latin'],
        })).toThrowErrorMatchingInlineSnapshot(`"Axes can only be defined for variable fonts"`);
    });
});
