import { ClockLoader } from "react-spinners";


export function clockLoader(size, color, isLoading,) {
    return (
        <ClockLoader color={color} size={size} loading={isLoading}/>
        );
}