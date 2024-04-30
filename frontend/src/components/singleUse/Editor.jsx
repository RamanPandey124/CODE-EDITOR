import { useContext, useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "../../../liveblocks.config";
import { CounterContext } from "@/contextApi/Context";
import { useSelector } from "react-redux";


function Editor() {
  const room = useRoom();
  const [doc, setDoc] = useState();
  const [provider, setProvider] = useState();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} />;
}
export default Editor


function BlockNote({ doc, provider }) {
  const { state } = useContext(CounterContext)
  const random = Math.round(2 - 2 * Math.random())
  const color = ["#FF3EA5", "#6420AA", "#DC6B19"]
  const { theme } = useSelector((state) => state.theme)

  const editor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),

      // Information for this user:
      user: {
        name: state.user?.name,
        color: color[random],
      },
    },
  });

  /**
   * @type { number[] }
   */
  let data

  return <BlockNoteView theme={theme == 'dark' ? 'dark' : 'light'} editor={editor} className="BlockNoteView" />;
}