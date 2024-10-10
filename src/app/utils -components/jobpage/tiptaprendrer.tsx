'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Text from "@tiptap/extension-text";
import TextAlign from '@tiptap/extension-text-align';
import '../sellerDashComponent/textediter.css'

type TiptapJSON = {
  type: string;
  content?: Array<{ type: string; attrs?: Record<string, unknown>; content?: Array<TiptapJSON> }>
}

const TiptapRenderer = ({ savedContent }: { savedContent: TiptapJSON }) => {

  const editor = useEditor({
    extensions: [
      Document,
      Text,
      Paragraph,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      BulletList,
      OrderedList,
      ListItem,
      Heading,
      Link,
      CodeBlock,
      Blockquote,
      HorizontalRule,
      Bold,
      Italic,
    ],
    editorProps: {
        attributes: {
            style: "width: full; min-height: 300px; padding: 40px; box-sizing: border-box;",
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 border rounded-xl"
        }
      },
    editable: false, // Read-only mode
    content: savedContent // Set content to the JSON data passed as props
  })

  if (!editor) {
    return null
  }

  return (
    <div>
      {/* Tiptap Editor Content in Read-only Mode */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default TiptapRenderer
