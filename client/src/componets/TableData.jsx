export default function TableData({ project, projectViewMoreHandler, handleRightClick, isLoading, setLoading}) {
        return (
        <tbody onClick={(project)=>{
            setLoading(isLoading=>true);
            projectViewMoreHandler(project);
            setLoading(isLoading=>false);
        }}
                onContextMenu={()=>{
                    setLoading(isLoading=>true);
                    handleRightClick;
                    setLoading(isLoading=>false);
                }}
            
        >
            <tr className="project-table-data">
                <td>{project.project_title}</td>
                <td>{project.project_author}</td>
                <td>{project.project_description}</td>
                <td>{project.project_date_created}</td>
            </tr>
        </tbody>
    )
}