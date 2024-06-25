/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      display: ['"Inter"', ...defaultTheme.fontFamily.sans],
      body: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        'base-text': '#2E3B36',
        'panel-gray': '#f5f4f7',
        heading: {
          black: '#1e1e1e',
          gray444: '#444444',
          gray666: '#666666',
          gray888: '#888888',
        },
        field: {
          success: '#009006',
          error: {
            dark: '#D0021B',
            border: '#DD9999',
            light: '#FFEBE6'
          },
          label: {
            valid: '#24292F'
          },
          info: {
            text: '#2B363B'
          }
        },
        sidemenu: {
          text: '#555555',
          "text-active": '#304674',
          "submenu-text-active": '#3D78B1',
        },
        accent: {
          blue: {
            paleO66: '#C2DCF266',
            pale: '#C2DCF2',
            bright: '#0E88FF',
            dark: '#005B90',
            text: '#3D78B1',
          },
          green: '#009007' // '#22c55d'
        },
        modal: {
          overlay: 'rgba(0, 0, 0, 0.25)',
        }
      },
      zIndex: {
        'map-loading-overlay': 50,
        'map-popup': '1000',
        'overlay': '9980',
        'modal': '9990',
      },
    },
    plugins: [],
  }
}
