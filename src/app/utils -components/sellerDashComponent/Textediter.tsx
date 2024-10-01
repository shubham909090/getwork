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
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import TextStyle from '@tiptap/extension-text-style';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Text from "@tiptap/extension-text";
import { Button } from '@/components/ui/button';
import './textediter.css'

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`
type TiptapJSON = {
    type: string;
    content?: Array<{ type: string; attrs?: Record<string, unknown>; content?: Array<TiptapJSON> }>
  }
const Tiptap = () => {

    const logcontent= (json: TiptapJSON)=>{
        console.log(json)
    }


  const editor = useEditor({
    
    extensions: [
        Document,
        Text,
        Paragraph,
        BulletList.configure({
            HTMLAttributes: {
              class: 'list-disc'
            }
          }),
          OrderedList.configure({
            HTMLAttributes: {
              class: 'list-decimal'
            }
          }),
          ListItem,
        Heading,
        Link.configure({ openOnClick: true, autolink: true }), // Configure link behavior
        CodeBlock,
        Code,
        Blockquote,
        HorizontalRule,
        TextStyle,
        Bold, // Extension for bold text
        Italic, // Extension for italic text
      ],
      editorProps: {
        attributes: {
            style: "width: full; min-height: 300px; padding: 40px; box-sizing: border-box;",
          class:
            "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 border rounded-xl"
        }
      },
    content: content,
    autofocus: true,
    editable: true,
    onUpdate: ({ editor }) => {
        const json = editor.getJSON() as TiptapJSON;
        logcontent(json);
}})

  if (!editor) {
    return null
  }

  return (
    <div className="editor flex flex-col justify-between gap-5 border rounded-lg ">
      {/* Toolbar with Button  variant={"secondary"}s */}
      <div className=" flex flex-row py-5 gap-5 justify-center">
      <Button  onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>Bold</Button >
        <Button  onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>Italic</Button >
        <Button  onClick={() => editor.chain().focus().toggleBulletList().run()} disabled={!editor.can().chain().focus().toggleBulletList().run()}>Bullet List</Button >
        <Button  onClick={() => editor.chain().focus().toggleOrderedList().run()} disabled={!editor.can().chain().focus().toggleOrderedList().run()}>Ordered List</Button >
        <Button  onClick={() => editor.chain().focus().toggleCodeBlock().run()}>Code Block</Button >
        <Button  onClick={() => editor.chain().focus().toggleBlockquote().run()}>Blockquote</Button >
        <Button  onClick={() => editor.chain().focus().setHorizontalRule().run()}>Horizontal Rule</Button >
        <Button  onClick={() => editor.chain().focus().setParagraph().run()}>Paragraph</Button >
        <Button  onClick={() => editor.chain().focus().setHeading({ level: 2 }).run()}>H2</Button >
        <Button  onClick={() => editor.chain().focus().setHeading({ level: 3 }).run()}>H3</Button >
        <Button  onClick={() => {
            const url = prompt('Enter URL')
            if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
              editor.chain().focus().setLink({ href: url }).run()
            } else {
              alert('Please enter a valid URL starting with http:// or https://')
            }
          }}>Link</Button >
        <Button  onClick={() => editor.chain().focus().unsetLink().run()}>Remove Link</Button >
      </div>

      {/* Tiptap Editor */}
      <div>
      <EditorContent editor={editor}/>
      </div>

    </div>
  )
}

export default Tiptap
