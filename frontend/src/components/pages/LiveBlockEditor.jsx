"use client";

import { useContext } from "react";
import { RoomProvider } from "../../../liveblocks.config";
import Editor from "../singleUse/Editor";
import { ClientSideSuspense } from "@liveblocks/react";
import { CounterContext } from "@/contextApi/Context";
import WorkspaceWrapper from "../reuseable/WorkspaceWrapper";

export default function LiveBlockEditor() {

  const { state } = useContext(CounterContext)
  const id = state.team?._id


  return (
    <WorkspaceWrapper>
      <RoomProvider id={id} initialPresence={{}}>
        <ClientSideSuspense fallback="Loading…">
          {() => <Editor />}
        </ClientSideSuspense>
      </RoomProvider>
    </WorkspaceWrapper>
  );
}


