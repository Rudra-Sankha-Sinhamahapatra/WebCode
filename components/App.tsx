"use client";
import React, { useEffect, useState } from "react";
import Editor from "./Editor";
import useLocalStorage from "@/hooks/useLocalStorage";

const App = () => {
  const [html, setHtml] = useLocalStorage('html','');
  const [css, setCss] = useLocalStorage('css','');
  const [js, setJs] = useLocalStorage('js','');
  const [srcDoc,setSrcDoc]=useState('')

  useEffect(()=>{
    const timeout=setTimeout(()=>{
    setSrcDoc(`
          <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
    </html>
    `)
    },250);

    return()=>clearTimeout(timeout);
  },[html,css,js]);

  return (
    <>
      <div className="pane top-pane bg-green-300 h-50vh flex gap-3">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={(newHtml: string) => setHtml(newHtml)}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={(newCss: string) => setCss(newCss)}
        />
        <Editor
          language="javascript"
          displayName="Javascript"
          value={js}
          onChange={(newJs: string) => setJs(newJs)}
        />
      </div>
      <div className="pane bottom-pane flex flex-grow min-h-screen m-0">
      <iframe
  srcDoc={srcDoc}
  title="output"
  sandbox="allow-scripts"
  frameBorder="0"
  width="100%"
/>

      </div>
    </>
  );
};

export default App;
