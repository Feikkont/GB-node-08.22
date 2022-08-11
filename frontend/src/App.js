import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import {MyTable} from "./table";

function App() {
    const [fileList, setFileList] = useState([])
    const [fileData, setFileData] = useState('')

    const getData = (url = '/', open = false) => {
        // debugger
        return fetch(`http://localhost:4000${url}`)
            .then(res => !open ? res.json() : res.text())
            .then((result) => {
                if (!open) {
                    result.sort((a, b) => {
                        if (a.size < b.size) {
                            return -1;
                        }
                        if (a.size < b.size) {
                            return 1;
                        }
                        return 0
                    })
                    setFileList(result);
                } else {
                    setFileData(result);
                }
            }
        )
    }

    useEffect(() => {
        getData()
        // fetch('http://localhost:4000/')
        //     .then(res => res.json())
        //     .then((result) => {
        //         console.log('result', result)
        //         result.sort((a, b) => {
        //             if (a.size < b.size) {
        //                 return -1;
        //             }
        //             if (a.size < b.size) {
        //                 return 1;
        //             }
        //             return 0
        //         })
        //         setFileList(result);
        //     })
    }, [])

    const clickHandler = useCallback((item) => {
        if (item.fileName == 'back' || item.isDir) {
            getData(`/?path=${item.filePath}`)
            // fetch(`http://localhost:4000/?path=${item.filePath}`)
            //     .then(res => res.json())
            //     .then((result) => {
            //         result.sort((a, b) => {
            //             if (a.size < b.size) {
            //                 return -1;
            //             }
            //             if (a.size < b.size) {
            //                 return 1;
            //             }
            //             return 0
            //         })
            //         setFileList(result);
            //     })
        } else {
            getData(`/?open=${item.filePath}`, true)
            //     fetch(`http://localhost:4000/?open=${item.filePath}`)
            //         .then(res => {
            //             return res.text()
            //         })
            //         .then((result) => {
            //             console.log('result', result)
            //             setFileData(result);
            //         })
        }
    }, [])

    return (
        <div className="App">
            {
                fileList.length ? <MyTable arr={fileList} cb={clickHandler} fileData={fileData}/> :
                    <div>Loading...</div>
            }
        </div>
    );
}

export default App;
