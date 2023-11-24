/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import {createThemes} from 'tw-colors'
export default {
  content: [],
  darkMode: 'class',
  theme: {
      fontFamily: {
          'roboto': ['Roboto', 'sans-serif'],
          'montserrat': ['Montserrat', 'sans-serif'],
      },
    extend: {
    },
    colors:{}
  },
  plugins: [
      require('@tailwindcss/forms'),
      createThemes({
          light:{
              primary: {
                  100: '#DC6963',
                  200: '#D4514E',
                  300: '#CB3538',
                  400: '#C1001F',
                  500: '#A70019',
                  600: '#8F0014',
                  700: '#77000F',
              },
              secondary: {
                  100: '#EDEDED',
                  200: '#EBEBEA',
                  300: '#E8E8E8',
                  400: '#E6E6E5',
                  500: '#C8C8C7',
                  600: '#ABABAA',
                  700: '#8E8E8E',
              },
              accent: {
                  100: '#7D808B',
                  200: '#6C6F7B',
                  300: '#5B5F6C',
                  400: '#4B4F5D',
                  500: '#404450',
                  600: '#353843',
                  700: '#2B2E37',
              },
              bg: {
                  100: '#F6F7FB',
                  200: '#F1F2FA',
                  300: '#EDEEF8',
                  400: '#E8EAF6',
                  500: '#CACBD6',
                  600: '#ACAEB7',
                  700: '#909198',
              },
              text: {
                  100: '#606060',
                  200: '#4C4C4C',
                  300: '#383838',
                  400: '#262626',
                  500: '#202020',
                  600: '#191919',
                  700: '#131313',
              },
              black: colors.black,
              white: colors.white,
              gray: colors.gray,
              emerald: colors.emerald,
              indigo: colors.indigo,
              yellow: colors.yellow,
          },
          dark:{
              primary: {
                  100: '#F8F7A6',
                  200: '#F7F698',
                  300: '#F6F589',
                  400: '#F5F378',
                  500: '#D5D367',
                  600: '#B6B457',
                  700: '#989748',
              },
              secondary: {
                  100: '#555556',
                  200: '#404041',
                  300: '#2C2C2D',
                  400: '#19191A',
                  500: '#141415',
                  600: '#101010',
                  700: '#0B0B0C',
              },
              accent: {
                  100: '#DFCFF6',
                  200: '#DBC9F5',
                  300: '#D6C2F4',
                  400: '#D2BBF2',
                  500: '#B6A2D2',
                  600: '#9B8AB4',
                  700: '#817396',
              },
              bg: {
                  100: '#606060',
                  200: '#4C4C4C',
                  300: '#383838',
                  400: '#262626',
                  500: '#202020',
                  600: '#191919',
                  700: '#131313',
              },
              text: {
                  100: '#F6F7FB',
                  200: '#F1F2FA',
                  300: '#EDEEF8',
                  400: '#E8EAF6',
                  500: '#CACBD6',
                  600: '#ACAEB7',
                  700: '#909198',
              },
              black: colors.black,
              white: colors.white,
              gray: colors.gray,
              emerald: colors.emerald,
              indigo: colors.indigo,
              yellow: colors.yellow,

          }
      }, {
      })
  ],
}

