import socket from '@/sockets/Socket';
import Editor from '@monaco-editor/react';
import { useEffect, useState } from 'react';

const CodeContainer = ({ team }) => {
    const [code, setCode] = useState(team.code)
    const [change, setChange] = useState(false)

    function handleEditorChange(value, event) {
        socket.emit('newCode', value, team._id)
        setChange(!change)
    }

    useEffect(() => {
        socket.on('newCode', (value) => {
            setCode(value)
        })
    }, [change])


    useEffect(() => {
        socket.connect()
        socket.emit('joinCode', team._id)
    }, [])

    return (
        <div className="code-container">
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                theme='vs-dark'
            />

        </div>
    )
}

export default CodeContainer
