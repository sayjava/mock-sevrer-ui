import "tailwindcss/tailwind.css";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
