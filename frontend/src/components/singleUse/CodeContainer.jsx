import { CounterContext } from '@/contextApi/Context';
import socket from '@/sockets/Socket';
import Editor from '@monaco-editor/react';
import { useContext, useEffect, useState } from 'react';

const CodeContainer = ({ team }) => {
    const [code, setCode] = useState(team.code)
    const [change, setChange] = useState(false)
    const { state } = useContext(CounterContext)
    const [coder, setCoder] = useState(null)

    function handleEditorChange(code, event) {
        socket.emit('newCode', { code, name: state.name }, team._id)
        setChange(!change)
    }

    useEffect(() => {
        socket.on('newCode', ({ code, name }) => {
            setCode(code)
            setCoder(name)
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
            <Editor
                height="100vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme='vs-dark'
                />
                {(state.name !== coder) && <p style={{position:'absolute',top:'10rem',right:"5rem"}}>{coder}</p>}

        </div>
    )
}

export default CodeContainer
