import { useCallback, useEffect, useRef } from "react";
import { useAudioPlayback } from "./useAudioPlayback";

interface StreamCallbacks {
  workletPath: string;
  onUserTranscript?: (text: string) => void;
  onTranscript?: (text: string, full: string) => void;
  onComplete?: (transcript: string) => void;
  onError?: (error: Error) => void;
}

type TypedVoiceStreamEvent =
  | { type: "user_transcript"; data: string }
  | { type: "transcript"; data: string }
  | { type: "audio"; data: string }
  | { type: "error"; error: string };

type DoneEvent = { done: true };

type VoiceStreamEvent = TypedVoiceStreamEvent | DoneEvent;

type PlaybackHandle = ReturnType<typeof useAudioPlayback>;
