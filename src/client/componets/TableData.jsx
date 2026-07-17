export default function TableData({ project, previewProjecthandler }) {
        return (
        <tbody onClick={(project)=>{previewProjecthandler(project)}}>
            <tr className="project-table-data">
                <td>{project.project_title}</td>
                <td>{project.project_author}</td>
                <td>{project.project_description}</td>
                <td>{project.project_date_created}</td>
            </tr>
        </tbody>
    )
}