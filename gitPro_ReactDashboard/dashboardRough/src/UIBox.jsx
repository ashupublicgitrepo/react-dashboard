import React from "react";
const UIBox = ({ task, taskDeleter }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>sr.no.</th>
                        <th>title</th>
                        <th>status</th>
                        <th>action</th>
                    </tr>
            </thead>
                <tbody>
                    {task && task.map((e, i) => {
                        return <tr key={i}>
                            <td>{i+1}</td>
                            <td>{e.title}</td>
                            <td>{e.status}</td>
                            <td><button>mark as complete</button></td>
                            <td><button onClick={()=>taskDeleter(i)}>delete from list</button></td>
                        </tr>
                    })}
                </tbody>
            </table>
            
        </>
    )
}
export default UIBox;