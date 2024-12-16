import Header from '../components/Header';
import '../styles/globals.css';
import ThemeProvider from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
