import { useEffect } from "react";

/**
 * A hook to automatically adjust the height of an Textarea by the current text inside.
 * @param textAreaRef Reference to the TextArea
 * @param value Value of the TextArea
 */
const useAutosizeTextArea = (textAreaRef: HTMLTextAreaElement | null, value: string) => {
  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.style.height = '0px';
      const scrollHeight = textAreaRef.scrollHeight;
      textAreaRef.style.height = scrollHeight + 'px';
    }
  }, [textAreaRef, value]);
}

export default useAutosizeTextArea;