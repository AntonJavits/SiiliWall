import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo'
import App from './App'
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";
import common_fi from "./translations/fi/common.json";
import common_en from "./translations/en/common.json";
import Cookies from 'js-cookie'

i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    lng: Cookies.get("language") || 'en',
    resources: {
        en: {
            common: common_en               // 'common' is our custom namespace
        },
        fi: {
            common: common_fi
        },
    },
    },
);
ReactDOM.render(<ApolloProvider client={client}>
    <I18nextProvider i18n={i18next}>
    <App />
    </I18nextProvider>
</ApolloProvider>, document.getElementById('root'))
