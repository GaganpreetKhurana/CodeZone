import { useCallback, useEffect, useState } from "react"
import Quill from "quill"
import "quill/dist/quill.snow.css"
import { io } from "socket.io-client"

const SAVE_INTERVAL_MS = 1000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor(props) {
  const { documentId } = props;
  //to access socket from anywhere we put socket in state
  const [socket, setSocket] = useState()
  //similarly for quill instance
  const [quill, setQuill] = useState()

  //only once we want to run this when the component renders so inside useEffect
  //to establish connection between users
  useEffect(() => {
    //server side url to form a connection
    const s = io("http://localhost:3001")
    setSocket(s)
    //to clean this up because it is created using useEffect
    return () => {
      s.disconnect()
    }
  }, [])

  //useEffect to save the document after some interval we will save the document
  useEffect(() => {
    if (socket == null || quill == null) return

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [socket, quill])
    
  //we want to create a socket or room for users on same document using id passed in the url with each document i.e we use params of the document for this
  useEffect(() => {
    if (socket == null || quill == null) return
    
    // socket .once to listen to server only once and receive the dcumnet if any is stored in db corresponding to that documentId
    socket.once("load-document", document => {
      quill.setContents(document)

      //we enable the document that is after enable is called user would be able to edit the document and not before that is why we disabled the document where we created the quill
      quill.enable()
    })
       
  //send documentId to the server and ask the server for the corresponding doc if present in db and also create a room for this document/socket separately
    socket.emit("get-document", documentId)
  }, [socket, quill, documentId])

  
  //useeffect that identifies the changes in the document i.e. quill whenever it is made 
  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {
      //we only want to trck the changes that current user has made and send the changes to the backend where document is stored
      if (source !== "user") return
      //send the changes to the server
      //delta is not the complete document that has changed it is just a subset of the changes that is changing so we just send that part to the server
      socket.emit("send-changes", delta)
      //send-changes is the function which we will catch on the server side using on and decide what needs to be done with this
    }
    //source will identify who mde the changes 
    //changes would be identified with the help of oldDelta dn newDelta
    //quill is the text-editor which we stored in state whenever it changes we see whether it has been changed by the 
    //current user or the other user
    //if by the other user we do nothing but if by the current user we have to send the updations to the backend server
    //call the handler which checks for changes
    quill.on("text-change", handler)
    //clean the useeffect
    return () => {
      quill.off("text-change", handler)
    }
    //this useeffect is called whenever socket or quill changes
  }, [socket, quill])


  useEffect(() => {
    if (socket == null || quill == null) return

    const handler = delta => {
      quill.updateContents(delta)
    }
    //clean the useeffect
    socket.on("receive-changes", handler)

    return () => {
      socket.off("receive-changes", handler)
    }
    //this useeffect is called whenever socket or quill changes
  }, [socket, quill])

  

  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return
    //made the editor empty that is clean up the previous effect else new toolbar would be created with each render
    //and we would see many toolbars in the editor box  
    wrapper.innerHTML = ""
    //so that in one single div we can get the editor and toolbar
    const editor = document.createElement("div")
    wrapper.append(editor)
    //we only want to render one time that's why we added []
    //we need to convert quill to react component and pass to selector where we want to place it to be done only once when we want to load the component
    //this will provide basic text editor with toolbar but if the same component is rerendered new toolbars would keep
    //on adding so we also need to remove the old toolbars so we use ref in id =container 
    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    })
    //WE DISABLE THE TEXT EDITOR AND ENABLE LATER AFTER CHECKING IF THERE IS ANY PREEXISTING DOCUMENT OR NOT
    q.disable()
    //this would be the text shown untill it beomes enabled
    q.setText("Loading...")

    setQuill(q)
  }, [])
  return (
    <div className="container" ref={wrapperRef} ></div>
  )
}
