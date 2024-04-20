import { CounterContext } from '@/contextApi/Context';
import socket from '@/sockets/Socket';
import Editor from '@monaco-editor/react';
import { useContext, useEffect, useState } from 'react';
import "public/sass/singleuse/CodeContainer.scss"

const CodeContainer = ({ team }) => {
    const [code, setCode] = useState(team.code)
    const [change, setChange] = useState(false)
    const { state } = useContext(CounterContext)
    const [coder, setCoder] = useState(null)
    const [position, setPostion] = useState({ top: null, left: null })

    function handleEditorChange(code, event) {
        const { endLineNumber, endColumn } = event?.changes[0]?.range
        socket.emit('newCode', { code, name: state.name, endLineNumber, endColumn }, team._id)
        setChange(!change)
    }

    useEffect(() => {
        socket.on('newCode', ({ code, name, endLineNumber, endColumn }) => {
            setCode(code)
            setCoder(name)
            setPostion({ top: endLineNumber, left: endColumn })
        })
    }, [change])

    if (state.name !== coder) {
        // console.log(coder)
    }

    useEffect(() => {
        socket.connect()
        socket.emit('joinCode', team._id)
    }, [])

    return (
        <div className="code-container">
            {(state.name !== coder) && <p className="coderName" style={{ top: `${position.top}rem`, left: `${position.left}rem` }}>{coder}</p>}
            <Editor
                height="100vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme='vs-dark'
                className='monaco'
            />
        </div>
    )
}

export default CodeContainer
