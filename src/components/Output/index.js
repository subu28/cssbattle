import './style.css';

const Output = () => {
  const out = "<div><p><style>*{border-radius:20px}body{background:#293462;margin:90 100}div{background:#FE5F55;padding:14 30;box-shadow:0 20px#A64942}p{background:#A64942;height:40";
  return (
    <div className="output">
      <div className="output-header">
        <div className="output-header-title">OUTPUT</div>
      </div>
      <div className="output-frame-container">
        <iframe className="output-frame" src={"data:text/html;charset=UTF-8," + encodeURIComponent(out)}/>
      </div>
      <div className="output-score">
      </div>
    </div>
  );
};

export default Output;