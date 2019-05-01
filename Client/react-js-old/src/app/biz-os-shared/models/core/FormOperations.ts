import { FormButton } from "./FormButton";
export interface FormOperations {
    save?: FormButton;
    update?: FormButton;
    reset?: FormButton;
    cancel?: FormButton;
    delete?: FormButton;
    search?: FormButton;
}