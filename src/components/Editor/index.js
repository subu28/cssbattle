import './style.css';
import IDE from '../IDE';

const Editor = () => {
  return (
    <div className="editor">
      <div className="editor-header">
        <div className="editor-header-title">EDITOR</div>
        <div className="editor-header-mode-selector">
          <div className="editor-header-mode-min">Minified</div>
          <div className="editor-header-mode-full">Full</div>
        </div>
      </div>
      <div className="editor-ide">
        <IDE/>        
      </div>
    </div>
  );
};

export default Editor;