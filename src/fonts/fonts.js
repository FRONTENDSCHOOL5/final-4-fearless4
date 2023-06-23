import { createGlobalStyle } from 'styled-components';
import SUITRegular from './SUIT-Regular.woff2';

export default createGlobalStyle`
    @font-face {
        font-family: 'SUIT-Regular';
        src: url(${SUITRegular}) format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'omyu_pretty';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
`;