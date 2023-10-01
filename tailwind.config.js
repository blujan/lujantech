/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        text_body: 'rgb(var(--color-text) / <alpha-value>)',
        text_heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        primary_shade: 'rgb(var(--color-primary-shade) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        accent_text: 'rgb(var(--color-accent-text) / <alpha-value>)',
      },
      boxShadow: {
        modal: '0 2px 6px -1px rgb(0 0 0 / 0.5), 0 2px 5px -2px rgb(0 0 0 / 0.1)',
      },
    },
    fontFamily: {
      sans: ['MPLUS1p'],
    },
  },
  plugins: [],
};
