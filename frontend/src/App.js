import './App.css';
import React, {useState, useEffect, useCallback} from "react";
import {MyTable} from "./table";

function App() {
    const [fileList, setFileList] = useState([])
    console.log('filelist', fileList)
    useEffect(() => {
        fetch('http://localhost:4000/')
            .then(res => res.json())
            .then((result) => {
                console.log('result', result)
                setFileList(result);
            })
    },[])

    const clickHandler = useCallback((item) => {
        // debugger
        if(item.fileName == 'back' || item.isDir) {
            fetch(`http://localhost:4000/?path=${item.filePath}`)
                .then(res => res.json())
                .then((result) => {
                    console.log('result', result)
                    setFileList(result);
                })
        } else {
            fetch(`http://localhost:4000/?open=${item.filePath}`)
                .then(res => {
                    // debugger
                    return res.json()})
                .then((result) => {
                    debugger
                    console.log('result', result)
                    // setFileList(result);
                })
        }

    },[])

    return (
        <div className="App">
            {
                fileList.length ? <MyTable arr = {fileList} cb = {clickHandler}/> : <div>Loading...</div>

            }
            {/*{*/}
            {/*    fileList.map((data) => {*/}
            {/*        return <div key={data.fileName}>*/}
            {/*            <span>{data.fileName}</span> <span>Size: {data.size}</span>*/}

            {/*        </div>*/}

            {/*    })*/}
            {/*}*/}
        </div>
    );
}

export default App;
