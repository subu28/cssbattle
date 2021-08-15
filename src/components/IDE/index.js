import './style.css';
import parse from '../../lib/parse';

const IDE = () => {
  const out = "<div>\n  <p b></p>\n</div>\n<style>\n  *{\n    border-radius: 20px;\n  }\n  body{\n    background: #293462;\n    margin: 90px 100px;\n  }\n  div{\n    background: #FE5F55;\n    padding: 14px 30px;\n    box-shadow: 0px 20px #A64942;\n  }\n  p{\n    background: #A64942;\n    height: 40px;\n  }\n</style>";
  // const out = "<div><p><style>*{border-radius:20px}body{background:#293462;margin:90 100}div{background:#FE5F55;padding:14 30;box-shadow:0 20px#A64942}p{background:#A64942;height:40"
  const parsed = parse(out);
  return (
    <div className="ide">
      { parsed.map(line => <div className="ide-line"><div>{line.map(token => <span className={token.class}>{token.text}</span>)}</div></div>) }
    </div>
  );
};

export default IDE;