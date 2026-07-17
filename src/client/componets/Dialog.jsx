import { redirect } from "react-router-dom";
import { deleteProjectAPI, getProjectsAPI } from "../controllers/APIs";
import { handleDeleteProject } from "../controllers/client_controllers";
import { ScaleLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";

export function Dialog({
    isModalShowing, setIsModalShowing, projectID, showDialog, setShowDialog, acceptDeleteProject,
    setAcceptDeleteProject, isLoading, setLoading , onProjectDelelted}) {
    function cancelDelete() {
        setAcceptDeleteProject(false);
        setShowDialog(false);
        setIsModalShowing(false);
    }
    async function acceptDelete() {
        setAcceptDeleteProject(true);
        setLoading(true)
        if (setAcceptDeleteProject) {
            setLoading(true)
            const response = await deleteProjectAPI(projectID);
            if (response.ok) {
                setLoading(false)
                setShowDialog(false)
                setIsModalShowing(false);
                redirect('/dashboard');
                onProjectDelelted();
            }
        }

    const{data: users, refetch} = useQuery(['users'], getProjectsAPI());

    }
    return <div className="dialog-box">
        <h4 className="dialog-header">CONFIRM OPERATION</h4>
        <ScaleLoader height={10} width={3} loading={isLoading} />
        <div className="dialog-action-btn-wrapper">
            <input onClick={() => {
                cancelDelete()
            }} className="dialog-cancel-btn" type="button" value="Cancel" />
            <input onClick={() => {
                acceptDelete();
            }} className="dialog-procced-btn" type="button" value="Proceed" />
        </div>
    </div>
}