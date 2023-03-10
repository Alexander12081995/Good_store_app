import { FC } from "react";
import "./styles.css";

interface LoaderProps {
    isLoading: boolean;
}

export const Loader: FC<LoaderProps> = ({isLoading}) =>
    isLoading ? (
        <div className="loader">Loading...</div>
    ) : null;



