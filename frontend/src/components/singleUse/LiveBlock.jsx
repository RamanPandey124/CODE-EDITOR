"use client";

import { RoomProvider } from "../../../liveblocks.config";
import Editor from "./Editor";
import { ClientSideSuspense } from "@liveblocks/react";

export default function LiveBlock({id}) {
  return (
    <RoomProvider id={id} initialPresence={{}}>
      <ClientSideSuspense fallback="Loading…">
        {() => <Editor />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}