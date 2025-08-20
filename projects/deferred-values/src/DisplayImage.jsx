import img from "../images/luna.jpg";

const JANK_DELAY = 100;

export default function DisplayImage({ filterStyle }) {
  const expensiveRender = () => {
    const start = performance.now();
    while (performance.now() - start < JANK_DELAY) {
      // Empty loop to slow artificially slow down UI
    }
    return null;
  };

  return (
    <>
      {expensiveRender()}
      <img src={img} alt="Luna" style={{ filter: filterStyle }} />
      <p>Last render: {Date.now()}</p>
    </>
  );
}
