"use client";
import React, { useEffect, useState } from "react";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { TiHtml5 as HtmlIcon } from "react-icons/ti";
import { DiCss3 as CssIcon } from "react-icons/di";
import { RiJavascriptFill as JsIcon} from "react-icons/ri";
import { CgArrowTopLeft } from "react-icons/cg";
import { CgArrowsExpandLeft } from "react-icons/cg";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/lint/lint";

interface EditorProps {
  displayName: string;
  language: string;
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ displayName, language, value, onChange }) => {
  useEffect(() => {
    return () => {
      const wrapper = document.querySelector(`.code-mirror-wrapper-${displayName.toLowerCase()}`);
      if (wrapper) {
        wrapper.innerHTML = '';
      }
    };
  }, [displayName]);

  function handleChange(editor: any, data: any, value: string) {
    onChange(value);
  }

  const [open, setOpen] = useState(true);

  const iconStyle = { width: '30px', height: '30px' };
  const close= {width:"20px", height:"20px"}
  return (
    <div className={`editor-container ${displayName.toLowerCase()} ${open ? '' : 'flex-grow-0 flex-row'} flex flex-grow flex-col mt-5 ml-2`}>
      <div className="editor-title flex justify-between gap-3 rounded-tr-lg rounded-tl-lg bg-white text-black font-bold p-2">
        {displayName === "HTML" ? <HtmlIcon style={iconStyle} /> : displayName === "CSS" ? <CssIcon style={iconStyle} /> : <JsIcon style={iconStyle} />}
        {displayName}
        <button 
        type="button"
          onClick={() => setOpen(prev => !prev)}
          className="flex bg-black text-white px-2 py-1 m-1"
        >
          {open?<CgArrowTopLeft style={close}/>:<CgArrowsExpandLeft style={close}/>}
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className={`code-mirror-wrapper code-mirror-wrapper-${displayName.toLowerCase()} flex-grow border rounded-tr-md overflow-hidden`}
        options={{
          lineWrapping: true,
          mode: language,
          lineNumbers: true,
          theme: 'material',
          lint: true
        }}
      />
    </div>
  );
};

export default Editor;
